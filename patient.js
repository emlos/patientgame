import {
    diagnoses,
    PATIENT_GENDERS,
    PATIENT_PROFILE_TAGS,
    PATIENT_SYMPTOM_SOURCE_TYPES,
    PHOTO_PATHS,
    RANDOM_HARMFUL_HABITS,
    RANDOM_LIFE_EVENTS,
    RANDOM_MARITAL_STATUSES,
    RANDOM_OCCUPATIONS,
    RANDOM_PATIENT_LAST_NAMES,
    RANDOM_PATIENT_NAMES,
    RANDOM_RESIDENCES,
    DEFAULT_PATIENT_SEED,
    DIAGNOSES_BY_NAME,
    DIAGNOSIS_TAG_HINTS,
    TAG_SYMPTOM_RULES, canonicalizeSymptom
} from "./data.js";

let patientRandom = createSeededRandom(hashString(`${DEFAULT_PATIENT_SEED}:patients`));
let patientPhotoPool = [];



function resetPatientGenerator(seedValue = DEFAULT_PATIENT_SEED) {
    patientRandom = createSeededRandom(hashString(`${seedValue}:patients`));
    patientPhotoPool = shuffle(PHOTO_PATHS, patientRandom);
}

function getRandomInt(min, max, rng = patientRandom) {
    return Math.floor(rng() * (max - min + 1)) + min;
}

function getRandomItem(values, rng = patientRandom) {
    return values[getRandomInt(0, values.length - 1, rng)];
}

