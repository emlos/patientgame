const APPENDABLE_LINE_FIELDS = new Set(["harmfulHabits", "clinicalPicture"]);
const EXTRA_LINE_COUNT = 2;
const INLINE_GAP_MIN = 2;
const INLINE_GAP_MAX = 6;

const symptomGroups = [
    {
        id: "central-nervous-system",
        title: "Central Nervous System",
        icon: "assets/icon_brain.png",
        symptoms: [
            "Headache",
            "Bulimia",
            "Hallucinations",
            "Hydrophobia",
            "Loss of coordination",
            "Memory lapses",
        ],
    },
    {
        id: "vision",
        title: "Vision",
        icon: "assets/icon_eye.png",
        symptoms: [
            "Darkened eye capillaries",
            "Red eyes",
            "Irregular pupil shape",
            "Photophobia",
            "Visual impairment",
        ],
    },
    {
        id: "mucous-membranes",
        title: "Mucous Membranes",
        icon: "assets/icon_mouth.png",
        symptoms: [
            "Sore throat",
            "Joint pain",
            "Lip lesions",
            "Redness around the nose",
            "Hearing impairment",
        ],
    },
    {
        id: "respiratory-system",
        title: "Respiratory System",
        icon: "assets/icon_lungs.png",
        symptoms: ["Chest pain", "Cyanosis", "Cough", "Haemoptysis", "Difficulty breathing"],
    },
    {
        id: "circulatory-system",
        title: "Circulatory System",
        icon: "assets/icon_heart.png",
        symptoms: [
            "Severe pallor",
            "Hematomas",
            "Fever",
            "Burning sensation in the heart",
            "Rapid pulse",
            "Weakness",
            "Vein damage",
            "Slow pulse",
        ],
    },
    {
        id: "skin",
        title: "Skin",
        icon: "assets/icon_skin.png",
        symptoms: [
            "Eczema",
            "Ichthyosis",
            "Stone disease",
            "Rash",
            "Skin redness",
            "Yellowing of the skin",
            "Itchy skin",
            "Insect bites",
            "Ulcers",
        ],
    },
    {
        id: "gastrointestinal-tract",
        title: "Gastrointestinal Tract",
        icon: "assets/icon_stomach.png",
        symptoms: [
            "Abdominal pain",
            "Diarrhea",
            "Dystrophy",
            "Geophagia",
            "Heartburn",
            "Belching",
            "Loss of appetite",
            "Nausea and vomiting",
        ],
    },
];

const patients = [
    {
        id: "emilia",
        tabLabel: "Emilia",
        name: "Emilia",
        age: 25,
        maritalStatus: "single",
        occupation: "studies botany",
        admissionDay: 7,
        admissionText: "7th day of the plague",
        residence: "Maw",
        photo: "assets/patient_01.png",
        harmfulHabits: "",
        clinicalPicture: "",
        diagnosis: "",
        selectedSymptoms: [
            "Bulimia",
            "Hallucinations",
            "Hydrophobia",
            "Memory lapses",
            "Red eyes",
            "Photophobia",
            "Lip lesions",
            "Difficulty breathing",
            "Rapid pulse",
            "Ichthyosis",
            "Rash",
            "Yellowing of the skin",
        ],
    },
    {
        id: "tuutei",
        tabLabel: "Tuutei",
        name: "Tuutei",
        age: 39,
        maritalStatus: "married",
        occupation: "aspiring Herb Bride",
        admissionDay: 7,
        admissionText: "7th day of the plague",
        residence: "Shekhen, steppe village",
        photo: "assets/patient_02.png",
        harmfulHabits: "",
        clinicalPicture: "",
        diagnosis: "",
        selectedSymptoms: [
            "Sore throat",
            "Joint pain",
            "Redness around the nose",
            "Hearing impairment",
            "Severe pallor",
            "Weakness",
            "Stone disease",
            "Itchy skin",
            "Ulcers",
            "Loss of appetite",
        ],
    },
    {
        id: "martin",
        tabLabel: "Martin",
        name: "Martin",
        age: 43,
        maritalStatus: "widower",
        occupation: "shop-floor worker",
        admissionDay: 7,
        admissionText: "7th day of the plague",
        residence: "The Crude Sprawl",
        photo: "assets/patient_03.png",
        harmfulHabits: "",
        clinicalPicture: "Diarrhea",
        diagnosis: "",
        selectedSymptoms: ["Headache", "Diarrhea", "Cough", "Rapid pulse", "Fever"],
    },
];

