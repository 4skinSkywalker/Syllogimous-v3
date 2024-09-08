import { Injectable } from "@angular/core";
import { EnumQuestionType, Question } from "./models/question.models";
import { coinFlip, findDirection, findDirection3D, findDirection4D, getRandomRuleInvalid, getRandomRuleValid, getRandomSymbols, getRelation, getSyllogism, getSymbols, isPremiseLikeConclusion, makeMetaRelations, pickUniqueItems, shuffle } from "./utils/engine.utils";
import { DIRECTION_COORDS, DIRECTION_COORDS_3D, DIRECTION_NAMES, DIRECTION_NAMES_3D, DIRECTION_NAMES_3D_INVERSE, DIRECTION_NAMES_INVERSE, TIME_NAMES } from "./constants/engine.constants";
import { EnumScreens, EnumTiers } from "./models/syllogimous.models";
import { TIER_SCORE_ADJUSTMENTS, TIER_SCORE_RANGES, TIER_SETTINGS } from "./constants/syllogimous.constants";
import { LS_DONT_SHOW, LS_HISTORY, LS_SCORE } from "./constants/local-storage.constants";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalLevelChangeComponent } from "./components/modal-level-change/modal-level-change.component";

@Injectable({
    providedIn: "root"
})
export class SyllogimousService {
    _score = 0;
    history: Question[] = [];
    screen = EnumScreens.Intro;
    question = this.createSyllogism(2);

    get score() {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
        localStorage.setItem(LS_SCORE, JSON.stringify(value));
    }

    get tier() {
        for (const tier of Object.values(EnumTiers)) {
            const range = TIER_SCORE_RANGES[tier];
            if (this.score >= range.minScore && this.score <= range.maxScore) {
                return tier as EnumTiers;
            }
        }
        return EnumTiers.Adept;
    }

    get settings() {
        return TIER_SETTINGS[this.tier];
    }

    get questionsFromLS() {
        let questions: Question[] = [];
        const history = localStorage.getItem(LS_HISTORY);
        if (history) {
            questions = JSON.parse(history).reverse();
        }
        return questions;
    }

    constructor(
        private modalService: NgbModal
    ) {
        this.loadScore();
        this.loadHistory();

        if (!localStorage.getItem(LS_DONT_SHOW + EnumScreens.Intro)) {
            this.screen = EnumScreens.Intro;
        } else {
            this.screen = EnumScreens.Start;
        }
    }

    loadScore() {
        const lsScore = localStorage.getItem(LS_SCORE);
        if (lsScore) {
            this.score = JSON.parse(lsScore);
        }
    }

    loadHistory() {
        const lsHistory = localStorage.getItem(LS_HISTORY);
        if (lsHistory) {
            this.history = JSON.parse(lsHistory);
        }
    }

    pushIntoHistory(question: Question) {
        this.history = [ ...this.history, question ];
        localStorage.setItem(LS_HISTORY, JSON.stringify(this.history));
    }

    createQuestion() {
        const choices = [];
        if (this.settings.enableDistinction) {
            choices.push(() => this.createDistinction(this.settings.premisesDistinction));
        }
        if (this.settings.enableComparisonNumerical) {
            choices.push(() => this.createComparison(this.settings.premisesComparisonNumerical, EnumQuestionType.ComparisonNumerical));
        }
        if (this.settings.enableComparisonChronological) {
            choices.push(() => this.createComparison(this.settings.premisesComparisonChronological, EnumQuestionType.ComparisonChronological));
        }
        if (this.settings.enableSyllogism) {
            choices.push(() => this.createSyllogism(this.settings.premisesSyllogism));
        }
        if (this.settings.enableDirection) {
            choices.push(() => this.createDirection(this.settings.premisesDirection));
        }
        if (this.settings.enableDirection3D) {
            choices.push(() => this.createDirection3D(this.settings.premisesDirection3D));
        }
        if (this.settings.enableDirection4D) {
            choices.push(() => this.createDirection4D(this.settings.premisesDirection4D));
        }
        if (this.settings.enableAnalogy) {
            choices.push(() => this.createAnalogy(this.settings.premisesAnalogy));
        }
        if (this.settings.enableBinary) {
            choices.push(() => this.createBinary(this.settings.premisesBinary));
        }

        const randomQuestion = pickUniqueItems(choices, 1).picked[0]();
        console.log("createQuestion()", randomQuestion);
        this.question = randomQuestion!;
    }

