navigator.serviceWorker.getRegistrations()
    .then((registrations) => {
        for(let registration of registrations) {
            registration.unregister();
        }
    });

// Constants and variables
const localKey = "sllgms-v3";

const feedbackWrong = document.querySelector(".feedback--wrong");
const feedbackMissed = document.querySelector(".feedback--missed");
const feedbackRight = document.querySelector(".feedback--right");

const correctlyAnsweredEl = document.querySelector(".correctly-answered");
const nextLevelEl = document.querySelector(".next-level");

const timerInput = document.querySelector("#timer-input");
const timerToggle = document.querySelector("#timer-toggle");
const timerBar = document.querySelector(".timer__bar");
let timerToggled = false;
let timerTime = 10;
let timerCount = 10;
let timerInstance;
let timerRunning = false;

const historyList = document.getElementById("history-list");

let carouselIndex = 0;
let question;
const carousel = document.querySelector(".carousel");
const carouselDisplayLabelType = carousel.querySelector(".carousel_display_label_type");
const carouselDisplayLabelProgress = carousel.querySelector(".carousel_display_label_progress");
const carouselDisplayText = carousel.querySelector(".carousel_display_text");
const carouselBackButton = carousel.querySelector("#carousel-back");
const carouselNextButton = carousel.querySelector("#carousel-next");

const display = document.querySelector(".display-outer");
const displayLabelType = display.querySelector(".display_label_type");
const displayLabelLevel = display.querySelector(".display_label_level");;
const displayText = display.querySelector(".display_text");;

const confirmationButtons = carousel.querySelector(".confirmation-buttons");

let symbols;

let savedata = {
    "premises": 2,
    "timer": 10,
    "score": 0,
    "enableDistinction": true,
    "enableComparison": true,
    "enableSyllogism": true,
    "enableAnalogy": true,
    "enableDirection": true,
    "enableBinary": true,
    "enableMeaningfulWords": true,
    "enableCarouselMode": true,
    "questions": []
};

const keySettingMapInverse = Object.entries(keySettingMap)
    .reduce((a, b) => (a[b[1]] = b[0], a), {});

// Events
load();

init();

carouselBackButton.addEventListener("click", carouselBack);
carouselNextButton.addEventListener("click", carouselNext);

for (let key in keySettingMap) {
    let value = keySettingMap[key];
    let input = document.querySelector("#" + key);
    
    if (input.type === "checkbox")
        input.addEventListener("input", evt => {
            savedata[value] = !!input.checked;
            save();
            init();
        });
    else if (input.type === "number")
        input.addEventListener("input", evt => {
            if (+input.value > 0)
                savedata[value] = +input.value;
            save();
            init();
        });
}

timerInput.addEventListener("input", evt => {
    const el = evt.target;
    timerTime = el.value;
    timerCount = el.value;
    el.style.width = (el.value.length + 3) + 'ch';
    savedata.timer = el.value;
    save();
});

timerToggle.addEventListener("click", evt => {
    timerToggled = evt.target.checked;
    if (timerToggled) startCountDown();
    else stopCountDown();
});

// Functions
function save() {
    localStorage.setItem(
        localKey,
        JSON.stringify(savedata)
    );
}

function load() {
    const LSEntry = localStorage.getItem(localKey);

    let savedData;
    if (LSEntry) {
        savedData = JSON.parse(LSEntry);
    }
    if (!savedData) {
        return save();
    }

    Object.assign(savedata, savedData);

    for (let key in savedData) {
        if (!(key in keySettingMapInverse)) continue;
        let value = savedData[key];
        let id = keySettingMapInverse[key];
        
        const input = document.querySelector("#" + id);
        if (input.type === "checkbox")
            input.checked = value;
        else if (input.type === "number")
            input.value = value;
    }

    timerInput.value = savedData.timer;
    timerTime = timerInput.value;

    renderHQL();
}

function carouselInit() {
    carouselIndex = 0;
    confirmationButtons.style.opacity = 0;
    confirmationButtons.style.pointerEvents = "none";
    carouselBackButton.disabled = true;
    carouselNextButton.disabled = false;

    carouselDisplayLabelType.textContent = "Premise";
    carouselDisplayLabelProgress.textContent = "1/" + question.premises.length;
    carouselDisplayText.innerHTML = question.premises[0];
}

