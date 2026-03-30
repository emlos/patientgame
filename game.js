const APPENDABLE_LINE_FIELDS = new Set(["harmfulHabits", "clinicalPicture"]);
const EXTRA_LINE_COUNT = 2;
const INLINE_GAP_MIN = 2;
const INLINE_GAP_MAX = 6;

const INITIAL_PATIENT_COUNT = 3;

const RANDOM_PATIENT_NAMES = [
    "Anna",
    "Altyn",
    "Toya",
    "Khulan",
    "Lun",
    "Burduk",
    "Tolkowy",
    "Oktai",
    "Laska",
    "Mariya",
    "Mishka",
    "Nara",
    "Nika",
    "Bobok",
    "Pavel",
    "Shchur",
    "Lyuta",
    "Fila",
    "Vera",
    "Yargi",
    "Olusha",
    "Zhytochnik",
    "Yunat",
    "Emilia",
    "Sotnik",
    "Tuutei",
    "Voronok",
    "Astrild",
    "Chernyak",
    "Myrosya",
    "Petrel",
    "Khariton",
    "Aristarkh",
    "Sakh Men",
    "Poshinok",
    "Kira",
    "Marfa",
    "Lyudmila",
    "Yegor",
];

const RANDOM_PATIENT_LAST_NAMES = [
    "Ankudinov",
    "Baskakov",
    "Gantimurova",
    "Goncharova",
    "Grishin",
    "Kabanov",
    "Karmin",
    "Kharitonov",
    "Kudrin",
    "Mishchenko",
    "Naraeva",
    "Sablin",
    "Sotnik",
    "Yunatov",
];

const RANDOM_MARITAL_STATUSES = ["single", "married", "widowed", "betrothed", "divorced"];

const RANDOM_OCCUPATIONS = [
    "abbatoir clerk",
    "apothecary assistant",
    "bakery hand",
    "bookkeeper",
    "carter",
    "chimney sweep",
    "dock porter",
    "dressmaker",
    "factory stoker",
    "ferryman",
    "gravedigger's assistant",
    "laundress",
    "night watchman",
    "rail yard mechanic",
    "schoolteacher",
    "seamstress",
    "soap boiler",
    "station clerk",
    "tallow renderer",
    "tannery worker",
    "town orderly",
    "warehouse tallyman",
    "aspiring herb bride",
    "works for Stamatin",
    "dancer",
    "drunk",
    "shopkeeper",
    "dyer",
    "street sweeper",
    "cutpurse thug",
    "Termitary guard",
    "vagrant",
    "apprentice herbalist",
    "apprentice midwife",
    "manual laborer",
    "bandit",
    "wannabe scientist",
    "wannabe artist",
    "'artist'",
    "studies botany",
    "studies anatomy",
    "studies medicine",
    "shop-floor worker",
    "charlatan healer",
    "dealer",
    "housewife",
    "does not remember",
    "unclear (?)",
    "academy student",
    "herb bride",
    "accountant",
    "solider",
    "teacher",
    "keeps bees",
];

const RANDOM_RESIDENCES = [
    "Tanners",
    "Skinners",
    "Hindquarters",
    "Factory",
    "The Crude Sprawl",
    "Flank",
    "Chine",
    "Backbone",
    "Marrow",
    "Gut",
    "Maw",
    "Spleen",
    "Warehouses",
    "Atrium",
    "Bridge Square",
    "Shekhen steppe village",
    " " //empty on purpose
];

const PHOTO_PATHS = Array.from({ length: 24 }, (_, index) => {
    return `assets/patient_${String(index + 1).padStart(2, "0")}.png`;
});


