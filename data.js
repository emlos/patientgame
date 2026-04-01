export const APPENDABLE_LINE_FIELDS = new Set(["harmfulHabits", "clinicalPicture"]);
export const EXTRA_LINE_COUNT = 2;
export const INLINE_GAP_MIN = 2;
export const INLINE_GAP_MAX = 6;

export const INITIAL_PATIENT_COUNT = 3;

//TODO: add toottips to symptoms
export const symptomGroups = [
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

export const diagnoses = [
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
        symptoms: [
            "Red eyes",
            "Visual Impairment",
            "Photophobia",
            "Hearing Impairment",
            "Stone disease",
            "Itchy skin",
            "Slow pulse",
        ],
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
    {
        name: "Cholera",
        description: [
            "An acute intestinal infection caused by contaminated water or food. Outbreaks flourish where wells, rivers, and storage vessels are fouled by human waste.",
            "The disease begins suddenly with violent diarrhea and repeated vomiting. The patient rapidly loses strength and bodily fluids; the pulse quickens, the face sharpens, and the extremities may turn blue from collapse. Without rehydration, death can follow within hours.",
        ],
        riskGroups:
            "People drinking unsafe water, riverbank dwellers, refugees, prisoners, and inhabitants of overcrowded rural settlements.",
        showcaseSymptoms: ["Cyanosis", "Headache"],
        symptoms: [
            "Headache",
            "Cyanosis",
            "Rapid pulse",
            "Weakness",
            "Severe pallor",
            "Diarrhea",
            "Loss of appetite",
            "Nausea and vomiting",
        ],
        custom: true,
    },
    {
        name: "Typhus",
        description: [
            "A severe infectious disease spread by body lice. It appears where people are crowded together, seldom washed, and forced to share bedding and clothing.",
            "The illness starts with fever, profound weakness, and splitting headache. Soon the patient develops red, inflamed eyes, becomes unsteady and confused, and a rash spreads across the skin. In grave cases delirium and collapse follow.",
        ],
        riskGroups:
            "People living in crowded, impoverished, or war-disrupted conditions; vagrants, prisoners, laborers, and refugees.",
        showcaseSymptoms: ["Rash", "Skin redness", "Red eyes"],
        symptoms: [
            "Headache",
            "Hallucinations",
            "Memory lapses",
            "Loss of coordination",
            "Red eyes",
            "Photophobia",
            "Rash",
            "Skin redness",
            "Weakness",
            "Fever",
        ],
        custom: true,
    },
    {
        name: "Favus",
        description: [
            "A chronic fungal disease of the skin, most often affecting the scalp. It spreads through prolonged close contact, shared bedding, hats, combs, and poor hygiene.",
            "At first the patient complains of itching and irritated skin. With time, crusted lesions and dry scaling develop, the skin becomes inflamed, and neglected cases lead to wasting and weakness. The disease lingers for months or years if untreated.",
        ],
        riskGroups:
            "Children in crowded households, impoverished rural families, and people sharing bedding or clothing.",
        showcaseSymptoms: ["Ichthyosis", "Skin redness"],
        symptoms: ["Itchy skin", "Ichthyosis", "Eczema", "Skin redness", "Dystrophy", "Weakness"],
        custom: true,
    },
    {
        name: "Pellagra",
        description: [
            "A wasting disease caused by prolonged poor diet, especially one dependent on badly prepared maize and lacking meat, milk, or legumes. It is not contagious, but flourishes where poverty dictates the table.",
            "The patient first grows weak and thin, then develops diarrhea and a red, rough rash on exposed skin. In advanced stages the mind is affected: memory falters, coordination worsens, and some patients become delirious or hallucinate.",
        ],
        riskGroups:
            "Poor peasants, widowed or neglected villagers, alcoholics, and people surviving on monotonous grain diets.",
        showcaseSymptoms: ["Skin redness", "Rash", "Dystrophy"],
        symptoms: [
            "Memory lapses",
            "Hallucinations",
            "Loss of coordination",
            "Weakness",
            "Skin redness",
            "Rash",
            "Dystrophy",
            "Diarrhea",
        ],
        custom: true,
    },
    {
        name: "Ergotism",
        description: [
            "A poisoning caused by eating rye or other grain infested with ergot fungus. It appears after bad harvest years, damp storage, or prolonged reliance on spoiled bread.",
            "Some patients suffer the convulsive form, with headache, vomiting, loss of coordination, and terrifying visions. Others develop a gangrenous form: the blood supply to the limbs fails, the flesh darkens, pain becomes unbearable, and ulcers may appear. Severe cases end in madness, maiming, or death.",
        ],
        riskGroups:
            "Peasants and laborers dependent on stored rye, especially in poor harvest years.",
        showcaseSymptoms: ["Vein damage", "Cyanosis", "Ulcers"],
        symptoms: [
            "Headache",
            "Hallucinations",
            "Memory lapses",
            "Loss of coordination",
            "Nausea and vomiting",
            "Weakness",
            "Cyanosis",
            "Vein damage",
            "Ulcers",
        ],
        custom: true,
    },
].sort((left, right) => {
    return left.name.localeCompare(right.name);
});

export const PATIENT_GENDERS = Object.freeze({
    FEMALE: "female",
    MALE: "male",
});

export const PATIENT_PROFILE_TAGS = Object.freeze({
    ALCOHOL_USE: "alcohol_use",
    ALLERGEN_EXPOSURE: "allergen_exposure",
    ANIMAL_EXPOSURE: "animal_exposure",
    BLOOD_EXPOSURE: "blood_exposure",
    BRAWLER: "brawler",
    CHEMICAL_EXPOSURE: "chemical_exposure",
    COLD_EXPOSURE: "cold_exposure",
    CROWD_EXPOSURE: "crowd_exposure",
    DUST_EXPOSURE: "dust_exposure",
    EYE_STRAIN: "eye_strain",
    HEAD_INJURY: "head_injury",
    HEARING_WEAR: "hearing_wear",
    HEAT_EXPOSURE: "heat_exposure",
    HEAVY_LABOR: "heavy_labor",
    HEAVY_MACHINERY: "heavy_machinery",
    HOME_SMOKE: "home_smoke",
    HORMONAL_FLARES: "hormonal_flares",
    INSECT_EXPOSURE: "insect_exposure",
    MALNOURISHED: "malnourished",
    MEMORY_ISSUES: "memory_issues",
    MIGRAINES: "migraines",
    NIGHT_WORK: "night_work",
    POOR_HYGIENE: "poor_hygiene",
    PREGNANCY: "pregnancy",
    RODENT_EXPOSURE: "rodent_exposure",
    SEWAGE_EXPOSURE: "sewage_exposure",
    SMOKER: "smoker",
    SOIL_EXPOSURE: "soil_exposure",
    STEPPE_EXPOSURE: "steppe_exposure",
    STREET_LIFE: "street_life",
    WATER_EXPOSURE: "water_exposure",
    WEAK_CONSTITUTION: "weak_constitution",
    WEARS_GLASSES: "wears_glasses",
    CHRONIC_HEARTBURN: "chronic_heartburn",
});

export const PATIENT_SYMPTOM_SOURCE_TYPES = Object.freeze({
    TRUE_DIAGNOSIS: "trueDiagnosis",
    HARMFUL_HABIT: "harmfulHabit",
    OCCUPATION: "occupation",
    AGE: "age",
    LIFE_EVENT: "lifeEvent",
});

export const RANDOM_PATIENT_NAMES = [
    { value: "Anna", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Altyn", genders: [PATIENT_GENDERS.FEMALE, PATIENT_GENDERS.MALE] },
    { value: "Toya", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Khulan", genders: [PATIENT_GENDERS.FEMALE, PATIENT_GENDERS.MALE] },
    { value: "Lun", genders: [PATIENT_GENDERS.FEMALE, PATIENT_GENDERS.MALE] },
    { value: "Burduk", genders: [PATIENT_GENDERS.MALE] },
    { value: "Tolkowy", genders: [PATIENT_GENDERS.MALE] },
    { value: "Oktai", genders: [PATIENT_GENDERS.MALE] },
    { value: "Laska", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Mariya", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Mishka", genders: [PATIENT_GENDERS.FEMALE, PATIENT_GENDERS.MALE] },
    { value: "Nara", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Nika", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Bobok", genders: [PATIENT_GENDERS.FEMALE, PATIENT_GENDERS.MALE] },
    { value: "Pavel", genders: [PATIENT_GENDERS.MALE] },
    { value: "Shchur", genders: [PATIENT_GENDERS.MALE] },
    { value: "Lyuta", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Fila", genders: [PATIENT_GENDERS.FEMALE, PATIENT_GENDERS.MALE] },
    { value: "Vera", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Yargi", genders: [PATIENT_GENDERS.MALE] },
    { value: "Olusha", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Zhytochnik", genders: [PATIENT_GENDERS.MALE] },
    { value: "Yunat", genders: [PATIENT_GENDERS.MALE] },
    { value: "Emilia", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Sotnik", genders: [PATIENT_GENDERS.MALE] },
    { value: "Tuutei", genders: [PATIENT_GENDERS.FEMALE, PATIENT_GENDERS.MALE] },
    { value: "Voronok", genders: [PATIENT_GENDERS.MALE] },
    { value: "Astrild", genders: [PATIENT_GENDERS.FEMALE, PATIENT_GENDERS.MALE] },
    { value: "Chernyak", genders: [PATIENT_GENDERS.MALE] },
    { value: "Myrosya", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Petrel", genders: [PATIENT_GENDERS.MALE] },
    { value: "Khariton", genders: [PATIENT_GENDERS.MALE] },
    { value: "Aristarkh", genders: [PATIENT_GENDERS.MALE] },
    { value: "Sakh Men", genders: [PATIENT_GENDERS.FEMALE, PATIENT_GENDERS.MALE] },
    { value: "Poshinok", genders: [PATIENT_GENDERS.MALE] },
    { value: "Kira", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Marfa", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Lyudmila", genders: [PATIENT_GENDERS.FEMALE] },
    { value: "Yegor", genders: [PATIENT_GENDERS.MALE] },
    { value: "Makar", genders: [PATIENT_GENDERS.MALE] },
    { value: "Dmitry", genders: [PATIENT_GENDERS.MALE] },
    { value: "Semyon", genders: [PATIENT_GENDERS.MALE] },
    { value: "Konstantin", genders: [PATIENT_GENDERS.MALE] },
    { value: "Sergey", genders: [PATIENT_GENDERS.MALE] },
    { value: "Ilya", genders: [PATIENT_GENDERS.MALE] },
];

export const RANDOM_PATIENT_LAST_NAMES = [
    "Ankudinov",
    "Baskakov",
    "Gantimurov",
    "Goncharov",
    "Grishin",
    "Kabanov",
    "Karmin",
    "Kharitonov",
    "Kudrin",
    "Mishchenko",
    "Sidorenko",
    "Naraev",
    "Sablin",
    "Shchurov",
    "Sotnik",
    "Yunatov",
    "Zhytochnikov",
    "Lyut",
    "Voronkov",
    "Chernyakov",
];

export const RANDOM_MARITAL_STATUSES = [
    { value: "single", weight: 50 },
    { value: "married", weight: 20 },
    { value: "widowed", weight: 10 },
    { value: "betrothed", weight: 10 },
    { value: "divorced", weight: 5 },
];

//todo: make values into arrays, for multiple label variants
export const RANDOM_OCCUPATIONS = [
    {
        value: "abbatoir clerk",
        tags: [PATIENT_PROFILE_TAGS.ANIMAL_EXPOSURE, PATIENT_PROFILE_TAGS.BLOOD_EXPOSURE],
    },
    {
        value: "apothecary assistant",
        tags: [PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE, PATIENT_PROFILE_TAGS.EYE_STRAIN],
    },
    {
        value: "bakery hand",
        tags: [PATIENT_PROFILE_TAGS.HEAT_EXPOSURE, PATIENT_PROFILE_TAGS.DUST_EXPOSURE],
    },
    { value: "bookkeeper", tags: [PATIENT_PROFILE_TAGS.EYE_STRAIN] },
    {
        value: "carter",
        tags: [PATIENT_PROFILE_TAGS.HEAVY_LABOR, PATIENT_PROFILE_TAGS.COLD_EXPOSURE],
    },
    {
        value: "chimney sweep",
        tags: [PATIENT_PROFILE_TAGS.DUST_EXPOSURE, PATIENT_PROFILE_TAGS.HOME_SMOKE],
    },
    {
        value: "dock porter",
        tags: [PATIENT_PROFILE_TAGS.HEAVY_LABOR, PATIENT_PROFILE_TAGS.WATER_EXPOSURE],
    },
    {
        value: "dressmaker",
        tags: [PATIENT_PROFILE_TAGS.EYE_STRAIN, PATIENT_PROFILE_TAGS.ALLERGEN_EXPOSURE],
    },
    {
        value: "factory stoker",
        tags: [PATIENT_PROFILE_TAGS.HEAT_EXPOSURE, PATIENT_PROFILE_TAGS.HOME_SMOKE],
    },
    {
        value: "ferryman",
        tags: [PATIENT_PROFILE_TAGS.WATER_EXPOSURE, PATIENT_PROFILE_TAGS.COLD_EXPOSURE],
    },
    {
        value: "gravedigger's assistant",
        tags: [
            PATIENT_PROFILE_TAGS.SOIL_EXPOSURE,
            PATIENT_PROFILE_TAGS.HEAVY_LABOR,
            PATIENT_PROFILE_TAGS.RODENT_EXPOSURE,
        ],
    },
    {
        value: "laundress",
        tags: [PATIENT_PROFILE_TAGS.WATER_EXPOSURE, PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE],
    },
    {
        value: "night watchman",
        tags: [PATIENT_PROFILE_TAGS.NIGHT_WORK, PATIENT_PROFILE_TAGS.COLD_EXPOSURE],
    },
    {
        value: "rail yard mechanic",
        tags: [
            PATIENT_PROFILE_TAGS.HEAVY_MACHINERY,
            PATIENT_PROFILE_TAGS.HEAVY_LABOR,
            PATIENT_PROFILE_TAGS.HEARING_WEAR,
        ],
    },
    {
        value: "schoolteacher",
        tags: [PATIENT_PROFILE_TAGS.EYE_STRAIN, PATIENT_PROFILE_TAGS.CROWD_EXPOSURE],
    },
    {
        value: "seamstress",
        tags: [PATIENT_PROFILE_TAGS.EYE_STRAIN, PATIENT_PROFILE_TAGS.DUST_EXPOSURE],
    },
    {
        value: "soap boiler",
        tags: [PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE, PATIENT_PROFILE_TAGS.HEAT_EXPOSURE],
    },
    {
        value: "station clerk",
        tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE, PATIENT_PROFILE_TAGS.EYE_STRAIN],
    },
    {
        value: "tallow renderer",
        tags: [
            PATIENT_PROFILE_TAGS.ANIMAL_EXPOSURE,
            PATIENT_PROFILE_TAGS.HOME_SMOKE,
            PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE,
        ],
    },
    {
        value: "tannery worker",
        tags: [PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE, PATIENT_PROFILE_TAGS.ANIMAL_EXPOSURE],
    },
    {
        value: "town orderly",
        tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE, PATIENT_PROFILE_TAGS.SEWAGE_EXPOSURE],
    },
    {
        value: "warehouse tallyman",
        tags: [PATIENT_PROFILE_TAGS.DUST_EXPOSURE, PATIENT_PROFILE_TAGS.EYE_STRAIN],
    },
    {
        value: "aspiring herb bride",
        tags: [
            PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE,
            PATIENT_PROFILE_TAGS.ALLERGEN_EXPOSURE,
            PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE,
        ],
    },
    {
        value: "works for Stamatin",
        tags: [PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE, PATIENT_PROFILE_TAGS.DUST_EXPOSURE],
    },
    { value: "dancer", tags: [PATIENT_PROFILE_TAGS.HEAVY_LABOR, PATIENT_PROFILE_TAGS.HEAD_INJURY] },
    { value: "drunk", tags: [PATIENT_PROFILE_TAGS.ALCOHOL_USE, PATIENT_PROFILE_TAGS.STREET_LIFE] },
    {
        value: "shopkeeper",
        tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE, PATIENT_PROFILE_TAGS.EYE_STRAIN],
    },
    {
        value: "dyer",
        tags: [PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE, PATIENT_PROFILE_TAGS.DUST_EXPOSURE],
    },
    {
        value: "street sweeper",
        tags: [
            PATIENT_PROFILE_TAGS.DUST_EXPOSURE,
            PATIENT_PROFILE_TAGS.COLD_EXPOSURE,
            PATIENT_PROFILE_TAGS.SEWAGE_EXPOSURE,
        ],
    },
    {
        value: "cutpurse thug",
        tags: [
            PATIENT_PROFILE_TAGS.BRAWLER,
            PATIENT_PROFILE_TAGS.HEAD_INJURY,
            PATIENT_PROFILE_TAGS.STREET_LIFE,
        ],
    },
    {
        value: "Termitary guard",
        tags: [
            PATIENT_PROFILE_TAGS.CROWD_EXPOSURE,
            PATIENT_PROFILE_TAGS.BRAWLER,
            PATIENT_PROFILE_TAGS.NIGHT_WORK,
        ],
    },
    {
        value: "vagrant",
        tags: [
            PATIENT_PROFILE_TAGS.STREET_LIFE,
            PATIENT_PROFILE_TAGS.POOR_HYGIENE,
            PATIENT_PROFILE_TAGS.MALNOURISHED,
        ],
    },
    {
        value: "apprentice herbalist",
        tags: [
            PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE,
            PATIENT_PROFILE_TAGS.ALLERGEN_EXPOSURE,
            PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE,
        ],
    },
    {
        value: "apprentice midwife",
        tags: [
            PATIENT_PROFILE_TAGS.CROWD_EXPOSURE,
            PATIENT_PROFILE_TAGS.BLOOD_EXPOSURE,
            PATIENT_PROFILE_TAGS.NIGHT_WORK,
        ],
    },
    { value: "manual laborer", tags: [PATIENT_PROFILE_TAGS.HEAVY_LABOR] },
    {
        value: "bandit",
        tags: [
            PATIENT_PROFILE_TAGS.BRAWLER,
            PATIENT_PROFILE_TAGS.HEAD_INJURY,
            PATIENT_PROFILE_TAGS.STREET_LIFE,
        ],
    },
    {
        value: "wannabe scientist",
        tags: [PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE, PATIENT_PROFILE_TAGS.EYE_STRAIN],
    },
    {
        value: "wannabe artist",
        tags: [PATIENT_PROFILE_TAGS.EYE_STRAIN, PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE],
    },
    {
        value: "'artist'",
        tags: [
            PATIENT_PROFILE_TAGS.EYE_STRAIN,
            PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE,
            PATIENT_PROFILE_TAGS.ALCOHOL_USE,
        ],
    },
    {
        value: "studies botany",
        tags: [
            PATIENT_PROFILE_TAGS.ALLERGEN_EXPOSURE,
            PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE,
            PATIENT_PROFILE_TAGS.EYE_STRAIN,
        ],
    },
    {
        value: "studies anatomy",
        tags: [
            PATIENT_PROFILE_TAGS.EYE_STRAIN,
            PATIENT_PROFILE_TAGS.BLOOD_EXPOSURE,
            PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE,
        ],
    },
    {
        value: "studies medicine",
        tags: [
            PATIENT_PROFILE_TAGS.CROWD_EXPOSURE,
            PATIENT_PROFILE_TAGS.EYE_STRAIN,
            PATIENT_PROFILE_TAGS.NIGHT_WORK,
        ],
    },
    {
        value: "shop-floor worker",
        tags: [
            PATIENT_PROFILE_TAGS.HEAVY_MACHINERY,
            PATIENT_PROFILE_TAGS.DUST_EXPOSURE,
            PATIENT_PROFILE_TAGS.HEARING_WEAR,
        ],
    },
    {
        value: "charlatan healer",
        tags: [PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE, PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE],
    },
    {
        value: "dealer",
        tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE, PATIENT_PROFILE_TAGS.STREET_LIFE],
    },
    {
        value: "housewife",
        tags: [PATIENT_PROFILE_TAGS.HOME_SMOKE, PATIENT_PROFILE_TAGS.ALLERGEN_EXPOSURE],
    },
    {
        value: "does not remember",
        tags: [PATIENT_PROFILE_TAGS.MEMORY_ISSUES],
        weight: 0.2,
        requiresAnySymptoms: ["Memory lapses"],
        displayOverrideOnly: true,
    },
    {
        value: "unclear (?)",
        tags: [PATIENT_PROFILE_TAGS.MEMORY_ISSUES],
        weight: 0.15,
        requiresAnySymptoms: ["Memory lapses", "Hallucinations"],
        displayOverrideOnly: true,
    },
    {
        value: "academy student",
        tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE, PATIENT_PROFILE_TAGS.EYE_STRAIN],
    },
    {
        value: "herb bride",
        tags: [
            PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE,
            PATIENT_PROFILE_TAGS.ALLERGEN_EXPOSURE,
            PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE,
        ],
    },
    { value: "accountant", tags: [PATIENT_PROFILE_TAGS.EYE_STRAIN] },
    {
        value: "solider",
        tags: [
            PATIENT_PROFILE_TAGS.BRAWLER,
            PATIENT_PROFILE_TAGS.HEAVY_LABOR,
            PATIENT_PROFILE_TAGS.HEAD_INJURY,
        ],
    },
    {
        value: "teacher",
        tags: [PATIENT_PROFILE_TAGS.EYE_STRAIN, PATIENT_PROFILE_TAGS.CROWD_EXPOSURE],
    },
    {
        value: "keeps bees",
        tags: [PATIENT_PROFILE_TAGS.INSECT_EXPOSURE, PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE],
    },
];

//todo: make values into arrays of possible labels, unless possible, no label used twice for the same habit
export const RANDOM_HARMFUL_HABITS = [
    { value: "smoker", tags: [PATIENT_PROFILE_TAGS.SMOKER] },
    { value: "drinks heavily", tags: [PATIENT_PROFILE_TAGS.ALCOHOL_USE] },
    {
        value: "gets into fights",
        tags: [PATIENT_PROFILE_TAGS.BRAWLER, PATIENT_PROFILE_TAGS.HEAD_INJURY],
    },
    {
        value: "works and sleeps in dust",
        tags: [PATIENT_PROFILE_TAGS.DUST_EXPOSURE, PATIENT_PROFILE_TAGS.HOME_SMOKE],
    },
    {
        value: "eats badly and irregularly",
        tags: [PATIENT_PROFILE_TAGS.MALNOURISHED, PATIENT_PROFILE_TAGS.CHRONIC_HEARTBURN],
    },
    { value: "lives in stale indoor smoke", tags: [PATIENT_PROFILE_TAGS.HOME_SMOKE] },
    { value: "uses dubious powders and tinctures", tags: [PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE] },
    { value: "poor hygiene", tags: [PATIENT_PROFILE_TAGS.POOR_HYGIENE] },
    {
        value: "spends nights out in the cold",
        tags: [PATIENT_PROFILE_TAGS.COLD_EXPOSURE, PATIENT_PROFILE_TAGS.NIGHT_WORK],
    },
    {
        value: "lives from stall food and sour spirits",
        tags: [PATIENT_PROFILE_TAGS.ALCOHOL_USE, PATIENT_PROFILE_TAGS.CHRONIC_HEARTBURN],
    },
];

export const RANDOM_LIFE_EVENTS = [
    { value: "had smallpox as a child", tags: [PATIENT_PROFILE_TAGS.WEAK_CONSTITUTION] },
    { value: "wears spectacles", tags: [PATIENT_PROFILE_TAGS.WEARS_GLASSES] },
    { value: "recent head injury", tags: [PATIENT_PROFILE_TAGS.HEAD_INJURY] },
    { value: "suffers migraines", tags: [PATIENT_PROFILE_TAGS.MIGRAINES] },
    { value: "prone to hormonal eczema", tags: [PATIENT_PROFILE_TAGS.HORMONAL_FLARES] },
    { value: "chronic heartburn", tags: [PATIENT_PROFILE_TAGS.CHRONIC_HEARTBURN] },
    { value: "old hearing damage", tags: [PATIENT_PROFILE_TAGS.HEARING_WEAR], minAge: 24 },
    { value: "frail constitution", tags: [PATIENT_PROFILE_TAGS.WEAK_CONSTITUTION] },
    {
        value: "is pregnant",
        tags: [PATIENT_PROFILE_TAGS.PREGNANCY],
        genders: [PATIENT_GENDERS.FEMALE],
        maxAge: 42,
    },
    { value: "works night shifts", tags: [PATIENT_PROFILE_TAGS.NIGHT_WORK] },
];

export const RANDOM_RESIDENCES = [
    {
        value: "Tanners",
        tags: [PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE, PATIENT_PROFILE_TAGS.CROWD_EXPOSURE],
    },
    {
        value: "Skinners",
        tags: [PATIENT_PROFILE_TAGS.ANIMAL_EXPOSURE, PATIENT_PROFILE_TAGS.CROWD_EXPOSURE],
    },
    { value: "Hindquarters", tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE] },
    {
        value: "Factory",
        tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE, PATIENT_PROFILE_TAGS.DUST_EXPOSURE],
    },
    {
        value: "The Crude Sprawl",
        tags: [
            PATIENT_PROFILE_TAGS.CROWD_EXPOSURE,
            PATIENT_PROFILE_TAGS.POOR_HYGIENE,
            PATIENT_PROFILE_TAGS.STREET_LIFE,
        ],
    },
    { value: "Flank", tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE] },
    { value: "Chine", tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE] },
    { value: "Backbone", tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE] },
    { value: "Marrow", tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE] },
    {
        value: "Gut",
        tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE, PATIENT_PROFILE_TAGS.SEWAGE_EXPOSURE],
    },
    { value: "Maw", tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE] },
    { value: "Spleen", tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE] },
    {
        value: "Warehouses",
        tags: [PATIENT_PROFILE_TAGS.DUST_EXPOSURE, PATIENT_PROFILE_TAGS.CROWD_EXPOSURE],
    },
    { value: "Atrium", tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE] },
    { value: "Bridge Square", tags: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE] },
    {
        value: "Shekhen steppe village",
        tags: [PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE, PATIENT_PROFILE_TAGS.INSECT_EXPOSURE],
    },
    {
        value: "does not remember",
        tags: [PATIENT_PROFILE_TAGS.MEMORY_ISSUES],
        weight: 0.2,
        requiresAnySymptoms: ["Memory lapses"],
        displayOverrideOnly: true,
    },
    {
        value: "no premament residence",
        tags: [PATIENT_PROFILE_TAGS.STREET_LIFE, PATIENT_PROFILE_TAGS.POOR_HYGIENE],
    },
    {
        value: "unclear (?)",
        tags: [PATIENT_PROFILE_TAGS.MEMORY_ISSUES],
        weight: 0.15,
        requiresAnySymptoms: ["Memory lapses", "Hallucinations"],
        displayOverrideOnly: true,
    },
    {
        value: "sleeps on the streets",
        tags: [
            PATIENT_PROFILE_TAGS.STREET_LIFE,
            PATIENT_PROFILE_TAGS.COLD_EXPOSURE,
            PATIENT_PROFILE_TAGS.POOR_HYGIENE,
        ],
    },
];