function displayInit() {
    displayLabelType.textContent = question.category.split(":")[0];
    displayLabelLevel.textContent = question.premises.length + " ps";
    displayText.innerHTML = [
        ...question.premises,
        '<div class="formatted-conclusion">'+question.conclusion+'</div>'
    ].join("<br>");
}

function carouselBack() {
    carouselIndex--;
    if (carouselIndex < 1)
        carouselBackButton.disabled = true;
    if (carouselIndex < question.premises.length) {
        carouselNextButton.disabled = false;
        confirmationButtons.style.opacity = 0;
    }
    
    carouselDisplayLabelType.textContent = "Premise";
    carouselDisplayLabelProgress.textContent = (carouselIndex + 1) + "/" + question.premises.length;
    carouselDisplayText.innerHTML = question.premises[carouselIndex];
}
  
function carouselNext() {
    carouselIndex++;
    if (carouselIndex > 0)
        carouselBackButton.disabled = false;
    
    // Conclusion appears
    if (carouselIndex === question.premises.length) {
        confirmationButtons.style.pointerEvents = "all";
        carouselDisplayLabelType.textContent = "Conclusion";
        carouselDisplayLabelProgress.textContent = "";
        carouselDisplayText.innerHTML = question.conclusion;
        carouselNextButton.disabled = true;
        confirmationButtons.style.opacity = 1;
        return;
    }
    
    carouselDisplayLabelType.textContent = "Premise";
    carouselDisplayLabelProgress.textContent = (carouselIndex + 1) + "/" + question.premises.length;
    carouselDisplayText.innerHTML = question.premises[carouselIndex];
}

function createSameOpposite(length) {
    length++;

    const category = "Distinction";
    let buckets;
    let isValid;
    let premises;
    let conclusion;
    do {
        let rnd = Math.floor(Math.random() * symbols.length);
        let first = symbols[rnd]
        let prev = first;
        let curr;
        let seen = [rnd];

        buckets = [[prev], []];
        let prevBucket = 0;

        premises = [];

        for (let i = 0; i < length - 1; i++) {
            let rnd = Math.floor(Math.random() * symbols.length);
            while (seen.includes(rnd)) {
                rnd = Math.floor(Math.random() * symbols.length);
            }
            curr = symbols[rnd];
            seen.push(rnd);

            if (coinFlip()) {
                premises.push(`<span class="subject">${prev}</span> is same as <span class="subject">${curr}</span>`);
                buckets[prevBucket].push(curr);
            } else {
                premises.push(`<span class="subject">${prev}</span> is opposite of <span class="subject">${curr}</span>`);
                prevBucket = (prevBucket + 1) % 2;
                buckets[prevBucket].push(curr);
            }

            prev = curr;
        }

        if (coinFlip()) {
            conclusion = `<span class="subject">${first}</span> is same as <span class="subject">${curr}</span>`;
            isValid = buckets[0].includes(curr);
        } else {
            conclusion = `<span class="subject">${first}</span> is opposite of <span class="subject">${curr}</span>`;
            isValid = buckets[1].includes(curr);
        }
    } while(isPremiseEqualToConclusion(premises, conclusion));

    shuffle(premises);

    return {
        category,
        buckets,
        isValid,
        premises,
        conclusion
    }
}