    skipIntro(dontShowAnymore: boolean) {
        if (dontShowAnymore) {
            localStorage.setItem(LS_DONT_SHOW + EnumScreens.Intro, "1")
        }
        this.screen = EnumScreens.Start;
    }

    start() {
        this.createQuestion();
        if (!localStorage.getItem(LS_DONT_SHOW + this.question.type)) {
            this.screen = EnumScreens.Tutorial;
        } else {
            this.screen = EnumScreens.InGame;
        }
    }

    skipTutorial(dontShowAnymore: boolean) {
        if (dontShowAnymore) {
            localStorage.setItem(LS_DONT_SHOW + this.question.type, "1")
        }
        this.screen = EnumScreens.InGame;
    }

    checkQuestion(value?: boolean) {
        this.question.userAnswer = value;
        this.question.answeredAt = Date.now();

        const currTier = this.tier;

        let ds = 0;
        if (this.question.userAnswer === this.question.isValid) {
            this.score += TIER_SCORE_ADJUSTMENTS[this.tier].increment;
            ds += 1;
        } else {
            this.score = Math.max(0, this.score - TIER_SCORE_ADJUSTMENTS[this.tier].decrement);
            if (this.score !== 0) {
                ds -= 1;
            }
        }

        const nextTier = this.tier;

        // Level up/down
        if (currTier !== nextTier) {
            const modalRef = this.modalService.open(ModalLevelChangeComponent, { centered: true });
            if (ds > 0) { // level up
                modalRef.componentInstance.title = "Congratulations, You've Leveled Up!";
                modalRef.componentInstance.content = "Your hard work is paying off.\nKeep going to unlock more features and rewards!";
            } else if (ds < 0) { // level down
                modalRef.componentInstance.title = "Level Down - Let's Regroup!";
                modalRef.componentInstance.content = "Take this as a learning step.\nRefocus your efforts and you’ll be back on top in no time!";
            }
        }

        this.pushIntoHistory(this.question);
        this.screen = EnumScreens.Feedback;
        setTimeout(() => this.screen = EnumScreens.Start, 750);
    }

    createSyllogism(length: number) {
        if (length < 2) throw Error("Needs at least 2 premises.");

        length++;
    
        const question = new Question(EnumQuestionType.Syllogism);
        question.isValid = coinFlip();

        do {
            question.rule = question.isValid ? getRandomRuleValid() : getRandomRuleInvalid();
            question.bucket = getRandomSymbols(this.settings, length);
            question.premises = [];

            [
                question.premises[0],
                question.premises[1],
                question.conclusion
            ] = getSyllogism(
                this.settings,
                question.bucket[0],
                question.bucket[1],
                question.bucket[2],
                question.isValid ? getRandomRuleValid() : getRandomRuleInvalid()
            );
        } while(isPremiseLikeConclusion(question.premises, question.conclusion));

        for (let i = 3; i < length; i++) {
            const rnd = Math.floor(Math.random() * (i - 1));
            const flip = coinFlip();
            const [ p, m ] = flip ? [question.bucket[i], question.bucket[rnd]] : [question.bucket[rnd], question.bucket[i]];
            question.premises.push(getSyllogism(this.settings, "#####", p, m, getRandomRuleInvalid())[0]);
        }
    
        shuffle(question.premises);
    
        return question;
    }