export const PHOTO_PATHS = Array.from({ length: 24 }, (_, index) => {
    return `assets/patient_${String(index + 1).padStart(2, "0")}.png`;
});

export const DEFAULT_PATIENT_SEED = Date.now().toString();

export const SYMPTOM_NAME_BY_KEY = new Map(
    symptomGroups
        .flatMap((group) => group.symptoms)
        .map((symptom) => [String(symptom).trim().toLowerCase(), symptom]),
);

export const DIAGNOSES_BY_NAME = new Map(
    diagnoses.map((diagnosis) => [
        diagnosis.name,
        {
            ...diagnosis,
            symptoms: (diagnosis.symptoms || []).map(canonicalizeSymptom).filter(Boolean),
        },
    ]),
);

export const DIAGNOSIS_TAG_HINTS = {
    "Acute Bronchopathy": [
        PATIENT_PROFILE_TAGS.SMOKER,
        PATIENT_PROFILE_TAGS.DUST_EXPOSURE,
        PATIENT_PROFILE_TAGS.HOME_SMOKE,
        PATIENT_PROFILE_TAGS.CROWD_EXPOSURE,
        PATIENT_PROFILE_TAGS.COLD_EXPOSURE,
    ],
    "Anemic Vasculopathy": [
        PATIENT_PROFILE_TAGS.SOIL_EXPOSURE,
        PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE,
    ],
    "Bonkowski's Fever": [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE, PATIENT_PROFILE_TAGS.WATER_EXPOSURE],
    "Burning Fever": [PATIENT_PROFILE_TAGS.POOR_HYGIENE, PATIENT_PROFILE_TAGS.CROWD_EXPOSURE],
    Cholera: [
        PATIENT_PROFILE_TAGS.WATER_EXPOSURE,
        PATIENT_PROFILE_TAGS.POOR_HYGIENE,
        PATIENT_PROFILE_TAGS.CROWD_EXPOSURE,
        PATIENT_PROFILE_TAGS.STREET_LIFE,
    ],
    Consumption: [
        PATIENT_PROFILE_TAGS.SMOKER,
        PATIENT_PROFILE_TAGS.DUST_EXPOSURE,
        PATIENT_PROFILE_TAGS.CROWD_EXPOSURE,
        PATIENT_PROFILE_TAGS.MALNOURISHED,
        PATIENT_PROFILE_TAGS.WEAK_CONSTITUTION,
    ],
    Ergotism: [
        PATIENT_PROFILE_TAGS.MALNOURISHED,
        PATIENT_PROFILE_TAGS.ALCOHOL_USE,
        PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE,
        PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE,
    ],
    Favus: [
        PATIENT_PROFILE_TAGS.POOR_HYGIENE,
        PATIENT_PROFILE_TAGS.MALNOURISHED,
        PATIENT_PROFILE_TAGS.STREET_LIFE,
    ],
    "Fruit Typhoid": [
        PATIENT_PROFILE_TAGS.CROWD_EXPOSURE,
        PATIENT_PROFILE_TAGS.WATER_EXPOSURE,
        PATIENT_PROFILE_TAGS.POOR_HYGIENE,
    ],
    Hepatitis: [PATIENT_PROFILE_TAGS.ALCOHOL_USE, PATIENT_PROFILE_TAGS.POOR_HYGIENE],
    Influenza: [
        PATIENT_PROFILE_TAGS.CROWD_EXPOSURE,
        PATIENT_PROFILE_TAGS.SMOKER,
        PATIENT_PROFILE_TAGS.COLD_EXPOSURE,
        PATIENT_PROFILE_TAGS.PREGNANCY,
    ],
    "Ink Syndrome": [PATIENT_PROFILE_TAGS.WATER_EXPOSURE, PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE],
    Lymphotonitis: [PATIENT_PROFILE_TAGS.INSECT_EXPOSURE, PATIENT_PROFILE_TAGS.POOR_HYGIENE],
    Measles: [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE],
    "Nephropathia epidemica": [
        PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE,
        PATIENT_PROFILE_TAGS.POOR_HYGIENE,
    ],
    Pellagra: [PATIENT_PROFILE_TAGS.MALNOURISHED, PATIENT_PROFILE_TAGS.STREET_LIFE],
    "Pulmomucous Syndrome": [
        PATIENT_PROFILE_TAGS.WATER_EXPOSURE,
        PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE,
    ],
    "Serpent Syndrome": [PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE],
    "Steppe Dryness": [PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE, PATIENT_PROFILE_TAGS.DUST_EXPOSURE],
    "Steppe Gastrodermal Fever": [
        PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE,
        PATIENT_PROFILE_TAGS.INSECT_EXPOSURE,
        PATIENT_PROFILE_TAGS.MALNOURISHED,
    ],
    Stoneskin: [PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE, PATIENT_PROFILE_TAGS.WATER_EXPOSURE],
    Tularemia: [
        PATIENT_PROFILE_TAGS.INSECT_EXPOSURE,
        PATIENT_PROFILE_TAGS.ANIMAL_EXPOSURE,
        PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE,
    ],
    "Twyrine Syndrome": [
        PATIENT_PROFILE_TAGS.ALCOHOL_USE,
        PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE,
        PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE,
    ],
    Typhus: [
        PATIENT_PROFILE_TAGS.CROWD_EXPOSURE,
        PATIENT_PROFILE_TAGS.POOR_HYGIENE,
        PATIENT_PROFILE_TAGS.STREET_LIFE,
    ],
};