const state = {
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
};

function escapeAttribute(value) {
    return String(value).replace(/"/g, "&quot;");
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
            state.showAllPatients = false;
            state.currentPatientId = patient.id;
            render();
        });
        elements.patientTabs.appendChild(button);
    });

    elements.allPatientsTab.onclick = () => {
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

function setTextWithFallback(element, value, fallback = "") {
    element.innerHTML = value ? `<em>${value}</em>` : fallback;
}

function normalizeFieldEntries(value) {
    if (Array.isArray(value)) {
        return value.map((entry) => String(entry).trim()).filter(Boolean);
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
        harmfulHabits: "",
        clinicalPicture: "",
        diagnosis: "",
        admissionDay: 7,
        admissionText: "7th day of the plague",
        photo: "assets/patient_01.png",
        ...patient,
    };

    record.harmfulHabitsLines = fillInitialLineState(record.harmfulHabits);
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
        active.harmfulHabitsLines,
    );
    renderLineGroup(
        elements.fieldClinicalPicture,
        elements.clinicalPictureLines,
        active.clinicalPictureLines,
    );
    setTextWithFallback(elements.fieldDiagnosis, active.diagnosis || " ", " ");
}

function createSymptomItem(symptom, checked, patientId, groupId) {
    const symptomId = `${patientId}-${groupId}-${symptom.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    return `

        <label class="symptom-item" data-symptom="${escapeAttribute(symptom)}">
          <input type="checkbox" id="${symptomId}" ${checked ? "checked" : ""} />
          <span class="symptom-label">${symptom}</span>
          <div class="symptom-background"><span></span><span></span><span></span></div>
        </label>
        

      `;
}

function renderSymptoms() {
    const patient = getCurrentPatient();
    const selectedSet = state.showAllPatients
        ? getCombinedSymptoms()
        : new Set(patient.selectedSymptoms);

    elements.symptomsScroll.innerHTML = symptomGroups
        .map((group) => {
            const items = group.symptoms
                .map((symptom) =>
                    createSymptomItem(
                        symptom,
                        selectedSet.has(symptom),
                        state.showAllPatients ? "all" : patient.id,
                        group.id,
                    ),
                )
                .join("<div class='symptom-divider'>|</div>");

            return `
          <section class="symptom-group" data-group-id="${group.id}">
            <img src="${group.icon}" alt="" aria-hidden="true" />
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

    if (!state.showAllPatients) {
        elements.symptomsScroll.querySelectorAll(".symptom-item input").forEach((input) => {
            input.addEventListener("change", onSymptomToggle);
        });
    } else {
        elements.symptomsScroll.querySelectorAll(".symptom-item").forEach((item) => {
            item.style.cursor = "default";
        });
    }
}

function onSymptomToggle(event) {
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

function render() {
    renderLeftPage();
    renderSymptoms();
    updateActiveTabs();
}

elements.harmfulHabitsLines.replaceChildren(...createBlankLines(EXTRA_LINE_COUNT));
elements.clinicalPictureLines.replaceChildren(...createBlankLines(EXTRA_LINE_COUNT));

buildTabs();
render();

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
    addPatient(patient) {
        if (!patient?.id) return false;
        state.patients.push(initializePatientRecord(patient));
        buildTabs();
        render();
        return true;
    },
    selectPatient(patientId) {
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
