import { DIRECTION_COORDS, DIRECTION_COORDS_3D, DIRECTION_NAMES, DIRECTION_NAMES_3D, DIRECTION_NAMES_3D_INVERSE, DIRECTION_NAMES_INVERSE, TIME_NAMES } from "./engine-constants";
import { EnumQuestionType, Question, Settings } from "./engine-models";
import { coinFlip, findDirection, findDirection3D, findDirection4D, getRandomRuleInvalid, getRandomRuleValid, getRandomSymbols, getRelation, getSyllogism, getSymbols, isPremiseLikeConclusion, makeMetaRelations, pickUniqueItems, shuffle } from "./engine-utils";

export class Engine {
    settings = new Settings();

    createSyllogism(length: number) {
        length++;
    
        const question = new Question(EnumQuestionType.Syllogism);
        question.isValid = coinFlip();

        do {
            question.rule = question.isValid ? getRandomRuleValid() : getRandomRuleInvalid();
            question.bucket = getRandomSymbols(this, length);
            question.premises = [];

            [
                question.premises[0],
                question.premises[1],
                question.conclusion
            ] = getSyllogism(
                this,
                question.bucket[0],
                question.bucket[1],
                question.bucket[2],
                question.isValid ? getRandomRuleValid() : getRandomRuleInvalid()
            );
        } while(isPremiseLikeConclusion(question.premises, question.conclusion));
    
        // TODO: Figure out what this was for...
        for (let i = 3; i < length; i++) {
            const rnd = Math.floor(Math.random() * (i - 1));
            const flip = coinFlip();
            const [ p, m ] = flip ? [question.bucket[i], question.bucket[rnd]] : [question.bucket[rnd], question.bucket[i]];
            question.premises.push(getSyllogism(this, "#####", p, m, getRandomRuleInvalid())[0]);
        }
    
        shuffle(question.premises);
    
        return question;
    }

    createDistinction(length: number) {
        length++;

        const symbols = getRandomSymbols(this, length);
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
                const relation = getRelation(this, EnumQuestionType.Distinction, isSameAs);

                question.premises.push(`<span class="subject">${prev}</span> is ${relation} <span class="subject">${curr}</span>`);

                // TODO: Figure out what this was for...
                if (!isSameAs) {
                    prevBucket = (prevBucket + 1) % 2;
                }

                question.buckets[prevBucket].push(curr);
    
                prev = curr;
            }

            makeMetaRelations(this, question, length);

            const isSameAs = coinFlip();
            const relation = getRelation(this, EnumQuestionType.Distinction, isSameAs);

            question.conclusion = `<span class="subject">${first}</span> is ${relation} <span class="subject">${curr}</span>`;
            question.isValid = isSameAs
                ? question.buckets[0].includes(curr)
                : question.buckets[1].includes(curr);
        } while(isPremiseLikeConclusion(question.premises, question.conclusion));
    
        shuffle(question.premises);
    
        return question;
    }

    createComparison(length: number, type: EnumQuestionType.ComparisonNumerical | EnumQuestionType.ComparisonChronological) {
        length++;

        const question = new Question(type);

        do {
            question.bucket = getRandomSymbols(this, length);
            question.premises = [];
            const sign = [-1, 1][Math.floor(Math.random() * 2)];

            let next = "";
    
            for (let i = 0; i < length - 1; i++) {
                const curr = question.bucket[i];
                next = question.bucket[i + 1];

                const isMoreOrAfter = coinFlip();
                const [first, last] = ((sign === 1) === isMoreOrAfter) ? [next, curr] : [curr, next];
                const relation = getRelation(this, type, isMoreOrAfter);

                question.premises.push(`<span class="subject">${first}</span> is ${relation} <span class="subject">${last}</span>`);
            }

            makeMetaRelations(this, question, length);

            const a = Math.floor(Math.random() * question.bucket.length);
            let b = Math.floor(Math.random() * question.bucket.length);
            while (a === b) {
                b = Math.floor(Math.random() * question.bucket.length);
            }

            const isMoreOrAfter = coinFlip();
            const relation = getRelation(this, type, isMoreOrAfter);

            question.conclusion = `<span class="subject">${question.bucket[a]}</span> is ${relation} <span class="subject">${question.bucket[b]}</span>`;
            question.isValid = isMoreOrAfter
                ? sign === 1 && a > b || sign === -1 && a < b
                : sign === 1 && a < b || sign === -1 && a > b;
        } while(isPremiseLikeConclusion(question.premises, question.conclusion));
    
        shuffle(question.premises);
    
        return question;
    }

    createDirection(length: number) {
        length++;
    
        const symbols = getSymbols(this);
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
        length++;
    
        const symbols = getSymbols(this);
        const words = pickUniqueItems(symbols, length).picked;
        const question = new Question(EnumQuestionType.Direction);
    
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
        length++;
    
        const symbols = getSymbols(this);
        const words = pickUniqueItems(symbols, length).picked;
        const question = new Question(EnumQuestionType.Direction);
    
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
        let isValidSame = false;
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
                    question.conclusion = "";

                    [a, b, c, d] = pickUniqueItems(Object.keys(question.wordCoordMap), 4).picked;
                    question.conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;

                    const { spatial, temporal } = findDirection4D(question.wordCoordMap[a] as any, question.wordCoordMap[b] as any);
                    const { spatial: spatial2, temporal: temporal2 } = findDirection4D(question.wordCoordMap[c] as any, question.wordCoordMap[d] as any);
                    isValidSame = (spatial === spatial2) && (temporal === temporal2);
                }
                break;
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
        // TODO: Validate min length

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






