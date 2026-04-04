export const VERA_DIALOGUE_STRINGS = Object.freeze({
    patient: {
        opener: '"I cannot bear the light today. My head feels fit to split."',
        notebookIntro:
            "The notebook begins empty. Vera does not volunteer a diagnosis; she gives fragments, excuses, and bodily details. Pull the symptoms out of what she actually says.",
        trustOpenLine: "Vera loosens her grip on the blanket and answers with a little less reserve.",
        trustClosedLine: "Vera keeps her chin up and weighs each word before letting it out.",
        followupReturnLine:
            "You return to the bedside with one cleaner thread of questioning in hand.",
        finalPatienceWarning:
            'Vera closes her eyes for a moment. "Then make this the last of it, doctor."',
        notebookReturnLine:
            "You step away again, sorting the answer into suspicion, confirmation, or noise.",
    },
    broadQuestions: {
        warm_intro: {
            label: "Tell her she may begin in her own order",
            lines: [
                "You leave the pencil where it is for a moment and let her speak before you start to write.",
                "Vera lowers her hand from her brow, though she still squints away from the window.",
                '"I might have endured the headache," she says. "It is the light that turned cruel."',
            ],
            reveals: [
                {
                    symptom: "Headache",
                    strength: "strong",
                    note: "She leads with head pain without needing to be pressed twice.",
                },
                {
                    symptom: "Photophobia",
                    strength: "strong",
                    note: "Ordinary daylight is one of the first things she complains of.",
                },
            ],
        },
        cold_intro: {
            label: "Open the chart at once and ask for the complaint plainly",
            lines: [
                "You uncap the pencil before offering comfort.",
                "She notices. That seems to stiffen her.",
                '"Very well," Vera says. "My head pounds, and daylight stabs straight through my eyes."',
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
                    note: "Light clearly worsens whatever is happening.",
                },
            ],
        },
        duration: {
            label: "Ask when this changed from a nuisance into an illness",
            lines: [
                '"Yesterday it was only the headache," Vera says. "This morning I woke hot and weak, as if I had not slept at all."',
            ],
            reveals: [
                {
                    symptom: "Fever",
                    strength: "soft",
                    note: 'She says she woke up "hot," but still avoids naming a fever outright.',
                },
                {
                    symptom: "Weakness",
                    strength: "soft",
                    note: "She describes sudden drained weakness by morning.",
                },
            ],
        },
        headache_history: {
            label: "Ask whether she is often troubled with headaches",
            lines: [
                '"Sometimes," Vera admits. "Enough that my aunt calls me delicate. But those pass. This one sits behind the eyes and refuses to leave."',
            ],
            worldClues: [
                {
                    id: "migraines-red-herring",
                    text: "She already has a history of headaches, which makes migraine a tempting but incomplete explanation.",
                },
            ],
            reveals: [
                {
                    symptom: "Headache",
                    strength: "strong",
                    note: "She distinguishes this pain from her more ordinary headaches.",
                },
            ],
        },
        work: {
            label: "Ask what her days at the apothecary look like",
            lines: [
                '"I bottle tinctures, grind powders, keep the shelves straight," she says. "The smells stay in the throat after a long day."',
                '"I told myself some vapor had got into me. It would be simpler if it were that."',
            ],
            worldClues: [
                {
                    id: "apothecary-red-herring",
                    text: "Her work gives a plausible non-infectious explanation for headache and nausea.",
                },
            ],
        },
        stomach: {
            label: "Ask whether the sickness turns her stomach",
            lines: [
                'She gives a small nod. "It did this morning. I retched twice before I left, though there was little enough to bring up."',
            ],
            reveals: [
                {
                    symptom: "Nausea and vomiting",
                    strength: "strong",
                    note: "Morning retching is described directly.",
                },
            ],
        },
        home: {
            label: "Ask about her home and the people around her",
            lines: [
                '"We live close in Chine," Vera says. "Too close for privacy and too close for health. If one room takes sick, the next room hears it before dusk."',
            ],
            worldClues: [
                {
                    id: "crowding-exposure",
                    text: "Crowded living conditions make contagious illness more plausible.",
                },
            ],
        },
        skin: {
            label: "Ask what she means when she says her skin feels wrong",
            lines: [
                "She smooths her sleeve down instead of looking at her arm.",
                '"Warm," she says after a pause. "Tight. As if the heat were sitting under it."',
            ],
            reveals: [
                {
                    symptom: "Skin redness",
                    strength: "soft",
                    note: "She hints at skin change without naming a visible rash.",
                },
            ],
        },
        function: {
            label: "Ask whether the illness is interfering with ordinary tasks",
            lines: [
                '"This morning I nearly dropped a bottle at work," Vera says. "My hands obey well enough, but I feel wrung out."',
            ],
            reveals: [
                {
                    symptom: "Weakness",
                    strength: "strong",
                    note: "The weakness is bad enough to interfere with simple work.",
                },
            ],
        },
        finish: {
            label: "Conclude the first pass and turn to the notebook",
            lines: [
                "You let the first layer of answers settle instead of needling her at random.",
                "The notebook is ready: now you can test what sounded decisive, what sounded misleading, and what still needs pressing.",
            ],
        },
    },
    followups: {
        Headache: {
            label: "Ask her to describe the pain exactly",
            lines: [
                '"It is not a stab and not a blur either," Vera says. "It pounds behind my eyes, as if the bones there had found a pulse of their own."',
            ],
            reveals: [
                {
                    symptom: "Headache",
                    strength: "strong",
                    note: "The pain is persistent, pounding, and centered behind the eyes.",
                },
            ],
        },
        Photophobia: {
            label: "Ask whether even ordinary light hurts her",
            lines: [
                '"Yes," she says at once. "The window is bad enough. The lamp is worse. I would rather speak in the dark."',
            ],
            reveals: [
                {
                    symptom: "Photophobia",
                    strength: "strong",
                    note: "Both daylight and lamplight clearly aggravate the illness.",
                },
            ],
        },
        Fever: {
            label: "Ask directly whether she has been feverish",
            lines: [
                'She presses the inside of her wrist to her brow. "Since dawn, I think. I have been burning, and then shivering besides."',
            ],
            reveals: [
                {
                    symptom: "Fever",
                    strength: "strong",
                    note: "She directly confirms fever with alternating heat and shivering.",
                },
            ],
        },
        Weakness: {
            label: "Ask how far the weakness has spread into her limbs",
            lines: [
                '"My legs feel hollow," Vera says. "I can stand, but not for long. It is as if the body wants to fold itself away."',
            ],
            reveals: [
                {
                    symptom: "Weakness",
                    strength: "strong",
                    note: "The weakness affects posture and staying power, not just mood.",
                },
            ],
        },
        "Skin redness": {
            label: "Ask to see the skin rather than hear about it",
            lines: [
                "That gives her pause, but she rolls the sleeve back far enough for you to judge it.",
                '"There," she says. "Red patches. I saw them properly only this morning."',
            ],
            reveals: [
                {
                    symptom: "Skin redness",
                    strength: "strong",
                    note: "Visible red patches are directly confirmed.",
                },
            ],
        },
        "Nausea and vomiting": {
            label: "Ask how bad the nausea truly was",
            lines: [
                '"Bad enough to send me to the basin twice," Vera says. "Not bad enough that I would have come here for that alone."',
            ],
            reveals: [
                {
                    symptom: "Nausea and vomiting",
                    strength: "strong",
                    note: "The nausea is real, but it remains secondary to the headache and light sensitivity.",
                },
            ],
        },
    },
});
