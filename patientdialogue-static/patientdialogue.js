import { diagnoses, getSymptomDefinition } from "../data.js";
import { VERA_CASE } from "./vera-case.js";

const elements = {
    patientSummary: document.getElementById("patientSummary"),
    restartButton: document.getElementById("restartButton"),
    storyOutput: document.getElementById("storyOutput"),
    choiceList: document.getElementById("choiceList"),
    clueList: document.getElementById("clueList"),
    worldClueList: document.getElementById("worldClueList"),
    symptomChecklist: document.getElementById("symptomChecklist"),
    diagnosisList: document.getElementById("diagnosisList"),
    returnToPatientButton: document.getElementById("returnToPatientButton"),
    followupStatus: document.getElementById("followupStatus"),
    followupList: document.getElementById("followupList"),
    debugOutput: document.getElementById("debugOutput"),
    inkSourceOutput: document.getElementById("inkSourceOutput"),
};

const watchedVariables = ["trust", "broad_questions_asked", "interview_complete"];
const defaultPatience = 4;
const defaultMaxFollowupSymptomsSelected = 3;
const strengthRank = Object.freeze({ soft: 1, strong: 2 });

const state = {
    story: null,
    compiledInkSource: "",
    discoveredClues: new Map(),
    worldClues: [],
    selectedSymptoms: new Set(),
    askedFollowups: new Set(),
    notebookUnlocked: false,
    isBackWithPatient: false,
    patienceRemaining: 0,
    patienceMax: 0,
};

function slugify(value) {
    return String(value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
}

function inkString(value) {
    return JSON.stringify(String(value));
}

function getSymptomMeta(symptomLabel) {
    const definition = getSymptomDefinition(symptomLabel);

    return {
        label: definition?.label || symptomLabel,
        tooltip: definition?.tooltip || "No tooltip text found.",
        id: slugify(definition?.label || symptomLabel),
    };
}

function getVariable(name) {
    if (!state.story) return undefined;

    if (state.story.variablesState && typeof state.story.variablesState.$ === "function") {
        return state.story.variablesState.$(name);
    }

    return state.story.variablesState ? state.story.variablesState[name] : undefined;
}

function appendStoryLine(text, className = "story-line") {
    const line = document.createElement("div");
    line.className = className;
    line.textContent = text;
    elements.storyOutput.appendChild(line);
    elements.storyOutput.scrollTop = elements.storyOutput.scrollHeight;
}

function resetOutputs() {
    elements.storyOutput.innerHTML = "";
    elements.choiceList.innerHTML = "";
    state.discoveredClues.clear();
    state.worldClues = [];
    state.selectedSymptoms.clear();
    state.askedFollowups.clear();
    state.notebookUnlocked = false;
    state.isBackWithPatient = false;
    state.patienceMax = Number(VERA_CASE.patience) || defaultPatience;
    state.patienceRemaining = state.patienceMax;
}

function renderPatientSummary() {
    const patient = VERA_CASE.patient;
    elements.patientSummary.textContent = [
        `${patient.name}, ${patient.age}`,
        `${patient.occupation}, ${patient.residence}`,
        `personality: ${patient.personality}`,
        `patience remaining: ${state.patienceRemaining}/${state.patienceMax}`,
        `true diagnosis for this prototype: ${patient.trueDiagnosis}`,
        `opening complaint: ${patient.opener}`,
    ].join("\n");
}

function renderChoices() {
    elements.choiceList.innerHTML = "";

    if (!state.story) return;

    if (!state.story.currentChoices.length) {
        const note = document.createElement("div");
        note.className = "muted";
        note.textContent = state.notebookUnlocked
            ? "Broad interview concluded. Use the notebook and follow-up buttons on the right."
            : "No choices available.";
        elements.choiceList.appendChild(note);
        return;
    }

    state.story.currentChoices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = choice.text;
        button.addEventListener("click", () => {
            appendStoryLine(`> ${choice.text}`, "system-line");
            state.story.ChooseChoiceIndex(index);
            continueStory();
        });
        elements.choiceList.appendChild(button);
    });
}

function renderClues() {
    if (!state.discoveredClues.size) {
        elements.clueList.textContent = VERA_CASE.notebookIntro;
        return;
    }

    elements.clueList.innerHTML = "";

    Array.from(state.discoveredClues.values())
        .sort((left, right) => left.label.localeCompare(right.label))
        .forEach((entry) => {
            const div = document.createElement("div");
            div.className = "clue-entry";
            const latestNote = entry.notes[entry.notes.length - 1] || "";
            div.textContent = `${entry.label} (${entry.strength}) — ${latestNote}`;
            elements.clueList.appendChild(div);
        });
}

