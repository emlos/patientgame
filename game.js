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
    " ", //empty on purpose
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
        description: [
            "A subtype of diseases caused by Yersinia pestis. Transmitted by direct contact of the bacteria with mucous membranes, e.g., drinking from a dirty cup, smoking a pipe, or rinsing eyes with contaminated water.",
            "The acute phase starts with fever, muscle weakness, and a burning sensation in the heart area, followed by haemoptysis. The waning acute phase is marked by headaches and bursting pain in the chest. As the acute phase subsides, it becomes challenging to accurately diagnose. Without treatment, the patient dies within 2-3 days.",
        ],
        riskGroups: "People living in crowded conditions.",
        showcaseSymptoms: ["Haemoptysis", "Chest pain", "Headache"],
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
        description: [
            "An infectious disease caused by microorganisms from steppe soil entering the bloodstream. Cases of airborne transmission are also reported but require confirmation. The infection leads to anemia, which can manifest as patient pallor, muscle weakness, and weight loss. Occasionally, patients may experience localized bleeding and hematomas. Acute cases display burst capillaries on the eyes and high fever.",
        ],
        riskGroups:
            "Peasant plowmen, gravediggers, and other various types of people working with soil.",
        showcaseSymptoms: ["Dystrophy", "Cyanosis", "Red eyes"],
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
        description: [
            "An extremely dangerous and contagious disease described in detail by Dr. Bonkowski. Epidemics of this disease can occur but are characteristic only for tropical inhabitants, i.e., those in hot and humid climates. Within the borders of the Empire, cases of this disease are extremely rare. Typically, the afflicted are pilgrims visiting southern countries for religious purposes or merchants involved in trade with tropical lands. The virus rapidly affects the lungs, leading to breathing difficulties. The heart muscle is then targeted, and at this stage, the disease is practically incurable.",
        ],
        riskGroups: "Pilgrims, traders, travelers visiting tropical countries.",
        showcaseSymptoms: ["Dystrophy"],
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
        name: "Burning Fever",
        description: [
            "A highly contagious disease caused by the neurolcera virus. Transmitted through contact and breathing.",
            "Initially, the disease presents with fever, headache, and abdominal pain. Later, ulcers and eczema appear on the skin. Itchy herpetic rashes are observed. The patient experiences psychosis. Frequent fatal outcomes among densely living and working population.",
        ],
        riskGroups: "People living in crowded conditions, people living in unsanitary conditions.",
        showcaseSymptoms: ["Ulcers", "Eczema", "Lip lesions"],
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
        description: [
            "A chronic infectious disease. Mainly prevalent in countries with average to low living standards, where it takes on high mortality rates. The disease is caused by the bacterium Mycobacterium tuberculosis, for which humans are the main reservoir. It primarily affects the lungs and is transmitted through coughing, singing, and other respiratory actions. ",
            "Initially, patients complain of muscle weakness and weight loss. Cough and night fever are often among the initial symptoms. Skin dryness is present. In severe cases, haemoptysis occurs. High case fatality rate.",
        ],
        riskGroups: "Children, people with weakened immunity, smokers, drug addicts.",
        showcaseSymptoms: ["Dystrophy", "Ichthyosis"],
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
        description: [
            "An infectious disease caused by bacteria found in sweet fruits and berries. The presumed natural reservoir is fruit-worm larvae.",
            "In the early stages, the primary symptoms are muscle weakness and chest pain, as the disease targets heart tissue. This is followed by gradual deterioration of vision and hearing. In later stages, a black rash appears, blood vessels darken—primarily on the hands and feet—and the shape of the pupil changes.",
        ],
        riskGroups: "Peasants, gardeners, fruit vendors, cooks, and berry pickers.",
        showcaseSymptoms: ["Rash", "Vein damage"],
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
        description: [
            "Liver necrosis. Can be caused by viral infection. It can also develop in individuals who abuse alcohol or drugs.",
            "The preicteric phase of hepatitis is characterized by weight loss, nausea, and diarrhea. Sometimes skin itching and eczema occur. The icteric phase is marked by jaundice, with previous symptoms gradually regressing. The patient complains of pain in the liver area. Poor hygiene and substance abuse significantly increase the risk of death. Fatal in acute disease.",
        ],
        riskGroups: "Alcoholics, drug addicts, people with autoimmune disorders.",
        showcaseSymptoms: ["Yellowing of the skin", "Dystrophy", "Eczema"],
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
        description: [
            "An acute respiratory disease caused by the influenza virus. Affects the respiratory tract. Considered the most severe among acute respiratory viral infections.",
            "The disease manifests suddenly with muscle weakness, fever, cough, sore throat, severe headache, and photophobia. Upper respiratory tract involvement starts with cough, chest pain, and runny nose. Later, throat pain, shortness of breath, and hoarseness appear. Rare strains of influenza can have gastrointestinal symptoms. Mortality from influenza increases in crowded conditions or during epidemics.",
        ],
        riskGroups: "Pregnant women, smokers, people living in crowded conditions.",
        showcaseSymptoms: ["Redness around the nose", "Cough", "Sore throat"],
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
        description: [
            "Infection often found in sewage and stagnant water bodies. It can also be present in fish tissues. The virus alters the blood's chemical composition, resulting in the darkening of blood vessels in the eyes and throughout the body's circulatory system. Hallucinations and breathing difficulties in patients may indicate brain damage, and therefore an almost inevitable fatal outcome.",
        ],
        riskGroups:
            "People interacting with specific steppe water bodies of Gorkhon (washerwomen, shepherds, steppe dwellers).",
        showcaseSymptoms: ["Vein damage", "Darkened eye capillaries", "Cyanosis"],
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
        description: [
            "A natural focal disease caused by Yersinia pestis bacteria. Infection occurs through contact with infected patients, contaminated water, or mosquito bites carrying the bacteria.",
            "The infected experience muscle weakness, headache, and in some cases, dizziness. The bite area becomes itchy. Later, a rash with ulcer formation appears on the body. The patient experiences constant itching; ulcers may bleed. Compromised immunity and constant scratching of the ulcers can lead to complications and often death.",
        ],
        riskGroups: "People living in crowded conditions.",
        showcaseSymptoms: ["Insect bites", "Ulcers"],
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
        description: [
            "A highly infectious viral disease with a very high transmission rate. It is marked by fever, inflammation of mucous tissues, conjunctivitis, and skin rash. The Metropolitan Infectionists Society suggests cattle as the virus source, but this theory doesn't have the unanimous support of the medical community. If the body overcomes the disease, then immunity develops, preventing future infections. However, fatal outcomes are possible, especially for malnourished patients without access to proper treatment and care.",
        ],
        riskGroups:
            "Children, as well as people spending a lot of time with children (teachers, mothers, mentors).",
        showcaseSymptoms: ["Skin redness", "Red eyes", "Sore throat"],
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
        description: [
            "A disease caused by a group of viruses, varying with the epidemic focus. Humans contract the virus from animals and their waste.",
            "The disease begins acutely with fever, rapid heartbeat, nausea, and/or vomiting. Accompanied by headache and photophobia. After 3 days, a rash appears on the skin and facial flushing becomes evident. The disease causes internal bleeding, leading to patient's death.",
        ],
        riskGroups: "People in contact with animals, rural residents.",
        showcaseSymptoms: ["Skin redness", "Rash"],
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
        description: [
            "An infectious disease caused by consuming water from contaminated steppe sources. The initial blow of the illness affects the human nervous system. In the next stage, it manifests through gastric disorders and ulcerative lesions on the lips. Subsequently, the patient loses appetite and experiences obsessive hallucinations. In advanced cases, breathing difficulties and deafness are observed, and at this stage, a fatal outcome is almost inevitable.",
        ],
        riskGroups:
            "People interacting with the waters of Gorkhon (washerwomen, water carriers, shepherds, steppe dwellers).",
        showcaseSymptoms: ["Redness around the nose", "Lip lesions"],
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
        description: [
            "An infectious disease resulting from skin infections caused by the fungus hyacinthum petasum. The fungus is typical for eastern and southern provinces; cases of infection in the Empire's north are unknown. Presumably, the fungus affects impoverished people weakened by malnutrition. However, native steppe peoples seem to possess a certain immunity to this fungus. Northerners moving to steppe provinces lack such immunity and are more frequently affected. The disease starts with localized skin lesions that can later cover a significant portion of the patient's skin. Untreated cases lead to exhaustion, digestive system disorders, and damage to mucous membranes. All discharges from infected individuals are contagious, and patients require isolation and care with enhanced nutrition.",
        ],
        riskGroups: "Malnutritioned people, migrants to steppe provinces.",
        showcaseSymptoms: ["Ichthyosis", "Dystrophy", "Lip lesions"],
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
        description: [
            "A natural focal fungal infection. Infection occurs through inhaling fungal spores present on steppe grass or as mold.",
            "The disease primarily develops in the lungs; patients complain of shortness of breath and rapid heartbeat. Irritation of mucous membranes is observed, manifested as throat pain and eye redness. In severe cases of intoxication, patients experience joint pain. Ichthyosis develops. The risk of fatality manifests if the case is advanced, when the patient can't move on their own.",
        ],
        riskGroups: "Inhabitants of the steppe.",
        showcaseSymptoms: ["Sore throat", "Red eyes", "Ichthyosis"],
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
        description: [
            "A viral disease caused by bites from the golden herb fly (Pluma herba aurea musca). A characteristic green rash appears around the bite area, and the disease progresses to affect the gastric mucosa, leading to vomiting and nausea. Some patients lose the ability to digest food normally and can only tolerate broths and liquid porridge. Symptoms also include extreme muscle weakness, exhaustion, and breathing difficulties. A fatal outcome is highly likely.",
        ],
        riskGroups:
            "People spending extensive period of time in the steppe, especially inhabitants of the steppe, shepherds, reapers, herbalists.",
        showcaseSymptoms: ["Rash", "Insect bites", "Dystrophy"],
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
        description: [
            "A disease characterized by excessive skin cornification and densification. Infection occurs through skin contact with mycobacteria found in steppe flora.",
            "The disease starts with skin dryness, peeling, and itching. Subsequently, the skin thickens, resembling large petrified reptile scales. Itching on such skin disappears. Nonfatal.",
        ],
        riskGroups: "Travelers, inhabitants of the steppe.",
        showcaseSymptoms: ["Ichthyosis", "Red eyes"],
        symptoms: ["Photophobia", "Stone disease", "Slow pulse"],
    },
    {
        name: "Tularemia",
        description: [
            "An infectious disease transmitted through food, contact with rodents, and insect bites.",
            "The onset is sudden, with fever, weakness, nausea, vomiting, diarrhea, and headache. Hallucinations are observed in some patients. Ulcers and/or redness then appear on the skin. It can also affect the eyes. Moderate mortality risk if left untreated. Immunity is permanent for recovered individuals. Not contagious from person to person.",
        ],
        riskGroups: "Impoverished people, inhabitants of the steppe.",
        showcaseSymptoms: ["Ulcers", "Red eyes", "Skin redness"],
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
        description: [
            'Infection by microorganisms found in twyre sprouts and products derived from twyre. Or a consequence of abusing twyre-based alcohol products ("twyrine").',
            'Patients experience muscle weakness, sweating, depressed mental state, migraines, and dizziness. Often accompanied by gastrointestinal symptoms. After 8-12 hours of exacerbation, hallucinations, photophobia, and seizures frequently manifest. Allergic reactions such as skin reddening/yellowing may occur. In more severe cases of intoxication, "twyrine" (epileptic) seizures occur. In extreme cases, it can lead to breathing difficulties, coma, and death.',
        ],
        riskGroups: "Alcoholics, inhabitants of the steppe.",
        showcaseSymptoms: ["Yellowing of the skin", "Red eyes", "Vein damage"],
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

const symptomImageVariants = {
    "Chest pain": ["sympt_chest_pain-1.png"],
    Cough: ["sympt_cough-1.png"],
    Cyanosis: ["sympt_cyanosis-1.png", "sympt_cyanosis-2.png"],
    Dystrophy: ["sympt_dystrophy-1.png", "sympt_dystrophy-2.png"],
    Eczema: ["sympt_eczema-1.png"],
    "Darkened eye capillaries": ["sympt_eye_capillaries-1.png"],
    Haemoptysis: ["sympt_haemoptysis-1.png"],
    Headache: ["sympt_headache-1.png"],
    Hematomas: ["sympt_hematomas-1.png"],
    Ichthyosis: ["sympt_ichtyosis-1.png", "sympt_ichtyosis-2.png"],
    "Insect bites": ["sympt_insect_bites-1.png"],
    "Lip lesions": ["sympt_lip_lesions-1.png", "sympt_lip_lesions_2.png"],
    "Loss of coordination": ["sympt_loss_coordination-1.png"],
    "Redness around the nose": ["sympt_nose_redness-1.png"],
    "Irregular pupil shape": ["sympt_pupil_shape-1.png"],
    Rash: ["sympt_rash-1.png", "sympt_rash-2.png", "sympt_rash-3.png"],
    "Red eyes": ["sympt_red_eyes-1.png"],
    "Skin redness": ["sympt_skin_redness-1.png", "sympt_skin_redness-2.png"],
    "Yellowing of the skin": ["sympt_skin_yellowing-1.png", "sympt_skin_yellowing-2.png"],
    "Sore throat": ["sympt_sore_throat-1.png"],
    "Stone disease": ["sympt_stone_disease-1.png"],
    Ulcers: ["sympt_ulcers-1.png"],
    "Vein damage": [
        "sympt_vein_damage-1.png",
        "sympt_vein_damage-2.png",
        "sympt_vein_damage-3.png",
    ],
};

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
    const centeredTop =
        anchorRect.top - pageRect.top + anchorRect.height / 2 - tooltipRect.height / 2;
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

function hashString(value) {
    const text = String(value ?? "");
    let hash = 2166136261;

    for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0 || 1;
}

function createSeededRandom(seedValue) {
    let seed = seedValue >>> 0;

    return () => {
        seed += 0x6d2b79f5;
        let next = Math.imul(seed ^ (seed >>> 15), seed | 1);
        next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
        return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
    };
}

function createGameSeed(patientRecords = []) {
    const base = patientRecords
        .map((patient) =>
            [
                patient.id,
                patient.name,
                patient.age,
                patient.photo,
                patient.occupation,
                patient.residence,
            ].join("|"),
        )
        .join("::");

    return hashString(base || "pathologic-3");
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
        diagnosisLocked: false,
        stampState: "hidden",
        stampAnimation: "",
        stampNextState: "",
        stampNextAnimation: "",
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
    const isDiagnosisLocked = !state.showAllPatients && !!patient?.diagnosisLocked;

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
                  <button
                    class="diagnosis-question-mark"
                    type="button"
                    aria-label="Open ${escapeAttribute(diagnosis.name)} details"
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
    elements.diagnosisDetailModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("diagnosis-detail-open");
}

function openDiagnosisDetail(diagnosisName) {
    const diagnosis = getDiagnosisByName(diagnosisName);
    if (!diagnosis || !elements.diagnosisDetailModal) return;

    state.diagnosisDetailName = diagnosis.name;
    renderDiagnosisDetail();

    elements.diagnosisDetailModal.hidden = false;
    elements.diagnosisDetailModal.setAttribute("aria-hidden", "false");
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
                    <img class="diagnosis-detail-group-icon" src="${group.icon}" alt="" aria-hidden="true" />
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
    renderStamp();
    renderDiagnosisDetail();
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
    if (tooltipState.activeAnchor) {
        positionFloatingSymptomTooltip(tooltipState.activeAnchor);
    }
});

window.addEventListener("resize", () => {
    if (tooltipState.activeAnchor) {
        positionFloatingSymptomTooltip(tooltipState.activeAnchor);
    }
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
        const patient = initializePatientRecord(createRandomPatient(existingIds));
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
