import {
    PHOTO_PATHS,
    RANDOM_MARITAL_STATUSES,
    RANDOM_OCCUPATIONS,
    RANDOM_PATIENT_LAST_NAMES,
    RANDOM_PATIENT_NAMES,
    RANDOM_RESIDENCES,
} from "./data.js";

const DEFAULT_PATIENT_SEED = "pathologic-3";

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
                patient.age,
                patient.photo,
                patient.occupation,
                patient.residence,
            ].join("|"),
        )
        .join("::");

    return hashString(base || DEFAULT_PATIENT_SEED);
}

function pickRandomUnusedValue(values, usedValues = new Set(), rng = patientRandom) {
    const unusedValues = values.filter((value) => !usedValues.has(value));
    return getRandomItem(unusedValues.length ? unusedValues : values, rng);
}

function createRandomPatientName(existingPatients = [], rng = patientRandom) {
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

    const firstName = pickRandomUnusedValue(RANDOM_PATIENT_NAMES, usedFirstNames, rng);
    const hasLastName = rng() < 0.35;
    return hasLastName
        ? `${firstName} ${getRandomItem(RANDOM_PATIENT_LAST_NAMES, rng)}`
        : firstName;
}

function getNextPatientPhoto(rng = patientRandom) {
    if (!patientPhotoPool.length) {
        patientPhotoPool = shuffle(PHOTO_PATHS, rng);
    }

    return patientPhotoPool.pop() || getRandomItem(PHOTO_PATHS, rng);
}

export function createRandomPatient(existingPatients = [], existingIds = new Set()) {
    const name = createRandomPatientName(existingPatients, patientRandom);
    const usedOccupations = new Set(
        existingPatients.map((patient) => patient.occupation).filter(Boolean),
    );
    const usedResidences = new Set(
        existingPatients.map((patient) => patient.residence).filter(Boolean),
    );
    const usedMaritalStatuses = new Set(
        existingPatients.map((patient) => patient.maritalStatus).filter(Boolean),
    );
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
        age: getRandomInt(18, 46, patientRandom),
        maritalStatus: pickRandomUnusedValue(
            RANDOM_MARITAL_STATUSES,
            usedMaritalStatuses,
            patientRandom,
        ),
        occupation: pickRandomUnusedValue(RANDOM_OCCUPATIONS, usedOccupations, patientRandom),
        admissionDay: 7,
        admissionText: "7th day of the plague",
        residence: pickRandomUnusedValue(RANDOM_RESIDENCES, usedResidences, patientRandom),
        photo: getNextPatientPhoto(patientRandom),
        harmfulHabits: "",
        clinicalPicture: "",
        diagnosis: "",
        selectedSymptoms: [],
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