function renderWorldClues() {
    if (!state.worldClues.length) {
        elements.worldClueList.textContent = "No non-symptom context notes yet.";
        return;
    }

    elements.worldClueList.innerHTML = "";
    state.worldClues.forEach((entry) => {
        const div = document.createElement("div");
        div.className = "world-entry";
        div.textContent = entry.text;
        elements.worldClueList.appendChild(div);
    });
}

function renderSymptomChecklist() {
    elements.symptomChecklist.innerHTML = "";

    if (!state.discoveredClues.size) {
        const note = document.createElement("div");
        note.className = "muted";
        note.textContent = "No symptom clues discovered yet.";
        elements.symptomChecklist.appendChild(note);
        return;
    }

    Array.from(state.discoveredClues.values())
        .sort((left, right) => left.label.localeCompare(right.label))
        .forEach((entry) => {
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = state.selectedSymptoms.has(entry.label);
            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    state.selectedSymptoms.add(entry.label);
                } else {
                    state.selectedSymptoms.delete(entry.label);
                }

                renderDiagnoses();
                renderFollowups();
                renderDebug();
            });

            const text = document.createElement("span");
            text.textContent = `${entry.label} [${entry.strength}]`;
            label.title = entry.tooltip;
            label.append(checkbox, text);
            elements.symptomChecklist.appendChild(label);
        });
}

function renderDiagnoses() {
    const selectedLabels = Array.from(state.selectedSymptoms);

    if (!selectedLabels.length) {
        elements.diagnosisList.textContent =
            "Select one or more symptom clues to test the case against the diagnosis list.";
        return;
    }

    const exactMatches = diagnoses.filter((diagnosis) => {
        return selectedLabels.every((symptom) => (diagnosis.symptoms || []).includes(symptom));
    });

    const likelyMatches = diagnoses
        .map((diagnosis) => ({
            diagnosis,
            overlap: selectedLabels.filter((symptom) =>
                (diagnosis.symptoms || []).includes(symptom),
            ).length,
        }))
        .filter((entry) => entry.overlap > 0)
        .sort(
            (left, right) =>
                right.overlap - left.overlap ||
                left.diagnosis.name.localeCompare(right.diagnosis.name),
        )
        .slice(0, 6);

    elements.diagnosisList.innerHTML = "";

    const exactHeader = document.createElement("div");
    exactHeader.className = "note-line";
    exactHeader.textContent = exactMatches.length
        ? `Exact matches for all selected symptoms: ${exactMatches.length}`
        : "Exact matches for all selected symptoms: none";
    elements.diagnosisList.appendChild(exactHeader);

    exactMatches.forEach((diagnosis) => {
        const div = document.createElement("div");
        div.className = "diagnosis-entry";
        div.textContent = diagnosis.name;
        elements.diagnosisList.appendChild(div);
    });

    const likelyHeader = document.createElement("div");
    likelyHeader.className = "note-line";
    likelyHeader.textContent = "Best overlaps:";
    elements.diagnosisList.appendChild(likelyHeader);

    likelyMatches.forEach(({ diagnosis, overlap }) => {
        const div = document.createElement("div");
        div.className = "diagnosis-entry";
        div.textContent = `${diagnosis.name} (${overlap}/${selectedLabels.length})`;
        elements.diagnosisList.appendChild(div);
    });
}

function getSelectedSymptomCount() {
    return state.selectedSymptoms.size;
}

function getMaxFollowupSymptomsSelected() {
    return Number(VERA_CASE.maxFollowupSymptomsSelected) || defaultMaxFollowupSymptomsSelected;
}

function getAvailableFollowups() {
    return VERA_CASE.followups.filter((followup) => {
        return (
            state.selectedSymptoms.has(followup.symptom) &&
            !state.askedFollowups.has(followup.symptom)
        );
    });
}

function getFollowupBlockReason() {
    if (!state.notebookUnlocked) {
        return "Conclude the broad interview first to unlock targeted follow-ups.";
    }

    if (state.patienceRemaining <= 0 && !state.isBackWithPatient) {
        return "She has run out of patience and will not answer more targeted questions.";
    }

    if (!getSelectedSymptomCount()) {
        return "Select one or more discovered symptoms before returning to the patient.";
    }

    const maxSelected = getMaxFollowupSymptomsSelected();
    if (getSelectedSymptomCount() > maxSelected) {
        return `Too many symptoms are selected. Narrow it down to ${maxSelected} or fewer before going back.`;
    }

    if (!getAvailableFollowups().length) {
        return "None of the currently selected symptoms have an unanswered targeted follow-up left.";
    }

    return "";
}