function createMoreLess(length) {
    length++;

    const category = "Comparison";
    let bucket;
    let isValid;
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

        let sign = [-1, 1][Math.floor(Math.random() * 2)];

        premises = [];
        let next;

        for (let i = 0; i < length - 1; i++) {
            let curr = bucket[i];
            next = bucket[i + 1];
            if (coinFlip()) {
                if (sign === 1) {
                    premises.push(`<span class="subject">${next}</span> is more than <span class="subject">${curr}</span>`);
                } else {
                    premises.push(`<span class="subject">${curr}</span> is more than <span class="subject">${next}</span>`);
                }
            } else {
                if (sign === 1) {
                    premises.push(`<span class="subject">${curr}</span> is less than <span class="subject">${next}</span>`);
                } else {
                    premises.push(`<span class="subject">${next}</span> is less than <span class="subject">${curr}</span>`);
                }
            }
        }

        let a = Math.floor(Math.random() * bucket.length);
        let b = Math.floor(Math.random() * bucket.length);
        while (a === b) {
            b = Math.floor(Math.random() * bucket.length);
        }
        if (coinFlip()) {
            conclusion = `<span class="subject">${bucket[a]}</span> is less than <span class="subject">${bucket[b]}</span>`;
            isValid = sign === 1 && a < b || sign === -1 && a > b;
        } else {
            conclusion = `<span class="subject">${bucket[a]}</span> is more than <span class="subject">${bucket[b]}</span>`;
            isValid = sign === 1 && a > b || sign === -1 && a < b;
        }
    } while(isPremiseEqualToConclusion(premises, conclusion));

    shuffle(premises);

    return {
        category,
        bucket,
        isValid,
        premises,
        conclusion
    }
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

function createBinaryQuestion(length) {

    const operands = [
        "a&&b",                 // and
        "!(a&&b)",              // nand
        "a||b",                 // or
        "!(a||b)",              // nor
        "!(a&&b)&&(a||b)",      // xor
        "!(!(a&&b)&&(a||b))"    // xnor
    ];

    const operandNames = [
        "AND",
        "NAND",
        "OR",
        "NOR",
        "XOR",
        "XNOR"
    ];

    const operandTemplates = [
        '$a <div class="logic-conn">and</div> $b',
        '<div class="logic-conn">Except both</div> $a <div class="logic-conn">and</div> $b <div class="logic-conn">hold true</div>',
        '$a <div class="logic-conn">or</div> $b',
        '<div class="logic-conn">Neither</div> $a <div class="logic-conn">nor</div> $b',
        '<div class="logic-conn">Either</div> $a <div class="logic-conn">or</div> $b',
        '<div class="logic-conn">Both</div> $a <div class="logic-conn">and</div> $b <div class="logic-conn">are the same</div>'
    ];

    let choice;
    let choice2;
    let premises;
    let conclusion = "";
    const flip = coinFlip();
    let isValid;
    const operandIndex = Math.floor(Math.random()*operands.length);
    const operand = operands[operandIndex];
    while (flip !== isValid) {
        let [generator, generator2] = pickUniqueItems([
            createSameOpposite,
            createMoreLess,
            createDirectionQuestion
        ], 2);

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
        category: `Binary: ${choice.category} ${operandNames[operandIndex]} ${choice2.category}`,
        isValid,
        premises,
        conclusion
    };
}

