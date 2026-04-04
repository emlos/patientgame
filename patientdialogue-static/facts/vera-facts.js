export const VERA_FACTS = Object.freeze([
    {
        id: "vera_headache",
        type: "symptom",
        symptomId: "Headache",
        sourceIds: ["measles", "apothecary-assistant", "migraines"],
        channels: ["head", "general"],
        priority: 55,
        thresholds: {
            hinted: { trustAtLeast: 0, channelPressure: { head: 1 } },
            confirmed: { trustAtLeast: 0, channelPressure: { head: 2 } },
        },
        responses: {
            hinted: {
                guarded: [
                    '"My head has been bad since yesterday," Vera says.',
                ],
                talkative: [
                    '"The headache began yesterday and has only sharpened since," Vera says.',
                ],
                proud: [
                    '"My head aches. That much is obvious," Vera says.',
                ],
            },
            confirmed: {
                guarded: [
                    '"Sometimes I get headaches," Vera admits. "But those pass. This one sits behind the eyes and refuses to leave."',
                ],
                talkative: [
                    '"I do get headaches now and then," Vera says. "Only this one is different. It sits behind the eyes and will not loosen."',
                ],
                proud: [
                    '"This is no ordinary headache for me," Vera says. "It has lodged itself behind the eyes and stayed there."',
                ],
            },
        },
        exhaustedResponses: {
            guarded: '"I have already told you about my head," Vera says.',
            talkative: '"Only what I already said: the headache came first," Vera says.',
            proud: '"You are circling the same point," Vera says.',
        },
        followup: {
            label: "Ask her to describe the pain exactly",
            patienceCost: 1,
            patienceLine:
                "She answers, but only after a small pause; the question seems to her like needless circling around something already plain.",
            responses: {
                guarded: [
                    '"It is not a stab and not a blur either," Vera says. "It pounds behind my eyes, as if the bones there had found a pulse of their own."',
                ],
                talkative: [
                    '"It pounds rather than stabs," Vera says. "Behind the eyes, mostly. It feels almost rhythmic, which is worse somehow."',
                ],
                proud: [
                    '"Behind the eyes," Vera says. "Pounding. Steady. Unpleasant enough without dressing it up."',
                ],
            },
        },
    },
    {
        id: "vera_photophobia",
        type: "symptom",
        symptomId: "Photophobia",
        sourceIds: ["measles", "migraines"],
        channels: ["head", "general"],
        priority: 50,
        thresholds: {
            hinted: { trustAtLeast: 0, channelPressure: { head: 1 } },
            confirmed: { trustAtLeast: 1, channelPressure: { head: 2 } },
        },
        responses: {
            hinted: {
                guarded: [
                    'She keeps her face turned from the window. "It is the light more than anything," Vera says.',
                ],
                talkative: [
                    '"The light is the worst of it," Vera says. "Even the window feels too sharp today."',
                ],
                proud: [
                    '"I would rather speak with the curtains drawn," Vera says.',
                ],
            },
            confirmed: {
                guarded: [
                    '"Daylight stabs at them," Vera says. "I would rather speak in the dark."',
                ],
                talkative: [
                    '"Ordinary light hurts," Vera says. "The window is bad enough, but the lamp is worse."',
                ],
                proud: [
                    '"Yes. Even ordinary light hurts my eyes today," Vera says.',
                ],
            },
        },
        exhaustedResponses: {
            guarded: '"The light still hurts. I do not know how else to phrase it," Vera says.',
            talkative: '"It is still the same: the light is what makes the headache cruel," Vera says.',
            proud: '"It is a simple enough point. Light hurts," Vera says.',
        },
        followup: {
            label: "Ask whether even ordinary light hurts her",
            patienceCost: 0,
            responses: {
                guarded: [
                    '"Yes," she says at once. "The window is bad enough. The lamp is worse."',
                ],
                talkative: [
                    '"Yes," Vera says. "I would rather speak in the dark than look at the window another minute."',
                ],
                proud: [
                    '"Yes," Vera says shortly. "More than it ought to."',
                ],
            },
        },
    },
    {
        id: "vera_fever",
        type: "symptom",
        symptomId: "Fever",
        sourceIds: ["measles"],
        channels: ["general"],
        priority: 100,
        thresholds: {
            hinted: { trustAtLeast: 0, channelPressure: { general: 1 } },
            confirmed: { trustAtLeast: 1, channelPressure: { general: 2 } },
        },
        responses: {
            hinted: {
                guarded: [
                    '"This morning I woke hot," Vera says.',
                ],
                talkative: [
                    '"It stopped being merely a headache this morning," Vera says. "I woke hot all over."',
                ],
                proud: [
                    '"By morning there was heat with it as well," Vera says.',
                ],
            },
            confirmed: {
                guarded: [
                    'She touches her wrist to her brow. "I have been burning, and then shivering besides."',
                ],
                talkative: [
                    '"I have been burning since dawn," Vera says. "Then shivering, then burning again."',
                ],
                proud: [
                    '"Yes. Feverish since dawn," Vera says.',
                ],
            },
        },
        exhaustedResponses: {
            guarded: '"I am still hot. That part has not changed," Vera says.',
            talkative: '"The fever is still there. I have nothing more precise than that," Vera says.',
            proud: '"Yes, I have been feverish. We have established it," Vera says.',
        },
        followup: {
            label: "Ask directly whether she has been feverish",
            patienceCost: 0,
            responses: {
                guarded: [
                    'She presses the inside of her wrist to her brow. "Since dawn, I think."',
                ],
                talkative: [
                    '"Since dawn," Vera says. "Burning, then chills, then burning again."',
                ],
                proud: [
                    '"Yes," Vera says. "Since this morning."',
                ],
            },
        },
    },
    {
        id: "vera_weakness",
        type: "symptom",
        symptomId: "Weakness",
        sourceIds: ["measles"],
        channels: ["function", "general"],
        priority: 95,
        thresholds: {
            hinted: { trustAtLeast: 0, channelPressure: { function: 1 } },
            confirmed: { trustAtLeast: 1, channelPressure: { function: 1, general: 1 } },
        },
        responses: {
            hinted: {
                guarded: [
                    '"I feel wrung out," Vera says. "More than I ought from so little."',
                ],
                talkative: [
                    '"I feel wrung out," Vera says. "This morning I nearly dropped a bottle at work."',
                ],
                proud: [
                    '"It is interfering with ordinary things," Vera admits. "That is what I dislike about it."',
                ],
            },
            confirmed: {
                guarded: [
                    '"My legs feel hollow," Vera says. "I can stand, but not for long."',
                ],
                talkative: [
                    '"My legs feel hollow," Vera says. "I can stand and move about, only not for long before I want to fold up somewhere."',
                ],
                proud: [
                    '"My strength is not where it should be," Vera says. "That is the plain truth of it."',
                ],
            },
        },
        exhaustedResponses: {
            guarded: '"Only what I said: I tire too easily," Vera says.',
            talkative: '"The weakness is exactly that: weakness. I do not know what else to call it," Vera says.',
            proud: '"I have already admitted that I am weaker than I should be," Vera says.',
        },
        followup: {
            label: "Ask how far the weakness has spread into her limbs",
            patienceCost: 0,
            responses: {
                guarded: [
                    '"Mostly in the legs," Vera says. "Standing is worse than sitting."',
                ],
                talkative: [
                    '"Mostly in the legs," Vera says. "My hands still obey, but the rest of me feels emptied out."',
                ],
                proud: [
                    '"The legs more than the hands," Vera says.',
                ],
            },
        },
    },
    {
        id: "vera_nausea",
        type: "symptom",
        symptomId: "Nausea and vomiting",
        sourceIds: ["apothecary-assistant"],
        channels: ["stomach", "general"],
        priority: 80,
        thresholds: {
            hinted: { trustAtLeast: 0, channelPressure: { stomach: 1 } },
            confirmed: { trustAtLeast: 1, channelPressure: { stomach: 1, general: 1 } },
        },
        responses: {
            hinted: {
                guarded: [
                    'She gives a small nod. "It turned my stomach this morning."',
                ],
                talkative: [
                    '"It did turn my stomach this morning," Vera says. "I retched before leaving the house."',
                ],
                proud: [
                    '"Some nausea," Vera says. "Nothing I would have led with."',
                ],
            },
            confirmed: {
                guarded: [
                    '"Twice," Vera says. "Though there was little enough to bring up."',
                ],
                talkative: [
                    '"Twice this morning," Vera says. "Not enough there to make much of a scene, but enough to notice."',
                ],
                proud: [
                    '"Yes. I was sick twice," Vera says. "I do not care to dwell on it."',
                ],
            },
        },
        exhaustedResponses: {
            guarded: '"I have said what there was to say about it," Vera says.',
            talkative: '"Only that I was sick twice. There is not much glory in the detail," Vera says.',
            proud: '"I do not see the point of dwelling on that indignity," Vera says.',
        },
        followup: {
            label: "Ask how bad the nausea truly was",
            patienceCost: 1,
            patienceLine:
                "She clearly thinks this line of questioning dwells on an incidental indignity and resents it a little.",
            responses: {
                guarded: [
                    '"Bad enough to send me to the basin twice," Vera says.',
                ],
                talkative: [
                    '"Bad enough that I had to lean over the basin twice before leaving," Vera says.',
                ],
                proud: [
                    '"Enough that I noticed it, not enough that I would have come here for that alone," Vera says.',
                ],
            },
        },
    },
    {
        id: "vera_skin_redness",
        type: "symptom",
        symptomId: "Skin redness",
        sourceIds: ["measles"],
        channels: ["skin", "general"],
        priority: 70,
        thresholds: {
            hinted: { trustAtLeast: 2, channelPressure: { general: 2 } },
            confirmed: { trustAtLeast: 1, channelPressure: { skin: 1 } },
        },
        responses: {
            hinted: {
                guarded: [
                    'She smooths her sleeve down instead of looking at her arm. "My skin feels wrong somehow," Vera says. "Warm. Tight."',
                ],
                talkative: [
                    '"Something is wrong with my skin as well," Vera says. "Warm. Tight. As if the heat is sitting under it."',
                ],
                proud: [
                    '"There is some irritation to the skin as well," Vera says.',
                ],
            },
            confirmed: {
                guarded: [
                    'That gives her pause, but she rolls the sleeve back far enough for you to judge it. "There. Red patches."',
                ],
                talkative: [
                    'Vera rolls her sleeve back far enough to show you. "Red patches," she says. "I noticed them properly only this morning."',
                ],
                proud: [
                    'She shows you only briefly. "Yes. Some redness," Vera says. "I did not think it worth leading with."',
                ],
            },
        },
        exhaustedResponses: {
            guarded: '"I have already shown you what I meant," Vera says.',
            talkative: '"Only the same red patches I already showed you," Vera says.',
            proud: '"You have seen it. I have no more to add," Vera says.',
        },
        followup: {
            label: "Ask to see the skin rather than hear about it",
            patienceCost: 1,
            patienceLine:
                "The request embarrasses her, and she grows tighter after complying; she does not like being made into a spectacle.",
            responses: {
                guarded: [
                    'That gives her pause, but she rolls the sleeve back far enough for you to judge it. "There. Red patches."',
                ],
                talkative: [
                    'Vera rolls the sleeve back. "There," she says. "Red patches. I saw them properly only this morning."',
                ],
                proud: [
                    'She shows you only briefly. "There. Redness," Vera says.',
                ],
            },
        },
    },
    {
        id: "vera_apothecary_context",
        type: "context",
        symptomId: null,
        sourceIds: ["apothecary-assistant"],
        channels: ["work"],
        priority: 90,
        thresholds: {
            hinted: { trustAtLeast: 0, channelPressure: { work: 1 } },
            confirmed: { trustAtLeast: 0, channelPressure: { work: 2 } },
        },
        responses: {
            hinted: {
                guarded: [
                    '"I bottle tinctures, grind powders, keep the shelves straight," Vera says.',
                ],
                talkative: [
                    '"I bottle tinctures, grind powders, keep the shelves straight," Vera says. "The smells stay in the throat after a long day."',
                ],
                proud: [
                    '"I work in the apothecary," Vera says. "It is exacting work."',
                ],
            },
            confirmed: {
                guarded: [
                    '"I told myself some vapor had got into me," Vera says. "It would be simpler if it were that."',
                ],
                talkative: [
                    '"At first I thought some vapor or powder had got into me," Vera says. "It would be much simpler if it were that."',
                ],
                proud: [
                    '"At first I suspected the work more than an illness," Vera says.',
                ],
            },
        },
        exhaustedResponses: {
            guarded: '"It is still the same apothecary as before," Vera says.',
            talkative: '"Only what I said already: bottles, powders, tinctures, smells," Vera says.',
            proud: '"I have answered about my work," Vera says.',
        },
    },
    {
        id: "vera_home_context",
        type: "context",
        symptomId: null,
        sourceIds: ["chine"],
        channels: ["home"],
        priority: 85,
        thresholds: {
            hinted: { trustAtLeast: 0, channelPressure: { home: 1 } },
            confirmed: { trustAtLeast: 0, channelPressure: { home: 2 } },
        },
        responses: {
            hinted: {
                guarded: [
                    '"We live close in Chine," Vera says.',
                ],
                talkative: [
                    '"We live close in Chine," Vera says. "Too close for privacy and too close for health."',
                ],
                proud: [
                    '"Chine is close-packed," Vera says. "Everyone hears everything there."',
                ],
            },
            confirmed: {
                guarded: [
                    '"If one room takes sick, the next room hears it before dusk," Vera says.',
                ],
                talkative: [
                    '"If one room takes sick, the next room hears it before dusk," Vera says. "That is how close it is there."',
                ],
                proud: [
                    '"Privacy is not a luxury Chine offers," Vera says.',
                ],
            },
        },
        exhaustedResponses: {
            guarded: '"Chine is still Chine," Vera says.',
            talkative: '"There is not much more to say about Chine beyond how close everyone lives," Vera says.',
            proud: '"You would not like Chine any better for hearing about it twice," Vera says.',
        },
    },
]);