    createDistinction(length: number) {
        if (length < 2) throw Error("Needs at least 2 premises.");

        length++;

        const symbols = getRandomSymbols(this.settings, length);
        const question = new Question(EnumQuestionType.Distinction);

        do {
            const rnd = Math.floor(Math.random() * symbols.length);
            const first = symbols.splice(rnd, 1)
            let prev = first;
            let curr: string[] = [];
    
            question.buckets = [[prev], []];
            let prevBucket = 0;
    
            question.premises = [];

            for (let i = 0; i < length - 1; i++) {
                const rnd = Math.floor(Math.random() * symbols.length);
                curr = symbols.splice(rnd, 1);

                const isSameAs = coinFlip();
                const relation = getRelation(this.settings, EnumQuestionType.Distinction, isSameAs);

                question.premises.push(`<span class="subject">${prev}</span> is ${relation} <span class="subject">${curr}</span>`);

                if (!isSameAs) {
                    prevBucket = (prevBucket + 1) % 2;
                }

                question.buckets[prevBucket].push(curr);
    
                prev = curr;
            }

            makeMetaRelations(this.settings, question, length);

            const isSameAs = coinFlip();
            const relation = getRelation(this.settings, EnumQuestionType.Distinction, isSameAs);

            question.conclusion = `<span class="subject">${first}</span> is ${relation} <span class="subject">${curr}</span>`;
            question.isValid = isSameAs
                ? question.buckets[0].includes(curr)
                : question.buckets[1].includes(curr);
        } while(isPremiseLikeConclusion(question.premises, question.conclusion));
    
        shuffle(question.premises);
    
        return question;
    }

    createComparison(length: number, type: EnumQuestionType.ComparisonNumerical | EnumQuestionType.ComparisonChronological) {
        if (length < 2) throw Error("Needs at least 2 premises.");

        length++;

        const question = new Question(type);

        do {
            question.bucket = getRandomSymbols(this.settings, length);
            question.premises = [];
            const sign = [-1, 1][Math.floor(Math.random() * 2)];

            let next = "";
    
            for (let i = 0; i < length - 1; i++) {
                const curr = question.bucket[i];
                next = question.bucket[i + 1];

                const isMoreOrAfter = coinFlip();
                const [first, last] = ((sign === 1) === isMoreOrAfter) ? [next, curr] : [curr, next];
                const relation = getRelation(this.settings, type, isMoreOrAfter);

                question.premises.push(`<span class="subject">${first}</span> is ${relation} <span class="subject">${last}</span>`);
            }

            makeMetaRelations(this.settings, question, length);

            const a = Math.floor(Math.random() * question.bucket.length);
            let b = Math.floor(Math.random() * question.bucket.length);
            while (a === b) {
                b = Math.floor(Math.random() * question.bucket.length);
            }

            const isMoreOrAfter = coinFlip();
            const relation = getRelation(this.settings, type, isMoreOrAfter);

            question.conclusion = `<span class="subject">${question.bucket[a]}</span> is ${relation} <span class="subject">${question.bucket[b]}</span>`;
            question.isValid = isMoreOrAfter
                ? sign === 1 && a > b || sign === -1 && a < b
                : sign === 1 && a < b || sign === -1 && a > b;
        } while(isPremiseLikeConclusion(question.premises, question.conclusion));
    
        shuffle(question.premises);
    
        return question;
    }

    createDirection(length: number) {
        if (length < 2) throw Error("Needs at least 2 premises.");
        
        length++;
        
        const symbols = getSymbols(this.settings);
        const words = pickUniqueItems(symbols, length).picked;
        const question = new Question(EnumQuestionType.Direction);

        let wordCoordMap: Record<string, [number, number]> = {};
        let conclusionDirection = "";

        while (!conclusionDirection) {
            wordCoordMap = {};
            question.premises = [];
    
            for (let i = 0; i < words.length - 1; i++) {
                const dirIndex = 1 + Math.floor(Math.random()*(DIRECTION_NAMES.length - 1));
                const dirName = DIRECTION_NAMES[dirIndex]!;
                const dirCoord = DIRECTION_COORDS[dirIndex];

                if (i === 0) {
                    wordCoordMap[words[i]] = [0,0];
                }

                wordCoordMap[words[i+1]] = [
                    wordCoordMap[words[i]][0] + dirCoord[0], // x
                    wordCoordMap[words[i]][1] + dirCoord[1]  // y
                ];

                if (this.settings.enableNegation && coinFlip()) {
                    question.premises.push(`<span class="subject">${words[i+1]}</span> is at <span class="is-negated">${(DIRECTION_NAMES_INVERSE as any)[dirName]}</span> of <span class="subject">${words[i]}</span>`);
                } else {
                    question.premises.push(`<span class="subject">${words[i+1]}</span> is at ${dirName} of <span class="subject">${words[i]}</span>`);
                }
            }
    
            conclusionDirection = findDirection(wordCoordMap[words[0]], wordCoordMap[words[length-1]]);
        }

        question.wordCoordMap = wordCoordMap;
        question.isValid = coinFlip();
        const oppositeDirection = findDirection(wordCoordMap[words[length-1]], wordCoordMap[words[0]]);
        const direction = question.isValid ? conclusionDirection : oppositeDirection;

        if (this.settings.enableNegation && coinFlip()) {
            question.conclusion = `<span class="subject">${words[0]}</span> is at <span class="is-negated">${(DIRECTION_NAMES_INVERSE as any)[direction]}</span> of <span class="subject">${words[words.length-1]}</span>`;
        } else {
            question.conclusion = `<span class="subject">${words[0]}</span> is at ${direction} of <span class="subject">${words[words.length-1]}</span>`;
        }
    
        shuffle(question.premises);
        
        return question;
    }

