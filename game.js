import {
    APPENDABLE_LINE_FIELDS,
    EXTRA_LINE_COUNT,
    INLINE_GAP_MIN,
    INLINE_GAP_MAX,
    INITIAL_PATIENT_COUNT,
    diagnoses,
    getSymptomDefinition,
    symptomGroups,
    symptomImageVariants,
} from "./data.js";
import {
    createGameSeed,
    createInitialPatients,
    createRandomPatient,
    createSeededRandom,
    hashString,
    getRandomInt,
} from "./patient.js";

const symptomGroupBySymptom = new Map(
    symptomGroups.flatMap((group) => group.symptoms.map((symptom) => [symptom, group.id])),
);

const patients = createInitialPatients(INITIAL_PATIENT_COUNT);
const gameSeed = createGameSeed(patients);

const state = {
    diagnosisDetailName: "",
    currentPatientId: patients[0].id,
    showAllPatients: false,
    patients: patients.map(initializePatientRecord),
};

const elements = {
    patientTabs: document.getElementById("patientTabs"),
    allPatientsTab: document.getElementById("allPatientsTab"),
    patientPhoto: document.getElementById("patientPhoto"),
    fieldName: document.getElementById("fieldName"),
    fieldAge: document.getElementById("fieldAge"),
    fieldMarital: document.getElementById("fieldMarital"),
    fieldOccupation: document.getElementById("fieldOccupation"),
    fieldAdmission: document.getElementById("fieldAdmission"),
    fieldResidence: document.getElementById("fieldResidence"),
    fieldHarmfulHabits: document.getElementById("fieldHarmfulHabits"),
    fieldClinicalPicture: document.getElementById("fieldClinicalPicture"),
    fieldDiagnosis: document.getElementById("fieldDiagnosis"),
    harmfulHabitsLines: document.getElementById("harmfulHabitsLines"),
    clinicalPictureLines: document.getElementById("clinicalPictureLines"),
    symptomsScroll: document.getElementById("symptomsScroll"),
    diagnosesScroll: document.getElementById("diagnosesScroll"),
    diagnosisLockButton: document.querySelector(".diagnosis-lock-button"),
    diagnosesPanelInner: document.querySelector(".diagnoses-panel-inner"),
    rightPage: document.querySelector(".right-page"),
    stamp: document.querySelector(".stamp"),
    diagnosisDetailModal: document.getElementById("diagnosisDetailModal"),
    diagnosisDetailCards: document.getElementById("diagnosisDetailCards"),
    diagnosisDetailTitle: document.getElementById("diagnosisDetailTitle"),
    diagnosisDetailGroups: document.getElementById("diagnosisDetailGroups"),
    diagnosisDetailText: document.getElementById("diagnosisDetailText"),
};

const SYMPTOM_TOOLTIP_DELAY_MS = 500;

const tooltipState = {
    group: {
        activeAnchor: null,
        element: null,
        showTimer: null,
        className: "floating-symptom-tooltip floating-symptom-tooltip--group",
    },
    symptom: {
        activeAnchor: null,
        element: null,
        showTimer: null,
        className: "floating-symptom-tooltip floating-symptom-tooltip--symptom",
    },
};