function createSameDifferent(length) {

    // There are 3 choices:
    // 0. Same/Opposite;
    // 1. More/Less;
    // 2. Direction.
    const choiceIndex = Math.floor(Math.random()*3);
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
        [a, b, c, d] = pickUniqueItems([...choice.buckets[0], ...choice.buckets[1]], 4);
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
        [a, b, c, d] = pickUniqueItems(choice.bucket, 4);
        conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;
        // Find indices of elements
        [indexOfA, indexOfB] = [choice.bucket.indexOf(a), choice.bucket.indexOf(b)];
        [indexOfC, indexOfD] = [choice.bucket.indexOf(c), choice.bucket.indexOf(d)];
        isValidSame = indexOfA > indexOfB && indexOfC > indexOfD
                   || indexOfA < indexOfB && indexOfC < indexOfD;
    }
    else {

        subtype = "Direction";

        const flip = coinFlip();
        while (flip !== isValidSame) {
            conclusion = "";
            choice = createDirectionQuestion(length);

            // Pick 4 different items
            [a, b, c, d] = pickUniqueItems(Object.keys(choice.wordCoordMap), 4);
            conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;
            // Find if A to B has same relation of C to D
            isValidSame = findDirection(choice.wordCoordMap[a], choice.wordCoordMap[b]) === findDirection(choice.wordCoordMap[c], choice.wordCoordMap[d]);
        }
    }

    if (coinFlip()) {
        isValid = isValidSame;
        if (choiceIndex < 1) {
            conclusion += '<div style="margin: 2px 0;">is same as</div>';
        }
        else {
            conclusion += '<div style="font-size: 14px; margin: 2px 0;">has the same relation as</div>';
        }
    }
    else {
        isValid = !isValidSame;
        if (choiceIndex < 1) {
            conclusion += '<div style="margin: 2px 0;">is different from</div>';
        }
        else {
            conclusion += '<div style="font-size: 12px; margin: 4px 0;">has a different relation from</div>';
        }
    }
    conclusion += `<span class="subject">${c}</span> to <span class="subject">${d}</span>`;

    choice.category = "Analogy: " + subtype;
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

    const words = pickUniqueItems(symbols, length);

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
            premises.push(`<span class="subject">${words[i+1]}</span> is at ${dirName} of <span class="subject">${words[i]}</span>`);
        }

        conclusionDirName = findDirection(
            wordCoordMap[words[0]],
            wordCoordMap[words[length-1]]
        );
    }

    let isValid;
    if (coinFlip()) { // correct
        isValid = true;
        conclusion = `<span class="subject">${words[0]}</span> is at ${conclusionDirName} of <span class="subject">${words[words.length-1]}</span>`;
    }
    else {            // wrong
        isValid = false;
        let oppositeDirection = findDirection(
            wordCoordMap[words[length-1]],
            wordCoordMap[words[0]]
        );
        conclusion = `<span class="subject">${words[0]}</span> is at ${oppositeDirection} of <span class="subject">${words[words.length-1]}</span>`;
    }

    shuffle(premises);
    
    return {
        category: "Direction",
        wordCoordMap,
        isValid,
        premises,
        conclusion
    }
}

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
    return picked;
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

function getSyllogism(s, p, m, rule) {

    let major = forms[rule[0]];
    let minor = forms[rule[1]];
    let conclusion = forms[rule[2]];

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

function createSyllogism(length) {
    length++;

    const category = "Syllogism";
    let bucket;
    let isValid;
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
            [premises[0], premises[1], conclusion] = getSyllogism(bucket[0], bucket[1], bucket[2], validRules[Math.floor(Math.random() * validRules.length)]);
        } else {
            [premises[0], premises[1], conclusion] = getSyllogism(bucket[0], bucket[1], bucket[2], getRandomInvalidRule());
        }

        for (let i = 3; i < length; i++) {
            let rnd = Math.floor(Math.random() * (i - 1));
            let flip = coinFlip();
            let p = flip ? bucket[i] : bucket[rnd];
            let m = flip ? bucket[rnd] : bucket[i];
            premises.push(getSyllogism("#####", p, m, getRandomInvalidRule())[0]);
        }
    } while(isPremiseEqualToConclusion(premises, conclusion));

    premises = shuffle(premises);

    return {
        category,
        bucket,
        isValid,
        premises,
        conclusion
    }
}

function isPremiseEqualToConclusion(premises, conclusion) {
    return premises.some(p => p === conclusion);
}

function startCountDown() {
    timerRunning = true;
    animateTimerBar();
}

function stopCountDown() {
    timerRunning = false;
    timerCount = timerTime;
    timerBar.style.width = '100%';
    clearTimeout(timerInstance);
}

function animateTimerBar() {
    timerBar.style.width = (timerCount / timerTime * 100) + '%';
    if (timerCount > 0) {
        timerCount--;
        timerInstance = setTimeout(animateTimerBar, 1000);
    }
    else {
        timeElapsed();
    }
}

function timeElapsed() {
    savedata.score--;
    question.answerUser = undefined;
    savedata.questions.push(question);
    save();
    renderHQL();
    wowFeedbackMissed(init);
}