function renderFollowups() {
    elements.followupList.innerHTML = "";
    elements.followupStatus.innerHTML = "";

    const blockReason = getFollowupBlockReason();
    const available = getAvailableFollowups();
    const status = document.createElement("div");
    status.className =
        `followup-status ${state.patienceRemaining <= 1 ? "status-danger" : ""}`.trim();

    if (!state.notebookUnlocked) {
        status.textContent = blockReason;
        elements.followupStatus.appendChild(status);
        elements.returnToPatientButton.disabled = true;
        return;
    }

    if (state.isBackWithPatient) {
        status.textContent =
            state.patienceRemaining > 0
                ? `You are back with Vera. Each extra pass costs patience. Remaining: ${state.patienceRemaining}/${state.patienceMax}.`
                : blockReason;
    } else {
        status.textContent = `Patience remaining: ${state.patienceRemaining}/${state.patienceMax}. Another return visit will cost 1 patience.`;
    }

    elements.followupStatus.appendChild(status);

    const canReturn = !blockReason && !state.isBackWithPatient;
    elements.returnToPatientButton.disabled = !canReturn;

    if (!state.isBackWithPatient) {
        const note = document.createElement("div");
        note.className = "muted";
        note.textContent =
            blockReason ||
            "When you are ready, return to the patient to ask one sharper follow-up.";
        elements.followupList.appendChild(note);
        return;
    }

    if (blockReason) {
        const note = document.createElement("div");
        note.className = "muted";
        note.textContent = blockReason;
        elements.followupList.appendChild(note);
        return;
    }

    available.forEach((followup) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = followup.label;
        button.addEventListener("click", () => {
            askFollowup(followup.symptom);
        });
        elements.followupList.appendChild(button);
    });
}

function renderDebug() {
    const variableSnapshot = watchedVariables.map(
        (name) => `${name}: ${JSON.stringify(getVariable(name))}`,
    );
    const extraSnapshot = [
        `notebookUnlocked: ${JSON.stringify(state.notebookUnlocked)}`,
        `isBackWithPatient: ${JSON.stringify(state.isBackWithPatient)}`,
        `patienceRemaining: ${JSON.stringify(state.patienceRemaining)}`,
        `patienceMax: ${JSON.stringify(state.patienceMax)}`,
        `selectedSymptoms: ${JSON.stringify(Array.from(state.selectedSymptoms))}`,
        `askedFollowups: ${JSON.stringify(Array.from(state.askedFollowups))}`,
    ];

    elements.debugOutput.textContent = [...variableSnapshot, ...extraSnapshot].join("\n");
}

function revealClue(symptomLabel, strength, note) {
    const meta = getSymptomMeta(symptomLabel);
    const existing = state.discoveredClues.get(meta.label);

    if (!existing) {
        state.discoveredClues.set(meta.label, {
            id: meta.id,
            label: meta.label,
            tooltip: meta.tooltip,
            strength,
            notes: [note],
        });
    } else {
        if ((strengthRank[strength] || 0) > (strengthRank[existing.strength] || 0)) {
            existing.strength = strength;
        }

        existing.notes.push(note);
    }

    renderClues();
    renderSymptomChecklist();
    renderDiagnoses();
    renderFollowups();
    renderPatientSummary();
    renderDebug();
}

function addWorldClue(id, text) {
    if (state.worldClues.some((entry) => entry.id === id)) {
        return;
    }

    state.worldClues.push({ id, text });
    renderWorldClues();
}

function returnToPatientForFollowup() {
    const blockReason = getFollowupBlockReason();
    if (blockReason || state.isBackWithPatient) {
        renderFollowups();
        renderDebug();
        return;
    }

    state.isBackWithPatient = true;
    state.patienceRemaining = Math.max(0, state.patienceRemaining - 1);
    appendStoryLine('> "I will come back in a second. I have more questions."', "system-line");

    if (state.patienceRemaining <= 0) {
        appendStoryLine(`Vera looks exhausted. "Make this the last of it."`, "story-line");
    } else {
        appendStoryLine(
            "You return to the bedside with a narrower line of questioning in mind.",
            "note-line",
        );
    }

    renderPatientSummary();
    renderFollowups();
    renderDebug();
}

function buildBranchBlock(branch, returnTarget) {
    const lines = [];
    const branchVar = `asked_${slugify(branch.id)}`;
    const choiceCondition = branch.once === false ? "" : `{not ${branchVar}} `;

    lines.push(`* ${choiceCondition}[${branch.label}]`);

    if (branch.once !== false) {
        lines.push(`    ~ ${branchVar} = true`);
    }

    if (branch.kind !== "opening") {
        lines.push("    ~ broad_questions_asked = broad_questions_asked + 1");
    }

    if (typeof branch.trustDelta === "number" && branch.trustDelta !== 0) {
        const operator = branch.trustDelta > 0 ? "+" : "-";
        lines.push(`    ~ trust = trust ${operator} ${Math.abs(branch.trustDelta)}`);
    }

    (branch.lines || []).forEach((line) => {
        lines.push(`    ${line}`);
    });

    (branch.reveals || []).forEach((reveal) => {
        lines.push(
            `    ~ reveal_clue(${inkString(reveal.symptom)}, ${inkString(reveal.strength)}, ${inkString(reveal.note)})`,
        );
    });

    (branch.worldClues || []).forEach((entry) => {
        lines.push(`    ~ note_world_clue(${inkString(entry.id)}, ${inkString(entry.text)})`);
    });

    if (branch.unlockNotebook) {
        lines.push("    ~ interview_complete = true");
        lines.push("    ~ unlock_notebook()");
    }

    lines.push(`    -> ${returnTarget}`);

    return lines.join("\n");
}