function escapeAttribute(value) {
    return String(value).replace(/"/g, "&quot;");
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function clearFloatingTooltipTimer(state) {
    if (!state?.showTimer) return;

    clearTimeout(state.showTimer);
    state.showTimer = null;
}

function hideFloatingSymptomTooltip(state) {
    if (!state) return;

    clearFloatingTooltipTimer(state);
    state.activeAnchor = null;

    if (!state.element) return;

    state.element.classList.remove("visible");
    state.element.style.left = "";
    state.element.style.top = "";
}

function getFloatingSymptomTooltip(state) {
    if (state.element) return state.element;

    const tooltip = document.createElement("div");
    tooltip.className = state.className;
    tooltip.setAttribute("role", "tooltip");
    tooltip.innerHTML = `
      <div class="symptom-tooltip-title"></div>
      <div class="symptom-tooltip-body"></div>
    `;

    elements.rightPage.appendChild(tooltip);
    state.element = tooltip;
    return tooltip;
}

function pxToVw(px) {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1;
    return `${(px / viewportWidth) * 100}vw`;
}

function positionFloatingSymptomTooltip(state, anchor) {
    if (!state || !anchor || !elements.rightPage) return;

    const title = anchor.dataset.tooltipTitle || "";
    const body = anchor.dataset.tooltipBody || "";
    if (!title && !body) {
        hideFloatingSymptomTooltip(state);
        return;
    }

    const tooltip = getFloatingSymptomTooltip(state);

    tooltip.querySelector(".symptom-tooltip-title").textContent = title;
    tooltip.querySelector(".symptom-tooltip-body").textContent = body;

    tooltip.classList.add("visible");
    tooltip.style.visibility = "hidden";

    const anchorRect = anchor.getBoundingClientRect();
    const pageRect = elements.rightPage.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const gap = (window.innerWidth) * 0.010;
    const minTop = 8;
    const maxTop = Math.max(minTop, pageRect.height - tooltipRect.height - 8);

    const left = anchorRect.left - pageRect.left - tooltipRect.width - gap;
    const centeredTop =
        anchorRect.top - pageRect.top + anchorRect.height / 2 - tooltipRect.height / 2;
    const top = Math.min(Math.max(centeredTop, minTop), maxTop);

    tooltip.style.left = pxToVw(left);
    tooltip.style.top = pxToVw(top);
    tooltip.style.visibility = "visible";

    state.activeAnchor = anchor;
}

function scheduleFloatingSymptomTooltip(state, anchor, delay = 0) {
    if (!state || !anchor) return;

    clearFloatingTooltipTimer(state);

    if (!anchor.dataset.tooltipTitle && !anchor.dataset.tooltipBody) {
        hideFloatingSymptomTooltip(state);
        return;
    }

    if (delay <= 0) {
        positionFloatingSymptomTooltip(state, anchor);
        return;
    }

    state.showTimer = window.setTimeout(() => {
        positionFloatingSymptomTooltip(state, anchor);
        state.showTimer = null;
    }, delay);
}

function bindSymptomTooltips() {
    hideFloatingSymptomTooltip(tooltipState.group);
    hideFloatingSymptomTooltip(tooltipState.symptom);

    elements.symptomsScroll.querySelectorAll(".symptom-icon-wrap").forEach((iconWrap) => {
        const showTooltip = () => positionFloatingSymptomTooltip(tooltipState.group, iconWrap);
        const hideTooltip = () => hideFloatingSymptomTooltip(tooltipState.group);

        iconWrap.addEventListener("mouseenter", showTooltip);
        iconWrap.addEventListener("focus", showTooltip);
        iconWrap.addEventListener("mouseleave", hideTooltip);
        iconWrap.addEventListener("blur", hideTooltip);
    });

    elements.symptomsScroll.querySelectorAll(".symptom-item").forEach((item) => {
        const scheduleTooltip = () => {
            hideFloatingSymptomTooltip(tooltipState.symptom);
            scheduleFloatingSymptomTooltip(tooltipState.symptom, item, SYMPTOM_TOOLTIP_DELAY_MS);
        };
        const hideTooltip = () => hideFloatingSymptomTooltip(tooltipState.symptom);

        item.addEventListener("mouseenter", scheduleTooltip);
        item.addEventListener("mouseleave", hideTooltip);
        item.addEventListener("focusin", scheduleTooltip);
        item.addEventListener("focusout", hideTooltip);
    });
}

function buildTabs() {
    elements.patientTabs.innerHTML = "";

    state.patients.forEach((patient) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tab";
        button.textContent = patient.tabLabel;
        button.dataset.patientId = patient.id;
        button.addEventListener("click", () => {
            settlePatientStamp(getCurrentPatient());
            state.showAllPatients = false;
            state.currentPatientId = patient.id;
            render();
        });
        elements.patientTabs.appendChild(button);
    });

    elements.allPatientsTab.onclick = () => {
        settlePatientStamp(getCurrentPatient());
        state.showAllPatients = true;
        render();
    };
}

function getCurrentPatient() {
    return (
        state.patients.find((patient) => patient.id === state.currentPatientId) || state.patients[0]
    );
}

function getCombinedSymptoms() {
    const combined = new Set();
    state.patients.forEach((patient) => {
        patient.selectedSymptoms.forEach((symptom) => combined.add(symptom));
    });
    return combined;
}

function getDiagnosisByName(name) {
    return diagnoses.find((diagnosis) => diagnosis.name === name) || null;
}

function getDiagnosisSymptomSet(name) {
    const diagnosis = getDiagnosisByName(name);
    return new Set(diagnosis?.symptoms || []);
}

function clearStampTransition(patient) {
    if (!patient) return;
    patient.stampNextState = "";
    patient.stampNextAnimation = "";
}

function settlePatientStamp(patient) {
    if (!patient) return;

    if (patient.stampAnimation === "fade") {
        patient.stampState =
            patient.stampNextState || (patient.selectedDiagnosis ? "preliminary" : "hidden");
    }

    if (!patient.stampState) {
        patient.stampState = patient.selectedDiagnosis ? "preliminary" : "hidden";
    }

    patient.stampAnimation = "";
    clearStampTransition(patient);
}

function updatePatientDiagnosisSelection(patient, diagnosisName) {
    if (!patient || patient.diagnosisLocked) return false;

    const nextDiagnosisName = diagnosisName || "";
    const previousDiagnosisName = patient.selectedDiagnosis || "";

    if (previousDiagnosisName === nextDiagnosisName && patient.stampAnimation !== "fade") {
        return false;
    }

    patient.selectedDiagnosis = nextDiagnosisName;
    clearStampTransition(patient);

    if (!previousDiagnosisName && nextDiagnosisName) {
        patient.stampState = "preliminary";
        patient.stampAnimation = "appear";
        return true;
    }

    if (previousDiagnosisName && !nextDiagnosisName) {
        patient.stampState = "preliminary";
        patient.stampAnimation = "fade";
        patient.stampNextState = "hidden";
        return true;
    }

    if (previousDiagnosisName && nextDiagnosisName && previousDiagnosisName !== nextDiagnosisName) {
        patient.stampState = "preliminary";
        patient.stampAnimation = "fade";
        patient.stampNextState = "preliminary";
        patient.stampNextAnimation = "appear";
        return true;
    }

    if (!nextDiagnosisName) {
        patient.stampState = "hidden";
        patient.stampAnimation = "";
    }

    return true;
}

function lockPatientDiagnosis(patient) {
    if (!patient || patient.diagnosisLocked || !patient.selectedDiagnosis) return false;

    patient.diagnosisLocked = true;
    patient.stampState = "approved";
    patient.stampAnimation = "";
    clearStampTransition(patient);
    return true;
}

function renderStamp() {
    if (!elements.stamp) return;

    if (state.showAllPatients) {
        elements.stamp.className = "stamp";
        return;
    }

    const patient = getCurrentPatient();
    const stampClasses = ["stamp"];

    if (patient?.stampState === "preliminary") {
        stampClasses.push("preliminary");
    } else if (patient?.stampState === "approved") {
        stampClasses.push("approved");
    }

    if (patient?.stampAnimation === "appear") {
        stampClasses.push("appear");
    } else if (patient?.stampAnimation === "fade") {
        stampClasses.push("fade");
    }

    elements.stamp.className = stampClasses.join(" ");
}

function onStampAnimationEnd(event) {
    if (event.target !== elements.stamp || state.showAllPatients) return;

    const patient = getCurrentPatient();
    if (!patient) return;

    if (event.animationName === "stamp-appear" && patient.stampAnimation === "appear") {
        patient.stampAnimation = "";
        renderStamp();
        return;
    }

    if (event.animationName === "stamp-fade" && patient.stampAnimation === "fade") {
        const nextState =
            patient.stampNextState || (patient.selectedDiagnosis ? "preliminary" : "hidden");
        const nextAnimation = patient.stampNextAnimation || "";

        patient.stampState = nextState;
        patient.stampAnimation = nextAnimation;
        clearStampTransition(patient);

        renderStamp();
    }
}

function getAlphabeticalDiagnoses() {
    return [...diagnoses].sort((left, right) => left.name.localeCompare(right.name));
}

function getDiagnosisMatchCount(diagnosis, selectedSymptoms = new Set()) {
    if (!diagnosis || !selectedSymptoms?.size) return 0;

    return diagnosis.symptoms.reduce((count, symptom) => {
        return count + (selectedSymptoms.has(symptom) ? 1 : 0);
    }, 0);
}

function getSymptomSortedDiagnoses(selectedSymptoms = new Set()) {
    if (!selectedSymptoms?.size) {
        return getAlphabeticalDiagnoses();
    }

    return [...diagnoses].sort((left, right) => {
        const matchDifference =
            getDiagnosisMatchCount(right, selectedSymptoms) -
            getDiagnosisMatchCount(left, selectedSymptoms);

        if (matchDifference !== 0) {
            return matchDifference;
        }

        return left.name.localeCompare(right.name);
    });
}

function getOrderedDiagnoses(selectedSymptoms = new Set(), selectedDiagnosisName = "") {
    const symptomSortedDiagnoses = getSymptomSortedDiagnoses(selectedSymptoms);
    if (!selectedDiagnosisName) return symptomSortedDiagnoses;

    const selectedDiagnosis = getDiagnosisByName(selectedDiagnosisName);
    if (!selectedDiagnosis) return symptomSortedDiagnoses;

    return [
        selectedDiagnosis,
        ...symptomSortedDiagnoses.filter((diagnosis) => diagnosis.name !== selectedDiagnosisName),
    ];
}

function setTextWithFallback(element, value, fallback = "") {
    element.innerHTML = value ? `<em>${value}</em>` : fallback;
}

function normalizeFieldEntries(value) {
    if (Array.isArray(value)) {
        return value;
    }

    if (value === null || value === undefined) {
        return [];
    }

    return String(value)
        .split(/\n+/)
        .map((entry) => entry.trim())
        .filter(Boolean);
}

function createBlankLines(count) {
    return Array.from({ length: count }, () => {
        const line = document.createElement("div");
        line.className = "lined-value";
        line.textContent = " ";
        return line;
    });
}

function createEmptyLineState() {
    return Array.from({ length: EXTRA_LINE_COUNT + 1 }, () => "");
}

function fillInitialLineState(value) {
    const lines = createEmptyLineState();
    normalizeFieldEntries(value)
        .slice(0, lines.length)
        .forEach((entry, index) => {
            lines[index] = entry;
        });
    return lines;
}

function pickSeededItem(values, seedKey) {
    if (!Array.isArray(values) || !values.length) return "";

    const rng = createSeededRandom(hashString(`${gameSeed}:${seedKey}`));
    const index = Math.floor(rng() * values.length);
    return values[index] || values[0];
}

function getDiagnosisShowcaseCards(diagnosis) {
    if (!diagnosis) return [];

    const showcaseSymptoms = diagnosis.showcaseSymptoms?.length
        ? diagnosis.showcaseSymptoms
        : diagnosis.symptoms.filter((symptom) => symptomImageVariants[symptom]).slice(0, 3);

    return showcaseSymptoms
        .map((symptom) => {
            const variants = symptomImageVariants[symptom];
            if (!variants?.length) return null;

            const imageName = pickSeededItem(variants, `${diagnosis.name}:${symptom}`);
            return {
                symptom,
                image: `assets/${imageName}`,
            };
        })
        .filter(Boolean);
}

function getDiagnosisGroupIds(diagnosis) {
    const groupIds = new Set();

    (diagnosis?.symptoms || []).forEach((symptom) => {
        const groupId = symptomGroupBySymptom.get(symptom);
        if (groupId) {
            groupIds.add(groupId);
        }
    });

    return groupIds;
}

function appendEntryToRandomLine(lines, entry) {
    const cleanEntry = String(entry ?? "").trim();
    if (!cleanEntry) return lines;

    const nextLines = Array.isArray(lines) && lines.length ? [...lines] : createEmptyLineState();

    const targetIndex = getRandomInt(0, nextLines.length - 1);
    if (!nextLines[targetIndex]) {
        nextLines[targetIndex] = cleanEntry;
        return nextLines;
    }

    const gap = " ".repeat(getRandomInt(INLINE_GAP_MIN, INLINE_GAP_MAX));
    nextLines[targetIndex] += `${gap}${cleanEntry}`;
    return nextLines;
}

function renderLineGroup(inlineElement, multilineElement, values = []) {
    const [firstLine = "", ...extraLines] = values;
    inlineElement.textContent = firstLine || " ";

    const lineElements = multilineElement.querySelectorAll(".lined-value");
    lineElements.forEach((lineElement, index) => {
        lineElement.textContent = extraLines[index] || " ";
    });
}

function initializePatientRecord(patient) {
    const record = {
        selectedSymptoms: [],
        selectedDiagnosis: "",
        harmfulHabits: "",
        clinicalPicture: "",
        diagnosis: "",
        admissionDay: 7,
        admissionText: "7th day of the plague",
        photo: "assets/patient_01.png",
        diagnosisLocked: false,
        stampState: "hidden",
        stampAnimation: "",
        stampNextState: "",
        stampNextAnimation: "",
        ...patient,
    };
    record.harmfulHabitsLines = fillInitialLineState(record.harmfulHabits); //TODO: habits/clinicalpicture appear on random lines, with random amount of space before and after for organic look
    record.clinicalPictureLines = fillInitialLineState(record.clinicalPicture);
    record.diagnosis = normalizeFieldEntries(record.diagnosis).join(" ");

    return record;
}

function renderLeftPage() {
    const isAllPatients = state.showAllPatients;
    const patient = getCurrentPatient();
    const active = isAllPatients
        ? {
              name: "All patients",
              age: "—",
              maritalStatus: "—",
              occupation: "combined records",
              admissionDay: patient.admissionDay,
              admissionText: `${state.patients.length} charts open`,
              residence: "district-wide review",
              photo: state.patients[0].photo,
              harmfulHabitsLines: fillInitialLineState(
                  "Hook: setPatientField(patientId, 'harmfulHabits', value)",
              ),
              clinicalPictureLines: fillInitialLineState(
                  "Hook: setPatientField(patientId, 'clinicalPicture', value)",
              ),
              diagnosis: "Hook: setPatientField(patientId, 'diagnosis', value)",
          }
        : patient;

    elements.patientPhoto.src = active.photo;
    elements.patientPhoto.alt = `${active.name} portrait`;

    setTextWithFallback(elements.fieldName, active.name);
    setTextWithFallback(elements.fieldAge, active.age);
    setTextWithFallback(elements.fieldMarital, active.maritalStatus);
    setTextWithFallback(elements.fieldOccupation, active.occupation);
    setTextWithFallback(elements.fieldAdmission, active.admissionText);
    setTextWithFallback(elements.fieldResidence, active.residence);

    renderLineGroup(
        elements.fieldHarmfulHabits,
        elements.harmfulHabitsLines,
        active.harmfulHabitsLines.map((line) => line.label),
    );
    renderLineGroup(
        elements.fieldClinicalPicture,
        elements.clinicalPictureLines,
        active.clinicalPictureLines,
    );
    setTextWithFallback(elements.fieldDiagnosis, active.diagnosis || " ", " ");
}

function createSymptomItem(symptom, checked, highlighted, patientId, groupId) {
    const symptomId = `${patientId}-${groupId}-${symptom.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const symptomDefinition = getSymptomDefinition(symptom);
    const tooltipTitle = symptomDefinition?.label || symptom;
    const tooltipBody = symptomDefinition?.tooltip || "";

    return `

        <label
          class="symptom-item ${highlighted ? "highlight" : ""}"
          data-symptom="${escapeAttribute(symptom)}"
          data-tooltip-title="${escapeAttribute(tooltipTitle)}"
          data-tooltip-body="${escapeAttribute(tooltipBody)}"
        >
          <input type="checkbox" id="${symptomId}" ${checked ? "checked" : ""} />
          <span class="symptom-label">${symptom}</span>
          <div class="symptom-background"><span></span><span></span><span></span></div>
        </label>
        

      `;
}

function renderSymptoms() {
    const patient = getCurrentPatient();
    const manuallySelectedSet = state.showAllPatients
        ? getCombinedSymptoms()
        : new Set(patient?.selectedSymptoms || []);
    const highlightedSet = state.showAllPatients
        ? new Set()
        : getDiagnosisSymptomSet(patient?.selectedDiagnosis);

    elements.symptomsScroll.innerHTML = symptomGroups
        .map((group) => {
            const groupHasHighlight = group.symptoms.some((symptom) => highlightedSet.has(symptom));
            const items = group.symptoms
                .map((symptom) =>
                    createSymptomItem(
                        symptom,
                        manuallySelectedSet.has(symptom),
                        highlightedSet.has(symptom),
                        state.showAllPatients ? "all" : patient.id,
                        group.id,
                    ),
                )
                .join("<div class='symptom-divider'>|</div>");

            return `
          <section class="symptom-group ${groupHasHighlight ? "has-highlight" : ""}" data-group-id="${group.id}">
            <div
              class="symptom-icon-wrap"
              tabindex="0"
              data-tooltip-title="${escapeAttribute(group.title)}"
              data-tooltip-body="${escapeAttribute(group.tooltip || "")}"
            >
              <img src="${group.icon}" alt=""/>
            </div>
            <div class="symptom-content">
              <div class="symptom-heading">${group.title}</div>
              <div class="symptom-list">${items}</div>
            </div>
          </section>
        `;
        })
        .join("");

    elements.symptomsScroll.querySelectorAll(".symptom-list").forEach((list) => {
        const items = Array.from(list.querySelectorAll(".symptom-item"));
        if (items.length) items[items.length - 1].classList.add("is-last-visible");
    });

    bindSymptomTooltips();

    if (state.showAllPatients) {
        elements.symptomsScroll.querySelectorAll(".symptom-item").forEach((item) => {
            item.style.cursor = "default";
        });
    }
}

function createDiagnosisSymptomItem(symptom, isSelected) {
    return `
      <span class="diagnosis-symptom ${isSelected ? "is-selected" : ""}">
        <span class="diagnosis-symptom-label">${escapeHtml(symptom)}</span>
        ${
            isSelected
                ? '<span class="diagnosis-symptom-background"><span></span><span></span><span></span></span>'
                : ""
        }
      </span>
    `;
}

function renderDiagnoses() {
    const patient = getCurrentPatient();
    const manuallySelectedSet = state.showAllPatients
        ? getCombinedSymptoms()
        : new Set(patient.selectedSymptoms);
    const selectedDiagnosisName = state.showAllPatients ? "" : patient.selectedDiagnosis || "";
    const isDiagnosisLocked = !state.showAllPatients && !!patient?.diagnosisLocked;

    elements.diagnosesScroll.innerHTML = getOrderedDiagnoses(
        manuallySelectedSet,
        selectedDiagnosisName,
    )
        .map((diagnosis, index) => {
            const isActiveDiagnosis = diagnosis.name === selectedDiagnosisName;
            const symptoms = diagnosis.symptoms
                .map((symptom) =>
                    createDiagnosisSymptomItem(symptom, manuallySelectedSet.has(symptom)),
                )
                .join('<span class="diagnosis-symptom-divider">|</span>');
            const customPip = diagnosis.custom
                ? `
                    <img
                      class="diagnosis-custom-pip"
                      src="assets/disease_icon.png"
                      alt="Custom diagnosis"
                    />
                  `
                : "";

            return `
              <section class="diagnosis-entry ${isActiveDiagnosis ? "is-active" : ""}" data-diagnosis-name="${escapeAttribute(diagnosis.name)}">
                <div class="diagnosis-name-row">
                  <h3 class="diagnosis-name">${escapeHtml(diagnosis.name)}</h3>
                  ${customPip}
                  <button
                    class="diagnosis-question-mark"
                    type="button"
                    data-diagnosis-name="${escapeAttribute(diagnosis.name)}"
                  ></button>
                </div>
                <div class="diagnosis-symptoms">${symptoms}</div>
              </section>
              ${isActiveDiagnosis && index === 0 ? '<div class="diagnosis-lock-slot"></div>' : ""}
            `;
        })
        .join("");

    elements.diagnosesScroll.classList.toggle("is-locked", isDiagnosisLocked);

    if (elements.diagnosisLockButton) {
        const lockSlot = elements.diagnosesScroll.querySelector(".diagnosis-lock-slot");
        if (lockSlot) {
            elements.diagnosisLockButton.hidden = false;
            elements.diagnosisLockButton.disabled = isDiagnosisLocked;
            elements.diagnosisLockButton.classList.toggle("is-hidden", isDiagnosisLocked);
            lockSlot.replaceWith(elements.diagnosisLockButton);
        } else {
            elements.diagnosisLockButton.hidden = true;
            elements.diagnosisLockButton.disabled = true;
            elements.diagnosisLockButton.classList.remove("is-hidden");
            elements.diagnosesPanelInner?.appendChild(elements.diagnosisLockButton);
        }
    }
}

function closeDiagnosisDetail() {
    state.diagnosisDetailName = "";

    if (!elements.diagnosisDetailModal) return;

    elements.diagnosisDetailModal.hidden = true;
    document.body.classList.remove("diagnosis-detail-open");
}

function openDiagnosisDetail(diagnosisName) {
    const diagnosis = getDiagnosisByName(diagnosisName);
    if (!diagnosis || !elements.diagnosisDetailModal) return;

    state.diagnosisDetailName = diagnosis.name;
    renderDiagnosisDetail();

    elements.diagnosisDetailModal.hidden = false;
    document.body.classList.add("diagnosis-detail-open");
}

function renderDiagnosisDetail() {
    if (!elements.diagnosisDetailModal) return;

    const diagnosis = getDiagnosisByName(state.diagnosisDetailName);
    if (!diagnosis) {
        closeDiagnosisDetail();
        return;
    }

    const cards = getDiagnosisShowcaseCards(diagnosis);
    const activeGroupIds = getDiagnosisGroupIds(diagnosis);

    if (elements.diagnosisDetailTitle) {
        elements.diagnosisDetailTitle.textContent = diagnosis.name;
    }

    if (elements.diagnosisDetailCards) {
        elements.diagnosisDetailCards.className = `diagnosis-detail-cards count-${cards.length}`;
        elements.diagnosisDetailCards.innerHTML = cards
            .map(
                (card) => `
                  <article class="diagnosis-detail-card">
                    <img
                      class="diagnosis-detail-card-image"
                      src="${card.image}"
                      alt="${escapeAttribute(card.symptom)}"
                    />
                    <span class="diagnosis-detail-card-caption">${escapeHtml(card.symptom)}</span>
                  </article>
                `,
            )
            .join("");
    }

    if (elements.diagnosisDetailGroups) {
        elements.diagnosisDetailGroups.innerHTML = symptomGroups
            .map(
                (group) => `
                  <div class="diagnosis-detail-group ${activeGroupIds.has(group.id) ? "is-active" : ""}">
                    <img class="diagnosis-detail-group-icon" src="${group.icon}" alt="" />
                    <img
                      class="diagnosis-detail-group-dot"
                      src="assets/disease_icon.png"
                      alt=""
                    />
                  </div>
                `,
            )
            .join("");
    }

    if (elements.diagnosisDetailText) {
        const description = (diagnosis.description || [])
            .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
            .join("");

        const risk = diagnosis.riskGroups
            ? `<p class="diagnosis-detail-risk">Risk groups: ${escapeHtml(
                  diagnosis.riskGroups,
              )}</p>`
            : "";

        elements.diagnosisDetailText.innerHTML = `${description}${risk}`;
    }
}

function onSymptomToggle(event) {
    if (state.showAllPatients || !(event.target instanceof HTMLInputElement)) return;

    const currentPatient = getCurrentPatient();
    const label = event.target.closest(".symptom-item");
    const symptomName = label?.dataset.symptom;
    if (!symptomName) return;

    const selected = new Set(currentPatient.selectedSymptoms);
    if (event.target.checked) {
        selected.add(symptomName);
    } else {
        selected.delete(symptomName);
    }
    currentPatient.selectedSymptoms = [...selected];
    render();
}

function onDiagnosisClick(event) {
    const detailTrigger = event.target.closest(".diagnosis-question-mark");
    if (detailTrigger) {
        const diagnosisName =
            detailTrigger.dataset.diagnosisName ||
            detailTrigger.closest(".diagnosis-entry")?.dataset.diagnosisName;

        if (diagnosisName) {
            event.preventDefault();
            event.stopPropagation();
            openDiagnosisDetail(diagnosisName);
        }

        return;
    }

    if (state.showAllPatients) return;

    const diagnosisEntry = event.target.closest(".diagnosis-entry");
    if (!diagnosisEntry) return;

    const diagnosisName = diagnosisEntry.dataset.diagnosisName;
    if (!diagnosisName) return;

    const currentPatient = getCurrentPatient();
    if (currentPatient?.diagnosisLocked) return;

    const nextDiagnosisName =
        currentPatient.selectedDiagnosis === diagnosisName ? "" : diagnosisName;
    if (!updatePatientDiagnosisSelection(currentPatient, nextDiagnosisName)) return;

    render();
}

function onDiagnosisLock() {
    if (state.showAllPatients) return;

    const currentPatient = getCurrentPatient();
    if (!lockPatientDiagnosis(currentPatient)) return;

    //TODO: type diagnosis in field in UI

    render();
}

function updateActiveTabs() {
    elements.patientTabs.querySelectorAll(".tab").forEach((button) => {
        button.classList.toggle(
            "active",
            !state.showAllPatients && button.dataset.patientId === state.currentPatientId,
        );
    });
    elements.allPatientsTab.classList.toggle("active", state.showAllPatients);
}

function render(init = false) {
    renderLeftPage();
    renderSymptoms();
    renderDiagnoses();
    renderStamp();
    if (state.diagnosisDetailName || init) renderDiagnosisDetail();
    updateActiveTabs();
}

elements.harmfulHabitsLines.replaceChildren(...createBlankLines(EXTRA_LINE_COUNT));
elements.clinicalPictureLines.replaceChildren(...createBlankLines(EXTRA_LINE_COUNT));

if (elements.diagnosisLockButton) {
    elements.diagnosisLockButton.hidden = true;
    elements.diagnosisLockButton.disabled = true;
    elements.diagnosisLockButton.classList.remove("is-hidden");
    elements.diagnosisLockButton.addEventListener("click", onDiagnosisLock);
}

if (elements.stamp) {
    elements.stamp.addEventListener("animationend", onStampAnimationEnd);
}

elements.symptomsScroll.addEventListener("change", onSymptomToggle);
elements.diagnosesScroll.addEventListener("click", onDiagnosisClick);

elements.symptomsScroll.addEventListener("scroll", () => {
    [tooltipState.group, tooltipState.symptom].forEach((stateEntry) => {
        if (stateEntry.activeAnchor) {
            positionFloatingSymptomTooltip(stateEntry, stateEntry.activeAnchor);
        }
    });
});

window.addEventListener("resize", () => {
    [tooltipState.group, tooltipState.symptom].forEach((stateEntry) => {
        if (stateEntry.activeAnchor) {
            positionFloatingSymptomTooltip(stateEntry, stateEntry.activeAnchor);
        }
    });
});

if (elements.diagnosisDetailModal) {
    elements.diagnosisDetailModal.addEventListener("click", (event) => {
        if (event.target.closest("[data-close-diagnosis-detail]")) {
            closeDiagnosisDetail();
        }
    });
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.diagnosisDetailName) {
        closeDiagnosisDetail();
    }
});

buildTabs();
render(true);

window.medicalChartApp = {
    getPatients() {
        return structuredClone(state.patients);
    },

    setPatientField(patientId, field, value) {
        const patient = state.patients.find((entry) => entry.id === patientId);
        if (!patient || !(field in patient)) return false;

        if (APPENDABLE_LINE_FIELDS.has(field)) {
            const entries = normalizeFieldEntries(value);
            const lineField = `${field}Lines`;
            patient[field] = entries.join("\n");
            patient[lineField] =
                Array.isArray(patient[lineField]) && patient[lineField].length
                    ? [...patient[lineField]]
                    : createEmptyLineState();

            entries.forEach((entry) => {
                patient[lineField] = appendEntryToRandomLine(patient[lineField], entry);
            });
        } else if (field === "diagnosis") {
            patient.diagnosis = normalizeFieldEntries(value).join(" ");
        } else {
            patient[field] = value;
        }

        render();
        return true;
    },

    setPatientSymptoms(patientId, symptoms) {
        const patient = state.patients.find((entry) => entry.id === patientId);
        if (!patient || !Array.isArray(symptoms)) return false;
        patient.selectedSymptoms = [...new Set(symptoms)];
        render();
        return true;
    },

    selectDiagnosis(patientId, diagnosisName) {
        const patient = state.patients.find((entry) => entry.id === patientId);
        if (!patient) return false;
        if (diagnosisName && !getDiagnosisByName(diagnosisName)) return false;
        if (!updatePatientDiagnosisSelection(patient, diagnosisName || "")) return false;
        render();
        return true;
    },

    lockDiagnosis(patientId) {
        const patient = state.patients.find((entry) => entry.id === patientId);
        if (!lockPatientDiagnosis(patient)) return false;
        render();
        return true;
    },

    addPatient(patient) {
        if (!patient?.id) return false;
        state.patients.push(initializePatientRecord(patient));
        buildTabs();
        render();
        return true;
    },

    addRandomPatient() {
        const existingIds = new Set(state.patients.map((patient) => patient.id));
        const patient = initializePatientRecord(createRandomPatient(state.patients, existingIds));

        state.patients.push(patient);
        state.currentPatientId = patient.id;
        state.showAllPatients = false;
        buildTabs();
        render();
        return structuredClone(patient);
    },

    selectPatient(patientId) {
        settlePatientStamp(getCurrentPatient());

        if (patientId === "all") {
            state.showAllPatients = true;
            render();
            return true;
        }

        const exists = state.patients.some((patient) => patient.id === patientId);
        if (!exists) return false;
        state.currentPatientId = patientId;
        state.showAllPatients = false;
        render();
        return true;
    },
};

//TODO: ability to create patients (+UI interface)
