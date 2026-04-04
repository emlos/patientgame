import { diagnoses, getSymptomDefinition } from "../data.js";
import { VERA_CASE } from "./vera-case.js";

const elements = {
    patientSummary: document.getElementById("patientSummary"),
    restartButton: document.getElementById("restartButton"),
    storyOutput: document.getElementById("storyOutput"),
    choiceList: document.getElementById("choiceList"),
    symptomChecklist: document.getElementById("symptomChecklist"),
    diagnosisList: document.getElementById("diagnosisList"),
    returnToPatientButton: document.getElementById("returnToPatientButton"),
    followupStatus: document.getElementById("followupStatus"),
    followupList: document.getElementById("followupList"),
    debugOutput: document.getElementById("debugOutput"),
    inkSourceOutput: document.getElementById("inkSourceOutput"),
};

const watchedVariables = ["trust", "broad_questions_asked", "interview_complete"];
const defaultPatience = 6;
const defaultMaxFollowupSymptomsSelected = 4;

const state = {
    story: null,
    compiledInkSource: "",
    selectedSymptoms: new Set(),
    activeFollowupSymptoms: [],
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
    state.selectedSymptoms.clear();
    state.activeFollowupSymptoms = [];
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
        `approach: ${VERA_CASE.personalityPrimer}`,
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

function getNotebookSymptoms() {
    return (VERA_CASE.notebookSymptoms || VERA_CASE.followups.map((entry) => entry.symptom)).map(
        (symptomLabel) => getSymptomMeta(symptomLabel),
    );
}

function renderSymptomChecklist() {
    elements.symptomChecklist.innerHTML = "";

    getNotebookSymptoms().forEach((entry) => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = state.selectedSymptoms.has(entry.label);
        checkbox.disabled = state.isBackWithPatient;
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
        text.textContent = entry.label;
        label.title = entry.tooltip;
        label.append(checkbox, text);
        elements.symptomChecklist.appendChild(label);
    });
}

function renderDiagnoses() {
    const selectedLabels = Array.from(state.selectedSymptoms);

    if (!selectedLabels.length) {
        elements.diagnosisList.textContent =
            "Select one or more notebook symptoms to test the case against the diagnosis list.";
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
    const activeSymptoms = state.isBackWithPatient
        ? state.activeFollowupSymptoms
        : Array.from(state.selectedSymptoms);

    return VERA_CASE.followups.filter((followup) => {
        return activeSymptoms.includes(followup.symptom) && !state.askedFollowups.has(followup.symptom);
    });
}

function getFollowupBlockReason() {
    if (!state.notebookUnlocked) {
        return "Conclude the broad interview first to unlock targeted follow-ups.";
    }

    if (state.patienceRemaining <= 0 && !state.isBackWithPatient) {
        return "She has run out of patience and will not answer more targeted questions.";
    }

    if (!getSelectedSymptomCount() && !state.isBackWithPatient) {
        return "Select one or more symptoms in the notebook before returning to the patient.";
    }

    const maxSelected = getMaxFollowupSymptomsSelected();
    if (!state.isBackWithPatient && getSelectedSymptomCount() > maxSelected) {
        return `Too many symptoms are selected. Narrow it down to ${maxSelected} or fewer before going back.`;
    }

    if (state.isBackWithPatient && !getAvailableFollowups().length) {
        return "You have asked everything you brought back for this pass.";
    }

    if (!state.isBackWithPatient && !getAvailableFollowups().length) {
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
        const selectedText = state.activeFollowupSymptoms.length
            ? ` Current pass: ${state.activeFollowupSymptoms.join(", ")}.`
            : "";
        status.textContent =
            state.patienceRemaining > 0
                ? `You are back with Vera. Ask what you brought back to ask. Remaining patience: ${state.patienceRemaining}/${state.patienceMax}.${selectedText}`
                : blockReason;
    } else {
        status.textContent = `Patience remaining: ${state.patienceRemaining}/${state.patienceMax}. Returning for another pass costs 1 patience.`;
    }

    elements.followupStatus.appendChild(status);

    const canReturn = !blockReason && !state.isBackWithPatient;
    elements.returnToPatientButton.disabled = !canReturn;

    if (!state.isBackWithPatient) {
        const note = document.createElement("div");
        note.className = "muted";
        note.textContent = blockReason || "Return once, then ask about every symptom you selected in that pass.";
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
        `activeFollowupSymptoms: ${JSON.stringify(state.activeFollowupSymptoms)}`,
        `askedFollowups: ${JSON.stringify(Array.from(state.askedFollowups))}`,
    ];

    elements.debugOutput.textContent = [...variableSnapshot, ...extraSnapshot].join("\n");
}

function returnToPatientForFollowup() {
    const blockReason = getFollowupBlockReason();
    if (blockReason || state.isBackWithPatient) {
        renderFollowups();
        renderDebug();
        return;
    }

    state.isBackWithPatient = true;
    state.activeFollowupSymptoms = Array.from(state.selectedSymptoms);
    state.patienceRemaining = Math.max(0, state.patienceRemaining - 1);
    appendStoryLine('> "I will come back in a second. I have more questions."', "system-line");

    if (state.patienceRemaining <= 0) {
        appendStoryLine(
            VERA_CASE.finalPatienceWarning || `The patient looks exhausted. "Make this the last of it."`,
            "story-line",
        );
    } else {
        appendStoryLine(
            VERA_CASE.followupReturnLine ||
                "You return to the bedside with a narrower line of questioning in mind.",
            "note-line",
        );
    }

    renderPatientSummary();
    renderSymptomChecklist();
    renderFollowups();
    renderDebug();
}

function finishFollowupPass() {
    state.isBackWithPatient = false;
    state.activeFollowupSymptoms = [];
    appendStoryLine(
        VERA_CASE.notebookReturnLine ||
            "You step away to the notebook again and sort through what that answer changes.",
        "note-line",
    );
    renderPatientSummary();
    renderSymptomChecklist();
    renderFollowups();
    renderDebug();
}

function applyFollowupPatience(followup) {
    const cost = Number(followup.patienceCost) || 0;
    if (cost <= 0) {
        return;
    }

    state.patienceRemaining = Math.max(0, state.patienceRemaining - cost);
    if (followup.patienceLine) {
        appendStoryLine(followup.patienceLine, "note-line");
    }
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
        `    ${caseData.trustOpenLine || "The patient answers a little more openly now."}`,
        "- else:",
        `    ${caseData.trustClosedLine || "The patient stays guarded and watches your face between answers."}`,
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
                "-> END",
                "",
            ];
        }),
    ];

    return lines.join("\n");
}

function bindExternalFunctions() {
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
    if (!state.story || !state.isBackWithPatient || state.patienceRemaining <= 0) {
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
    applyFollowupPatience(followup);

    if (state.patienceRemaining <= 0 && getAvailableFollowups().length) {
        appendStoryLine(
            VERA_CASE.outOfPatienceLine ||
                'Vera presses her lips together. "No more. I have said enough for one sitting."',
            "story-line",
        );
        finishFollowupPass();
        return;
    }

    renderPatientSummary();
    renderSymptomChecklist();
    renderFollowups();
    renderDebug();

    if (!getAvailableFollowups().length) {
        finishFollowupPass();
    }
}

function compileStory() {
    resetOutputs();
    renderPatientSummary();
    renderSymptomChecklist();
    renderDiagnoses();
    renderFollowups();

    if (VERA_CASE.personalityPrimer) {
        appendStoryLine(`Approach note: ${VERA_CASE.personalityPrimer}`, "note-line");
    }

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
