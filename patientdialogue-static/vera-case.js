import { VERA_DIALOGUE_STRINGS } from "./vera-dialogue-data.js";

const strings = VERA_DIALOGUE_STRINGS;

function branch(id, overrides = {}) {
    return Object.freeze({
        id,
        once: true,
        ...strings.broadQuestions[id],
        ...overrides,
    });
}

function followup(symptom) {
    return Object.freeze({
        symptom,
        ...strings.followups[symptom],
    });
}

export const VERA_CASE = Object.freeze({
    patient: {
        id: "vera-karmina",
        name: "Vera Karmina",
        age: 18,
        gender: "female",
        maritalStatus: "married",
        occupation: "apothecary assistant",
        residence: "Chine",
        trueDiagnosis: "Measles",
        personality: "guarded, dutiful, embarrassed by fuss",
        opener: strings.patient.opener,
    },
    personalityPrimer: strings.patient.personalityPrimer,
    trustOpenLine: strings.patient.trustOpenLine,
    trustClosedLine: strings.patient.trustClosedLine,
    followupReturnLine: strings.patient.followupReturnLine,
    finalPatienceWarning: strings.patient.finalPatienceWarning,
    notebookReturnLine: strings.patient.notebookReturnLine,
    outOfPatienceLine: strings.patient.outOfPatienceLine,
    patience: 4,
    maxFollowupSymptomsSelected: 4,
    notebookSymptoms: [
        "Headache",
        "Photophobia",
        "Fever",
        "Weakness",
        "Skin redness",
        "Nausea and vomiting",
    ],
    //TODO: unused - will be handled by personality types/symptoms cross
    broadQuestions: [
        branch("warm_intro", { kind: "opening", trustDelta: 1 }),
        branch("cold_intro", { kind: "opening", trustDelta: -1 }),
        branch("duration"),
        branch("headache_history"),
        branch("work"),
        branch("stomach"),
        branch("home"),
        branch("skin"),
        branch("function"),
        branch("finish", { once: false, unlockNotebook: true }),
    ],
    //patient specific
    followups: [
        followup("Headache"),
        followup("Photophobia"),
        followup("Fever"),
        followup("Weakness"),
        followup("Skin redness"),
        followup("Nausea and vomiting"),
    ],
});