    createDirection3D(length: number) {
        if (length < 2) throw Error("Needs at least 2 premises.");

        length++;
    
        const symbols = getSymbols(this.settings);
        const words = pickUniqueItems(symbols, length).picked;
        const question = new Question(EnumQuestionType.Direction3D);
    
        let wordCoordMap: Record<string, [number, number, number]> = {};
        let conclusionDirection = "";

        while (!conclusionDirection) {
            wordCoordMap = {};
            question.premises = [];
    
            for (let i = 0; i < words.length - 1; i++) {
                const dirIndex = 1 + Math.floor(Math.random() * (DIRECTION_NAMES_3D.length - 1));
                const dirName = DIRECTION_NAMES_3D[dirIndex];
                const dirCoord = DIRECTION_COORDS_3D[dirIndex];

                if (i === 0) {
                    wordCoordMap[words[i]] = [0,0,0];
                }

                wordCoordMap[words[i+1]] = [
                    wordCoordMap[words[i]][0] + dirCoord[0], // x
                    wordCoordMap[words[i]][1] + dirCoord[1], // y
                    wordCoordMap[words[i]][2] + dirCoord[2], // z
                ];

                if (this.settings.enableNegation && coinFlip()) {
                    question.premises.push(`<span class="subject">${words[i+1]}</span> is <span class="is-negated">${(DIRECTION_NAMES_3D_INVERSE as any)[dirName]}</span> of <span class="subject">${words[i]}</span>`);
                } else {
                    question.premises.push(`<span class="subject">${words[i+1]}</span> is ${dirName} of <span class="subject">${words[i]}</span>`);
                }
            }
    
            conclusionDirection = findDirection3D(wordCoordMap[words[0]], wordCoordMap[words[length-1]]);
        }

        question.wordCoordMap = wordCoordMap;
        question.isValid = coinFlip();
        const oppositeDirection = findDirection3D(wordCoordMap[words[length-1]], wordCoordMap[words[0]]);
        const direction = question.isValid ? conclusionDirection : oppositeDirection;

        if (this.settings.enableNegation && coinFlip()) {
            question.conclusion = `<span class="subject">${words[0]}</span> is <span class="is-negated">${(DIRECTION_NAMES_3D_INVERSE as any)[direction]}</span> of <span class="subject">${words[words.length-1]}</span>`;
        } else {
            question.conclusion = `<span class="subject">${words[0]}</span> is ${direction} of <span class="subject">${words[words.length-1]}</span>`;
        }
    
        shuffle(question.premises);
        
        return question;
    }