function buildInkSource(caseData) {
    const openingBranches = caseData.broadQuestions.filter((branch) => branch.kind === "opening");
    const interviewBranches = caseData.broadQuestions.filter((branch) => branch.kind !== "opening");

    const lines = [
        "VAR trust = 0",
        "VAR broad_questions_asked = 0",
        "VAR interview_complete = false",
        "",
        ...caseData.broadQuestions
            .filter((branch) => branch.once !== false)
            .map((branch) => `VAR asked_${slugify(branch.id)} = false`),
        "",
        "EXTERNAL reveal_clue(symptom_label, strength, note)",
        "EXTERNAL note_world_clue(clue_id, text)",
        "EXTERNAL unlock_notebook()",
        "",
        "-> start",
        "",
        "=== start ===",
        `${caseData.patient.opener}`,
        ...openingBranches.map((branch) => buildBranchBlock(branch, "interview_hub")),
        "",
        "=== interview_hub ===",
        "{ trust > 0:",
        "    Vera answers a little more openly now.",
        "- else:",
        "    Vera stays guarded and watches your face between answers.",
        "}",
        "",
        ...interviewBranches.map((branch) =>
            buildBranchBlock(branch, branch.unlockNotebook ? "END" : "interview_hub"),
        ),
        "",
        ...caseData.followups.flatMap((followup) => {
            const knotName = `followup_${slugify(followup.symptom)}`;

            return [
                `=== ${knotName} ===`,
                ...(followup.lines || []),
                ...(followup.reveals || []).map(
                    (reveal) =>
                        `~ reveal_clue(${inkString(reveal.symptom)}, ${inkString(reveal.strength)}, ${inkString(
                            reveal.note,
                        )})`,
                ),
                "-> END",
                "",
            ];
        }),
    ];

    return lines.join("\n");
}

function bindExternalFunctions() {
    state.story.BindExternalFunction("reveal_clue", (symptomLabel, strength, note) => {
        revealClue(symptomLabel, strength, note);
    });

    state.story.BindExternalFunction("note_world_clue", (id, text) => {
        addWorldClue(id, text);
    });

    state.story.BindExternalFunction("unlock_notebook", () => {
        state.notebookUnlocked = true;
        renderFollowups();
        renderDebug();
    });
}

function continueStory() {
    if (!state.story) return;

    while (state.story.canContinue) {
        const text = state.story.Continue().trim();
        const tags = Array.isArray(state.story.currentTags) ? state.story.currentTags : [];

        if (text) {
            appendStoryLine(text);
        }

        tags.forEach((tag) => {
            appendStoryLine(`# ${tag}`, "note-line");
        });
    }

    renderChoices();
    renderDebug();
}

function askFollowup(symptomLabel) {
    if (!state.story || !state.isBackWithPatient) {
        return;
    }

    const followup = VERA_CASE.followups.find((entry) => entry.symptom === symptomLabel);
    if (!followup || state.askedFollowups.has(symptomLabel)) {
        return;
    }

    state.askedFollowups.add(symptomLabel);
    appendStoryLine(`> ${followup.label}`, "system-line");
    state.story.ChoosePathString(`followup_${slugify(symptomLabel)}`);
    continueStory();
    state.isBackWithPatient = false;
    appendStoryLine(
        "You step away to the notebook again and sort through what that answer changes.",
        "note-line",
    );
    renderPatientSummary();
    renderFollowups();
}

function compileStory() {
    resetOutputs();
    renderPatientSummary();
    renderClues();
    renderWorldClues();
    renderSymptomChecklist();
    renderDiagnoses();
    renderFollowups();

    state.compiledInkSource = buildInkSource(VERA_CASE);
    elements.inkSourceOutput.textContent = state.compiledInkSource;

    try {
        const compiler = new inkjs.Compiler(state.compiledInkSource);
        state.story = compiler.Compile();
        bindExternalFunctions();
        continueStory();
    } catch (error) {
        state.story = null;
        appendStoryLine(error && error.stack ? error.stack : String(error), "system-line");
        renderChoices();
        renderDebug();
    }
}

elements.restartButton.addEventListener("click", compileStory);
elements.returnToPatientButton.addEventListener("click", returnToPatientForFollowup);

compileStory();