export const TAG_SYMPTOM_RULES = {
    [PATIENT_PROFILE_TAGS.ALCOHOL_USE]: [
        "Headache",
        "Nausea and vomiting",
        "Weakness",
        "Belching",
        "Burning sensation in the heart",
    ],
    [PATIENT_PROFILE_TAGS.ALLERGEN_EXPOSURE]: [
        "Redness around the nose",
        "Red eyes",
        "Itchy skin",
        "Eczema",
    ],
    [PATIENT_PROFILE_TAGS.ANIMAL_EXPOSURE]: ["Skin redness", "Weakness", "Insect bites"],
    [PATIENT_PROFILE_TAGS.BLOOD_EXPOSURE]: ["Weakness", "Hematomas"],
    [PATIENT_PROFILE_TAGS.BRAWLER]: ["Hematomas", "Headache", "Loss of coordination"],
    [PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE]: [
        "Headache",
        "Nausea and vomiting",
        "Skin redness",
        "Eczema",
        "Cough",
    ],
    [PATIENT_PROFILE_TAGS.COLD_EXPOSURE]: ["Cough", "Weakness", "Joint pain"],
    [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE]: ["Cough", "Fever", "Weakness"],
    [PATIENT_PROFILE_TAGS.DUST_EXPOSURE]: [
        "Cough",
        "Difficulty breathing",
        "Redness around the nose",
        "Photophobia",
    ],
    [PATIENT_PROFILE_TAGS.EYE_STRAIN]: ["Headache", "Visual impairment"],
    [PATIENT_PROFILE_TAGS.HEAD_INJURY]: ["Headache", "Memory lapses", "Loss of coordination"],
    [PATIENT_PROFILE_TAGS.HEARING_WEAR]: ["Hearing impairment"],
    [PATIENT_PROFILE_TAGS.HEAT_EXPOSURE]: ["Weakness", "Headache"],
    [PATIENT_PROFILE_TAGS.HEAVY_LABOR]: ["Weakness", "Joint pain", "Hematomas"],
    [PATIENT_PROFILE_TAGS.HEAVY_MACHINERY]: ["Hearing impairment", "Hematomas", "Weakness"],
    [PATIENT_PROFILE_TAGS.HOME_SMOKE]: ["Cough", "Redness around the nose", "Difficulty breathing"],
    [PATIENT_PROFILE_TAGS.HORMONAL_FLARES]: ["Eczema", "Skin redness", "Itchy skin"],
    [PATIENT_PROFILE_TAGS.INSECT_EXPOSURE]: ["Insect bites", "Skin redness", "Fever"],
    [PATIENT_PROFILE_TAGS.MALNOURISHED]: ["Weakness", "Dystrophy", "Severe pallor"],
    [PATIENT_PROFILE_TAGS.MEMORY_ISSUES]: ["Memory lapses"],
    [PATIENT_PROFILE_TAGS.MIGRAINES]: ["Headache", "Photophobia"],
    [PATIENT_PROFILE_TAGS.NIGHT_WORK]: ["Weakness", "Headache"],
    [PATIENT_PROFILE_TAGS.POOR_HYGIENE]: ["Itchy skin", "Skin redness", "Weakness"],
    [PATIENT_PROFILE_TAGS.PREGNANCY]: ["Heartburn", "Nausea and vomiting", "Weakness"],
    [PATIENT_PROFILE_TAGS.RODENT_EXPOSURE]: ["Fever", "Weakness"],
    [PATIENT_PROFILE_TAGS.SEWAGE_EXPOSURE]: ["Diarrhea", "Nausea and vomiting", "Weakness"],
    [PATIENT_PROFILE_TAGS.SMOKER]: ["Cough", "Difficulty breathing", "Haemoptysis"],
    [PATIENT_PROFILE_TAGS.SOIL_EXPOSURE]: ["Weakness", "Headache", "Hematomas"],
    [PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE]: [
        "Red eyes",
        "Photophobia",
        "Ichthyosis",
        "Insect bites",
    ],
    [PATIENT_PROFILE_TAGS.STREET_LIFE]: ["Weakness", "Severe pallor", "Itchy skin"],
    [PATIENT_PROFILE_TAGS.WATER_EXPOSURE]: ["Red eyes", "Nausea and vomiting", "Cough"],
    [PATIENT_PROFILE_TAGS.WEAK_CONSTITUTION]: ["Weakness", "Severe pallor"],
    [PATIENT_PROFILE_TAGS.WEARS_GLASSES]: ["Visual impairment", "Headache"],
    [PATIENT_PROFILE_TAGS.CHRONIC_HEARTBURN]: [
        "Heartburn",
        "Burning sensation in the heart",
        "Belching",
    ],
};

export const symptomImageVariants = {
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

export function canonicalizeSymptom(symptom) {
    const key = String(symptom || "")
        .trim()
        .toLowerCase();
    return SYMPTOM_NAME_BY_KEY.get(key) || String(symptom || "").trim();
}