const symptomGroups = [
    {
        id: "central-nervous-system",
        title: "Central Nervous System",
        icon: "assets/icon_brain.png",
        tooltip:
            "The central nervous system includes the brain and spinal cord. Problems with them can range from mental disorders and behavioral changes to common headaches.",
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
        tooltip:
            "Eye afflictions can vary in nature and manifest both externally—in the organ's blood supply and physiology—and directly through the patient's sensations.",
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
        tooltip:
            "Mucous membranes line internal cavities such as auditory canals and airways, partially extending to their external openings, and also reduce friction—for instance, between bones.",
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
        tooltip:
            "Lung damage, besides obvious breathing difficulties, can manifest as visible signs on the patient's body—for example, due to oxygen depletion in the blood.",
        symptoms: ["Chest pain", "Cyanosis", "Cough", "Haemoptysis", "Difficulty breathing"],
    },
    {
        id: "circulatory-system",
        title: "Circulatory System",
        icon: "assets/icon_heart.png",
        tooltip:
            "The heart, blood vessels, and blood itself. Weak vessels lead to hemorrhages, poor blood circulation results in reduced vitality, and excessive blood flow causes heat in specific body parts.",
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
        tooltip:
            "The body's protective covering. It's important to distinguish between skin lesions and external manifestations of failures in other organ systems.",
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
        tooltip:
            "A system of organs involved in food consumption and digestion, as well as waste elimination. Disorders can lead to changes in body composition and eating behavior.",
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

const diagnoses = [
    {
        name: "Acute Bronchopathy",
        symptoms: [
            "Headache",
            "Loss of coordination",
            "Chest pain",
            "Fever",
            "Difficulty breathing",
            "Cough",
            "Haemoptysis",
            "Redness around the nose",
            "Severe pallor",
            "Burning sensation in the heart",
            "Weakness",
        ],
    },
    {
        name: "Anemic Vasculopathy",
        symptoms: [
            "Hydrophobia",
            "Headache",
            "Red eyes",
            "Dystrophy",
            "Cyanosis",
            "Hematomas",
            "Severe pallor",
            "Fever",
        ],
    },
    {
        name: "Bonkowski's Fever",
        symptoms: [
            "Bulimia",
            "Visual impairment",
            "Photophobia",
            "Fever",
            "Dystrophy",
            "Abdominal pain",
            "Belching",
            "Weakness",
            "Nausea and vomiting",
            "Burning sensation in the heart",
        ],
    },
    {
        name: "Bradycardia",
        symptoms: ["Weakness", "Chest pain", "Visual impairment"],
    },
    {
        name: "Burning Fever",
        symptoms: [
            "Hallucinations",
            "Headache",
            "Memory lapses",
            "Fever",
            "Loss of coordination",
            "Diarrhea",
            "Lip lesions",
            "Ulcers",
            "Eczema",
            "Rapid pulse",
        ],
    },
    {
        name: "Consumption",
        symptoms: [
            "Loss of coordination",
            "Dystrophy",
            "Chest pain",
            "Fever",
            "Difficulty breathing",
            "Cough",
            "Haemoptysis",
            "Ichthyosis",
            "Weakness",
        ],
    },
    {
        name: "Fruit Typhoid",
        symptoms: [
            "Hallucinations",
            "Irregular pupil shape",
            "Chest pain",
            "Visual impairment",
            "Hearing impairment",
            "Rash",
            "Vein damage",
            "Weakness",
            "Slow pulse",
        ],
    },
    {
        name: "Hepatitis",
        symptoms: [
            "Visual impairment",
            "Dystrophy",
            "Stone disease",
            "Nausea and vomiting",
            "Itchy skin",
            "Eczema",
            "Yellowing of the skin",
            "Weakness",
        ],
    },
    {
        name: "Influenza",
        symptoms: [
            "Headache",
            "Nausea and vomiting",
            "Chest pain",
            "Sore throat",
            "Weakness",
            "Fever",
            "Photophobia",
            "Loss of appetite",
            "Difficulty breathing",
            "Cough",
            "Redness around the nose",
            "Hearing impairment",
            "Joint pain",
        ],
    },
    {
        name: "Ink Syndrome",
        symptoms: [
            "Hallucinations",
            "Headache",
            "Memory lapses",
            "Irregular pupil shape",
            "Darkened eye capillaries",
            "Photophobia",
            "Difficulty breathing",
            "Chest pain",
            "Cyanosis",
            "Vein damage",
            "Hematomas",
        ],
    },
    {
        name: "Lymphotonitis",
        symptoms: [
            "Headache",
            "Loss of coordination",
            "Itchy skin",
            "Ulcers",
            "Insect bites",
            "Rapid pulse",
            "Skin redness",
            "Weakness",
        ],
    },
    {
        name: "Measles",
        symptoms: [
            "Headache",
            "Red eyes",
            "Photophobia",
            "Diarrhea",
            "Sore throat",
            "Skin redness",
            "Weakness",
            "Fever",
        ],
    },
    {
        name: "Nephropathia epidemica",
        symptoms: [
            "Hydrophobia",
            "Headache",
            "Bulimia",
            "Photophobia",
            "Visual impairment",
            "Heartburn",
            "Geophagia",
            "Rash",
            "Chest pain",
            "Nausea and vomiting",
            "Skin redness",
            "Rapid pulse",
            "Weakness",
            "Fever",
        ],
    },
    {
        name: "Pulmomucous Syndrome",
        symptoms: [
            "Loss of coordination",
            "Diarrhea",
            "Loss of appetite",
            "Difficulty breathing",
            "Redness around the nose",
            "Lip lesions",
            "Hallucinations",
            "Hearing impairment",
        ],
    },
    {
        name: "Serpent Syndrome",
        symptoms: [
            "Loss of coordination",
            "Red eyes",
            "Diarrhea",
            "Visual impairment",
            "Dystrophy",
            "Lip lesions",
            "Difficulty breathing",
            "Ichthyosis",
        ],
    },
    {
        name: "Steppe Dryness",
        symptoms: [
            "Red eyes",
            "Photophobia",
            "Difficulty breathing",
            "Sore throat",
            "Joint pain",
            "Ichthyosis",
            "Rapid pulse",
        ],
    },
    {
        name: "Steppe Gastrodermal Fever",
        symptoms: [
            "Heartburn",
            "Geophagia",
            "Abdominal pain",
            "Rash",
            "Dystrophy",
            "Belching",
            "Nausea and vomiting",
            "Difficulty breathing",
            "Insect bites",
        ],
    },
    {
        name: "Stoneskin",
        symptoms: ["Photophobia", "Stone disease", "Slow pulse"],
    },
    {
        name: "Tularemia",
        symptoms: [
            "Hallucinations",
            "Headache",
            "Nausea and vomiting",
            "Skin redness",
            "Ulcers",
            "Insect bites",
            "Weakness",
            "Fever",
        ],
    },
    {
        name: "Twyrine Syndrome",
        symptoms: [
            "Hallucinations",
            "Headache",
            "Memory lapses",
            "Loss of coordination",
            "Red eyes",
            "Photophobia",
            "Darkened eye capillaries",
            "Nausea and vomiting",
            "Yellowing of the skin",
            "Skin redness",
            "Vein damage",
            "Hematomas",
            "Weakness",
        ],
    },
].sort((left, right) => left.name.localeCompare(right.name));

const patients = createInitialPatients(INITIAL_PATIENT_COUNT);

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
    diagnosesScroll: document.getElementById("diagnosesScroll"),
    diagnosisLockButton: document.querySelector(".diagnosis-lock-button"),
    diagnosesPanelInner: document.querySelector(".diagnoses-panel-inner"),
    rightPage: document.querySelector(".right-page"),
};

const tooltipState = {
    activeAnchor: null,
    element: null,
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

function hideFloatingSymptomTooltip() {
    if (!tooltipState.element) return;

    tooltipState.activeAnchor = null;
    tooltipState.element.classList.remove("visible");
    tooltipState.element.style.left = "";
    tooltipState.element.style.top = "";
}

function getFloatingSymptomTooltip() {
    if (tooltipState.element) return tooltipState.element;

    const tooltip = document.createElement("div");
    tooltip.className = "floating-symptom-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.innerHTML = `
      <div class="symptom-tooltip-title"></div>
      <div class="symptom-tooltip-body"></div>
    `;

    elements.rightPage.appendChild(tooltip);
    tooltipState.element = tooltip;
    return tooltip;
}

function positionFloatingSymptomTooltip(anchor) {
    if (!anchor || !elements.rightPage) return;

    const title = anchor.dataset.tooltipTitle || "";
    const body = anchor.dataset.tooltipBody || "";
    const tooltip = getFloatingSymptomTooltip();

    tooltip.querySelector(".symptom-tooltip-title").textContent = title;
    tooltip.querySelector(".symptom-tooltip-body").textContent = body;

    tooltip.classList.add("visible");
    tooltip.style.visibility = "hidden";

    const anchorRect = anchor.getBoundingClientRect();
    const pageRect = elements.rightPage.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const gap = 12;
    const minTop = 8;
    const maxTop = Math.max(minTop, pageRect.height - tooltipRect.height - 8);

    const left = anchorRect.left - pageRect.left - tooltipRect.width - gap;
    const centeredTop = anchorRect.top - pageRect.top + anchorRect.height / 2 - tooltipRect.height / 2;
    const top = Math.min(Math.max(centeredTop, minTop), maxTop);

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.style.visibility = "visible";

    tooltipState.activeAnchor = anchor;
}

function bindSymptomTooltips() {
    hideFloatingSymptomTooltip();

    elements.symptomsScroll.querySelectorAll(".symptom-icon-wrap").forEach((iconWrap) => {
        const showTooltip = () => positionFloatingSymptomTooltip(iconWrap);

        iconWrap.addEventListener("mouseenter", showTooltip);
        iconWrap.addEventListener("focus", showTooltip);
        iconWrap.addEventListener("mouseleave", hideFloatingSymptomTooltip);
        iconWrap.addEventListener("blur", hideFloatingSymptomTooltip);
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

function getDiagnosisByName(name) {
    return diagnoses.find((diagnosis) => diagnosis.name === name) || null;
}

function getDiagnosisSymptomSet(name) {
    const diagnosis = getDiagnosisByName(name);
    return new Set(diagnosis?.symptoms || []);
}

function getAlphabeticalDiagnoses() {
    return [...diagnoses].sort((left, right) => left.name.localeCompare(right.name));
}

function getOrderedDiagnoses(selectedDiagnosisName = "") {
    const alphabeticalDiagnoses = getAlphabeticalDiagnoses();
    if (!selectedDiagnosisName) return alphabeticalDiagnoses;

    const selectedDiagnosis = getDiagnosisByName(selectedDiagnosisName);
    if (!selectedDiagnosis) return alphabeticalDiagnoses;

    return [
        selectedDiagnosis,
        ...alphabeticalDiagnoses.filter((diagnosis) => diagnosis.name !== selectedDiagnosisName),
    ];
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

function getRandomItem(values) {
    return values[getRandomInt(0, values.length - 1)];
}

function shuffle(values) {
    const nextValues = [...values];
    for (let index = nextValues.length - 1; index > 0; index -= 1) {
        const swapIndex = getRandomInt(0, index);
        [nextValues[index], nextValues[swapIndex]] = [nextValues[swapIndex], nextValues[index]];
    }
    return nextValues;
}

function slugify(value) {
    return String(value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function createRandomPatientName() {
    const firstName = getRandomItem(RANDOM_PATIENT_NAMES);
    const hasLastName = Math.random() < 0.35;
    return hasLastName ? `${firstName} ${getRandomItem(RANDOM_PATIENT_LAST_NAMES)}` : firstName;
}

function createRandomPatient(existingIds = new Set(), photoPool = PHOTO_PATHS) {
    const name = createRandomPatientName();
    const baseId = slugify(name) || `patient-${Date.now()}`;
    let nextId = baseId;
    let suffix = 2;

    while (existingIds.has(nextId)) {
        nextId = `${baseId}-${suffix}`;
        suffix += 1;
    }

    return {
        id: nextId,
        tabLabel: name.split(" ")[0],
        name,
        age: getRandomInt(18, 46),
        maritalStatus: getRandomItem(RANDOM_MARITAL_STATUSES),
        occupation: getRandomItem(RANDOM_OCCUPATIONS),
        admissionDay: 7,
        admissionText: "7th day of the plague",
        residence: getRandomItem(RANDOM_RESIDENCES),
        photo: photoPool.length ? photoPool.pop() : getRandomItem(PHOTO_PATHS),
        harmfulHabits: "",
        clinicalPicture: "",
        diagnosis: "",
        selectedSymptoms: [],
    };
}

function createInitialPatients(count) {
    const existingIds = new Set();
    const photoPool = shuffle(PHOTO_PATHS);

    return Array.from({ length: count }, () => {
        const patient = createRandomPatient(existingIds, photoPool);
        existingIds.add(patient.id);
        return patient;
    });
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

function createSymptomItem(symptom, checked, highlighted, patientId, groupId) {
    const symptomId = `${patientId}-${groupId}-${symptom.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    return `

        <label class="symptom-item ${highlighted ? "highlight" : ""}" data-symptom="${escapeAttribute(symptom)}">
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
              aria-label="${escapeAttribute(group.title)} information"
              data-tooltip-title="${escapeAttribute(group.title)}"
              data-tooltip-body="${escapeAttribute(group.tooltip || "")}"
            >
              <img src="${group.icon}" alt="" aria-hidden="true" />
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

    elements.diagnosesScroll.innerHTML = getOrderedDiagnoses(selectedDiagnosisName)
        .map((diagnosis, index) => {
            const isActiveDiagnosis = diagnosis.name === selectedDiagnosisName;
            const symptoms = diagnosis.symptoms
                .map((symptom) =>
                    createDiagnosisSymptomItem(symptom, manuallySelectedSet.has(symptom)),
                )
                .join('<span class="diagnosis-symptom-divider">|</span>');

            return `
              <section class="diagnosis-entry ${isActiveDiagnosis ? "is-active" : ""}" data-diagnosis-name="${escapeAttribute(diagnosis.name)}">
                <div class="diagnosis-name-row">
                  <h3 class="diagnosis-name">${escapeHtml(diagnosis.name)}</h3>
                  <div
                    class="diagnosis-question-mark"
                  ></div>
                </div>
                <div class="diagnosis-symptoms">${symptoms}</div>
              </section>
              ${isActiveDiagnosis && index === 0 ? '<div class="diagnosis-lock-slot"></div>' : ''}
            `;
        })
        .join("");

    if (elements.diagnosisLockButton) {
        const lockSlot = elements.diagnosesScroll.querySelector(".diagnosis-lock-slot");
        if (lockSlot) {
            elements.diagnosisLockButton.hidden = false;
            lockSlot.replaceWith(elements.diagnosisLockButton);
        } else {
            elements.diagnosisLockButton.hidden = true;
            elements.diagnosesPanelInner?.appendChild(elements.diagnosisLockButton);
        }
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
    if (state.showAllPatients) return;

    const diagnosisEntry = event.target.closest(".diagnosis-entry");
    if (!diagnosisEntry) return;

    const diagnosisName = diagnosisEntry.dataset.diagnosisName;
    if (!diagnosisName) return;

    const currentPatient = getCurrentPatient();
    currentPatient.selectedDiagnosis =
        currentPatient.selectedDiagnosis === diagnosisName ? "" : diagnosisName;
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

function render() {
    renderLeftPage();
    renderSymptoms();
    renderDiagnoses();
    updateActiveTabs();
}

elements.harmfulHabitsLines.replaceChildren(...createBlankLines(EXTRA_LINE_COUNT));
elements.clinicalPictureLines.replaceChildren(...createBlankLines(EXTRA_LINE_COUNT));

if (elements.diagnosisLockButton) {
    elements.diagnosisLockButton.hidden = true;
}

elements.symptomsScroll.addEventListener("change", onSymptomToggle);
elements.diagnosesScroll.addEventListener("click", onDiagnosisClick);

elements.symptomsScroll.addEventListener("scroll", () => {
    if (tooltipState.activeAnchor) {
        positionFloatingSymptomTooltip(tooltipState.activeAnchor);
    }
});

window.addEventListener("resize", () => {
    if (tooltipState.activeAnchor) {
        positionFloatingSymptomTooltip(tooltipState.activeAnchor);
    }
});

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
    selectDiagnosis(patientId, diagnosisName) {
        const patient = state.patients.find((entry) => entry.id === patientId);
        if (!patient) return false;
        if (diagnosisName && !getDiagnosisByName(diagnosisName)) return false;
        patient.selectedDiagnosis = diagnosisName || "";
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
        const patient = initializePatientRecord(createRandomPatient(existingIds));
        state.patients.push(patient);
        state.currentPatientId = patient.id;
        state.showAllPatients = false;
        buildTabs();
        render();
        return structuredClone(patient);
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