    createDirection4D(length: number) {
        if (length < 2) throw Error("Needs at least 2 premises.");

        length++;
    
        const symbols = getSymbols(this.settings);
        const words = pickUniqueItems(symbols, length).picked;
        const question = new Question(EnumQuestionType.Direction4D);
    
        let wordCoordMap: Record<string, [number, number, number, number]> = {};
        let conclusionDirection = { spatial: "", temporal: "" };

        while (!conclusionDirection.spatial) {
            wordCoordMap = {};
            question.premises = [];
    
            for (let i = 0; i < words.length - 1; i++) {
                const timeIndex =  pickUniqueItems([-1,0,1], 1).picked[0];
                const timeName = TIME_NAMES[timeIndex + 1];
                const dirIndex = 1 + Math.floor(Math.random()*(DIRECTION_NAMES_3D.length - 1));
                const dirName = DIRECTION_NAMES_3D[dirIndex];
                const dirCoord = DIRECTION_COORDS_3D[dirIndex];

                if (i === 0) {
                    wordCoordMap[words[i]] = [0,0,0,0];
                }

                wordCoordMap[words[i+1]] = [
                    wordCoordMap[words[i]][0] + dirCoord[0], // x
                    wordCoordMap[words[i]][1] + dirCoord[1], // y
                    wordCoordMap[words[i]][2] + dirCoord[2], // z
                    wordCoordMap[words[i]][3] + timeIndex,   // time
                ];

                if (this.settings.enableNegation && coinFlip()) {
                    question.premises.push(`<span class="subject">${words[i+1]}</span> ${timeName} <span class="is-negated">${(DIRECTION_NAMES_3D_INVERSE as any)[dirName]}</span> of <span class="subject">${words[i]}</span>`);
                } else {
                    question.premises.push(`<span class="subject">${words[i+1]}</span> ${timeName} ${dirName} of <span class="subject">${words[i]}</span>`);
                }
            }
    
            conclusionDirection = findDirection4D(wordCoordMap[words[0]], wordCoordMap[words[length-1]]);
        }

        question.wordCoordMap = wordCoordMap;
        question.isValid = coinFlip();
        const oppositeDirection = findDirection4D(wordCoordMap[words[length-1]], wordCoordMap[words[0]]);
        const direction = question.isValid ? conclusionDirection : oppositeDirection;

        if (this.settings.enableNegation && coinFlip()) {
            question.conclusion = `<span class="subject">${words[0]}</span> ${direction.temporal} <span class="is-negated">${(DIRECTION_NAMES_3D_INVERSE as any)[direction.spatial]}</span> of <span class="subject">${words[words.length-1]}</span>`;
        } else {
            question.conclusion = `<span class="subject">${words[0]}</span> ${direction.temporal} ${direction.spatial} of <span class="subject">${words[words.length-1]}</span>`;
        }

        shuffle(question.premises);
        
        return question;
    }

