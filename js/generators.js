function coinFlip() {
    return Math.random() > 0.5;
}

function pickUniqueItems(array, n) {
    const copy = [...array];
    const picked = [];
    while (n > 0) {
        const rnd = Math.floor(Math.random()*copy.length);
        picked.push(copy.splice(rnd, 1)[0]);
        n--;
    }
    return { picked, remaining: copy };
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function metaSubstitution(choosenPair, relations, negations) {

    // Generate substitution string
    let substitution;
    const [a, b] = [
            ...choosenPair.picked[0]
            .matchAll(/<span class="subject">(.*?)<\/span>/g)
        ]
        .map(m => m[1]);
    if (!negations[0] && !negations[1] && relations[0] === relations[1])
        substitution = `$1 same as <span class="is-meta">(<span class="subject">${a}</span> to <span class="subject">${b}</span>)</span> to `;
    if (!negations[0] && negations[1] && relations[0] === relations[1])
        substitution = `$1 opposite of <span class="is-meta">(<span class="subject">${a}</span> to <span class="subject">${b}</span>)</span> to `;
    if (negations[0] && !negations[1] && relations[0] === relations[1])
        if (savedata.enableNegation)
            substitution = `$1 <span class="is-negated">same as</span> <span class="is-meta">(<span class="subject">${a}</span> to <span class="subject">${b}</span>)</span> to `;
        else
            substitution = `$1 opposite of <span class="is-meta">(<span class="subject">${a}</span> to <span class="subject">${b}</span>)</span> to `;
    if (negations[0] && negations[1] && relations[0] === relations[1])
        if (savedata.enableNegation)
            substitution = `$1 <span class="is-negated">opposite of</span> <span class="is-meta">(<span class="subject">${a}</span> to <span class="subject">${b}</span>)</span> to `;
        else
            substitution = `$1 same as <span class="is-meta">(<span class="subject">${a}</span> to <span class="subject">${b}</span>)</span> to `;

    if (!negations[0] && !negations[1] && relations[0] !== relations[1])
        if (savedata.enableNegation)
            substitution = `$1 <span class="is-negated">same as</span> <span class="is-meta">(<span class="subject">${a}</span> to <span class="subject">${b}</span>)</span> to `;
        else
            substitution = `$1 opposite of <span class="is-meta">(<span class="subject">${a}</span> to <span class="subject">${b}</span>)</span> to `;
    if (!negations[0] && negations[1] && relations[0] !== relations[1])
        if (savedata.enableNegation)
            substitution = `$1 <span class="is-negated">opposite of</span> <span class="is-meta">(<span class="subject">${a}</span> to <span class="subject">${b}</span>)</span> to `;
        else
            substitution = `$1 same as <span class="is-meta">(<span class="subject">${a}</span> to <span class="subject">${b}</span>)</span> to `;
    if (negations[0] && !negations[1] && relations[0] !== relations[1])
        substitution = `$1 same as <span class="is-meta">(<span class="subject">${a}</span> to <span class="subject">${b}</span>)</span> to `;
    if (negations[0] && negations[1] && relations[0] !== relations[1])
        substitution = `$1 opposite of <span class="is-meta">(<span class="subject">${a}</span> to <span class="subject">${b}</span>)</span> to `;

    return substitution;
}

function createSameOpposite(length) {
    length++;

    let buckets;
    let isValid;
    let premises;
    let conclusion;
    do {
        let rnd = Math.floor(Math.random() * symbols.length);
        let first = symbols.splice(rnd, 1)
        let prev = first;
        let curr;

        buckets = [[prev], []];
        let prevBucket = 0;

        premises = [];

        for (let i = 0; i < length - 1; i++) {
            let rnd = Math.floor(Math.random() * symbols.length);
            curr = symbols.splice(rnd, 1);

            if (coinFlip()) {
                const ps = [
                    `<span class="subject">${prev}</span> is same as <span class="subject">${curr}</span>`,
                    `<span class="subject">${prev}</span> is <span class="is-negated">opposite of</span> <span class="subject">${curr}</span>`,
                ];
                premises.push((!savedata.enableNegation)
                    ? ps[0]
                    : pickUniqueItems(ps, 1).picked[0]);
                buckets[prevBucket].push(curr);
            } else {
                const ps = [
                    `<span class="subject">${prev}</span> is opposite of <span class="subject">${curr}</span>`,
                    `<span class="subject">${prev}</span> is <span class="is-negated">same as</span> <span class="subject">${curr}</span>`,
                ];
                premises.push((!savedata.enableNegation)
                    ? ps[0]
                    : pickUniqueItems(ps, 1).picked[0]);
                prevBucket = (prevBucket + 1) % 2;
                buckets[prevBucket].push(curr);
            }

            prev = curr;
        }

        if (savedata.enableMeta) {

            // Randomly choose a number of meta-relations
            const numOfMetaRelations = 1 + Math.floor(Math.random() * Math.floor((length - 1) / 2));
            let _premises = pickUniqueItems(premises, numOfMetaRelations * 2);
            premises = [ ..._premises.remaining ];

            while (_premises.picked.length) {

                const choosenPair = pickUniqueItems(_premises.picked, 2);
                const negations = choosenPair.picked.map(p => /is-negated/.test(p));
                const relations = choosenPair.picked.map(p =>
                    p.match(/is (?:<span class="is-negated">)?(.*) (?:as|of)/)[1]
                );
        
                const substitution = metaSubstitution(choosenPair, relations, negations);

                // Replace relation with meta-relation via substitution string
                const metaPremise = choosenPair.picked[1]
                    .replace(/(is) (.*)(?=<span class="subject">)/, substitution);

                // Push premise and its corresponding meta-premise
                premises.push(choosenPair.picked[0], metaPremise);

                // Update _premises so that it doesn't end up in an infinite loop
                _premises = { picked: choosenPair.remaining };
            }
        }

        if (coinFlip()) {
            const cs = [
                `<span class="subject">${first}</span> is same as <span class="subject">${curr}</span>`,
                `<span class="subject">${first}</span> is <span class="is-negated">opposite of</span> <span class="subject">${curr}</span>`,
            ];
            conclusion = (!savedata.enableNegation)
                ? cs[0]
                : pickUniqueItems(cs, 1).picked[0];
            isValid = buckets[0].includes(curr);
        } else {
            const cs = [
                `<span class="subject">${first}</span> is opposite of <span class="subject">${curr}</span>`,
                `<span class="subject">${first}</span> is <span class="is-negated">same as</span> <span class="subject">${curr}</span>`,
            ];
            conclusion = (!savedata.enableNegation)
                ? cs[0]
                : pickUniqueItems(cs, 1).picked[0];
            isValid = buckets[1].includes(curr);
        }
    } while(isPremiseSimilarToConlusion(premises, conclusion));

    shuffle(premises);

    return {
        label: "distinction",
        category: "Distinction",
        createdAt: new Date().getTime(),
        buckets,
        isValid,
        premises,
        conclusion
    };
}

function createMoreLess(length) {
    length++;

    let bucket;
    let isValid;
    let premises;
    let conclusion;
    do {
        let seen = [];
        bucket = Array(length).fill(0)
            .map(() =>
                symbols.splice(Math.floor(Math.random() * symbols.length), 1)
            );

        let sign = [-1, 1][Math.floor(Math.random() * 2)];

        premises = [];
        let next;

        for (let i = 0; i < length - 1; i++) {
            let curr = bucket[i];
            next = bucket[i + 1];

            if (coinFlip()) {
                if (sign === 1) {
                    const ps = [
                        `<span class="subject">${next}</span> is more than <span class="subject">${curr}</span>`,
                        `<span class="subject">${next}</span> is <span class="is-negated">less</span> than <span class="subject">${curr}</span>`,
                    ];
                    premises.push((!savedata.enableNegation)
                        ? ps[0]
                        : pickUniqueItems(ps, 1).picked[0]);
                } else {
                    const ps = [
                        `<span class="subject">${curr}</span> is more than <span class="subject">${next}</span>`,
                        `<span class="subject">${curr}</span> is <span class="is-negated">less</span> than <span class="subject">${next}</span>`,
                    ];
                    premises.push((!savedata.enableNegation)
                        ? ps[0]
                        : pickUniqueItems(ps, 1).picked[0]);
                }
            } else {
                if (sign === 1) {
                    const ps = [
                        `<span class="subject">${curr}</span> is less than <span class="subject">${next}</span>`,
                        `<span class="subject">${curr}</span> is <span class="is-negated">more</span> than <span class="subject">${next}</span>`,
                    ];
                    premises.push((!savedata.enableNegation)
                        ? ps[0]
                        : pickUniqueItems(ps, 1).picked[0]);
                } else {
                    const ps = [
                        `<span class="subject">${next}</span> is less than <span class="subject">${curr}</span>`,
                        `<span class="subject">${next}</span> is <span class="is-negated">more</span> than <span class="subject">${curr}</span>`,
                    ];
                    premises.push((!savedata.enableNegation)
                        ? ps[0]
                        : pickUniqueItems(ps, 1).picked[0]);
                }
            }
        }

        if (savedata.enableMeta) {

            // Randomly choose a number of meta-relations
            const numOfMetaRelations = 1 + Math.floor(Math.random() * Math.floor((length - 1) / 2));
            let _premises = pickUniqueItems(premises, numOfMetaRelations * 2);
            premises = [ ..._premises.remaining ];

            while (_premises.picked.length) {

                const choosenPair = pickUniqueItems(_premises.picked, 2);
                const negations = choosenPair.picked.map(p => /is-negated/.test(p));
                const relations = choosenPair.picked.map(p =>
                    p.match(/is (?:<span class="is-negated">)*(.*?)(?:<\/span>)* /)[1]
                );
        
                const substitution = metaSubstitution(choosenPair, relations, negations);

                // Replace relation with meta-relation via substitution string
                const metaPremise = choosenPair.picked[1]
                    .replace(/(is) (.*)(?=<span class="subject">)/, substitution);

                // Push premise and its corresponding meta-premise
                premises.push(choosenPair.picked[0], metaPremise);

                // Update _premises so that it doesn't end up in an infinite loop
                _premises = { picked: choosenPair.remaining };
            }
        }

        let a = Math.floor(Math.random() * bucket.length);
        let b = Math.floor(Math.random() * bucket.length);
        while (a === b) {
            b = Math.floor(Math.random() * bucket.length);
        }
        if (coinFlip()) {
            const cs = [
                `<span class="subject">${bucket[a]}</span> is less than <span class="subject">${bucket[b]}</span>`,
                `<span class="subject">${bucket[a]}</span> is <span class="is-negated">more</span> than <span class="subject">${bucket[b]}</span>`,
            ];
            conclusion = (!savedata.enableNegation)
                ? cs[0]
                : pickUniqueItems(cs, 1).picked[0];
            isValid = sign === 1 && a < b || sign === -1 && a > b;
        } else {
            const cs = [
                `<span class="subject">${bucket[a]}</span> is more than <span class="subject">${bucket[b]}</span>`,
                `<span class="subject">${bucket[a]}</span> is <span class="is-negated">less</span> than <span class="subject">${bucket[b]}</span>`,
            ];
            conclusion = (!savedata.enableNegation)
                ? cs[0]
                : pickUniqueItems(cs, 1).picked[0];
            isValid = sign === 1 && a > b || sign === -1 && a < b;
        }
    } while(isPremiseSimilarToConlusion(premises, conclusion));

    shuffle(premises);

    return {
        label: "comparison",
        category: "Comparison",
        createdAt: new Date().getTime(),
        bucket,
        isValid,
        premises,
        conclusion
    }
}

function createBeforeAfter(length) {
    length++;

    let bucket;
    let isValid;
    let premises;
    let conclusion;
    do {
        let seen = [];
        bucket = Array(length).fill(0)
            .map(() =>
                symbols.splice(Math.floor(Math.random() * symbols.length), 1)
            );

        let sign = [-1, 1][Math.floor(Math.random() * 2)];

        premises = [];
        let next;

        for (let i = 0; i < length - 1; i++) {
            let curr = bucket[i];
            next = bucket[i + 1];
            if (coinFlip()) {
                if (sign === 1) {
                    const ps = [
                        `<span class="subject">${next}</span> is after <span class="subject">${curr}</span>`,
                        `<span class="subject">${next}</span> is <span class="is-negated">before</span> <span class="subject">${curr}</span>`,
                    ];
                    premises.push((!savedata.enableNegation)
                        ? ps[0]
                        : pickUniqueItems(ps, 1).picked[0]);
                } else {
                    const ps = [
                        `<span class="subject">${curr}</span> is after <span class="subject">${next}</span>`,
                        `<span class="subject">${curr}</span> is <span class="is-negated">before</span> <span class="subject">${next}</span>`,
                    ];
                    premises.push((!savedata.enableNegation)
                        ? ps[0]
                        : pickUniqueItems(ps, 1).picked[0]);
                }
            } else {
                if (sign === 1) {
                    const ps = [
                        `<span class="subject">${curr}</span> is before <span class="subject">${next}</span>`,
                        `<span class="subject">${curr}</span> is <span class="is-negated">after</span> <span class="subject">${next}</span>`,
                    ];
                    premises.push((!savedata.enableNegation)
                        ? ps[0]
                        : pickUniqueItems(ps, 1).picked[0]);
                } else {
                    const ps = [
                        `<span class="subject">${next}</span> is before <span class="subject">${curr}</span>`,
                        `<span class="subject">${next}</span> is <span class="is-negated">after</span> <span class="subject">${curr}</span>`,
                    ];
                    premises.push((!savedata.enableNegation)
                        ? ps[0]
                        : pickUniqueItems(ps, 1).picked[0]);
                }
            }
        }

        if (savedata.enableMeta) {

            // Randomly choose a number of meta-relations
            const numOfMetaRelations = 1 + Math.floor(Math.random() * Math.floor((length - 1) / 2));
            let _premises = pickUniqueItems(premises, numOfMetaRelations * 2);
            premises = [ ..._premises.remaining ];

            while (_premises.picked.length) {

                const choosenPair = pickUniqueItems(_premises.picked, 2);
                const negations = choosenPair.picked.map(p => /is-negated/.test(p));
                const relations = choosenPair.picked.map(p =>
                    p.match(/is (?:<span class="is-negated">)*(.*?)(?:<\/span>)* /)[1]
                );

                const substitution = metaSubstitution(choosenPair, relations, negations);

                // Replace relation with meta-relation via substitution string
                const metaPremise = choosenPair.picked[1]
                    .replace(/(is) (.*)(?=<span class="subject">)/, substitution);

                // Push premise and its corresponding meta-premise
                premises.push(choosenPair.picked[0], metaPremise);

                // Update _premises so that it doesn't end up in an infinite loop
                _premises = { picked: choosenPair.remaining };
            }
        }

        let a = Math.floor(Math.random() * bucket.length);
        let b = Math.floor(Math.random() * bucket.length);
        while (a === b) {
            b = Math.floor(Math.random() * bucket.length);
        }
        if (coinFlip()) {
            const cs = [
                `<span class="subject">${bucket[a]}</span> is before <span class="subject">${bucket[b]}</span>`,
                `<span class="subject">${bucket[a]}</span> is <span class="is-negated">after</span> <span class="subject">${bucket[b]}</span>`,
            ];
            conclusion = (!savedata.enableNegation)
                ? cs[0]
                : pickUniqueItems(cs, 1).picked[0];
            isValid = sign === 1 && a < b || sign === -1 && a > b;
        } else {
            const cs = [
                `<span class="subject">${bucket[a]}</span> is after <span class="subject">${bucket[b]}</span>`,
                `<span class="subject">${bucket[a]}</span> is <span class="is-negated">before</span> <span class="subject">${bucket[b]}</span>`,
            ];
            conclusion = (!savedata.enableNegation)
                ? cs[0]
                : pickUniqueItems(cs, 1).picked[0];
            isValid = sign === 1 && a > b || sign === -1 && a < b;
        }
    } while(isPremiseSimilarToConlusion(premises, conclusion));

    shuffle(premises);

    return {
        label: "temporal",
        category: "Temporal",
        createdAt: new Date().getTime(),
        bucket,
        isValid,
        premises,
        conclusion
    }
}

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

function findDirection(aCoord, bCoord) {
    const x = aCoord[0];
    const y = aCoord[1];
    const x2 = bCoord[0];
    const y2 = bCoord[1];
    const dx = ((x - x2)/Math.abs(x - x2)) || 0;
    const dy = ((y - y2)/Math.abs(y - y2)) || 0;
    const dirIndex = dirCoords.findIndex(c => c[0] === dx && c[1] === dy);
    const dirName = dirNames[dirIndex];
    return dirName;
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

function findDirection3D(aCoord, bCoord) {
    const x = aCoord[0];
    const y = aCoord[1];
    const z = aCoord[2];
    const x2 = bCoord[0];
    const y2 = bCoord[1];
    const z2 = bCoord[2];
    const dx = ((x - x2)/Math.abs(x - x2)) || 0;
    const dy = ((y - y2)/Math.abs(y - y2)) || 0;
    const dz = ((z - z2)/Math.abs(z - z2)) || 0;
    const dirIndex = dirCoords3D.findIndex(c => c[0] === dx && c[1] === dy && c[2] === dz);
    const dirName = dirNames3D[dirIndex];
    return dirName;
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

function findDirection4D(aCoord, bCoord) {

    const x = aCoord[0];
    const x2 = bCoord[0];
    const y = aCoord[1];
    const y2 = bCoord[1];
    const z = aCoord[2];
    const z2 = bCoord[2];

    const dx = ((x - x2)/Math.abs(x - x2)) || 0;
    const dy = ((y - y2)/Math.abs(y - y2)) || 0;
    const dz = ((z - z2)/Math.abs(z - z2)) || 0;

    const dirIndex = dirCoords3D.findIndex(c => c[0] === dx && c[1] === dy && c[2] === dz);
    const dirName = dirNames3D[dirIndex];

    const a = aCoord[3];
    const a2 = bCoord[3];

    return { spatial: dirName, temporal: timeNames[Math.sign(a-a2) + 1] };
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

function createSyllogism(length) {
    length++;

    let bucket;
    let isValid;
    let rule;
    let premises;
    let conclusion;
    do {
        let seen = [];
        bucket = Array(length).fill(0)
            .map(() => {
                let rnd = Math.floor(Math.random() * symbols.length);
                while (seen.includes(rnd)) {
                    rnd = Math.floor(Math.random() * symbols.length);
                }
                seen.push(rnd);
                return symbols[rnd];
            });

        premises = [];

        conclusion;
        isValid = coinFlip();
        if (isValid) {
            rule = validRules[Math.floor(Math.random() * validRules.length)];
            [premises[0], premises[1], conclusion] = getSyllogism(
                bucket[0],
                bucket[1],
                bucket[2],
                rule
            );
        } else {
            rule = getRandomInvalidRule();
            [premises[0], premises[1], conclusion] = getSyllogism(
                bucket[0],
                bucket[1],
                bucket[2],
                getRandomInvalidRule()
            );
        }
    } while(isPremiseSimilarToConlusion(premises, conclusion));

    for (let i = 3; i < length; i++) {
        let rnd = Math.floor(Math.random() * (i - 1));
        let flip = coinFlip();
        let p = flip ? bucket[i] : bucket[rnd];
        let m = flip ? bucket[rnd] : bucket[i];
        premises.push(getSyllogism("#####", p, m, getRandomInvalidRule())[0]);
    }

    premises = shuffle(premises);

    return {
        label: 'syllogism',
        category: "Syllogism",
        rule,
        createdAt: new Date().getTime(),
        bucket,
        isValid,
        premises,
        conclusion
    }
}

function getSyllogism(s, p, m, rule) {

    const _forms = (!savedata.enableNegation)
        ? forms[0]
        : pickUniqueItems(forms, 1).picked[0];

    let major = _forms[rule[0]];
    let minor = _forms[rule[1]];
    let conclusion = _forms[rule[2]];

    let figure = +rule[3];

    if (figure === 1) {
        major = major.replace("$", m);
        major = major.replace("$", p);

        minor = minor.replace("$", s);
        minor = minor.replace("$", m);
    } else if (figure === 2) {
        major = major.replace("$", p);
        major = major.replace("$", m);

        minor = minor.replace("$", s);
        minor = minor.replace("$", m);
    } else if (figure === 3) {
        major = major.replace("$", m);
        major = major.replace("$", p);

        minor = minor.replace("$", m);
        minor = minor.replace("$", s);
    } else if (figure === 4) {
        major = major.replace("$", p);
        major = major.replace("$", m);

        minor = minor.replace("$", m);
        minor = minor.replace("$", s);
    }

    conclusion = conclusion.replace("$", s);
    conclusion = conclusion.replace("$", p);

    return [major, minor, conclusion];
}

function getRandomInvalidRule() {
    let rule;
    while (!rule || validRules.includes(rule)) {
        rule = "";
        for (let i = 0; i < 3; i++) {
            rule += Math.floor(Math.random() * 4); // Form
        }
        rule += 1 + Math.floor(Math.random() * 4); // Figure
    }
    return rule;
}

function isPremiseSimilarToConlusion(premises, conclusion) {
    const subjectsOfPremises = premises.map(p => extractSubjects(p));
    const subjectsOfConclusion = extractSubjects(conclusion);
    for (const subjects of subjectsOfPremises) {
        if (subjects[0]+subjects[1] === subjectsOfConclusion[0]+subjectsOfConclusion[1]
         || subjects[1]+subjects[0] === subjectsOfConclusion[0]+subjectsOfConclusion[1])
            return true;
    }
}

function extractSubjects(phrase) {
    return [...phrase.matchAll(/<span class="subject">(.*?)<\/span>/g)].map(a => a[1]);
}
