export const APPENDABLE_LINE_FIELDS = new Set(["harmfulHabits", "clinicalPicture"]);
export const EXTRA_LINE_COUNT = 2;
export const INLINE_GAP_MIN = 2;
export const INLINE_GAP_MAX = 6;

export const INITIAL_PATIENT_COUNT = 3;

const createSymptomDefinition = (key, label, tooltip) => Object.freeze({ key, label, tooltip });

export const SYMPTOMS = Object.freeze({
    headache: createSymptomDefinition(
        "headache",
        "Headache",
        "Not to be confused with facial or neck pain. Affects the part of the head above the eyes, ears, and first cervical vertebra. One variety is migraine.",
    ),
    bulimia: createSymptomDefinition(
        "bulimia",
        "Bulimia",
        "A mental disorder manifesting in two opposing tendencies: overeating and the urge to lose weight, for instance, through vomiting or excessive physical exertion.",
    ),
    hallucinations: createSymptomDefinition(
        "hallucinations",
        "Hallucinations",
        "The patient's perception of objectively non-existent objects and phenomena. Can affect all senses: sight, hearing, touch, taste, and smell.",
    ),
    hydrophobia: createSymptomDefinition(
        "hydrophobia",
        "Hydrophobia",
        "From Greek-fear of water. That says it all. A mental disorder causing spasms and panic attacks upon contact with water.",
    ),
    lossOfCoordination: createSymptomDefinition(
        "lossOfCoordination",
        "Loss of coordination",
        "Disorder in signal transmission from the brain to the musculoskeletal system. In severe form, falls with accompanying injuries and even complete inability to walk are observed.",
    ),
    memoryLapses: createSymptomDefinition(
        "memoryLapses",
        "Memory lapses",
        "Scientifically speaking, amnesia. Loss of memories about recent events or facts from one's own biography.",
    ),
    darkenedEyeCapillaries: createSymptomDefinition(
        "darkenedEyeCapillaries",
        "Darkened eye capillaries",
        "In a normal state, capillaries are colored red due to blood and are generally invisible. Their visible darkening indicates serious illness.",
    ),
    redEyes: createSymptomDefinition(
        "redEyes",
        "Red eyes",
        "The color of the eyeball changes from white to pinkish of varying intensity due to blood flow into capillaries. Indicates an inflammatory process.",
    ),
    irregularPupilShape: createSymptomDefinition(
        "irregularPupilShape",
        "Irregular pupil shape",
        "A normal human pupil has a round shape. Its alteration is visible to the naked eye.",
    ),
    photophobia: createSymptomDefinition(
        "photophobia",
        "Photophobia",
        "Uncomfortable sensations, up to sharp pain in the eyes, in response to light of normal intensity that previously caused no such reaction.",
    ),
    visualImpairment: createSymptomDefinition(
        "visualImpairment",
        "Visual impairment",
        "Manifests differently: the patient sees poorly at a distance or up close, images double in their eyes, and so on. One thing is common-the patient no longer perceives the world around them as clearly as before.",
    ),
    soreThroat: createSymptomDefinition(
        "soreThroat",
        "Sore throat",
        "Inflammation of the throat's mucous membrane, whose nerve endings begin to react acutely to any irritants.",
    ),
    jointPain: createSymptomDefinition(
        "jointPain",
        "Joint pain",
        "As a result of connective tissue damage, bone movements relative to each other lead to friction in the joint and painful sensations.",
    ),
    lipLesions: createSymptomDefinition(
        "lipLesions",
        "Lip lesions",
        "The mucous membrane of the lips is quite vulnerable and during illness can become covered with rashes or ulcers of various origins.",
    ),
    rednessAroundTheNose: createSymptomDefinition(
        "rednessAroundTheNose",
        "Redness around the nose",
        "Inflammation of the nasal mucosa and surrounding tissues. Often occurs with a runny nose.",
    ),
    hearingImpairment: createSymptomDefinition(
        "hearingImpairment",
        "Hearing impairment",
        "Deterioration of sound perception may be associated with inflammation and swelling of the mucosa in the ear canals and their blockage by secretions.",
    ),
    chestPain: createSymptomDefinition(
        "chestPain",
        "Chest pain",
        "When the respiratory tract is affected, pain is felt throughout the chest cavity without the burning sensation characteristic of heartburn.",
    ),
    cyanosis: createSymptomDefinition(
        "cyanosis",
        "Cyanosis",
        "Externally manifests as bluish discoloration of the skin. The cause is oxygen depletion in the blood, which in turn indicates lung malfunction.",
    ),
    cough: createSymptomDefinition(
        "cough",
        "Cough",
        "A protective reflex aimed at clearing the respiratory tract of foreign substances and objects. May be associated with infectious diseases.",
    ),
    haemoptysis: createSymptomDefinition(
        "haemoptysis",
        "Haemoptysis",
        "A more severe form of cough indicating serious damage to respiratory organs.",
    ),
    difficultyBreathing: createSymptomDefinition(
        "difficultyBreathing",
        "Difficulty breathing",
        "Various problems with air passage through the respiratory tract.",
    ),
    severePallor: createSymptomDefinition(
        "severePallor",
        "Severe pallor",
        "Pallor may indicate poor blood circulation through vessels, for example, due to their constriction, or anemia-a reduction in hemoglobin and red blood cells in the blood.",
    ),
    hematomas: createSymptomDefinition(
        "hematomas",
        "Hematomas",
        "Subcutaneous hemorrhages due to vessel damage. Externally appear as bluish blurred spots. Can be either exogenous or endogenous in nature.",
    ),
    fever: createSymptomDefinition(
        "fever",
        "Fever",
        "TODO",
    ),
    burningSensationInTheHeart: createSymptomDefinition(
        "burningSensationInTheHeart",
        "Burning sensation in the heart",
        "Pain in the heart area indicates its damage, structural changes. Should not be confused with chest pain and simple heartburn, localized in a different area.",
    ),
    rapidPulse: createSymptomDefinition(
        "rapidPulse",
        "Rapid pulse",
        "Heart rate. A pulse in the range of 60-80 beats per minute is considered normal. In this case, it's higher.",
    ),
    weakness: createSymptomDefinition(
        "weakness",
        "Weakness",
        "The patient feels lethargic, inactive, lacks strength for daily activities. Often associated with low blood pressure.",
    ),
    veinDamage: createSymptomDefinition(
        "veinDamage",
        "Vein damage",
        "Veins on the arms and legs become distinctly visible through the skin due to various causes: varicose veins or darkening.",
    ),
    slowPulse: createSymptomDefinition(
        "slowPulse",
        "Slow pulse",
        "Heart rate. A pulse in the range of 60-80 beats per minute is considered normal. In this case, it's lower.",
    ),
    eczema: createSymptomDefinition(
        "eczema",
        "Eczema",
        "Skin inflammation with characteristic redness. Lesions can merge into clusters with blurred boundaries between individual spots. Peeling may be observed.",
    ),
    ichthyosis: createSymptomDefinition(
        "ichthyosis",
        "Ichthyosis",
        "With ichthyosis, uneven skin pigmentation is observed, forming a pattern of dark-toned spots resembling scales and separated by paler areas.",
    ),
    stoneDisease: createSymptomDefinition(
        "stoneDisease",
        "Stone disease",
        "A sign of stone disease is skin cornification and cracking. The skin resembles earth cracked by heat, which is how the symptom got its name.",
    ),
    rash: createSymptomDefinition(
        "rash",
        "Rash",
        "Multiple small swellings on the skin resembling speckles. Besides red, can be black and green. Different types indicate different diseases.",
    ),
    skinRedness: createSymptomDefinition(
        "skinRedness",
        "Skin redness",
        "Distinct patches on the skin, ranging from light flush to bright red.",
    ),
    yellowingOfTheSkin: createSymptomDefinition(
        "yellowingOfTheSkin",
        "Yellowing of the skin",
        "If a healthy person's skin has a pinkish tint, deviation of its color toward yellow may indicate some disease.",
    ),
    itchySkin: createSymptomDefinition(
        "itchySkin",
        "Itchy skin",
        "Irritation causing an irresistible urge to rub and scratch the skin, sometimes until bleeding.",
    ),
    insectBites: createSymptomDefinition(
        "insectBites",
        "Insect bites",
        "Insect bites appear as pinpoint redness of intense color and small size. Can be present on the skin in large quantities. Differ from rash by the absence of swelling.",
    ),
    ulcers: createSymptomDefinition(
        "ulcers",
        "Ulcers",
        "Disruption of skin integrity with exposure of underlying tissues. Ulcers should not be confused with mechanical skin damage. As a rule, the edges of the ulcer are clearly visible.",
    ),
    abdominalPain: createSymptomDefinition(
        "abdominalPain",
        "Abdominal pain",
        "Abdominal pain can feel different depending on which disease it's a symptom of. For instance, it could be bloating or cramping.",
    ),
    diarrhea: createSymptomDefinition(
        "diarrhea",
        "Diarrhea",
        "Also known as upset stomach. Usually occurs with poisoning, but can also be caused by infections, inflammatory processes, and dysbiosis.",
    ),
    dystrophy: createSymptomDefinition(
        "dystrophy",
        "Dystrophy",
        "Low weight isn't always caused by malnutrition. Sometimes it indicates problems with nutrient absorption or the body's exhaustion in fighting disease.",
    ),
    geophagia: createSymptomDefinition(
        "geophagia",
        "Geophagia",
        "From Greek-eating earth. But not only that: minerals, clay-in short, raw products of inorganic nature. Often indicates the body's drive toward detoxification.",
    ),
    heartburn: createSymptomDefinition(
        "heartburn",
        "Heartburn",
        "Heartburn differs from chest or heart pain by a burning sensation localized behind the sternum and caused by gastric juice.",
    ),
    belching: createSymptomDefinition(
        "belching",
        "Belching",
        "Release of gases from the gastrointestinal tract through the mouth. Increased levels of bile or acid in the stomach lead to unpleasant sensations at this moment and may be a symptom of disease.",
    ),
    lossOfAppetite: createSymptomDefinition(
        "lossOfAppetite",
        "Loss of appetite",
        "Reduced need for food or complete absence of desire for it.",
    ),
    nauseaAndVomiting: createSymptomDefinition(
        "nauseaAndVomiting",
        "Nausea and vomiting",
        "Uncomfortable urges to expel stomach contents. Can be both a symptom of disease and a sign of intoxication from spoiled food or pregnancy.",
    ),
});

