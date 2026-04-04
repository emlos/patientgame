import { diagnoses, getSymptomDefinition } from "../data.js";
import { VERA_INTERVIEW } from "./interviews/vera-interview.js";

//TODO move to local datajs
const FACT_STATE_ORDER = Object.freeze({
    blocked: -1,
    hidden: 0,
    hinted: 1,
    confirmed: 2,
    exhausted: 3,
});

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
};

const state = createInitialState(VERA_INTERVIEW);

function createInitialState(interview) {
    const factStates = {};
    const factDetailStage = {};

    interview.facts.forEach((fact) => {
        factStates[fact.id] = "hidden";
        factDetailStage[fact.id] = 0;
    });

    return {
        phase: "opening",
        trust: interview.startingTrust || 0,
        patience: interview.startingPatience || 5,
        askedQuestionIds: [],
        askedQuestionCounts: {},
        askedFollowupFactIds: [],
        channelPressure: {
            general: 0,
            head: 0,
            stomach: 0,
            skin: 0,
            work: 0,
            home: 0,
            function: 0,
            habits: 0,
        },
        factStates,
        factDetailStage,
        selectedSymptoms: new Set(),
        activeFollowupSymptoms: [],
        notebookUnlocked: false,
        isBackWithPatient: false,
        openingQuestionId: null,
        lastQuestionId: null,
    };
}

function resetState(interview) {
    const fresh = createInitialState(interview);
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, fresh);
}

