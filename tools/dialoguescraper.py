import ast
import re
from pathlib import Path
from typing import Dict, List, Tuple

import requests
from bs4 import BeautifulSoup, Tag


# ----------------------------
# CONFIG
# ----------------------------
names =['Filat', "Bobok", "Sakh Män", "Sharp", "Patchwork", "Sergant Dronte", "Swangoose", "Tuutey", "Astrild", "Burdock", 
        "Gannet", "Martin", "Kira", "Emilia", "Oktay", "Finch", "Luta", "Crow", "Grouse", "Mirka", "Petrel"]
links =['https://pathologicdialogue.github.io/html3_en/Day4.html', 
        "https://pathologicdialogue.github.io/html3_en/Day5.html", 
        "https://pathologicdialogue.github.io/html3_en/Day9.html",
        "https://pathologicdialogue.github.io/html3_en/Day6.html",
        "https://pathologicdialogue.github.io/html3_en/Day10.html",
        "https://pathologicdialogue.github.io/html3_en/Day7.html",
        "https://pathologicdialogue.github.io/html3_en/Day8.html",
    ]

output_file = "tools/pathologic_dialogue.md"
you_replacement = "Bachelor"


# ----------------------------
# FETCH / PARSE
# ----------------------------
def download_html(url: str) -> str:
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    return resp.text


def parse_js_arrays(html: str) -> Dict[str, str]:
    inarr_match = re.search(r"inarr\s*=\s*(\[[\s\S]*?\])\s*;\s*textarr\s*=", html)
    textarr_match = re.search(r"textarr\s*=\s*(\[[\s\S]*?\])\s*;\s*for\s*\(", html)

    if not inarr_match or not textarr_match:
        raise ValueError("Could not find inarr/textarr arrays in HTML.")

    inarr_raw = inarr_match.group(1)
    textarr_raw = textarr_match.group(1)

    try:
        inarr = ast.literal_eval(inarr_raw)
        textarr = ast.literal_eval(textarr_raw)
    except Exception as exc:
        raise ValueError(f"Failed to parse JS arrays: {exc}") from exc

    if len(inarr) != len(textarr):
        raise ValueError("inarr and textarr length mismatch.")

    return dict(zip(inarr, textarr))


def expand_p_text(p: Tag, class_to_text: Dict[str, str]) -> str:
    for cls in p.get("class", []):
        if cls in class_to_text:
            return class_to_text[cls].strip()
    return p.get_text(" ", strip=True)


def get_node_label(p: Tag) -> str:
    """
    Preserve the original visible numbering from the page, e.g. '1.' or '2.'
    """
    raw = p.get_text(" ", strip=True)
    m = re.match(r"^(\d+\.)$", raw)
    if m:
        return m.group(1)
    return ""


def normalize_line(raw: str, you_replacement: str) -> Tuple[str, str]:
    raw = " ".join(raw.split()).strip()

    if raw.startswith("You:"):
        return you_replacement, raw[len("You:"):].strip()

    if ":" in raw:
        speaker, text = raw.split(":", 1)
        return speaker.strip(), text.strip()

    return "", raw


# ----------------------------
# TREE WALK
# ----------------------------
def walk_dialogue_tree(
    node: Tag,
    class_to_text: Dict[str, str],
    target_names: set,
    current_section: str,
    you_replacement: str,
    out: List[Tuple[str, str, str, str]],
) -> None:
    """
    Recursively walks the DOM in document order.

    Appends:
        (section_title, node_label, speaker, text)
    """
    for child in node.children:
        if not isinstance(child, Tag):
            continue

        if child.name == "center":
            current_section = child.get_text(" ", strip=True)
            continue

        if child.name == "p":
            node_label = get_node_label(child)
            raw = expand_p_text(child, class_to_text).strip()

            if not raw or raw == "(Repeated above)":
                continue

            speaker, text = normalize_line(raw, you_replacement)

            if not speaker or not text or not current_section:
                continue

            if speaker in target_names or speaker == you_replacement:
                out.append((current_section, node_label, speaker, text))

        walk_dialogue_tree(
            child,
            class_to_text,
            target_names,
            current_section,
            you_replacement,
            out,
        )


def extract_dialogue_from_page(
    html: str,
    target_names: List[str],
    you_replacement: str = "Bachelor",
) -> Dict[str, Dict[str, List[Tuple[str, str, str]]]]:
    """
    Returns:
    {
        "Filat": {
            "Hospital_Vasiliy_Final": [
                ("1.", "Filat", "..."),
                ("2.", "Bachelor", "..."),
                ...
            ]
        }
    }
    """
    soup = BeautifulSoup(html, "html.parser")
    class_to_text = parse_js_arrays(html)

    wanted = set(target_names)
    data: Dict[str, Dict[str, List[Tuple[str, str, str]]]] = {
        name: {} for name in target_names
    }

    headers = soup.find_all("div", attrs={"data-role": "header"})

    for header in headers:
        h1 = header.find("h1")
        if not h1:
            continue

        character_name = h1.get_text(" ", strip=True)
        if character_name not in wanted:
            continue

        main_div = header.find_next_sibling("div", attrs={"data-role": "main"})
        if not main_div:
            continue

        flat_results: List[Tuple[str, str, str, str]] = []
        walk_dialogue_tree(
            node=main_div,
            class_to_text=class_to_text,
            target_names=wanted,
            current_section="",
            you_replacement=you_replacement,
            out=flat_results,
        )

        for section_title, node_label, speaker, text in flat_results:
            data.setdefault(character_name, {}).setdefault(section_title, []).append(
                (node_label, speaker, text)
            )

    return data


# ----------------------------
# OUTPUT
# ----------------------------
def merge_data(
    all_data: List[Dict[str, Dict[str, List[Tuple[str, str, str]]]]],
    names: List[str],
) -> Dict[str, Dict[str, List[Tuple[str, str, str]]]]:
    merged: Dict[str, Dict[str, List[Tuple[str, str, str]]]] = {name: {} for name in names}

    for page_data in all_data:
        for character, sections in page_data.items():
            for section_title, lines in sections.items():
                merged.setdefault(character, {}).setdefault(section_title, []).extend(lines)

    return merged


def render_markdown(data: Dict[str, Dict[str, List[Tuple[str, str, str]]]]) -> str:
    parts: List[str] = []

    for character, sections in data.items():
        if not sections:
            continue

        parts.append(f"# {character}")
        parts.append("")

        for section_title, lines in sections.items():
            if not lines:
                continue

            parts.append(f"#### {section_title}")
            for node_label, speaker, text in lines:
                prefix = node_label if node_label else "?"
                parts.append(f"{prefix} *{speaker}*: {text}")
            parts.append("")

    return "\n".join(parts).rstrip() + "\n"


def main() -> None:
    all_data = []

    for url in links:
        print(f"Processing: {url}")
        html = download_html(url)
        page_data = extract_dialogue_from_page(
            html=html,
            target_names=names,
            you_replacement=you_replacement,
        )
        all_data.append(page_data)

    merged = merge_data(all_data, names)
    md = render_markdown(merged)

    Path(output_file).write_text(md, encoding="utf-8")
    print(f"Saved to {output_file}")


if __name__ == "__main__":
    main()