export const symptomGroups = [
    {
        id: "central-nervous-system",
        title: "Central Nervous System",
        icon: "assets/icon_brain.png",
        tooltip:
            "The central nervous system includes the brain and spinal cord. Problems with them can range from mental disorders and behavioral changes to common headaches.",
        symptoms: [
            SYMPTOMS.headache.label,
            SYMPTOMS.bulimia.label,
            SYMPTOMS.hallucinations.label,
            SYMPTOMS.hydrophobia.label,
            SYMPTOMS.lossOfCoordination.label,
            SYMPTOMS.memoryLapses.label,
        ],
    },
    {
        id: "vision",
        title: "Vision",
        icon: "assets/icon_eye.png",
        tooltip:
            "Eye afflictions can vary in nature and manifest both externally—in the organ's blood supply and physiology—and directly through the patient's sensations.",
        symptoms: [
            SYMPTOMS.darkenedEyeCapillaries.label,
            SYMPTOMS.redEyes.label,
            SYMPTOMS.irregularPupilShape.label,
            SYMPTOMS.photophobia.label,
            SYMPTOMS.visualImpairment.label,
        ],
    },
    {
        id: "mucous-membranes",
        title: "Mucous Membranes",
        icon: "assets/icon_mouth.png",
        tooltip:
            "Mucous membranes line internal cavities such as auditory canals and airways, partially extending to their external openings, and also reduce friction—for instance, between bones.",
        symptoms: [
            SYMPTOMS.soreThroat.label,
            SYMPTOMS.jointPain.label,
            SYMPTOMS.lipLesions.label,
            SYMPTOMS.rednessAroundTheNose.label,
            SYMPTOMS.hearingImpairment.label,
        ],
    },
    {
        id: "respiratory-system",
        title: "Respiratory System",
        icon: "assets/icon_lungs.png",
        tooltip:
            "Lung damage, besides obvious breathing difficulties, can manifest as visible signs on the patient's body—for example, due to oxygen depletion in the blood.",
        symptoms: [
            SYMPTOMS.chestPain.label,
            SYMPTOMS.cyanosis.label,
            SYMPTOMS.cough.label,
            SYMPTOMS.haemoptysis.label,
            SYMPTOMS.difficultyBreathing.label,
        ],
    },
    {
        id: "circulatory-system",
        title: "Circulatory System",
        icon: "assets/icon_heart.png",
        tooltip:
            "The heart, blood vessels, and blood itself. Weak vessels lead to hemorrhages, poor blood circulation results in reduced vitality, and excessive blood flow causes heat in specific body parts.",
        symptoms: [
            SYMPTOMS.severePallor.label,
            SYMPTOMS.hematomas.label,
            SYMPTOMS.fever.label,
            SYMPTOMS.burningSensationInTheHeart.label,
            SYMPTOMS.rapidPulse.label,
            SYMPTOMS.weakness.label,
            SYMPTOMS.veinDamage.label,
            SYMPTOMS.slowPulse.label,
        ],
    },
    {
        id: "skin",
        title: "Skin",
        icon: "assets/icon_skin.png",
        tooltip:
            "The body's protective covering. It's important to distinguish between skin lesions and external manifestations of failures in other organ systems.",
        symptoms: [
            SYMPTOMS.eczema.label,
            SYMPTOMS.ichthyosis.label,
            SYMPTOMS.stoneDisease.label,
            SYMPTOMS.rash.label,
            SYMPTOMS.skinRedness.label,
            SYMPTOMS.yellowingOfTheSkin.label,
            SYMPTOMS.itchySkin.label,
            SYMPTOMS.insectBites.label,
            SYMPTOMS.ulcers.label,
        ],
    },
    {
        id: "gastrointestinal-tract",
        title: "Gastrointestinal Tract",
        icon: "assets/icon_stomach.png",
        tooltip:
            "A system of organs involved in food consumption and digestion, as well as waste elimination. Disorders can lead to changes in body composition and eating behavior.",
        symptoms: [
            SYMPTOMS.abdominalPain.label,
            SYMPTOMS.diarrhea.label,
            SYMPTOMS.dystrophy.label,
            SYMPTOMS.geophagia.label,
            SYMPTOMS.heartburn.label,
            SYMPTOMS.belching.label,
            SYMPTOMS.lossOfAppetite.label,
            SYMPTOMS.nauseaAndVomiting.label,
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
        showcaseSymptoms: [
            SYMPTOMS.haemoptysis.label,
            SYMPTOMS.chestPain.label,
            SYMPTOMS.headache.label,
        ],
        symptoms: [
            SYMPTOMS.headache.label,
            SYMPTOMS.lossOfCoordination.label,
            SYMPTOMS.chestPain.label,
            SYMPTOMS.fever.label,
            SYMPTOMS.difficultyBreathing.label,
            SYMPTOMS.cough.label,
            SYMPTOMS.haemoptysis.label,
            SYMPTOMS.rednessAroundTheNose.label,
            SYMPTOMS.severePallor.label,
            SYMPTOMS.burningSensationInTheHeart.label,
            SYMPTOMS.weakness.label,
        ],
    },
    {
        name: "Anemic Vasculopathy",
        description: [
            "An infectious disease caused by microorganisms from steppe soil entering the bloodstream. Cases of airborne transmission are also reported but require confirmation. The infection leads to anemia, which can manifest as patient pallor, muscle weakness, and weight loss. Occasionally, patients may experience localized bleeding and hematomas. Acute cases display burst capillaries on the eyes and high fever.",
        ],
        riskGroups:
            "Peasant plowmen, gravediggers, and other various types of people working with soil.",
        showcaseSymptoms: [
            SYMPTOMS.dystrophy.label,
            SYMPTOMS.cyanosis.label,
            SYMPTOMS.redEyes.label,
        ],
        symptoms: [
            SYMPTOMS.hydrophobia.label,
            SYMPTOMS.headache.label,
            SYMPTOMS.redEyes.label,
            SYMPTOMS.dystrophy.label,
            SYMPTOMS.cyanosis.label,
            SYMPTOMS.hematomas.label,
            SYMPTOMS.severePallor.label,
            SYMPTOMS.fever.label,
        ],
    },
    {
        name: "Bonkowski's Fever",
        description: [
            "An extremely dangerous and contagious disease described in detail by Dr. Bonkowski. Epidemics of this disease can occur but are characteristic only for tropical inhabitants, i.e., those in hot and humid climates. Within the borders of the Empire, cases of this disease are extremely rare. Typically, the afflicted are pilgrims visiting southern countries for religious purposes or merchants involved in trade with tropical lands. The virus rapidly affects the lungs, leading to breathing difficulties. The heart muscle is then targeted, and at this stage, the disease is practically incurable.",
        ],
        riskGroups: "Pilgrims, traders, travelers visiting tropical countries.",
        showcaseSymptoms: [SYMPTOMS.dystrophy.label],
        symptoms: [
            SYMPTOMS.bulimia.label,
            SYMPTOMS.visualImpairment.label,
            SYMPTOMS.photophobia.label,
            SYMPTOMS.fever.label,
            SYMPTOMS.dystrophy.label,
            SYMPTOMS.abdominalPain.label,
            SYMPTOMS.belching.label,
            SYMPTOMS.weakness.label,
            SYMPTOMS.nauseaAndVomiting.label,
            SYMPTOMS.burningSensationInTheHeart.label,
        ],
    },
    {
        name: "Burning Fever",
        description: [
            "A highly contagious disease caused by the neurolcera virus. Transmitted through contact and breathing.",
            "Initially, the disease presents with fever, headache, and abdominal pain. Later, ulcers and eczema appear on the skin. Itchy herpetic rashes are observed. The patient experiences psychosis. Frequent fatal outcomes among densely living and working population.",
        ],
        riskGroups: "People living in crowded conditions, people living in unsanitary conditions.",
        showcaseSymptoms: [SYMPTOMS.ulcers.label, SYMPTOMS.eczema.label, SYMPTOMS.lipLesions.label],
        symptoms: [
            SYMPTOMS.hallucinations.label,
            SYMPTOMS.headache.label,
            SYMPTOMS.memoryLapses.label,
            SYMPTOMS.fever.label,
            SYMPTOMS.lossOfCoordination.label,
            SYMPTOMS.diarrhea.label,
            SYMPTOMS.lipLesions.label,
            SYMPTOMS.ulcers.label,
            SYMPTOMS.eczema.label,
            SYMPTOMS.rapidPulse.label,
        ],
    },
    {
        name: "Consumption",
        description: [
            "A chronic infectious disease. Mainly prevalent in countries with average to low living standards, where it takes on high mortality rates. The disease is caused by the bacterium Mycobacterium tuberculosis, for which humans are the main reservoir. It primarily affects the lungs and is transmitted through coughing, singing, and other respiratory actions. ",
            "Initially, patients complain of muscle weakness and weight loss. Cough and night fever are often among the initial symptoms. Skin dryness is present. In severe cases, haemoptysis occurs. High case fatality rate.",
        ],
        riskGroups: "Children, people with weakened immunity, smokers, drug addicts.",
        showcaseSymptoms: [SYMPTOMS.dystrophy.label, SYMPTOMS.ichthyosis.label],
        symptoms: [
            SYMPTOMS.lossOfCoordination.label,
            SYMPTOMS.dystrophy.label,
            SYMPTOMS.chestPain.label,
            SYMPTOMS.fever.label,
            SYMPTOMS.difficultyBreathing.label,
            SYMPTOMS.cough.label,
            SYMPTOMS.haemoptysis.label,
            SYMPTOMS.ichthyosis.label,
            SYMPTOMS.weakness.label,
        ],
    },
    {
        name: "Fruit Typhoid",
        description: [
            "An infectious disease caused by bacteria found in sweet fruits and berries. The presumed natural reservoir is fruit-worm larvae.",
            "In the early stages, the primary symptoms are muscle weakness and chest pain, as the disease targets heart tissue. This is followed by gradual deterioration of vision and hearing. In later stages, a black rash appears, blood vessels darken—primarily on the hands and feet—and the shape of the pupil changes.",
        ],
        riskGroups: "Peasants, gardeners, fruit vendors, cooks, and berry pickers.",
        showcaseSymptoms: [SYMPTOMS.rash.label, SYMPTOMS.veinDamage.label],
        symptoms: [
            SYMPTOMS.hallucinations.label,
            SYMPTOMS.irregularPupilShape.label,
            SYMPTOMS.chestPain.label,
            SYMPTOMS.visualImpairment.label,
            SYMPTOMS.hearingImpairment.label,
            SYMPTOMS.rash.label,
            SYMPTOMS.veinDamage.label,
            SYMPTOMS.weakness.label,
            SYMPTOMS.slowPulse.label,
        ],
    },
    {
        name: "Hepatitis",
        description: [
            "Liver necrosis. Can be caused by viral infection. It can also develop in individuals who abuse alcohol or drugs.",
            "The preicteric phase of hepatitis is characterized by weight loss, nausea, and diarrhea. Sometimes skin itching and eczema occur. The icteric phase is marked by jaundice, with previous symptoms gradually regressing. The patient complains of pain in the liver area. Poor hygiene and substance abuse significantly increase the risk of death. Fatal in acute disease.",
        ],
        riskGroups: "Alcoholics, drug addicts, people with autoimmune disorders.",
        showcaseSymptoms: [
            SYMPTOMS.yellowingOfTheSkin.label,
            SYMPTOMS.dystrophy.label,
            SYMPTOMS.eczema.label,
        ],
        symptoms: [
            SYMPTOMS.visualImpairment.label,
            SYMPTOMS.dystrophy.label,
            SYMPTOMS.stoneDisease.label,
            SYMPTOMS.nauseaAndVomiting.label,
            SYMPTOMS.itchySkin.label,
            SYMPTOMS.eczema.label,
            SYMPTOMS.yellowingOfTheSkin.label,
            SYMPTOMS.weakness.label,
        ],
    },
    {
        name: "Influenza",
        description: [
            "An acute respiratory disease caused by the influenza virus. Affects the respiratory tract. Considered the most severe among acute respiratory viral infections.",
            "The disease manifests suddenly with muscle weakness, fever, cough, sore throat, severe headache, and photophobia. Upper respiratory tract involvement starts with cough, chest pain, and runny nose. Later, throat pain, shortness of breath, and hoarseness appear. Rare strains of influenza can have gastrointestinal symptoms. Mortality from influenza increases in crowded conditions or during epidemics.",
        ],
        riskGroups: "Pregnant women, smokers, people living in crowded conditions.",
        showcaseSymptoms: [
            SYMPTOMS.rednessAroundTheNose.label,
            SYMPTOMS.cough.label,
            SYMPTOMS.soreThroat.label,
        ],
        symptoms: [
            SYMPTOMS.headache.label,
            SYMPTOMS.nauseaAndVomiting.label,
            SYMPTOMS.chestPain.label,
            SYMPTOMS.soreThroat.label,
            SYMPTOMS.weakness.label,
            SYMPTOMS.fever.label,
            SYMPTOMS.photophobia.label,
            SYMPTOMS.lossOfAppetite.label,
            SYMPTOMS.difficultyBreathing.label,
            SYMPTOMS.cough.label,
            SYMPTOMS.rednessAroundTheNose.label,
            SYMPTOMS.hearingImpairment.label,
            SYMPTOMS.jointPain.label,
        ],
    },
    {
        name: "Ink Syndrome",
        description: [
            "Infection often found in sewage and stagnant water bodies. It can also be present in fish tissues. The virus alters the blood's chemical composition, resulting in the darkening of blood vessels in the eyes and throughout the body's circulatory system. Hallucinations and breathing difficulties in patients may indicate brain damage, and therefore an almost inevitable fatal outcome.",
        ],
        riskGroups:
            "People interacting with specific steppe water bodies of Gorkhon (washerwomen, shepherds, steppe dwellers).",
        showcaseSymptoms: [
            SYMPTOMS.veinDamage.label,
            SYMPTOMS.darkenedEyeCapillaries.label,
            SYMPTOMS.cyanosis.label,
        ],
        symptoms: [
            SYMPTOMS.hallucinations.label,
            SYMPTOMS.headache.label,
            SYMPTOMS.memoryLapses.label,
            SYMPTOMS.irregularPupilShape.label,
            SYMPTOMS.darkenedEyeCapillaries.label,
            SYMPTOMS.photophobia.label,
            SYMPTOMS.difficultyBreathing.label,
            SYMPTOMS.chestPain.label,
            SYMPTOMS.cyanosis.label,
            SYMPTOMS.veinDamage.label,
            SYMPTOMS.hematomas.label,
        ],
    },
    {
        name: "Lymphotonitis",
        description: [
            "A natural focal disease caused by Yersinia pestis bacteria. Infection occurs through contact with infected patients, contaminated water, or mosquito bites carrying the bacteria.",
            "The infected experience muscle weakness, headache, and in some cases, dizziness. The bite area becomes itchy. Later, a rash with ulcer formation appears on the body. The patient experiences constant itching; ulcers may bleed. Compromised immunity and constant scratching of the ulcers can lead to complications and often death.",
        ],
        riskGroups: "People living in crowded conditions.",
        showcaseSymptoms: [SYMPTOMS.insectBites.label, SYMPTOMS.ulcers.label],
        symptoms: [
            SYMPTOMS.headache.label,
            SYMPTOMS.lossOfCoordination.label,
            SYMPTOMS.itchySkin.label,
            SYMPTOMS.ulcers.label,
            SYMPTOMS.insectBites.label,
            SYMPTOMS.rapidPulse.label,
            SYMPTOMS.skinRedness.label,
            SYMPTOMS.weakness.label,
        ],
    },
    {
        name: "Measles",
        description: [
            "A highly infectious viral disease with a very high transmission rate. It is marked by fever, inflammation of mucous tissues, conjunctivitis, and skin rash. The Metropolitan Infectionists Society suggests cattle as the virus source, but this theory doesn't have the unanimous support of the medical community. If the body overcomes the disease, then immunity develops, preventing future infections. However, fatal outcomes are possible, especially for malnourished patients without access to proper treatment and care.",
        ],
        riskGroups:
            "Children, as well as people spending a lot of time with children (teachers, mothers, mentors).",
        showcaseSymptoms: [
            SYMPTOMS.skinRedness.label,
            SYMPTOMS.redEyes.label,
            SYMPTOMS.soreThroat.label,
        ],
        symptoms: [
            SYMPTOMS.headache.label,
            SYMPTOMS.redEyes.label,
            SYMPTOMS.photophobia.label,
            SYMPTOMS.diarrhea.label,
            SYMPTOMS.soreThroat.label,
            SYMPTOMS.skinRedness.label,
            SYMPTOMS.weakness.label,
            SYMPTOMS.fever.label,
        ],
    },
    {
        name: "Nephropathia epidemica",
        description: [
            "A disease caused by a group of viruses, varying with the epidemic focus. Humans contract the virus from animals and their waste.",
            "The disease begins acutely with fever, rapid heartbeat, nausea, and/or vomiting. Accompanied by headache and photophobia. After 3 days, a rash appears on the skin and facial flushing becomes evident. The disease causes internal bleeding, leading to patient's death.",
        ],
        riskGroups: "People in contact with animals, rural residents.",
        showcaseSymptoms: [SYMPTOMS.skinRedness.label, SYMPTOMS.rash.label],
        symptoms: [
            SYMPTOMS.hydrophobia.label,
            SYMPTOMS.headache.label,
            SYMPTOMS.bulimia.label,
            SYMPTOMS.photophobia.label,
            SYMPTOMS.visualImpairment.label,
            SYMPTOMS.heartburn.label,
            SYMPTOMS.geophagia.label,
            SYMPTOMS.rash.label,
            SYMPTOMS.chestPain.label,
            SYMPTOMS.nauseaAndVomiting.label,
            SYMPTOMS.skinRedness.label,
            SYMPTOMS.rapidPulse.label,
            SYMPTOMS.weakness.label,
            SYMPTOMS.fever.label,
        ],
    },
    {
        name: "Pulmomucous Syndrome",
        description: [
            "An infectious disease caused by consuming water from contaminated steppe sources. The initial blow of the illness affects the human nervous system. In the next stage, it manifests through gastric disorders and ulcerative lesions on the lips. Subsequently, the patient loses appetite and experiences obsessive hallucinations. In advanced cases, breathing difficulties and deafness are observed, and at this stage, a fatal outcome is almost inevitable.",
        ],
        riskGroups:
            "People interacting with the waters of Gorkhon (washerwomen, water carriers, shepherds, steppe dwellers).",
        showcaseSymptoms: [SYMPTOMS.rednessAroundTheNose.label, SYMPTOMS.lipLesions.label],
        symptoms: [
            SYMPTOMS.lossOfCoordination.label,
            SYMPTOMS.diarrhea.label,
            SYMPTOMS.lossOfAppetite.label,
            SYMPTOMS.difficultyBreathing.label,
            SYMPTOMS.rednessAroundTheNose.label,
            SYMPTOMS.lipLesions.label,
            SYMPTOMS.hallucinations.label,
            SYMPTOMS.hearingImpairment.label,
        ],
    },
    {
        name: "Serpent Syndrome",
        description: [
            "An infectious disease resulting from skin infections caused by the fungus hyacinthum petasum. The fungus is typical for eastern and southern provinces; cases of infection in the Empire's north are unknown. Presumably, the fungus affects impoverished people weakened by malnutrition. However, native steppe peoples seem to possess a certain immunity to this fungus. Northerners moving to steppe provinces lack such immunity and are more frequently affected. The disease starts with localized skin lesions that can later cover a significant portion of the patient's skin. Untreated cases lead to exhaustion, digestive system disorders, and damage to mucous membranes. All discharges from infected individuals are contagious, and patients require isolation and care with enhanced nutrition.",
        ],
        riskGroups: "Malnutritioned people, migrants to steppe provinces.",
        showcaseSymptoms: [
            SYMPTOMS.ichthyosis.label,
            SYMPTOMS.dystrophy.label,
            SYMPTOMS.lipLesions.label,
        ],
        symptoms: [
            SYMPTOMS.lossOfCoordination.label,
            SYMPTOMS.redEyes.label,
            SYMPTOMS.diarrhea.label,
            SYMPTOMS.visualImpairment.label,
            SYMPTOMS.dystrophy.label,
            SYMPTOMS.lipLesions.label,
            SYMPTOMS.difficultyBreathing.label,
            SYMPTOMS.ichthyosis.label,
        ],
    },
    {
        name: "Steppe Dryness",
        description: [
            "A natural focal fungal infection. Infection occurs through inhaling fungal spores present on steppe grass or as mold.",
            "The disease primarily develops in the lungs; patients complain of shortness of breath and rapid heartbeat. Irritation of mucous membranes is observed, manifested as throat pain and eye redness. In severe cases of intoxication, patients experience joint pain. Ichthyosis develops. The risk of fatality manifests if the case is advanced, when the patient can't move on their own.",
        ],
        riskGroups: "Inhabitants of the steppe.",
        showcaseSymptoms: [
            SYMPTOMS.soreThroat.label,
            SYMPTOMS.redEyes.label,
            SYMPTOMS.ichthyosis.label,
        ],
        symptoms: [
            SYMPTOMS.redEyes.label,
            SYMPTOMS.photophobia.label,
            SYMPTOMS.difficultyBreathing.label,
            SYMPTOMS.soreThroat.label,
            SYMPTOMS.jointPain.label,
            SYMPTOMS.ichthyosis.label,
            SYMPTOMS.rapidPulse.label,
        ],
    },
    {
        name: "Steppe Gastrodermal Fever",
        description: [
            "A viral disease caused by bites from the golden herb fly (Pluma herba aurea musca). A characteristic green rash appears around the bite area, and the disease progresses to affect the gastric mucosa, leading to vomiting and nausea. Some patients lose the ability to digest food normally and can only tolerate broths and liquid porridge. Symptoms also include extreme muscle weakness, exhaustion, and breathing difficulties. A fatal outcome is highly likely.",
        ],
        riskGroups:
            "People spending extensive period of time in the steppe, especially inhabitants of the steppe, shepherds, reapers, herbalists.",
        showcaseSymptoms: [
            SYMPTOMS.rash.label,
            SYMPTOMS.insectBites.label,
            SYMPTOMS.dystrophy.label,
        ],
        symptoms: [
            SYMPTOMS.heartburn.label,
            SYMPTOMS.geophagia.label,
            SYMPTOMS.abdominalPain.label,
            SYMPTOMS.rash.label,
            SYMPTOMS.dystrophy.label,
            SYMPTOMS.belching.label,
            SYMPTOMS.nauseaAndVomiting.label,
            SYMPTOMS.difficultyBreathing.label,
            SYMPTOMS.insectBites.label,
        ],
    },
    {
        name: "Stoneskin",
        description: [
            "A disease characterized by excessive skin cornification and densification. Infection occurs through skin contact with mycobacteria found in steppe flora.",
            "The disease starts with skin dryness, peeling, and itching. Subsequently, the skin thickens, resembling large petrified reptile scales. Itching on such skin disappears. Nonfatal.",
        ],
        riskGroups: "Travelers, inhabitants of the steppe.",
        showcaseSymptoms: [SYMPTOMS.ichthyosis.label, SYMPTOMS.redEyes.label],
        symptoms: [
            SYMPTOMS.redEyes.label,
            "Visual Impairment",
            SYMPTOMS.photophobia.label,
            "Hearing Impairment",
            SYMPTOMS.stoneDisease.label,
            SYMPTOMS.itchySkin.label,
            SYMPTOMS.slowPulse.label,
        ],
    },
    {
        name: "Tularemia",
        description: [
            "An infectious disease transmitted through food, contact with rodents, and insect bites.",
            "The onset is sudden, with fever, weakness, nausea, vomiting, diarrhea, and headache. Hallucinations are observed in some patients. Ulcers and/or redness then appear on the skin. It can also affect the eyes. Moderate mortality risk if left untreated. Immunity is permanent for recovered individuals. Not contagious from person to person.",
        ],
        riskGroups: "Impoverished people, inhabitants of the steppe.",
        showcaseSymptoms: [
            SYMPTOMS.ulcers.label,
            SYMPTOMS.redEyes.label,
            SYMPTOMS.skinRedness.label,
        ],
        symptoms: [
            SYMPTOMS.hallucinations.label,
            SYMPTOMS.headache.label,
            SYMPTOMS.nauseaAndVomiting.label,
            SYMPTOMS.skinRedness.label,
            SYMPTOMS.ulcers.label,
            SYMPTOMS.insectBites.label,
            SYMPTOMS.weakness.label,
            SYMPTOMS.fever.label,
        ],
    },
    {
        name: "Twyrine Syndrome",
        description: [
            'Infection by microorganisms found in twyre sprouts and products derived from twyre. Or a consequence of abusing twyre-based alcohol products ("twyrine").',
            'Patients experience muscle weakness, sweating, depressed mental state, migraines, and dizziness. Often accompanied by gastrointestinal symptoms. After 8-12 hours of exacerbation, hallucinations, photophobia, and seizures frequently manifest. Allergic reactions such as skin reddening/yellowing may occur. In more severe cases of intoxication, "twyrine" (epileptic) seizures occur. In extreme cases, it can lead to breathing difficulties, coma, and death.',
        ],
        riskGroups: "Alcoholics, inhabitants of the steppe.",
        showcaseSymptoms: [
            SYMPTOMS.yellowingOfTheSkin.label,
            SYMPTOMS.redEyes.label,
            SYMPTOMS.veinDamage.label,
        ],
        symptoms: [
            SYMPTOMS.hallucinations.label,
            SYMPTOMS.headache.label,
            SYMPTOMS.memoryLapses.label,
            SYMPTOMS.lossOfCoordination.label,
            SYMPTOMS.redEyes.label,
            SYMPTOMS.photophobia.label,
            SYMPTOMS.darkenedEyeCapillaries.label,
            SYMPTOMS.nauseaAndVomiting.label,
            SYMPTOMS.yellowingOfTheSkin.label,
            SYMPTOMS.skinRedness.label,
            SYMPTOMS.veinDamage.label,
            SYMPTOMS.hematomas.label,
            SYMPTOMS.weakness.label,
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
        showcaseSymptoms: [SYMPTOMS.cyanosis.label, SYMPTOMS.headache.label],
        symptoms: [
            SYMPTOMS.headache.label,
            SYMPTOMS.cyanosis.label,
            SYMPTOMS.rapidPulse.label,
            SYMPTOMS.weakness.label,
            SYMPTOMS.severePallor.label,
            SYMPTOMS.diarrhea.label,
            SYMPTOMS.lossOfAppetite.label,
            SYMPTOMS.nauseaAndVomiting.label,
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
        showcaseSymptoms: [SYMPTOMS.rash.label, SYMPTOMS.skinRedness.label, SYMPTOMS.redEyes.label],
        symptoms: [
            SYMPTOMS.headache.label,
            SYMPTOMS.hallucinations.label,
            SYMPTOMS.memoryLapses.label,
            SYMPTOMS.lossOfCoordination.label,
            SYMPTOMS.redEyes.label,
            SYMPTOMS.photophobia.label,
            SYMPTOMS.rash.label,
            SYMPTOMS.skinRedness.label,
            SYMPTOMS.weakness.label,
            SYMPTOMS.fever.label,
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
        showcaseSymptoms: [SYMPTOMS.ichthyosis.label, SYMPTOMS.skinRedness.label],
        symptoms: [
            SYMPTOMS.itchySkin.label,
            SYMPTOMS.ichthyosis.label,
            SYMPTOMS.eczema.label,
            SYMPTOMS.skinRedness.label,
            SYMPTOMS.dystrophy.label,
            SYMPTOMS.weakness.label,
        ],
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
        showcaseSymptoms: [
            SYMPTOMS.skinRedness.label,
            SYMPTOMS.rash.label,
            SYMPTOMS.dystrophy.label,
        ],
        symptoms: [
            SYMPTOMS.memoryLapses.label,
            SYMPTOMS.hallucinations.label,
            SYMPTOMS.lossOfCoordination.label,
            SYMPTOMS.weakness.label,
            SYMPTOMS.skinRedness.label,
            SYMPTOMS.rash.label,
            SYMPTOMS.dystrophy.label,
            SYMPTOMS.diarrhea.label,
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
        showcaseSymptoms: [
            SYMPTOMS.veinDamage.label,
            SYMPTOMS.cyanosis.label,
            SYMPTOMS.ulcers.label,
        ],
        symptoms: [
            SYMPTOMS.headache.label,
            SYMPTOMS.hallucinations.label,
            SYMPTOMS.memoryLapses.label,
            SYMPTOMS.lossOfCoordination.label,
            SYMPTOMS.nauseaAndVomiting.label,
            SYMPTOMS.weakness.label,
            SYMPTOMS.cyanosis.label,
            SYMPTOMS.veinDamage.label,
            SYMPTOMS.ulcers.label,
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
        requiresAnySymptoms: [SYMPTOMS.memoryLapses.label],
        displayOverrideOnly: true,
    },
    {
        value: "unclear (?)",
        tags: [PATIENT_PROFILE_TAGS.MEMORY_ISSUES],
        weight: 0.15,
        requiresAnySymptoms: [SYMPTOMS.memoryLapses.label, SYMPTOMS.hallucinations.label],
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
        requiresAnySymptoms: [SYMPTOMS.memoryLapses.label],
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
        requiresAnySymptoms: [SYMPTOMS.memoryLapses.label, SYMPTOMS.hallucinations.label],
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

const getSymptomLookupKey = (symptom) =>
    String(symptom || "")
        .trim()
        .toLowerCase();

export const SYMPTOM_LIST = Object.freeze(Object.values(SYMPTOMS));

export const SYMPTOM_NAME_BY_KEY = new Map(
    SYMPTOM_LIST.map((symptom) => [getSymptomLookupKey(symptom.label), symptom.label]),
);

export const SYMPTOM_DEFINITION_BY_KEY = new Map(
    SYMPTOM_LIST.map((symptom) => [getSymptomLookupKey(symptom.label), symptom]),
);

export function getSymptomDefinition(symptom) {
    return SYMPTOM_DEFINITION_BY_KEY.get(getSymptomLookupKey(symptom)) || null;
}

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
        SYMPTOMS.headache.label,
        SYMPTOMS.nauseaAndVomiting.label,
        SYMPTOMS.weakness.label,
        SYMPTOMS.belching.label,
        SYMPTOMS.burningSensationInTheHeart.label,
    ],
    [PATIENT_PROFILE_TAGS.ALLERGEN_EXPOSURE]: [
        SYMPTOMS.rednessAroundTheNose.label,
        SYMPTOMS.redEyes.label,
        SYMPTOMS.itchySkin.label,
        SYMPTOMS.eczema.label,
    ],
    [PATIENT_PROFILE_TAGS.ANIMAL_EXPOSURE]: [
        SYMPTOMS.skinRedness.label,
        SYMPTOMS.weakness.label,
        SYMPTOMS.insectBites.label,
    ],
    [PATIENT_PROFILE_TAGS.BLOOD_EXPOSURE]: [SYMPTOMS.weakness.label, SYMPTOMS.hematomas.label],
    [PATIENT_PROFILE_TAGS.BRAWLER]: [
        SYMPTOMS.hematomas.label,
        SYMPTOMS.headache.label,
        SYMPTOMS.lossOfCoordination.label,
    ],
    [PATIENT_PROFILE_TAGS.CHEMICAL_EXPOSURE]: [
        SYMPTOMS.headache.label,
        SYMPTOMS.nauseaAndVomiting.label,
        SYMPTOMS.skinRedness.label,
        SYMPTOMS.eczema.label,
        SYMPTOMS.cough.label,
    ],
    [PATIENT_PROFILE_TAGS.COLD_EXPOSURE]: [
        SYMPTOMS.cough.label,
        SYMPTOMS.weakness.label,
        SYMPTOMS.jointPain.label,
    ],
    [PATIENT_PROFILE_TAGS.CROWD_EXPOSURE]: [
        SYMPTOMS.cough.label,
        SYMPTOMS.fever.label,
        SYMPTOMS.weakness.label,
    ],
    [PATIENT_PROFILE_TAGS.DUST_EXPOSURE]: [
        SYMPTOMS.cough.label,
        SYMPTOMS.difficultyBreathing.label,
        SYMPTOMS.rednessAroundTheNose.label,
        SYMPTOMS.photophobia.label,
    ],
    [PATIENT_PROFILE_TAGS.EYE_STRAIN]: [SYMPTOMS.headache.label, SYMPTOMS.visualImpairment.label],
    [PATIENT_PROFILE_TAGS.HEAD_INJURY]: [
        SYMPTOMS.headache.label,
        SYMPTOMS.memoryLapses.label,
        SYMPTOMS.lossOfCoordination.label,
    ],
    [PATIENT_PROFILE_TAGS.HEARING_WEAR]: [SYMPTOMS.hearingImpairment.label],
    [PATIENT_PROFILE_TAGS.HEAT_EXPOSURE]: [SYMPTOMS.weakness.label, SYMPTOMS.headache.label],
    [PATIENT_PROFILE_TAGS.HEAVY_LABOR]: [
        SYMPTOMS.weakness.label,
        SYMPTOMS.jointPain.label,
        SYMPTOMS.hematomas.label,
    ],
    [PATIENT_PROFILE_TAGS.HEAVY_MACHINERY]: [
        SYMPTOMS.hearingImpairment.label,
        SYMPTOMS.hematomas.label,
        SYMPTOMS.weakness.label,
    ],
    [PATIENT_PROFILE_TAGS.HOME_SMOKE]: [
        SYMPTOMS.cough.label,
        SYMPTOMS.rednessAroundTheNose.label,
        SYMPTOMS.difficultyBreathing.label,
    ],
    [PATIENT_PROFILE_TAGS.HORMONAL_FLARES]: [
        SYMPTOMS.eczema.label,
        SYMPTOMS.skinRedness.label,
        SYMPTOMS.itchySkin.label,
    ],
    [PATIENT_PROFILE_TAGS.INSECT_EXPOSURE]: [
        SYMPTOMS.insectBites.label,
        SYMPTOMS.skinRedness.label,
        SYMPTOMS.fever.label,
    ],
    [PATIENT_PROFILE_TAGS.MALNOURISHED]: [
        SYMPTOMS.weakness.label,
        SYMPTOMS.dystrophy.label,
        SYMPTOMS.severePallor.label,
    ],
    [PATIENT_PROFILE_TAGS.MEMORY_ISSUES]: [SYMPTOMS.memoryLapses.label],
    [PATIENT_PROFILE_TAGS.MIGRAINES]: [SYMPTOMS.headache.label, SYMPTOMS.photophobia.label],
    [PATIENT_PROFILE_TAGS.NIGHT_WORK]: [SYMPTOMS.weakness.label, SYMPTOMS.headache.label],
    [PATIENT_PROFILE_TAGS.POOR_HYGIENE]: [
        SYMPTOMS.itchySkin.label,
        SYMPTOMS.skinRedness.label,
        SYMPTOMS.weakness.label,
    ],
    [PATIENT_PROFILE_TAGS.PREGNANCY]: [
        SYMPTOMS.heartburn.label,
        SYMPTOMS.nauseaAndVomiting.label,
        SYMPTOMS.weakness.label,
    ],
    [PATIENT_PROFILE_TAGS.RODENT_EXPOSURE]: [SYMPTOMS.fever.label, SYMPTOMS.weakness.label],
    [PATIENT_PROFILE_TAGS.SEWAGE_EXPOSURE]: [
        SYMPTOMS.diarrhea.label,
        SYMPTOMS.nauseaAndVomiting.label,
        SYMPTOMS.weakness.label,
    ],
    [PATIENT_PROFILE_TAGS.SMOKER]: [
        SYMPTOMS.cough.label,
        SYMPTOMS.difficultyBreathing.label,
        SYMPTOMS.haemoptysis.label,
    ],
    [PATIENT_PROFILE_TAGS.SOIL_EXPOSURE]: [
        SYMPTOMS.weakness.label,
        SYMPTOMS.headache.label,
        SYMPTOMS.hematomas.label,
    ],
    [PATIENT_PROFILE_TAGS.STEPPE_EXPOSURE]: [
        SYMPTOMS.redEyes.label,
        SYMPTOMS.photophobia.label,
        SYMPTOMS.ichthyosis.label,
        SYMPTOMS.insectBites.label,
    ],
    [PATIENT_PROFILE_TAGS.STREET_LIFE]: [
        SYMPTOMS.weakness.label,
        SYMPTOMS.severePallor.label,
        SYMPTOMS.itchySkin.label,
    ],
    [PATIENT_PROFILE_TAGS.WATER_EXPOSURE]: [
        SYMPTOMS.redEyes.label,
        SYMPTOMS.nauseaAndVomiting.label,
        SYMPTOMS.cough.label,
    ],
    [PATIENT_PROFILE_TAGS.WEAK_CONSTITUTION]: [
        SYMPTOMS.weakness.label,
        SYMPTOMS.severePallor.label,
    ],
    [PATIENT_PROFILE_TAGS.WEARS_GLASSES]: [
        SYMPTOMS.visualImpairment.label,
        SYMPTOMS.headache.label,
    ],
    [PATIENT_PROFILE_TAGS.CHRONIC_HEARTBURN]: [
        SYMPTOMS.heartburn.label,
        SYMPTOMS.burningSensationInTheHeart.label,
        SYMPTOMS.belching.label,
    ],
};

export const symptomImageVariants = {
    [SYMPTOMS.chestPain.label]: ["sympt_chest_pain-1.png"],
    [SYMPTOMS.cough.label]: ["sympt_cough-1.png"],
    [SYMPTOMS.cyanosis.label]: ["sympt_cyanosis-1.png", "sympt_cyanosis-2.png"],
    [SYMPTOMS.dystrophy.label]: ["sympt_dystrophy-1.png", "sympt_dystrophy-2.png"],
    [SYMPTOMS.eczema.label]: ["sympt_eczema-1.png"],
    [SYMPTOMS.darkenedEyeCapillaries.label]: ["sympt_eye_capillaries-1.png"],
    [SYMPTOMS.haemoptysis.label]: ["sympt_haemoptysis-1.png"],
    [SYMPTOMS.headache.label]: ["sympt_headache-1.png"],
    [SYMPTOMS.hematomas.label]: ["sympt_hematomas-1.png"],
    [SYMPTOMS.ichthyosis.label]: ["sympt_ichtyosis-1.png", "sympt_ichtyosis-2.png"],
    [SYMPTOMS.insectBites.label]: ["sympt_insect_bites-1.png"],
    [SYMPTOMS.lipLesions.label]: ["sympt_lip_lesions-1.png", "sympt_lip_lesions_2.png"],
    [SYMPTOMS.lossOfCoordination.label]: ["sympt_loss_coordination-1.png"],
    [SYMPTOMS.rednessAroundTheNose.label]: ["sympt_nose_redness-1.png"],
    [SYMPTOMS.irregularPupilShape.label]: ["sympt_pupil_shape-1.png"],
    [SYMPTOMS.rash.label]: ["sympt_rash-1.png", "sympt_rash-2.png", "sympt_rash-3.png"],
    [SYMPTOMS.redEyes.label]: ["sympt_red_eyes-1.png"],
    [SYMPTOMS.skinRedness.label]: ["sympt_skin_redness-1.png", "sympt_skin_redness-2.png"],
    [SYMPTOMS.yellowingOfTheSkin.label]: [
        "sympt_skin_yellowing-1.png",
        "sympt_skin_yellowing-2.png",
    ],
    [SYMPTOMS.soreThroat.label]: ["sympt_sore_throat-1.png"],
    [SYMPTOMS.stoneDisease.label]: ["sympt_stone_disease-1.png"],
    [SYMPTOMS.ulcers.label]: ["sympt_ulcers-1.png"],
    [SYMPTOMS.veinDamage.label]: [
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