function slugify(value) {
    return String(value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
}

function appendStoryLine(text, className = "story-line") {
    const line = document.createElement("div");
    line.className = className;
    line.textContent = text;
    elements.storyOutput.appendChild(line);
    elements.storyOutput.scrollTop = elements.storyOutput.scrollHeight;
}

function getPersonality() {
    return VERA_INTERVIEW.personalities[VERA_INTERVIEW.personalityId];
}

function getFactById(factId) {
    return VERA_INTERVIEW.facts.find((fact) => fact.id === factId) || null;
}

function getFactBySymptom(symptomLabel) {
    return (
        VERA_INTERVIEW.facts.find((fact) => fact.symptomId === symptomLabel && fact.followup) ||
        null
    );
}

function getQuestionById(questionId) {
    return VERA_INTERVIEW.questions[questionId] || null;
}

function getSymptomMeta(symptomLabel) {
    const definition = getSymptomDefinition(symptomLabel);

    return {
        label: definition?.label || symptomLabel,
        tooltip: definition?.tooltip || "No tooltip text found.",
        id: slugify(definition?.label || symptomLabel),
    };
}

function getStateOrder(stateName) {
    return FACT_STATE_ORDER[stateName] ?? -99;
}

function factAtLeast(factId, minimumState) {
    return getStateOrder(state.factStates[factId]) >= getStateOrder(minimumState);
}

function setFactAtLeast(factId, minimumState) {
    if (factAtLeast(factId, minimumState)) {
        return false;
    }

    state.factStates[factId] = minimumState;
    return true;
}

function getQuestionResponseLines(question) {
    if (!question.responseLines) {
        return [];
    }

    if (Array.isArray(question.responseLines)) {
        return question.responseLines;
    }

    const personalityId = VERA_INTERVIEW.personalityId;
    return question.responseLines[personalityId] || question.responseLines.default || [];
}

function getFactResponseLines(fact, stateName) {
    const personalityId = VERA_INTERVIEW.personalityId;
    const linesForState = fact.responses?.[stateName];
    if (!linesForState) {
        return [];
    }

    return linesForState[personalityId] || linesForState.default || [];
}

function getFollowupResponseLines(fact) {
    const personalityId = VERA_INTERVIEW.personalityId;
    return fact.followup?.responses?.[personalityId] || fact.followup?.responses?.default || [];
}

function checkThreshold(threshold = {}, fact) {
    const personality = getPersonality();
    const trustMod =
        threshold === fact.thresholds?.hinted
            ? personality.thresholdMods?.hintTrust || 0
            : personality.thresholdMods?.confirmTrust || 0;
    const neededTrust = Number(threshold.trustAtLeast || 0) + trustMod;

    if (state.trust < neededTrust) {
        return false;
    }

    const pressure = threshold.channelPressure || {};
    return Object.entries(pressure).every(([channel, minimum]) => {
        return Number(state.channelPressure[channel] || 0) >= Number(minimum || 0);
    });
}

function getTargetFactState(fact) {
    const current = state.factStates[fact.id];

    if (current === "blocked" || current === "exhausted") {
        return null;
    }

    if (current === "hidden" && checkThreshold(fact.thresholds?.hinted, fact)) {
        return "hinted";
    }

    if (
        (current === "hinted" || current === "hidden") &&
        checkThreshold(fact.thresholds?.confirmed, fact)
    ) {
        return "confirmed";
    }

    return null;
}

function applyQuestionTone(question) {
    const personality = getPersonality();
    const affinity = Number(personality.toneAffinity?.[question.tone] || 0);

    state.trust += affinity;

    if (affinity < 0) {
        state.patience = Math.max(
            0,
            state.patience - Number(personality.dislikedTonePatiencePenalty || 0),
        );
    }

    const count = Number(state.askedQuestionCounts[question.id] || 0);
    if (count > 1) {
        state.patience = Math.max(
            0,
            state.patience - Number(personality.repeatPatiencePenalty || 0),
        );
    }
}

function applyQuestionEffects(question) {
    state.lastQuestionId = question.id;
    state.askedQuestionIds.push(question.id);
    state.askedQuestionCounts[question.id] = (state.askedQuestionCounts[question.id] || 0) + 1;

    if (state.phase === "opening") {
        state.openingQuestionId = question.id;
    }

    (question.channels || []).forEach((channel) => {
        state.channelPressure[channel] = Number(state.channelPressure[channel] || 0) + 1;
    });

    applyQuestionTone(question);

    (question.factEffects || []).forEach((effect) => {
        if (effect?.factId && effect?.setAtLeast) {
            setFactAtLeast(effect.factId, effect.setAtLeast);
        }
    });

    if (question.nextPhase) {
        state.phase = question.nextPhase;
    }

    if (question.unlockNotebook) {
        state.notebookUnlocked = true;
        blockHiddenFacts();
    }
}

function blockHiddenFacts() {
    VERA_INTERVIEW.facts.forEach((fact) => {
        if (state.factStates[fact.id] === "hidden") {
            state.factStates[fact.id] = "blocked";
        }
    });
}

function surfaceFactForQuestion(question) {
    const questionChannels = question.channels || [];
    const candidates = VERA_INTERVIEW.facts
        .map((fact) => {
            const targetState = getTargetFactState(fact);
            if (!targetState) {
                return null;
            }

            const overlap = questionChannels.filter((channel) =>
                (fact.channels || []).includes(channel),
            );
            if (!overlap.length) {
                return null;
            }

            const specificOverlapCount = overlap.filter((channel) => channel !== "general").length;

            return {
                fact,
                targetState,
                score: Number(fact.priority || 0) + specificOverlapCount * 40 + overlap.length * 10,
            };
        })
        .filter(Boolean)
        .sort((left, right) => right.score - left.score);

    if (!candidates.length) {
        return [];
    }

    const lines = [];
    const chosen = [candidates[0]];

    if (questionChannels.includes("general")) {
        const incidental = candidates.find((candidate, index) => {
            if (index === 0) {
                return false;
            }
            return candidate.targetState === "hinted" && candidate.fact.type === "symptom";
        });

        if (incidental) {
            chosen.push(incidental);
        }
    }

    chosen.forEach((entry) => {
        state.factStates[entry.fact.id] = entry.targetState;
        state.factDetailStage[entry.fact.id] =
            Number(state.factDetailStage[entry.fact.id] || 0) + 1;
        lines.push(...getFactResponseLines(entry.fact, entry.targetState));
    });

    return lines;
}

function getRelevantExhaustedResponse(question) {
    const relevantFacts = VERA_INTERVIEW.facts
        .filter((fact) => {
            return (question.channels || []).some((channel) =>
                (fact.channels || []).includes(channel),
            );
        })
        .filter((fact) => factAtLeast(fact.id, "hinted"))
        .sort((left, right) => right.priority - left.priority);

    const relevant = relevantFacts[0];
    if (!relevant) {
        return "Vera gives only a small, guarded shrug.";
    }

    const personalityId = VERA_INTERVIEW.personalityId;
    state.patience = Math.max(
        0,
        state.patience - Number(getPersonality().repeatPatiencePenalty || 0),
    );
    return (
        relevant.exhaustedResponses?.[personalityId] ||
        relevant.exhaustedResponses?.default ||
        "Vera makes it plain that she has already answered that."
    );
}

function evaluateRule(rule) {
    if (!rule) {
        return true;
    }

    switch (rule.type) {
        case "phase_is":
            return state.phase === rule.value;
        case "question_asked":
            return state.askedQuestionIds.includes(rule.questionId);
        case "fact_at_least":
            return factAtLeast(rule.factId, rule.state);
        case "any":
            return (rule.rules || []).some((child) => evaluateRule(child));
        case "all":
            return (rule.rules || []).every((child) => evaluateRule(child));
        default:
            return true;
    }
}

function isQuestionVisible(question) {
    if (!question) {
        return false;
    }

    if (question.once !== false && state.askedQuestionIds.includes(question.id)) {
        return false;
    }

    const rules = question.visibleWhen || [];
    return rules.every((rule) => evaluateRule(rule));
}

function getVisibleQuestions() {
    return VERA_INTERVIEW.questionOrder
        .map((questionId) => getQuestionById(questionId))
        .filter((question) => isQuestionVisible(question));
}

function renderPatientSummary() {
    const patient = VERA_INTERVIEW.patient;
    const personality = getPersonality();
    elements.patientSummary.textContent = [
        `${patient.name}, ${patient.age}`,
        `${patient.occupation}, ${patient.residence}`,
        `personality: ${personality.label}`,
        `approach: ${personality.primerText}`,
        `trust: ${state.trust}`,
        `patience remaining: ${state.patience}/${VERA_INTERVIEW.startingPatience}`,
        `true diagnosis for this prototype: ${patient.trueDiagnosis}`,
        `opening complaint: ${patient.opener}`,
    ].join("\n");
}

function renderChoices() {
    elements.choiceList.innerHTML = "";

    const visibleQuestions = getVisibleQuestions();
    if (!visibleQuestions.length) {
        const note = document.createElement("div");
        note.className = "muted";
        note.textContent = state.notebookUnlocked
            ? "First pass concluded. Use the notebook and follow-up controls on the right."
            : "No questions are available right now.";
        elements.choiceList.appendChild(note);
        return;
    }

    visibleQuestions.forEach((question) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = question.label;
        button.disabled = state.phase !== question.phase;
        button.addEventListener("click", () => askQuestion(question.id));
        elements.choiceList.appendChild(button);
    });
}