/*
function createNestedBinaryQuestion(length) {

    let depth = +savedata.nestedBinaryDepth;

    const humanOperands = [];
    const evalOperands = [];

    if (savedata.enableAnd) {
        humanOperands.push('<span class="is-connector">(</span>à<span class="is-connector">)</span> <span class="is-connector">AND</span> <span class="is-connector">(</span>ò<span class="is-connector">)</span>');
        evalOperands.push("(a)&&(b)");
    }
    if (savedata.enableNand) {
        humanOperands.push('<span class="is-connector">(</span>à<span class="is-connector">)</span> <span class="is-connector">NAND</span> <span class="is-connector">(</span>ò<span class="is-connector">)</span>');
        evalOperands.push("!((a)&&(b))");
    }
    if (savedata.enableOr) {
        humanOperands.push('<span class="is-connector">(</span>à<span class="is-connector">)</span> <span class="is-connector">OR</span> <span class="is-connector">(</span>ò<span class="is-connector">)</span>');
        evalOperands.push("(a)||(b)");
    }
    if (savedata.enableNor) {
        humanOperands.push('<span class="is-connector">(</span>à<span class="is-connector">)</span> <span class="is-connector">NOR</span> <span class="is-connector">(</span>ò<span class="is-connector">)</span>');
        evalOperands.push("!((a)||(b))");
    }
    if (savedata.enableXor) {
        humanOperands.push('<span class="is-connector">(</span>à<span class="is-connector">)</span> <span class="is-connector">XOR</span> <span class="is-connector">(</span>ò<span class="is-connector">)</span>');
        evalOperands.push("!((a)&&(b))&&((a)||(b))");
    }
    if (savedata.enableXnor) {
        humanOperands.push('<span class="is-connector">(</span>à<span class="is-connector">)</span> <span class="is-connector">XNOR</span> <span class="is-connector">(</span>ò<span class="is-connector">)</span>');
        evalOperands.push("!(!((a)&&(b))&&((a)||(b)))");
    }

    if (!humanOperands.length) return;

    const pool = [];

    if (savedata.enableDistinction)
        pool.push(createSameOpposite);
    if (savedata.enableComparison)
        pool.push(createMoreLess);
    if (savedata.enableTemporal)
        pool.push(createBeforeAfter);
    if (savedata.enableDirection)
        pool.push(createDirectionQuestion);
    if (savedata.enableDirection3D)
        pool.push(createDirectionQuestion3D);
    if (savedata.enableDirection4D)
        pool.push(createDirectionQuestion4D);
    if (savedata.enableSyllogism)
        pool.push(createSyllogism);

    let numberOfQuestions;
    let questions;
    if (depth < 2) {
        numberOfQuestions = 2;
        const a = Math.floor(length / 2);
        const b = length % 2 > 0
            ? a + 1
            : a;
        questions = [a, b]
            .map(ab =>
                pool[Math.floor(Math.random() * pool.length)](ab)
            );
        console.log("Two questions - Many premises", questions);
    }
    else {
        numberOfQuestions = Math.floor(length / 2)
        questions = Array(numberOfQuestions).fill(0)
            .map(() =>
                pool[Math.floor(Math.random() * pool.length)](2)
            );
        console.log("Many questions - Two premises", questions);
    }

    depth *= 2; // Multiply by 2 because I decrement by 1 at every iteration
    let i = 0;
    function generator() {
        const rndIndex = Math.floor(Math.random() * humanOperands.length);
        const humanOperand = humanOperands[rndIndex];
        const evalOperand = evalOperands[rndIndex];
        const val = (--depth> 0)
            ? generator()
            : (i++) % numberOfQuestions;
        const val2 = (--depth> 0)
            ? generator()
            : (i++) % numberOfQuestions;
        return {
            human: humanOperand
                .replace('à', val > - 1 ? val : val.human)
                .replace('ò', val2 > - 1 ? val2 : val2.human),
            eval: evalOperand
                .replaceAll('a', val > - 1 ? val : val.eval)
                .replaceAll('b', val2 > - 1 ? val2 : val2.eval),
        };
    }

    const generated = generator();

    const category = Object.keys(
        questions
            .map(q => q.category)
            .reduce((a, c) => (a[c] = 1, a), {})
    )
    .join('/');
    const isValid = eval(generated.eval.replaceAll(/(\d+)/g, m => questions[m].isValid));
    const premises = questions.reduce((a, q) => [ ...a, ...q.premises ], [])
    const conclusion = generated.human.replaceAll(/(\d+)/g, m => questions[m].conclusion);

    return {
        label: "binary",
        category: `Nested Binary: ${category}`,
        createdAt: new Date().getTime(),
        isValid,
        premises,
        conclusion
    };
}
*/
