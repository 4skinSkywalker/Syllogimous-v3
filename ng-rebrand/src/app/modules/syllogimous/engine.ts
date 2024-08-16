import { EnumQuestionType, Question, Settings } from "./engine-models";
import { coinFlip, getRandomRuleInvalid, getRandomRuleValid, getRandomSymbols, getRelation, getSyllogism, isPremiseLikeConclusion, makeMetaRelations, pickUniqueItems, shuffle } from "./engine-utils";

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
    
            const buckets = [[prev], []];
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

                buckets[prevBucket].push(curr);
    
                prev = curr;
            }

            makeMetaRelations(this, question, length);

            const isSameAs = coinFlip();
            const relation = getRelation(this, EnumQuestionType.Distinction, isSameAs);

            question.conclusion = `<span class="subject">${first}</span> is ${relation} <span class="subject">${curr}</span>`;
            question.isValid = isSameAs
                ? buckets[0].includes(curr)
                : buckets[1].includes(curr);
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

            let a = Math.floor(Math.random() * question.bucket.length);
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
}


/*
function createBinaryQuestion(length) {

    const operands = [];
    const operandNames = [];
    const operandTemplates = [];

    if (savedata.enableAnd) {
        operands.push("a&&b");
        operandNames.push("AND");
        operandTemplates.push('$a <div class="is-connector">and</div> $b');
    }
    if (savedata.enableNand) {
        operands.push("!(a&&b)");
        operandNames.push("NAND");
        operandTemplates.push('$a <div class="is-connector">and</div> $b <div class="is-connector">are not both true</div>');
    }
    if (savedata.enableOr) {
        operands.push("a||b");
        operandNames.push("OR");
        operandTemplates.push('$a <div class="is-connector">or</div> $b');
    }
    if (savedata.enableNor) {
        operands.push("!(a||b)");
        operandNames.push("NOR");
        operandTemplates.push('$a <div class="is-connector">and</div> $b <div class="is-connector">are both false</div>');
    }
    if (savedata.enableXor) {
        operands.push("!(a&&b)&&(a||b)");
        operandNames.push("XOR");
        operandTemplates.push('$a <div class="is-connector">differs from</div> $b');
    }
    if (savedata.enableXnor) {
        operands.push("!(!(a&&b)&&(a||b))");
        operandNames.push("XNOR");
        operandTemplates.push('$a <div class="is-connector">is equal to</div> $b');
    }

    if (!operands.length) return;

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

    let choice;
    let choice2;
    let premises;
    let conclusion = "";
    const flip = coinFlip();
    let isValid;
    const operandIndex = Math.floor(Math.random()*operands.length);
    const operand = operands[operandIndex];
    while (flip !== isValid) {
        let [generator, generator2] = pickUniqueItems(pool, 2).picked;

        [choice, choice2] = [
            generator(Math.floor(length/2)),
            generator2(Math.ceil(length/2))
        ];
    
        premises = [...choice.premises, ...choice2.premises];
        shuffle(premises);
    
        conclusion = operandTemplates[operandIndex]
            .replace("$a", choice.conclusion)
            .replace("$b", choice2.conclusion);

        isValid = eval(
            operand
                .replaceAll("a", choice.isValid)
                .replaceAll("b", choice2.isValid)
        );
    }

    return {
        label: "binary",
        category: `Binary: ${choice.category} ${operandNames[operandIndex]} ${choice2.category}`,
        createdAt: new Date().getTime(),
        isValid,
        premises,
        conclusion
    };
}

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

function createSameDifferent(length) {

    // Create a pool based on user preferences
    const choiceIndices = [];

    if (savedata.enableDistinction)
        choiceIndices.push(0);
    if (savedata.enableComparison)
        choiceIndices.push(1);
    if (savedata.enableTemporal)
        choiceIndices.push(2);
    if (savedata.enableDirection)
        choiceIndices.push(3);
    if (savedata.enableDirection3D)
        choiceIndices.push(4);
    if (savedata.enableDirection4D)
        choiceIndices.push(5);

    const choiceIndex = pickUniqueItems(choiceIndices, 1).picked[0];
    let choice;
    let conclusion = "";
    let subtype;
    let isValid, isValidSame;
    let a, b, c, d;
    let indexOfA, indexOfB, indexOfC, indexOfD;

    if (choiceIndex === 0) {

        choice = createSameOpposite(length);
        subtype = "Same/Opposite";

        // Pick 4 different items
        [a, b, c, d] = pickUniqueItems([...choice.buckets[0], ...choice.buckets[1]], 4).picked;
        conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;

        // Find in which side a, b, c and d are
        [
            indexOfA,
            indexOfB,
            indexOfC,
            indexOfD
        ] = [
            Number(choice.buckets[0].indexOf(a) !== -1),
            Number(choice.buckets[0].indexOf(b) !== -1),
            Number(choice.buckets[0].indexOf(c) !== -1),
            Number(choice.buckets[0].indexOf(d) !== -1)
        ];
        isValidSame = indexOfA === indexOfB && indexOfC === indexOfD
                   || indexOfA !== indexOfB && indexOfC !== indexOfD;
    }
    else if (choiceIndex === 1) {

        choice = createMoreLess(length);
        subtype = "More/Less";

        // Pick 4 different items
        [a, b, c, d] = pickUniqueItems(choice.bucket, 4).picked;
        conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;

        // Find indices of elements
        [indexOfA, indexOfB] = [choice.bucket.indexOf(a), choice.bucket.indexOf(b)];
        [indexOfC, indexOfD] = [choice.bucket.indexOf(c), choice.bucket.indexOf(d)];
        isValidSame = indexOfA > indexOfB && indexOfC > indexOfD
                   || indexOfA < indexOfB && indexOfC < indexOfD;
    }
    else if (choiceIndex === 2) {

        choice = createBeforeAfter(length);
        subtype = "Before/After";

        // Pick 4 different items
        [a, b, c, d] = pickUniqueItems(choice.bucket, 4).picked;
        conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;

        // Find indices of elements
        [indexOfA, indexOfB] = [choice.bucket.indexOf(a), choice.bucket.indexOf(b)];
        [indexOfC, indexOfD] = [choice.bucket.indexOf(c), choice.bucket.indexOf(d)];
        isValidSame = indexOfA > indexOfB && indexOfC > indexOfD
                   || indexOfA < indexOfB && indexOfC < indexOfD;
    }
    else if (choiceIndex === 3) {

        subtype = "Direction";

        const flip = coinFlip();
        while (flip !== isValidSame) {
            conclusion = "";
            choice = createDirectionQuestion(length);

            // Pick 4 different items
            [a, b, c, d] = pickUniqueItems(Object.keys(choice.wordCoordMap), 4).picked;
            conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;

            // Find if A to B has same relation of C to D
            isValidSame = findDirection(choice.wordCoordMap[a], choice.wordCoordMap[b]) === findDirection(choice.wordCoordMap[c], choice.wordCoordMap[d]);
        }
    } else if (choiceIndex === 4) {

        subtype = "Direction Three D";

        const flip = coinFlip();
        while (flip !== isValidSame) {
            conclusion = "";
            choice = createDirectionQuestion3D(length);

            // Pick 4 different items
            [a, b, c, d] = pickUniqueItems(Object.keys(choice.wordCoordMap), 4).picked;
            conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;

            // Find if A to B has same relation of C to D
            isValidSame = findDirection3D(choice.wordCoordMap[a], choice.wordCoordMap[b]) === findDirection3D(choice.wordCoordMap[c], choice.wordCoordMap[d]);
        }
    } else {

        subtype = "Space Time";

        const flip = coinFlip();
        while (flip !== isValidSame) {
            conclusion = "";
            choice = createDirectionQuestion4D(length);

            // Pick 4 different items
            [a, b, c, d] = pickUniqueItems(Object.keys(choice.wordCoordMap), 4).picked;
            conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;

            // Find if A to B has same relation of C to D
            const {
                spatial,
                temporal
            } = findDirection4D(choice.wordCoordMap[a], choice.wordCoordMap[b]);
            const {
                spatial: spatial2,
                temporal: temporal2
            } = findDirection4D(choice.wordCoordMap[c], choice.wordCoordMap[d]);
            isValidSame = spatial === spatial2 && temporal === temporal2;
        }
    }

    if (coinFlip()) {
        isValid = isValidSame;
        if (choiceIndex < 1) {
            const cs = [
                '<div class="analogy-conclusion-relation">is the same as</div>',
                '<div class="analogy-conclusion-relation is-negated">is different from</div>'
            ];
            conclusion += (coinFlip() && savedata.enableNegation)
                ? pickUniqueItems(cs, 1).picked[0]
                : cs[0];
        }
        else {
            const cs = [
                '<div class="analogy-conclusion-relation">has the same relation as</div>',
                '<div class="analogy-conclusion-relation is-negated">has a different relation from</div>'
            ];
            conclusion += (coinFlip() && savedata.enableNegation)
                ? pickUniqueItems(cs, 1).picked[0]
                : cs[0];
        }
    }
    else {
        isValid = !isValidSame;
        if (choiceIndex < 1) {
            const cs = [
                '<div class="analogy-conclusion-relation">is different from</div>',
                '<div class="analogy-conclusion-relation is-negated">is the same as</div>'
            ];
            conclusion += (coinFlip() && savedata.enableNegation)
                ? pickUniqueItems(cs, 1).picked[0]
                : cs[0];

        }
        else {
            const cs = [
                '<div class="analogy-conclusion-relation">has a different relation from</div>',
                '<div class="analogy-conclusion-relation is-negated">has the same relation as</div>',
            ];
            conclusion += (coinFlip() && savedata.enableNegation)
                ? pickUniqueItems(cs, 1).picked[0]
                : cs[0];
        }
    }
    conclusion += `<span class="subject">${c}</span> to <span class="subject">${d}</span>`;

    choice.label = "analogy";
    choice.category = "Analogy: " + subtype;
    choice.createdAt = new Date().getTime();
    choice.isValid = isValid;
    choice.conclusion = conclusion;

    return choice;
}

function createDirectionQuestion(length) {
    length++;

    const words = pickUniqueItems(symbols, length).picked;

    let wordCoordMap = {};
    let premises = [];
    let conclusion;
    let conclusionDirName;
    while (!conclusionDirName) {

        wordCoordMap = {};
        premises = [];

        for (let i = 0; i < words.length - 1; i++) {
            const dirIndex = 1 + Math.floor(Math.random()*(dirNames.length - 1));
            const dirName = dirNames[dirIndex];
            const dirCoord = dirCoords[dirIndex];
            if (i === 0) {
                wordCoordMap[words[i]] = [0,0];
            }
            wordCoordMap[words[i+1]] = [
                wordCoordMap[words[i]][0] + dirCoord[0], // x
                wordCoordMap[words[i]][1] + dirCoord[1]  // y
            ];
            const ps = [
                `<span class="subject">${words[i+1]}</span> is at ${dirName} of <span class="subject">${words[i]}</span>`,
                `<span class="subject">${words[i+1]}</span> is at <span class="is-negated">${nameInverseDir[dirName]}</span> of <span class="subject">${words[i]}</span>`,
            ];
            premises.push((!savedata.enableNegation)
                ? ps[0]
                : pickUniqueItems(ps, 1).picked[0]);
        }

        conclusionDirName = findDirection(
            wordCoordMap[words[0]],
            wordCoordMap[words[length-1]]
        );
    }

    let isValid;
    if (coinFlip()) { // correct
        isValid = true;
        const cs = [
            `<span class="subject">${words[0]}</span> is at ${conclusionDirName} of <span class="subject">${words[words.length-1]}</span>`,
            `<span class="subject">${words[0]}</span> is at <span class="is-negated">${nameInverseDir[conclusionDirName]}</span> of <span class="subject">${words[words.length-1]}</span>`,
        ];
        conclusion = (!savedata.enableNegation)
            ? cs[0]
            : pickUniqueItems(cs, 1).picked[0];
    }
    else {            // wrong
        isValid = false;
        let oppositeDirection = findDirection(
            wordCoordMap[words[length-1]],
            wordCoordMap[words[0]]
        );
        const cs = [
            `<span class="subject">${words[0]}</span> is at ${oppositeDirection} of <span class="subject">${words[words.length-1]}</span>`,
            `<span class="subject">${words[0]}</span> is at <span class="is-negated">${nameInverseDir[oppositeDirection]}</span> of <span class="subject">${words[words.length-1]}</span>`
        ];
        conclusion = (!savedata.enableNegation)
            ? cs[0]
            : pickUniqueItems(cs, 1).picked[0];;
    }

    shuffle(premises);
    
    return {
        label: "direction",
        category: "Space Two D",
        createdAt: new Date().getTime(),
        wordCoordMap,
        isValid,
        premises,
        conclusion
    }
}

function createDirectionQuestion3D(length) {
    length++;

    const words = pickUniqueItems(symbols, length).picked;

    let wordCoordMap = {};
    let premises = [];
    let conclusion;
    let conclusionDirName;
    while (!conclusionDirName) {

        wordCoordMap = {};
        premises = [];

        for (let i = 0; i < words.length - 1; i++) {
            const dirIndex = 1 + Math.floor(Math.random()*(dirNames3D.length - 1));
            const dirName = dirNames3D[dirIndex];
            const dirCoord = dirCoords3D[dirIndex];
            if (i === 0) {
                wordCoordMap[words[i]] = [0,0,0];
            }
            wordCoordMap[words[i+1]] = [
                wordCoordMap[words[i]][0] + dirCoord[0], // x
                wordCoordMap[words[i]][1] + dirCoord[1], // y
                wordCoordMap[words[i]][2] + dirCoord[2], // z
            ];
            const ps = [
                `<span class="subject">${words[i+1]}</span> is ${dirName} of <span class="subject">${words[i]}</span>`,
                `<span class="subject">${words[i+1]}</span> is <span class="is-negated">${nameInverseDir3D[dirName]}</span> of <span class="subject">${words[i]}</span>`,
            ];
            premises.push((!savedata.enableNegation)
                ? ps[0]
                : pickUniqueItems(ps, 1).picked[0]);
        }

        conclusionDirName = findDirection3D(
            wordCoordMap[words[0]],
            wordCoordMap[words[length-1]]
        );
    }

    let isValid;
    if (coinFlip()) { // correct
        isValid = true;
        const cs = [
            `<span class="subject">${words[0]}</span> is ${conclusionDirName} of <span class="subject">${words[words.length-1]}</span>`,
            `<span class="subject">${words[0]}</span> is <span class="is-negated">${nameInverseDir3D[conclusionDirName]}</span> of <span class="subject">${words[words.length-1]}</span>`,
        ];
        conclusion = (!savedata.enableNegation)
            ? cs[0]
            : pickUniqueItems(cs, 1).picked[0];
    }
    else {            // wrong
        isValid = false;
        let oppositeDirection = findDirection3D(
            wordCoordMap[words[length-1]],
            wordCoordMap[words[0]]
        );
        const cs = [
            `<span class="subject">${words[0]}</span> is ${oppositeDirection} of <span class="subject">${words[words.length-1]}</span>`,
            `<span class="subject">${words[0]}</span> is <span class="is-negated">${nameInverseDir3D[oppositeDirection]}</span> of <span class="subject">${words[words.length-1]}</span>`
        ];
        conclusion = (!savedata.enableNegation)
            ? cs[0]
            : pickUniqueItems(cs, 1).picked[0];;
    }

    shuffle(premises);
    
    return {
        label: "direction3D",
        category: "Space Three D",
        createdAt: new Date().getTime(),
        wordCoordMap,
        isValid,
        premises,
        conclusion
    }
}

function createDirectionQuestion4D(length) {
    length++;

    const words = pickUniqueItems(symbols, length).picked;

    let wordCoordMap = {};
    let premises = [];
    let conclusion;
    let conclusionDirName = { spatial: null };
    while (!conclusionDirName.spatial) {

        wordCoordMap = {};
        premises = [];

        for (let i = 0; i < words.length - 1; i++) {
            const timeIndex =  pickUniqueItems([-1,0,1], 1).picked[0];
            const timeName = timeNames[timeIndex + 1];
            const dirIndex = 1 + Math.floor(Math.random()*(dirNames3D.length - 1));
            const dirName = dirNames3D[dirIndex];
            const dirCoord = dirCoords3D[dirIndex];
            if (i === 0) {
                wordCoordMap[words[i]] = [0,0,0,0];
            }
            wordCoordMap[words[i+1]] = [
                wordCoordMap[words[i]][0] + dirCoord[0], // x
                wordCoordMap[words[i]][1] + dirCoord[1], // y
                wordCoordMap[words[i]][2] + dirCoord[2], // z
                wordCoordMap[words[i]][3] + timeIndex,   // time
            ];
            const ps = [
                `<span class="subject">${words[i+1]}</span> ${timeName} ${dirName} of <span class="subject">${words[i]}</span>`,
                `<span class="subject">${words[i+1]}</span> ${timeName} of <span class="is-negated">${nameInverseDir3D[dirName]}</span> of <span class="subject">${words[i]}</span>`,
            ];
            premises.push((!savedata.enableNegation)
                ? ps[0]
                : pickUniqueItems(ps, 1).picked[0]);
        }

        conclusionDirName = findDirection4D(
            wordCoordMap[words[0]],
            wordCoordMap[words[length-1]]
        );
    }

    let isValid;
    if (coinFlip()) { // correct
        isValid = true;
        const cs = [
            `<span class="subject">${words[0]}</span> ${conclusionDirName.temporal} ${conclusionDirName.spatial} of <span class="subject">${words[words.length-1]}</span>`,
            `<span class="subject">${words[0]}</span> ${conclusionDirName.temporal} of <span class="is-negated">${nameInverseDir3D[conclusionDirName.spatial]}</span> of <span class="subject">${words[words.length-1]}</span>`,
        ];
        conclusion = (!savedata.enableNegation)
            ? cs[0]
            : pickUniqueItems(cs, 1).picked[0];
    }
    else {            // wrong
        isValid = false;
        let oppositeDirection = findDirection4D(
            wordCoordMap[words[length-1]],
            wordCoordMap[words[0]]
        );
        const cs = [
            `<span class="subject">${words[0]}</span> ${oppositeDirection.temporal} ${oppositeDirection.spatial} of <span class="subject">${words[words.length-1]}</span>`,
            `<span class="subject">${words[0]}</span> ${oppositeDirection.temporal} of <span class="is-negated">${nameInverseDir3D[oppositeDirection.spatial]}</span> of <span class="subject">${words[words.length-1]}</span>`
        ];
        conclusion = (!savedata.enableNegation)
            ? cs[0]
            : pickUniqueItems(cs, 1).picked[0];;
    }

    shuffle(premises);
    
    return {
        label: "direction4D",
        category: "Space Time",
        createdAt: new Date().getTime(),
        wordCoordMap,
        isValid,
        premises,
        conclusion
    }
}
*/
