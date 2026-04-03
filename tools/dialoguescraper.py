import re
import ast
import requests
from bs4 import BeautifulSoup, NavigableString

def extract_dialogue(links, target_names, output_filename="dialogue_extracted.md"):
    # Use a set for faster lookup
    target_names = set(target_names)
    results = {char: [] for char in target_names}
    
    for url in links:
        print(f"Processing {url}...")
        try:
            response = requests.get(url)
            response.raise_for_status()
            html = response.text
        except Exception as e:
            print(f"Failed to fetch {url}: {e}")
            continue

        soup = BeautifulSoup(html, 'html.parser')
        
        # 1. Locate the Javascript block injecting the dialog text 
        script_content = ""
        for script in soup.find_all('script'):
            if script.string and 'inarr=[' in script.string and 'textarr=[' in script.string:
                script_content = script.string
                break
        
        if not script_content:
            print(f"Could not find dialogue script arrays in {url}")
            continue
            
        # 2. Extract Javascript arrays efficiently and reliably using string bounds
        inarr_start = script_content.find("inarr=[")
        textarr_start = script_content.find("textarr=[")
        for_start = script_content.find("for (i = 0")
        
        if inarr_start == -1 or textarr_start == -1 or for_start == -1:
            print(f"Could not parse script structure in {url}")
            continue
            
        # Slicing cleanly isolates the arrays (e.g., ['528-62033',...])
        inarr_str = script_content[inarr_start+6 : textarr_start].strip().rstrip(';')
        textarr_str = script_content[textarr_start+8 : for_start].strip().rstrip(';')
        
        try:
            # We can use literal_eval safely since JS string array definitions map cleanly to Python's
            inarr = ast.literal_eval(inarr_str)
            textarr = ast.literal_eval(textarr_str)
        except Exception as e:
            print(f"Error evaluating Javascript arrays in {url}: {e}")
            continue
            
        class_to_text = dict(zip(inarr, textarr))
        
        # 3. Parse the DOM tree sequentially to retain the reading order
        current_char = None
        current_conv = None
        last_number = "1"
        
        for element in soup.descendants:
            
            # Grabbing the depth in the dialogue tree (Text nodes that contain numbers like "1." or "# 1.")
            if isinstance(element, NavigableString):
                text = element.strip()
                match = re.match(r'^#?\s*(\d+)\.?$', text)
                if match:
                    last_number = match.group(1)
                continue
            
            # Only process full HTML tags beneath here
            if not hasattr(element, 'name') or element.name is None:
                continue
                
            # Detect character headers 
            if element.name in['h1', 'h2', 'h3', 'div']:
                direct_text = element.get_text(strip=True)
                # Exact matches help avoid random tags assigning false contexts
                if direct_text in target_names:
                    current_char = direct_text
                    continue
            
            # Detect conversation titles
            if element.name in['h2', 'h3', 'h4'] or element.get('data-role') == 'collapsible':
                if current_char:
                    conv_name = element.get_text(separator=" ", strip=True)
                    # Clean up common UI clutter text
                    conv_name = re.sub(r'Expand all unique|Collapse all', '', conv_name).strip()
                    
                    if conv_name and conv_name != current_char and not re.match(r'^#?\s*\d+\.?$', conv_name):
                        header = f"#### {conv_name}"
                        # Check we don't spam duplicate title headers
                        if not results[current_char] or results[current_char][-1] != header:
                            if results[current_char] and results[current_char][-1] != "":
                                results[current_char].append("")
                            results[current_char].append(header)
                            last_number = "1"  # Reset depth count on new conversation
                            
            # Process Dialogues 
            classes = element.get('class',[])
            if classes:
                for cls in classes:
                    if cls in class_to_text and current_char:
                        raw_text = class_to_text[cls]
                        
                        # Format the line requested: "1. *Speaker*: Dialogue"
                        if ": " in raw_text:
                            speaker, dialogue = raw_text.split(": ", 1)
                            if speaker == "You":
                                speaker = "Bachelor"
                            line = f"{last_number}. *{speaker}*: {dialogue}"
                        else:
                            line = f"{last_number}. {raw_text}"
                            
                        # If a JS hook repeated the content sequentially, we append once
                        if not results[current_char] or results[current_char][-1] != line:
                            results[current_char].append(line)
                        break
                        
    # 4. Save aggregated result cleanly out to the markdown file
    with open(output_filename, "w", encoding="utf-8") as f:
        for char in target_names:
            if results[char]:
                f.write(f"# {char}\n")
                for line in results[char]:
                    f.write(line + "\n")
                f.write("\n")
                
    print(f"Extraction complete! Saved formatted dialog to {output_filename}")

if __name__ == '__main__':
    names =['Filat', "Bobok", "Sakh Män", "Sharp", "Patchwork", "Sergant Dronte", "Swangoose", "Tuutey", "Astrild", "Burdock", 
            "Gannet", "Martin", "Kira", "Emilia", "Oktay", "Finch", "Luta", "Crow", "Grouse", "Mirka", "Petrel", ""]
    links =['https://pathologicdialogue.github.io/html3_en/Day4.html', 
            "https://pathologicdialogue.github.io/html3_en/Day5.html", 
            "https://pathologicdialogue.github.io/html3_en/Day9.html",
            "https://pathologicdialogue.github.io/html3_en/Day6.html",
            "https://pathologicdialogue.github.io/html3_en/Day10.html",
            "https://pathologicdialogue.github.io/html3_en/Day7.html",
            "https://pathologicdialogue.github.io/html3_en/Day8.html",
    ]
    
    extract_dialogue(links, names, "dialogue.md")