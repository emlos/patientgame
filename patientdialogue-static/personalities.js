export const PERSONALITIES = Object.freeze({
    guarded: {
        id: "guarded",
        label: "guarded",
        primerText:
            "She answers briefly and tries to keep her dignity. Concrete, practical questions go over better than fussing, repetition, or anything that feels prying.",
        toneAffinity: {
            practical: 1,
            neutral: 0,
            empathetic: 0,
            probing: -1,
            accusatory: -2,
            intrusive: -2,
        },
        repeatPatiencePenalty: 1,
        dislikedTonePatiencePenalty: 1,
        thresholdMods: {
            hintTrust: 0,
            confirmTrust: 1,
        },
        answerStyle: "brief",
    },
    talkative: {
        id: "talkative",
        label: "talkative",
        primerText:
            "She talks more freely when she feels heard. Curious and sympathetic questions work better than coldness.",
        toneAffinity: {
            practical: 0,
            neutral: 0,
            empathetic: 1,
            probing: 1,
            accusatory: -1,
            intrusive: -1,
        },
        repeatPatiencePenalty: 0,
        dislikedTonePatiencePenalty: 0,
        thresholdMods: {
            hintTrust: -1,
            confirmTrust: 0,
        },
        answerStyle: "expansive",
    },
    proud: {
        id: "proud",
        label: "proud",
        primerText:
            "She dislikes being handled or patronized. Respectful, direct questions work better than anything that sounds nosy.",
        toneAffinity: {
            practical: 1,
            neutral: 0,
            empathetic: 0,
            probing: -1,
            accusatory: -2,
            intrusive: -2,
        },
        repeatPatiencePenalty: 1,
        dislikedTonePatiencePenalty: 1,
        thresholdMods: {
            hintTrust: 0,
            confirmTrust: 1,
        },
        answerStyle: "defensive",
    },
    //scared, disoriented
});