function shuffle(values, rng = patientRandom) {
    const nextValues = [...values];
    for (let index = nextValues.length - 1; index > 0; index -= 1) {
        const swapIndex = getRandomInt(0, index, rng);
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

export function hashString(value) {
    const text = String(value ?? "");
    let hash = 2166136261;

    for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0 || 1;
}

export function createSeededRandom(seedValue) {
    let seed = seedValue >>> 0;

    return () => {
        seed += 0x6d2b79f5;
        let next = Math.imul(seed ^ (seed >>> 15), seed | 1);
        next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
        return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
    };
}

export function createGameSeed(patientRecords = []) {
    const base = patientRecords
        .map((patient) =>
            [
                patient.id,
                patient.name,
                patient.gender,
                patient.age,
                patient.photo,
                patient.occupation,
                patient.residence,
                patient.trueDiagnosis,
                [...(patient.internalSymptomNames || [])].sort().join(","),
                [...(patient.internalProfile?.allTags || [])].sort().join(","),
            ].join("|"),
        )
        .join("::");

    return hashString(base || DEFAULT_PATIENT_SEED);
}

function getEntryValue(entry) {
    return typeof entry === "string" ? entry : entry?.value || "";
}

function getEntryWeight(entry) {
    const weight = Number(typeof entry === "object" ? entry?.weight : 1);
    return Number.isFinite(weight) && weight > 0 ? weight : 1;
}

function getEntryTags(entry) {
    return Array.isArray(entry?.tags) ? [...new Set(entry.tags)] : [];
}

function getEntryId(entry) {
    return entry?.id || slugify(getEntryValue(entry));
}

function getEntryGenders(entry) {
    return Array.isArray(entry?.genders) && entry.genders.length
        ? entry.genders
        : [PATIENT_GENDERS.FEMALE, PATIENT_GENDERS.MALE];
}

function isEntryEligible(entry, context = {}) {
    const { gender = "", age = 0, symptomNames = new Set() } = context;

    if (entry?.genders?.length && gender && !entry.genders.includes(gender)) {
        return false;
    }

    if (typeof entry?.minAge === "number" && age < entry.minAge) {
        return false;
    }

    if (typeof entry?.maxAge === "number" && age > entry.maxAge) {
        return false;
    }

    if (entry?.requiresAnySymptoms?.length) {
        return entry.requiresAnySymptoms.some((symptom) =>
            symptomNames.has(canonicalizeSymptom(symptom)),
        );
    }

    return true;
}

function pickWeightedItem(entries, rng = patientRandom) {
    if (!entries.length) return null;

    const totalWeight = entries.reduce((sum, entry) => sum + getEntryWeight(entry), 0);
    let threshold = rng() * totalWeight;

    for (const entry of entries) {
        threshold -= getEntryWeight(entry);
        if (threshold <= 0) return entry;
    }

    return entries[entries.length - 1];
}

function pickUnusedEntry(entries, usedValues = new Set(), rng = patientRandom, context = {}) {
    const eligibleEntries = entries.filter((entry) => isEntryEligible(entry, context));
    const unusedEntries = eligibleEntries.filter((entry) => !usedValues.has(getEntryValue(entry)));
    return pickWeightedItem(unusedEntries.length ? unusedEntries : eligibleEntries, rng);
}

function sampleWithoutReplacement(entries, count, rng = patientRandom) {
    if (!entries.length || count <= 0) return [];

    const pool = [...entries];
    const picked = [];

    while (pool.length && picked.length < count) {
        const next = pickWeightedItem(pool, rng);
        if (!next) break;
        picked.push(next);
        const index = pool.indexOf(next);
        if (index >= 0) {
            pool.splice(index, 1);
        }
    }

    return picked;
}

function pickSomeCount(probabilities, rng = patientRandom) {
    const roll = rng();
    let cursor = 0;

    for (const [count, chance] of probabilities) {
        cursor += chance;
        if (roll <= cursor) return count;
    }

    return probabilities[probabilities.length - 1]?.[0] || 0;
}

function inflectFemaleLastName(lastName) {
    if (/sky$/i.test(lastName)) {
        return lastName.replace(/sky$/i, "skaya");
    }

    if (/(ov|ev|in)$/i.test(lastName)) {
        return `${lastName}a`;
    }

    if (/oy$/i.test(lastName)) {
        return lastName.replace(/oy$/i, "aya");
    }

    return lastName;
}

function createRandomPatientIdentity(existingPatients = [], rng = patientRandom) {
    const usedFirstNames = new Set(
        existingPatients
            .map(
                (patient) =>
                    String(patient.name || "")
                        .trim()
                        .split(/\s+/)[0],
            )
            .filter(Boolean),
    );

    const availableEntries = RANDOM_PATIENT_NAMES.filter(
        (entry) => !usedFirstNames.has(getEntryValue(entry)),
    );
    const nameEntry = pickWeightedItem(
        availableEntries.length ? availableEntries : RANDOM_PATIENT_NAMES,
        rng,
    );
    const firstName = getEntryValue(nameEntry);
    const gender = getRandomItem(getEntryGenders(nameEntry), rng);
    const hasLastName = rng() < 0.35;
    const lastName = hasLastName ? getRandomItem(RANDOM_PATIENT_LAST_NAMES, rng) : "";
    const formattedLastName =
        gender === PATIENT_GENDERS.FEMALE ? inflectFemaleLastName(lastName) : lastName;

    return {
        gender,
        name: [firstName, formattedLastName].filter(Boolean).join(" "),
    };
}

function getNextPatientPhoto(rng = patientRandom) {
    if (!patientPhotoPool.length) {
        patientPhotoPool = shuffle(PHOTO_PATHS, rng);
    }

    return patientPhotoPool.pop() || getRandomItem(PHOTO_PATHS, rng);
}

function buildSourceSnapshot(entry, type) {
    return {
        id: getEntryId(entry),
        type,
        label: getEntryValue(entry),
        tags: getEntryTags(entry),
    };
}

function createAgeSource(age, rng = patientRandom) {
    const tags = [];

    if (age >= 42) {
        tags.push(PATIENT_PROFILE_TAGS.HEARING_WEAR, PATIENT_PROFILE_TAGS.WEAK_CONSTITUTION);
        if (rng() < 0.5) {
            tags.push(PATIENT_PROFILE_TAGS.WEARS_GLASSES);
        }
    } else if (age >= 36) {
        if (rng() < 0.6) tags.push(PATIENT_PROFILE_TAGS.HEARING_WEAR);
        if (rng() < 0.5) tags.push(PATIENT_PROFILE_TAGS.WEAK_CONSTITUTION);
        if (rng() < 0.35) tags.push(PATIENT_PROFILE_TAGS.WEARS_GLASSES);
    } else if (age >= 28) {
        if (rng() < 0.35) tags.push(PATIENT_PROFILE_TAGS.WEARS_GLASSES);
        if (rng() < 0.3) tags.push(PATIENT_PROFILE_TAGS.WEAK_CONSTITUTION);
    }

    const uniqueTags = [...new Set(tags)];
    if (!uniqueTags.length) return null;

    return {
        id: `age-${age}`,
        value: `age ${age}`,
        tags: uniqueTags,
    };
}

function pickTrueDiagnosis(profileTags = [], rng = patientRandom) {
    const tagSet = new Set(profileTags);
    const weightedDiagnoses = diagnoses.map((diagnosis) => {
        const hints = DIAGNOSIS_TAG_HINTS[diagnosis.name] || [];
        const matches = hints.filter((tag) => tagSet.has(tag)).length;
        return {
            value: diagnosis.name,
            weight: 1 + matches * 2.25,
        };
    });

    return getEntryValue(pickWeightedItem(weightedDiagnoses, rng)) || diagnoses[0]?.name || "";
}

function getCandidatesForSource(source) {
    return source.tags.flatMap((tag) => (TAG_SYMPTOM_RULES[tag] || []).map(canonicalizeSymptom));
}

function pickSymptomsForSource(source, diagnosisSymptomSet, rng = patientRandom) {
    const candidateEntries = [...new Set(getCandidatesForSource(source))]
        .filter(Boolean)
        .map((symptom) => ({
            value: symptom,
            weight: diagnosisSymptomSet.has(symptom) ? 2.5 : 1,
        }));

    if (!candidateEntries.length) return [];

    const defaultSymptomBudgetByType = {
        [PATIENT_SYMPTOM_SOURCE_TYPES.HARMFUL_HABIT]: [
            [1, 0.8],
            [2, 0.2],
        ],
        [PATIENT_SYMPTOM_SOURCE_TYPES.OCCUPATION]: [
            [1, 0.65],
            [2, 0.35],
        ],
        [PATIENT_SYMPTOM_SOURCE_TYPES.AGE]: [
            [1, 0.75],
            [2, 0.25],
        ],
        [PATIENT_SYMPTOM_SOURCE_TYPES.LIFE_EVENT]: [
            [1, 0.55],
            [2, 0.45],
        ],
    };

    const count = Math.min(
        candidateEntries.length,
        pickSomeCount(defaultSymptomBudgetByType[source.type] || [[1, 1]], rng),
    );

    return sampleWithoutReplacement(candidateEntries, count, rng).map(getEntryValue);
}

function addSymptomOccurrence(symptomMap, symptomName, source) {
    const symptom = canonicalizeSymptom(symptomName);
    if (!symptom) return;

    if (!symptomMap.has(symptom)) {
        symptomMap.set(symptom, {
            symptom,
            sources: [],
        });
    }

    const record = symptomMap.get(symptom);
    const sourceKey = `${source.type}:${source.id}`;
    if (record.sources.some((entry) => `${entry.type}:${entry.id}` === sourceKey)) {
        return;
    }

    record.sources.push({
        type: source.type,
        id: source.id,
        label: source.label,
        tags: [...(source.tags || [])],
    });
}

function buildInternalSymptoms(trueDiagnosisName, sourceSnapshots, rng = patientRandom) {
    const symptomMap = new Map();
    const diagnosis = DIAGNOSES_BY_NAME.get(trueDiagnosisName);
    const diagnosisSymptoms = diagnosis?.symptoms || [];
    const diagnosisSource = {
        id: slugify(trueDiagnosisName),
        type: PATIENT_SYMPTOM_SOURCE_TYPES.TRUE_DIAGNOSIS,
        label: trueDiagnosisName,
        tags: [],
    };
    const diagnosisCount = diagnosisSymptoms.length
        ? Math.min(
              diagnosisSymptoms.length,
              Math.max(
                  2,
                  getRandomInt(
                      Math.max(2, Math.floor(diagnosisSymptoms.length * 0.55)),
                      Math.max(2, Math.ceil(diagnosisSymptoms.length * 0.8)),
                      rng,
                  ),
              ),
          )
        : 0;
    const chosenDiagnosisSymptoms = sampleWithoutReplacement(
        diagnosisSymptoms.map((symptom) => ({ value: symptom, weight: 1 })),
        diagnosisCount,
        rng,
    ).map(getEntryValue);
    const diagnosisSymptomSet = new Set(chosenDiagnosisSymptoms);

    chosenDiagnosisSymptoms.forEach((symptom) =>
        addSymptomOccurrence(symptomMap, symptom, diagnosisSource),
    );

    sourceSnapshots.forEach((source) => {
        pickSymptomsForSource(source, diagnosisSymptomSet, rng).forEach((symptom) => {
            addSymptomOccurrence(symptomMap, symptom, source);
        });
    });

    const relatedToDiagnosis = new Set(chosenDiagnosisSymptoms);
    const nonDiagnosisSymptoms = [...symptomMap.keys()].filter(
        (symptom) => !relatedToDiagnosis.has(symptom),
    );

    if (!nonDiagnosisSymptoms.length) {
        const fallbackCandidates = sourceSnapshots.flatMap((source) =>
            [...new Set(getCandidatesForSource(source))]
                .filter((symptom) => !relatedToDiagnosis.has(symptom))
                .map((symptom) => ({ symptom, source })),
        );

        if (fallbackCandidates.length) {
            const fallback = getRandomItem(fallbackCandidates, rng);
            addSymptomOccurrence(symptomMap, fallback.symptom, fallback.source);
        }
    }

    return [...symptomMap.values()].sort((left, right) =>
        left.symptom.localeCompare(right.symptom),
    );
}

function createDisplayOverride(baseEntry, entries, usedValues, symptomNames, rng = patientRandom) {
    const eligibleOverrides = entries.filter(
        (entry) => entry?.displayOverrideOnly && isEntryEligible(entry, { symptomNames }),
    );

    if (!eligibleOverrides.length || rng() >= 0.28) {
        return baseEntry;
    }

    const unusedOverrides = eligibleOverrides.filter(
        (entry) => !usedValues.has(getEntryValue(entry)),
    );
    return (
        pickWeightedItem(unusedOverrides.length ? unusedOverrides : eligibleOverrides, rng) ||
        baseEntry
    );
}

export function createRandomPatient(existingPatients = [], existingIds = new Set()) {
    const identity = createRandomPatientIdentity(existingPatients, patientRandom);
    const age = getRandomInt(18, 46, patientRandom);
    const usedOccupations = new Set(
        existingPatients.map((patient) => patient.occupation).filter(Boolean),
    );
    const usedResidences = new Set(
        existingPatients.map((patient) => patient.residence).filter(Boolean),
    );
    const usedMaritalStatuses = new Set(
        existingPatients.map((patient) => patient.maritalStatus).filter(Boolean),
    );
    const baseId = slugify(identity.name) || `patient-${Date.now()}`;
    let nextId = baseId;
    let suffix = 2;

    while (existingIds.has(nextId)) {
        nextId = `${baseId}-${suffix}`;
        suffix += 1;
    }

    const baseOccupationEntry = pickUnusedEntry(
        RANDOM_OCCUPATIONS.filter((entry) => !entry.displayOverrideOnly),
        usedOccupations,
        patientRandom,
        { gender: identity.gender, age },
    );
    const baseResidenceEntry = pickUnusedEntry(
        RANDOM_RESIDENCES.filter((entry) => !entry.displayOverrideOnly),
        usedResidences,
        patientRandom,
        { gender: identity.gender, age },
    );
    const maritalStatusEntry = pickUnusedEntry(
        RANDOM_MARITAL_STATUSES,
        usedMaritalStatuses,
        patientRandom,
    );
    const harmfulHabitCount = pickSomeCount(
        [
            [0, 0.28],
            [1, 0.48],
            [2, 0.24],
        ],
        patientRandom,
    );
    const harmfulHabitEntries = sampleWithoutReplacement(
        RANDOM_HARMFUL_HABITS,
        harmfulHabitCount,
        patientRandom,
    );
    const lifeEventPool = RANDOM_LIFE_EVENTS.filter((entry) =>
        isEntryEligible(entry, { gender: identity.gender, age }),
    );
    const lifeEventEntry =
        lifeEventPool.length && patientRandom() < 0.72
            ? pickWeightedItem(lifeEventPool, patientRandom)
            : null;
    const ageSource = createAgeSource(age, patientRandom);
    const profileTags = [
        ...getEntryTags(baseOccupationEntry),
        ...getEntryTags(baseResidenceEntry),
        ...harmfulHabitEntries.flatMap(getEntryTags),
        ...(lifeEventEntry ? getEntryTags(lifeEventEntry) : []),
        ...(ageSource ? getEntryTags(ageSource) : []),
    ];
    const trueDiagnosis = pickTrueDiagnosis(profileTags, patientRandom);
    const sourceSnapshots = [
        buildSourceSnapshot(baseOccupationEntry, PATIENT_SYMPTOM_SOURCE_TYPES.OCCUPATION),
        ...harmfulHabitEntries.map((entry) =>
            buildSourceSnapshot(entry, PATIENT_SYMPTOM_SOURCE_TYPES.HARMFUL_HABIT),
        ),
        ...(lifeEventEntry
            ? [buildSourceSnapshot(lifeEventEntry, PATIENT_SYMPTOM_SOURCE_TYPES.LIFE_EVENT)]
            : []),
        ...(ageSource ? [buildSourceSnapshot(ageSource, PATIENT_SYMPTOM_SOURCE_TYPES.AGE)] : []),
    ];
    const internalSymptoms = buildInternalSymptoms(trueDiagnosis, sourceSnapshots, patientRandom);
    const internalSymptomNames = internalSymptoms.map((entry) => entry.symptom);
    const internalSymptomNameSet = new Set(internalSymptomNames);
    const occupationEntry = createDisplayOverride(
        baseOccupationEntry,
        RANDOM_OCCUPATIONS,
        usedOccupations,
        internalSymptomNameSet,
        patientRandom,
    );
    const residenceEntry = createDisplayOverride(
        baseResidenceEntry,
        RANDOM_RESIDENCES,
        usedResidences,
        internalSymptomNameSet,
        patientRandom,
    );

    return {
        id: nextId,
        tabLabel: identity.name.split(" ")[0],
        name: identity.name,
        gender: identity.gender,
        age,
        maritalStatus: getEntryValue(maritalStatusEntry),
        occupation: getEntryValue(occupationEntry),
        occupationSource: buildSourceSnapshot(
            baseOccupationEntry,
            PATIENT_SYMPTOM_SOURCE_TYPES.OCCUPATION,
        ),
        admissionDay: 7,
        admissionText: "7th day of the plague",
        residence: getEntryValue(residenceEntry),
        residenceSource: buildSourceSnapshot(baseResidenceEntry, "residence"),
        photo: getNextPatientPhoto(patientRandom),
        clinicalPicture: "",
        diagnosis: "",
        selectedSymptoms: [],
        trueDiagnosis,
        harmfulHabits: harmfulHabitEntries.map((entry) =>
            buildSourceSnapshot(entry, PATIENT_SYMPTOM_SOURCE_TYPES.HARMFUL_HABIT),
        ),
        internalLifeEvent: lifeEventEntry
            ? buildSourceSnapshot(lifeEventEntry, PATIENT_SYMPTOM_SOURCE_TYPES.LIFE_EVENT)
            : null,
        internalSymptoms,
        internalSymptomNames,
        internalProfile: {
            occupationTags: getEntryTags(baseOccupationEntry),
            residenceTags: getEntryTags(baseResidenceEntry),
            harmfulHabitTags: harmfulHabitEntries.flatMap(getEntryTags),
            lifeEventTags: lifeEventEntry ? getEntryTags(lifeEventEntry) : [],
            ageTags: ageSource ? getEntryTags(ageSource) : [],
            allTags: [...new Set(profileTags)],
        },
    };
}

export function createInitialPatients(count, seedValue = DEFAULT_PATIENT_SEED) {
    resetPatientGenerator(seedValue);

    const existingIds = new Set();
    const patients = [];

    for (let index = 0; index < count; index += 1) {
        const patient = createRandomPatient(patients, existingIds);
        existingIds.add(patient.id);
        patients.push(patient);
    }

    return patients;
}

resetPatientGenerator();