    createAnalogy(length: number) {
        if (length < 3) throw Error("Needs at least 3 premises.");

        const analogyEnables = [
            this.settings.enableDistinction,
            this.settings.enableComparisonNumerical,
            this.settings.enableComparisonChronological,
            this.settings.enableDirection,
            this.settings.enableDirection3D,
            this.settings.enableDirection4D
        ];
        if (analogyEnables.reduce((a, c) => a + +c, 0) < 1) {
            throw new Error("Needs at least one of" + analogyEnables.join(", "));
        }

        const choiceIndices = [];
    
        if (this.settings.enableDistinction) {
            choiceIndices.push(0);
        }
        if (this.settings.enableComparisonNumerical) {
            choiceIndices.push(1);
        }
        if (this.settings.enableComparisonChronological) {
            choiceIndices.push(2);
        }
        if (this.settings.enableDirection) {
            choiceIndices.push(3);
        }
        if (this.settings.enableDirection3D) {
            choiceIndices.push(4);
        }
        if (this.settings.enableDirection4D) {
            choiceIndices.push(5);
        }
    
        const choiceIndex = pickUniqueItems(choiceIndices, 1).picked[0];

        let question = new Question(EnumQuestionType.Analogy);
        let isValidSame;
        let a, b, c, d;
        let indexOfA, indexOfB, indexOfC, indexOfD;

        const flip = coinFlip();

        switch (choiceIndex) {
            case 0:
                question = this.createDistinction(length);
                question.type = EnumQuestionType.Analogy;
                question.conclusion = "";
        
                [a, b, c, d] = pickUniqueItems([...question.buckets[0], ...question.buckets[1]], 4).picked;
                question.conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;

                [
                    indexOfA,
                    indexOfB,
                    indexOfC,
                    indexOfD
                ] = [
                    Number(question.buckets[0].indexOf(a) !== -1),
                    Number(question.buckets[0].indexOf(b) !== -1),
                    Number(question.buckets[0].indexOf(c) !== -1),
                    Number(question.buckets[0].indexOf(d) !== -1)
                ];
                isValidSame = (indexOfA === indexOfB && indexOfC === indexOfD) || (indexOfA !== indexOfB && indexOfC !== indexOfD);
                break;
            case 1:
            case 2:
                const type = choiceIndex === 1 ? EnumQuestionType.ComparisonNumerical : EnumQuestionType.ComparisonChronological;
                question = this.createComparison(length, type);
                question.type = EnumQuestionType.Analogy;
                question.conclusion = "";

                [a, b, c, d] = pickUniqueItems(question.bucket, 4).picked;
                question.conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;

                [indexOfA, indexOfB] = [question.bucket.indexOf(a), question.bucket.indexOf(b)];
                [indexOfC, indexOfD] = [question.bucket.indexOf(c), question.bucket.indexOf(d)];
                isValidSame = (indexOfA > indexOfB && indexOfC > indexOfD) || (indexOfA < indexOfB && indexOfC < indexOfD);
                break;
            case 3:
                while (flip !== isValidSame) {
                    question = this.createDirection(length);
                    question.type = EnumQuestionType.Analogy;
                    question.conclusion = "";

                    [a, b, c, d] = pickUniqueItems(Object.keys(question.wordCoordMap), 4).picked;
                    question.conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;
        
                    const dirA = findDirection(question.wordCoordMap[a] as any, question.wordCoordMap[b] as any);
                    const dirB = findDirection(question.wordCoordMap[c] as any, question.wordCoordMap[d] as any);
                    isValidSame = dirA === dirB;
                }
                break;
            case 4:
                while (flip !== isValidSame) {
                    question = this.createDirection3D(length);
                    question.type = EnumQuestionType.Analogy;
                    question.conclusion = "";

                    [a, b, c, d] = pickUniqueItems(Object.keys(question.wordCoordMap), 4).picked;
                    question.conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;

                    const dirA = findDirection3D(question.wordCoordMap[a] as any, question.wordCoordMap[b] as any);
                    const dirB = findDirection3D(question.wordCoordMap[c] as any, question.wordCoordMap[d] as any);
                    isValidSame = dirA === dirB;
                }
                break;
            case 5:
                while (flip !== isValidSame) {
                    question = this.createDirection4D(length);
                    question.type = EnumQuestionType.Analogy;
                    question.conclusion = "";

                    [a, b, c, d] = pickUniqueItems(Object.keys(question.wordCoordMap), 4).picked;
                    question.conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;

                    const { spatial, temporal } = findDirection4D(question.wordCoordMap[a] as any, question.wordCoordMap[b] as any);
                    const { spatial: spatial2, temporal: temporal2 } = findDirection4D(question.wordCoordMap[c] as any, question.wordCoordMap[d] as any);
                    isValidSame = (spatial === spatial2) && (temporal === temporal2);
                }
                break;
        }

        if (isValidSame === undefined) {
            throw new Error("Shouldn't be here...");
        }

        const isSameRelation = coinFlip();
        question.isValid = isSameRelation ? isValidSame : !isValidSame;

        if (this.settings.enableNegation && coinFlip()) {
            if (isSameRelation) {
                if (choiceIndex < 1) {
                    question.conclusion += '<div class="analogy-conclusion-relation is-negated">is different from</div>';
                } else {
                    question.conclusion += '<div class="analogy-conclusion-relation is-negated">has a different relation from</div>';
                }
            } else {
                if (choiceIndex < 1) {
                    question.conclusion += '<div class="analogy-conclusion-relation is-negated">is the same as</div>';
                } else {
                    question.conclusion += '<div class="analogy-conclusion-relation is-negated">has the same relation as</div>';
                }
            }
        } else {
            if (isSameRelation) {
                if (choiceIndex < 1) {
                    question.conclusion += '<div class="analogy-conclusion-relation">is the same as</div>';
                } else {
                    question.conclusion += '<div class="analogy-conclusion-relation">has the same relation as</div>';
                }
            } else {
                if (choiceIndex < 1) {
                    question.conclusion += '<div class="analogy-conclusion-relation">is different from</div>';
                } else {
                    question.conclusion += '<div class="analogy-conclusion-relation">has a different relation from</div>';
                }
            }
        }

        question.conclusion += `<span class="subject">${c}</span> to <span class="subject">${d}</span>`;
    
        return question;
    }