function askQuestion(questionId) {
    const question = getQuestionById(questionId);
    if (!question || !isQuestionVisible(question)) {
        return;
    }

    appendStoryLine(`> ${question.label}`, "system-line");
    applyQuestionEffects(question);

    const responseLines = [
        ...getQuestionResponseLines(question),
        ...surfaceFactForQuestion(question),
    ];

    if (!responseLines.length) {
        responseLines.push(getRelevantExhaustedResponse(question));
    }

    responseLines.forEach((line) => appendStoryLine(line));

    if (state.notebookUnlocked) {
        renderFollowups();
    }

    renderPatientSummary();
    renderChoices();
    renderDebug();
}

function getNotebookSymptoms() {
    return VERA_INTERVIEW.notebookSymptoms.map((symptomLabel) => getSymptomMeta(symptomLabel));
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
        elements.symptomChecklist.append(label);
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

function getMaxFollowupSymptomsSelected() {
    return Number(VERA_INTERVIEW.maxFollowupSymptomsSelected || 4);
}

function getAskableSelectedFacts() {
    const selectedSymptoms = state.isBackWithPatient
        ? state.activeFollowupSymptoms
        : Array.from(state.selectedSymptoms);

    return selectedSymptoms
        .map((symptomLabel) => getFactBySymptom(symptomLabel))
        .filter(Boolean)
        .filter((fact) => fact.followup)
        .filter((fact) => factAtLeast(fact.id, "hinted"))
        .filter((fact) => !state.askedFollowupFactIds.includes(fact.id));
}

function getBlockedSelectedSymptoms() {
    const selectedSymptoms = state.isBackWithPatient
        ? state.activeFollowupSymptoms
        : Array.from(state.selectedSymptoms);

    return selectedSymptoms.filter((symptomLabel) => {
        const fact = getFactBySymptom(symptomLabel);
        if (!fact || !fact.followup) {
            return true;
        }
        return !factAtLeast(fact.id, "hinted");
    });
}

function getFollowupBlockReason() {
    if (!state.notebookUnlocked) {
        return "Conclude the first pass to unlock targeted follow-ups.";
    }

    if (state.patience <= 0) {
        return state.isBackWithPatient
            ? "She has no patience left for this pass."
            : "She has run out of patience and will not answer more targeted questions.";
    }

    if (!state.isBackWithPatient && !state.selectedSymptoms.size) {
        return "Select one or more notebook symptoms before returning to the patient.";
    }

    if (
        !state.isBackWithPatient &&
        state.selectedSymptoms.size > getMaxFollowupSymptomsSelected()
    ) {
        return `Too many symptoms are selected. Narrow it down to ${getMaxFollowupSymptomsSelected()} or fewer before going back.`;
    }

    if (!state.isBackWithPatient && !getAskableSelectedFacts().length) {
        return "You do not have an opening for any of the selected symptoms.";
    }

    if (state.isBackWithPatient && !getAskableSelectedFacts().length) {
        return "You have asked everything you had an opening to ask in this pass.";
    }

    return "";
}

function renderFollowups() {
    elements.followupStatus.innerHTML = "";
    elements.followupList.innerHTML = "";

    const blockReason = getFollowupBlockReason();
    const blockedSelected = getBlockedSelectedSymptoms();
    const askableFacts = getAskableSelectedFacts();

    const status = document.createElement("div");
    status.className = `followup-status ${state.patience <= 1 ? "status-danger" : ""}`.trim();

    if (!state.notebookUnlocked) {
        status.textContent = blockReason;
        elements.followupStatus.appendChild(status);
        elements.returnToPatientButton.disabled = true;
        return;
    }

    if (state.isBackWithPatient) {
        status.textContent =
            blockReason ||
            `You are back with Vera. Remaining patience: ${state.patience}/${VERA_INTERVIEW.startingPatience}.`;
    } else {
        status.textContent = `Patience remaining: ${state.patience}/${VERA_INTERVIEW.startingPatience}. Returning for another pass costs 1 patience.`;
    }
    elements.followupStatus.appendChild(status);

    if (blockedSelected.length) {
        const note = document.createElement("div");
        note.className = "note-line";
        note.textContent = `No opening: ${blockedSelected.join(", ")}.`;
        elements.followupStatus.appendChild(note);
    }

    elements.returnToPatientButton.disabled = Boolean(blockReason) || state.isBackWithPatient;

    if (!state.isBackWithPatient) {
        const note = document.createElement("div");
        note.className = "muted";
        note.textContent =
            blockReason ||
            "Return once, then ask about every selected symptom you currently have an opening for.";
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

    askableFacts.forEach((fact) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = fact.followup.label;
        button.addEventListener("click", () => askFollowup(fact.id));
        elements.followupList.appendChild(button);
    });
}

function applyFollowupPatience(fact) {
    const cost = Number(fact.followup?.patienceCost || 0);
    if (cost > 0) {
        state.patience = Math.max(0, state.patience - cost);
    }

    if (fact.followup?.patienceLine) {
        appendStoryLine(fact.followup.patienceLine, "note-line");
    }
}

function askFollowup(factId) {
    const fact = getFactById(factId);
    if (!fact || !fact.followup || !state.isBackWithPatient) {
        return;
    }

    if (!factAtLeast(fact.id, "hinted")) {
        return;
    }

    if (state.askedFollowupFactIds.includes(fact.id) || state.patience <= 0) {
        return;
    }

    appendStoryLine(`> ${fact.followup.label}`, "system-line");
    getFollowupResponseLines(fact).forEach((line) => appendStoryLine(line));
    applyFollowupPatience(fact);

    state.askedFollowupFactIds.push(fact.id);
    if (factAtLeast(fact.id, "hinted") && !factAtLeast(fact.id, "confirmed")) {
        state.factStates[fact.id] = "confirmed";
    }

    if (state.patience <= 0 && getAskableSelectedFacts().length) {
        appendStoryLine(VERA_INTERVIEW.outOfPatienceLine, "story-line");
        finishFollowupPass();
        return;
    }

    renderPatientSummary();
    renderFollowups();
    renderDebug();

    if (!getAskableSelectedFacts().length) {
        finishFollowupPass();
    }
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
    state.patience = Math.max(0, state.patience - 1);

    appendStoryLine('> "I will come back in a second. I have more questions."', "system-line");
    appendStoryLine(
        state.patience <= 0
            ? VERA_INTERVIEW.finalPatienceWarning
            : VERA_INTERVIEW.followupReturnLine,
        state.patience <= 0 ? "story-line" : "note-line",
    );

    renderPatientSummary();
    renderSymptomChecklist();
    renderFollowups();
    renderDebug();
}

function finishFollowupPass() {
    state.isBackWithPatient = false;
    state.activeFollowupSymptoms = [];
    appendStoryLine(VERA_INTERVIEW.notebookReturnLine, "note-line");
    renderPatientSummary();
    renderSymptomChecklist();
    renderFollowups();
    renderDebug();
}

function renderDebug() {
    const factSnapshot = VERA_INTERVIEW.facts.map((fact) => {
        return `${fact.id}: ${state.factStates[fact.id]}`;
    });

    elements.debugOutput.textContent = [
        `phase: ${JSON.stringify(state.phase)}`,
        `trust: ${JSON.stringify(state.trust)}`,
        `patience: ${JSON.stringify(state.patience)}`,
        `openingQuestionId: ${JSON.stringify(state.openingQuestionId)}`,
        `askedQuestionIds: ${JSON.stringify(state.askedQuestionIds)}`,
        `askedFollowupFactIds: ${JSON.stringify(state.askedFollowupFactIds)}`,
        `selectedSymptoms: ${JSON.stringify(Array.from(state.selectedSymptoms))}`,
        `activeFollowupSymptoms: ${JSON.stringify(state.activeFollowupSymptoms)}`,
        `channelPressure: ${JSON.stringify(state.channelPressure)}`,
        ...factSnapshot,
    ].join("\n");
}

function renderStaticIntro() {
    appendStoryLine(`Approach note: ${getPersonality().primerText}`, "note-line");
    appendStoryLine(VERA_INTERVIEW.patient.opener);
}

function restart() {
    resetState(VERA_INTERVIEW);
    elements.storyOutput.innerHTML = "";
    elements.choiceList.innerHTML = "";
    renderStaticIntro();
    renderPatientSummary();
    renderSymptomChecklist();
    renderDiagnoses();
    renderChoices();
    renderFollowups();
    renderDebug();
}

elements.restartButton.addEventListener("click", restart);
elements.returnToPatientButton.addEventListener("click", returnToPatientForFollowup);

restart();