function init() {

    stopCountDown();
    if (timerToggled) startCountDown();

    correctlyAnsweredEl.innerText = savedata.score;
    nextLevelEl.innerText = savedata.questions.length;

    const choices = [];
    if (savedata.enableCarouselMode) {
        carousel.classList.add("visible");
        display.classList.remove("visible");
    } else {
        display.classList.add("visible");
        carousel.classList.remove("visible");
    }
    if (savedata.enableMeaningfulWords)
        symbols = nouns;
    else
        symbols = strings;
    if (savedata.enableDistinction)
        choices.push(createSameOpposite(savedata.premises));
    if (savedata.enableComparison)
        choices.push(createMoreLess(savedata.premises));
    if (savedata.enableSyllogism)
        choices.push(createSyllogism(savedata.premises));
    if (savedata.premises > 2 && savedata.enableAnalogy)
        choices.push(createSameDifferent(savedata.premises));
    if (savedata.enableDirection)
        choices.push(createDirectionQuestion(savedata.premises));
    if (savedata.premises > 3 && savedata.enableBinary)
        choices.push(createBinaryQuestion(savedata.premises));

    if (choices.length < 1) {
        if (savedata.premises < 3 && savedata.enableAnalogy) {
            return alert("To play Analogy you need to input at least 3 premises.");
        }
        else if (savedata.premises < 4 && savedata.enableBinary) {
            return alert("To play Binary you need to input at least 4 premises.");
        }
        else {
            return alert("Please select at least one category of question.");
        }
    }

    question = choices[Math.floor(Math.random() * choices.length)];

    carouselInit();
    displayInit();
}

function wowFeedbackWrong(cb) {
    feedbackWrong.style.transitionDuration = "1s";
    feedbackWrong.classList.add("active");
    setTimeout(() => {
        feedbackWrong.classList.remove("active");
        cb();
    }, 1200);
}

function wowFeedbackMissed(cb) {
    feedbackMissed.style.transitionDuration = "0.9s";
    feedbackMissed.classList.add("active");
    setTimeout(() => {
        feedbackMissed.classList.remove("active");
        cb();
    }, 1100);
}

function wowFeedbackRight(cb) {
    feedbackRight.style.transitionDuration = "0.8s";
    feedbackRight.classList.add("active");
    setTimeout(() => {
        feedbackRight.classList.remove("active");
        cb();
    }, 1000);
}

function checkIfTrue() {
    if (question.isValid) {
        savedata.score++;
        wowFeedbackRight(init);
    } else {
        wowFeedbackWrong(init);
        savedata.score--;
    }
    delete question.bucket;
    delete question.buckets;
    question.answerUser = true;
    savedata.questions.push(question);
    save();
    renderHQL();
}

function checkIfFalse() {
    if (!question.isValid) {
        savedata.score++;
        wowFeedbackRight(init);
    } else {
        wowFeedbackWrong(init);
        savedata.score--;
    }
    delete question.bucket;
    delete question.buckets;
    question.answerUser = false;
    savedata.questions.push(question);
    save();
    renderHQL();
}

function resetApp() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
        localStorage.removeItem(localKey);
        window.location.reload();
    }
}

function renderHQL() {
    historyList.innerHTML = "";

    savedata.questions
        .map((q, i) => {
            const el = createHQLI(q, q.answerUser);
            el.querySelector(".index").textContent = i + 1;
            return el;
        })
        .reverse()
        .forEach(el => historyList.appendChild(el));
}

function createHQLI(question, answerUser) {
    const parent = document.createElement("DIV");

    let classModifier;
    if (answerUser === undefined)
        classModifier = '';
    else if (question.isValid === answerUser)
        classModifier = "hqli--right";
    else
        classModifier = "hqli--wrong";
    const htmlPremises = question.premises
        .map(p => `<div class="hqli-premise">${p}</div>`)
        .join("\n");

    if (answerUser === undefined)
        answerUser = "(TIMED OUT)";
    else if (answerUser === true)
        answerUser = "TRUE";
    else
        answerUser = "FALSE";
    
    const html =
`<div class="hqli ${classModifier}">
    <div class="inner">
        ${htmlPremises}
        <div class="hqli-conclusion">${question.conclusion}</div>
        <div class="hqli-answer-user">${answerUser}</div>
        <div class="hqli-answer">${("" + question.isValid).toUpperCase()}</div>
        <div class="hqli-footer">
            <div class="index"></div>
            <div>${question.category}</div>
        </div>
    </div>
</div>`;
    parent.innerHTML = html;
    return parent.firstElementChild;
}
