import { PERSONALITIES } from "../personalities.js";
import { QUESTION_DEFINITIONS } from "../questions.js";
import { VERA_FACTS } from "../facts/vera-facts.js";

export const VERA_INTERVIEW = Object.freeze({
    id: "vera-karmina",
    patient: {
        id: "vera-karmina",
        name: "Vera Karmina",
        age: 18,
        gender: "female",
        maritalStatus: "married",
        occupation: "apothecary assistant",
        residence: "Chine",
        trueDiagnosis: "Measles",
        opener: '"I cannot bear the light today. My head feels fit to split."',
    },
    personalityId: "guarded",
    startingTrust: 0,
    startingPatience: 5,
    maxFollowupSymptomsSelected: 4,
    notebookSymptoms: [
        "Headache",
        "Photophobia",
        "Fever",
        "Weakness",
        "Skin redness",
        "Nausea and vomiting",
    ],
    questionOrder: [
        "opening_warm",
        "opening_cold",
        "ask_onset",
        "ask_workday",
        "ask_home",
        "ask_function",
        "ask_headache_history",
        "ask_stomach",
        "ask_skin_followup",
        "finish_first_pass",
    ],

    questions: QUESTION_DEFINITIONS,
    facts: VERA_FACTS,
    personalities: PERSONALITIES,
    notebookIntro:     //TODO move to general strings.js type file
        "Read the dialogue, decide for yourself which symptoms fit, then test those selections against the diagnosis list.",
    followupIntro:     //TODO move to general strings.js type file
        "Select up to four symptoms, then go back once and ask about all of them in one sitting. Returning costs patience, and hidden topics never become askable on their own.",
    notebookReturnLine:     //TODO move to general strings.js type file
        "You step away again and sort what you learned against the notebook.",
    followupReturnLine:     //TODO move to general strings.js type file
        "You return to the bedside with a clearer plan and keep the questions narrow.",
    finalPatienceWarning:
        'Vera closes her eyes for a moment. "Then make this the last of it, doctor."',
    outOfPatienceLine:
        'Vera gathers the blanket closer. "No more for now. I have already given you enough."',
});
