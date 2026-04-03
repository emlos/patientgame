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
        personality: "guarded but articulate",
        opener: '"I cannot bear the light today. My head feels fit to split."',
    },
    notebookIntro:
        "The notebook starts empty. During the interview, symptom clues will appear here as you pick them out of what Vera actually says.",
    broadQuestions: [
        {
            id: "warm_intro",
            label: "Invite her to start from the beginning",
            once: true,
            kind: "opening",
            trustDelta: 1,
            lines: [
                "You let her set the pace before you begin taking notes.",
                'Vera lowers her hand from her temple, but keeps squinting at the light.',
                '"Since yesterday the headache has worsened. The daylight is the cruelest part of it."',
            ],
            reveals: [
                {
                    symptom: "Headache",
                    strength: "strong",
                    note: "She leads with head pain without being prompted twice.",
                },
                {
                    symptom: "Photophobia",
                    strength: "strong",
                    note: "Ordinary daylight is one of her first complaints.",
                },
            ],
        },
        {
            id: "cold_intro",
            label: "Ask for the worst symptom at once",
            once: true,
            kind: "opening",
            trustDelta: -1,
            lines: [
                "You begin with the chart instead of comfort.",
                'She stiffens at that, then answers anyway.',
                '"My head pounds, and the light makes it worse. Is that plain enough?"',
            ],
            reveals: [
                {
                    symptom: "Headache",
                    strength: "strong",
                    note: "She names pounding head pain directly.",
                },
                {
                    symptom: "Photophobia",
                    strength: "strong",
                    note: "Light clearly aggravates the complaint.",
                },
            ],
        },
        {
            id: "duration",
            label: "Ask when this started",
            once: true,
            lines: [
                '"Yesterday it was only the headache," Vera says. "By morning I felt hot and weak besides."',
            ],
            reveals: [
                {
                    symptom: "Fever",
                    strength: "soft",
                    note: 'She says she feels "hot," but does not name fever outright yet.',
                },
                {
                    symptom: "Weakness",
                    strength: "soft",
                    note: "She describes a sudden drained feeling by morning.",
                },
            ],
        },
        {
            id: "work",
            label: "Ask about her work",
            once: true,
            lines: [
                '"I help in the apothecary. Powders, bottles, sharp smells all day," she says.',
                '"I thought perhaps some vapor had got into me."',
            ],
            worldClues: [
                {
                    id: "apothecary-red-herring",
                    text: "Her work gives a plausible non-infectious explanation for headache and nausea.",
                },
            ],
        },
        {
            id: "stomach",
            label: "Ask whether her stomach is upset",
            once: true,
            lines: [
                'She nods once. "I retched this morning, though there was little in me to bring up."',
            ],
            reveals: [
                {
                    symptom: "Nausea and vomiting",
                    strength: "strong",
                    note: "Morning retching is directly described.",
                },
            ],
        },
        {
            id: "home",
            label: "Ask about home and recent contact",
            once: true,
            lines: [
                '"We live close with the others in Chine," Vera says. "If a sickness goes round there, it goes round fast."',
            ],
            worldClues: [
                {
                    id: "crowding-exposure",
                    text: "Crowded living conditions support contagious disease as a possibility.",
                },
            ],
        },
        {
            id: "other",
            label: "Ask what else feels wrong",
            once: true,
            lines: [
                'Vera rubs at one forearm through her sleeve.',
                '"My skin feels wrong somehow. Too warm. Tight, almost."',
            ],
            reveals: [
                {
                    symptom: "Skin redness",
                    strength: "soft",
                    note: "She hints at skin change without naming visible patches yet.",
                },
            ],
        },
        {
            id: "finish",
            label: "Conclude the broad interview for now",
            once: false,
            lines: [
                "You pause the first pass and turn to the notebook.",
                "Now you can test suspected symptoms against the diagnosis list and return with sharper follow-up questions.",
            ],
            unlockNotebook: true,
        },
    ],
    followups: [
        {
            symptom: "Headache",
            label: "Ask her to describe the headache more precisely",
            lines: [
                '"It is not a momentary stab," Vera says. "It sits there and pounds behind my eyes."',
            ],
            reveals: [
                {
                    symptom: "Headache",
                    strength: "strong",
                    note: "The pain is persistent and pounding.",
                },
            ],
        },
        {
            symptom: "Photophobia",
            label: "Ask whether even ordinary light hurts",
            lines: [
                '"Yes," she says at once. "The window is bad enough. The lamp is worse."',
            ],
            reveals: [
                {
                    symptom: "Photophobia",
                    strength: "strong",
                    note: "Both daylight and lamplight make the eyes hurt.",
                },
            ],
        },
        {
            symptom: "Fever",
            label: "Ask directly about fever",
            lines: [
                'Vera presses her wrist to her brow. "Since dawn, I think. I have been burning."',
            ],
            reveals: [
                {
                    symptom: "Fever",
                    strength: "strong",
                    note: "She directly confirms feeling feverish since dawn.",
                },
            ],
        },
        {
            symptom: "Weakness",
            label: "Ask whether the weakness is affecting her movement",
            lines: [
                '"My legs feel hollow," she says. "I can stand, but I do not feel steady for long."',
            ],
            reveals: [
                {
                    symptom: "Weakness",
                    strength: "strong",
                    note: "The weakness affects ordinary movement.",
                },
            ],
        },
        {
            symptom: "Skin redness",
            label: "Ask her to describe the skin change clearly",
            lines: [
                'She hesitates, then rolls her sleeve back enough to show you.',
                '"There are red patches, yes. I noticed them proper this morning."',
            ],
            reveals: [
                {
                    symptom: "Skin redness",
                    strength: "strong",
                    note: "Visible red patches are directly confirmed.",
                },
            ],
        },
        {
            symptom: "Nausea and vomiting",
            label: "Ask how bad the nausea has been",
            lines: [
                '"Bad enough to retch twice. Not bad enough to keep me here for that alone," Vera says.',
            ],
            reveals: [
                {
                    symptom: "Nausea and vomiting",
                    strength: "strong",
                    note: "The nausea is real, but not her main concern.",
                },
            ],
        },
    ],
});