    createBinary(length: number) {
        if (length < 4) throw Error("Needs at least 4 premises.");

        const binaryEnables = [
            this.settings.enableDistinction,
            this.settings.enableComparisonNumerical,
            this.settings.enableComparisonChronological,
            this.settings.enableDirection,
            this.settings.enableDirection3D,
            this.settings.enableDirection4D,
            this.settings.enableSyllogism
        ];
        if (binaryEnables.reduce((a, c) => a + +c, 0) < 1) {
            throw new Error("Needs at least one of" + binaryEnables.join(", "));
        }

        const operands = [];
        const operandNames = [];
        const operandTemplates = [];
        const pool = [];
    
        if (this.settings.enableAnd) {
            operands.push("a&&b");
            operandNames.push("AND");
            operandTemplates.push('$a <div class="is-connector">and</div> $b');
        }
        if (this.settings.enableNand) {
            operands.push("!(a&&b)");
            operandNames.push("NAND");
            operandTemplates.push('$a <div class="is-connector">and</div> $b <div class="is-connector">are not both true</div>');
        }
        if (this.settings.enableOr) {
            operands.push("a||b");
            operandNames.push("OR");
            operandTemplates.push('$a <div class="is-connector">or</div> $b');
        }
        if (this.settings.enableNor) {
            operands.push("!(a||b)");
            operandNames.push("NOR");
            operandTemplates.push('$a <div class="is-connector">and</div> $b <div class="is-connector">are both false</div>');
        }
        if (this.settings.enableXor) {
            operands.push("!(a&&b)&&(a||b)");
            operandNames.push("XOR");
            operandTemplates.push('$a <div class="is-connector">differs from</div> $b');
        }
        if (this.settings.enableXnor) {
            operands.push("!(!(a&&b)&&(a||b))");
            operandNames.push("XNOR");
            operandTemplates.push('$a <div class="is-connector">is equal to</div> $b');
        }
    
        if (!operands.length) return;
    
        if (this.settings.enableSyllogism) {
            pool.push((length: number) =>
                this.createSyllogism(length)
            );
        }
        if (this.settings.enableDistinction) {
            pool.push((length: number) =>
                this.createDistinction(length)
            );
        }
        if (this.settings.enableComparisonNumerical) {
            pool.push((length: number) =>
                this.createComparison(length, EnumQuestionType.ComparisonNumerical)
            );
        }
        if (this.settings.enableComparisonChronological) {
            pool.push((length: number) =>
                this.createComparison(length, EnumQuestionType.ComparisonChronological)
            );
        }
        if (this.settings.enableDirection) {
            pool.push((length: number) =>
                this.createDirection(length)
            );
        }
        if (this.settings.enableDirection3D) {
            pool.push((length: number) =>
                this.createDirection3D(length)
            );
        }
        if (this.settings.enableDirection4D) {
            pool.push((length: number) =>
                this.createDirection4D(length)
            );
        }

        const question = new Question(EnumQuestionType.Binary);
        const flip = coinFlip();
        const operandIndex = Math.floor(Math.random()*operands.length);
        const operand = operands[operandIndex];

        do {
            const picked = pickUniqueItems(pool, 2).picked;
    
            const choices = [
                picked[0](Math.floor(length / 2)),
                picked[1](Math.ceil(length / 2))
            ];
        
            question.premises = [...choices[0].premises, ...choices[1].premises];
            shuffle(question.premises);
        
            question.conclusion = operandTemplates[operandIndex]
                .replace("$a", choices[0].conclusion)
                .replace("$b", choices[1].conclusion);

            question.isValid = eval(
                operand
                    .replaceAll("a", String(choices[0].isValid))
                    .replaceAll("b", String(choices[1].isValid))
            );
        } while (flip !== question.isValid);
    
        return question;
    }
}