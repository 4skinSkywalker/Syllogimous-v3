// Get rid of all the PWA stuff
if ('serviceWorker' in navigator)
    navigator.serviceWorker.getRegistrations()
        .then(registrations => {
            if (registrations.length) for (let r of registrations) r.unregister();
        });

const questionSpace = document.querySelector('.question-space');

const feedbackWrong = document.querySelector(".feedback--wrong");
const feedbackMissed = document.querySelector(".feedback--missed");
const feedbackRight = document.querySelector(".feedback--right");

const correctlyAnsweredEl = document.querySelector(".correctly-answered");
const nextLevelEl = document.querySelector(".next-level");

const timerToggle = document.querySelector("#timer-toggle");
const timerBar = document.querySelector(".timer__bar");
let timerToggled = false;
let timerTime = 30;
let timerCount = 30;
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
const displayLabelLevel = display.querySelector(".display_label_level");
const displayText = display.querySelector(".display_text");;

const confirmationButtons = carousel.querySelector(".confirmation-buttons");

let symbols;

const keySettingMapInverse = Object.entries(keySettingMap)
    .reduce((a, b) => (a[b[1]] = b[0], a), {});

carouselBackButton.addEventListener("click", carouselBack);
carouselNextButton.addEventListener("click", carouselNext);

for (const key in keySettingMap) {
    const value = keySettingMap[key];
    const input = document.querySelector("#" + key);

    // Checkbox handler
    if (input.type === "checkbox") {
        input.addEventListener("input", evt => {
            savedata[value] = !!input.checked;
            save();
            init();
        });
    }

    // Number handler
    if (input.type === "number") {
        input.addEventListener("input", evt => {

            // Fix infinite loop on mobile when changing # of premises
            if (input.value === undefined || input.value === null)
                return;
            if (input.min && +input.value < +input.min)
                return;
            if (input.max && +input.value > +input.max)
                return;

            savedata[value] = +input.value;
            save();
            init();
        });
    }
}

// Events
timerToggle.addEventListener("click", evt => {
    timerTime = savedata[question.label + "Timer"];
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
        ...question.premises.map(p => `<div class="formatted-premise">${p}</div>`),
        '<div class="formatted-conclusion">'+question.conclusion+'</div>'
    ].join('');
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

function switchButtonPositions() {
    const parents = document.querySelectorAll(".confirmation-buttons");
    for (let p of parents) {
        const firstChild = p.firstElementChild;
        p.removeChild(firstChild);
        p.appendChild(firstChild);
    }
}

function switchButtonColors() {

    const parents = document.querySelectorAll(".confirmation-buttons");

    for (let p of parents) {

        p.querySelector('.confirmation-button-true')
         .classList
         .toggle('confirmation-style-false');

        p.querySelector('.confirmation-button-true')
         .classList
         .toggle('confirmation-style-true');

        p.querySelector('.confirmation-button-false')
         .classList
         .toggle('confirmation-style-true');

        p.querySelector('.confirmation-button-false')
         .classList
         .toggle('confirmation-style-false');
    }
}

function resetButtonColors() {

    const parents = document.querySelectorAll(".confirmation-buttons");

    for (let p of parents) {

        p.querySelector('.confirmation-button-true')
        .classList
        .remove('confirmation-style-false');

        p.querySelector('.confirmation-button-true')
        .classList
        .add('confirmation-style-true');

        p.querySelector('.confirmation-button-false')
        .classList
        .remove('confirmation-style-true');

        p.querySelector('.confirmation-button-false')
        .classList
        .add('confirmation-style-false');
    }
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

    if (savedata.enableCarouselMode) {
        carousel.classList.add("visible");
        display.classList.remove("visible");
    } else {
        display.classList.add("visible");
        carousel.classList.remove("visible");
    }
    if (savedata.enableMeaningfulWords)
        symbols = [...nouns];
    else
        symbols = [...strings];

    correctlyAnsweredEl.innerText = savedata.score;
    nextLevelEl.innerText = savedata.questions.length;

    const analogyEnable = [
        savedata.enableDistinction,
        savedata.enableComparison,
        savedata.enableTemporal,
        savedata.enableDirection,
        savedata.enableDirection3D,
        savedata.enableDirection4D
    ].reduce((a, c) => a + +c, 0) > 0;

    const binaryEnable = [
        savedata.enableDistinction,
        savedata.enableComparison,
        savedata.enableTemporal,
        savedata.enableDirection,
        savedata.enableDirection3D,
        savedata.enableDirection4D,
        savedata.enableSyllogism
    ].reduce((a, c) => a + +c, 0) > 1;

    const choices = [];
    if (savedata.enableDistinction && !(savedata.onlyAnalogy || savedata.onlyBinary))
        choices.push(createSameOpposite(savedata.premises));
    if (savedata.enableComparison && !(savedata.onlyAnalogy || savedata.onlyBinary))
        choices.push(createMoreLess(savedata.premises));
    if (savedata.enableTemporal && !(savedata.onlyAnalogy || savedata.onlyBinary))
        choices.push(createBeforeAfter(savedata.premises));
    if (savedata.enableSyllogism && !(savedata.onlyAnalogy || savedata.onlyBinary))
        choices.push(createSyllogism(savedata.premises));
    if (savedata.enableDirection && !(savedata.onlyAnalogy || savedata.onlyBinary))
        choices.push(createDirectionQuestion(savedata.premises));
    if (savedata.enableDirection3D && !(savedata.onlyAnalogy || savedata.onlyBinary))
        choices.push(createDirectionQuestion3D(savedata.premises));
    if (savedata.enableDirection4D && !(savedata.onlyAnalogy || savedata.onlyBinary))
        choices.push(createDirectionQuestion4D(savedata.premises));
    if (
        savedata.premises > 2
     && savedata.enableAnalogy
     && !savedata.onlyBinary
     && analogyEnable
    ) {
        choices.push(createSameDifferent(savedata.premises));
    }
    if (
        savedata.premises > 3
     && savedata.enableBinary
     && !savedata.onlyAnalogy
     && binaryEnable
    ) {

        // binary and nestedBinary are falsy when the user disable all operands
        const binary = createBinaryQuestion(savedata.premises);
        const nestedBinary = createNestedBinaryQuestion(savedata.premises);
        if (savedata.nestedBinaryDepth < 1 && binary)
            choices.push(binary);
        else if (nestedBinary)
            choices.push(nestedBinary);
    }

    if (savedata.enableAnalogy && !analogyEnable) {
        alert('ANALOGY needs at least 1 other question class (SYLLOGISM and BINARY do not count).');
        if (savedata.onlyAnalogy)
            return;
    }
    if (savedata.enableAnalogy && analogyEnable && savedata.premises < 3) {
        alert('ANALOGY needs at least 3 premises.');
        if (savedata.onlyAnalogy)
            return;
    }

    if (
        savedata.enableBinary
     && savedata.onlyBinary
     && !savedata.enableAnd
     && !savedata.enableNand
     && !savedata.enableOr
     && !savedata.enableNor
     && !savedata.enableXor
     && !savedata.enableXnor
    )
        return alert("BINARY needs at least 1 operand.");

    if (savedata.enableBinary && !binaryEnable) {
        alert('BINARY needs at least 2 other question class (ANALOGY do not count).');
        if (savedata.onlyBinary)
            return;
    }
    if (savedata.enableBinary && binaryEnable && savedata.premises < 4) {
        alert('BINARY needs at least 4 premises.');
        if (savedata.onlyBinary)
            return;
    }

    let isStrooped = false;
    questionSpace.classList.remove('stroop');
    if (savedata.enableNegation && savedata.enableStroopEffect && coinFlip()) {

        isStrooped = true;
        questionSpace.classList.add('stroop');
    }

    if (savedata.enableStroopEffect)
        for (let i = Math.floor(Math.random() * 10); i > 0; i--)
            switchButtonColors();
    else
        resetButtonColors();

    if (choices.length === 0)
        return;

    question = choices[Math.floor(Math.random() * choices.length)];
    timerTime = savedata[question.label + 'Timer'];

    stopCountDown();
    if (timerToggled) 
        startCountDown();

    question.isStroop = isStrooped;

    if (!savedata.removeNegationExplainer && /is-negated/.test(JSON.stringify(question)))
        question.premises.unshift('<span class="negation-explainer">Invert the <span class="negation-explainer__color-name is-negated"></span> text</span>');

    // Choose with 1/1000 chance an easter egg
    if (Math.random() > 0.999)
        question = paradoxes[Math.floor(Math.random() * paradoxes.length)];
    if (Math.random() > 0.999)
        question = logicPuzzles[Math.floor(Math.random() * logicPuzzles.length)];

    // Switch confirmation button positions a random amount of times
    for (let i = Math.floor(Math.random() * 10); i > 0; i--)
        switchButtonPositions();

    // Start of WCST
    wcst.classList.remove('visible');
    if (
        window.innerWidth > 992
     && savedata.enableSortingTest
     && (
            savedata.onlySortingTest
         || Math.random() > 1 - (1 / (1 + choices.length))
        )
    ) {
        timerTime = savedata.sortingTestTimer;
        const length = savedata.premises + 2;
        carousel.classList.remove('visible');
        display.classList.remove('visible');
        wcstLevel.innerText = length + ' items';
        wcst.classList.add('visible');
        generateCards(length, savedata.minCardWidth, init);
    }
    // End of WCST

    carouselInit();
    displayInit();
}

function wowFeedbackWrong(cb) {
    feedbackWrong.style.transitionDuration = "0.5s";
    feedbackWrong.classList.add("active");
    setTimeout(() => {
        feedbackWrong.classList.remove("active");
        cb();
    }, 1200);
}

function wowFeedbackMissed(cb) {
    feedbackMissed.style.transitionDuration = "0.5s";
    feedbackMissed.classList.add("active");
    setTimeout(() => {
        feedbackMissed.classList.remove("active");
        cb();
    }, 1200);
}

function wowFeedbackRight(cb) {
    feedbackRight.style.transitionDuration = "0.5s";
    feedbackRight.classList.add("active");
    setTimeout(() => {
        feedbackRight.classList.remove("active");
        cb();
    }, 1200);
}

function removeAppStateAndSave() {
    delete question.bucket;
    delete question.buckets;
    delete question.wordCoordMap;
    question.answeredAt = new Date().getTime();
    savedata.questions.push(question);
    save();
}

function checkIfTrue() {
    question.answerUser = true;
    removeAppStateAndSave();
    renderHQL();

    if (question.isValid) {
        savedata.score++;
        wowFeedbackRight(init);
    } else {
        wowFeedbackWrong(init);
        savedata.score--;
    }
}

function checkIfFalse() {
    question.answerUser = false;
    removeAppStateAndSave();
    renderHQL();

    if (!question.isValid) {
        savedata.score++;
        wowFeedbackRight(init);
    } else {
        wowFeedbackWrong(init);
        savedata.score--;
    }
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

    let responseTimeHtml = '';
    if (question.createdAt && question.answeredAt)
        responseTimeHtml =
`
        <div class="hqli-response-time">${Math.round((question.answeredAt - question.createdAt) / 1000)} sec</div>
`;
    
    const html =
`<div class="hqli ${classModifier}">
    <div class="inner">
        <div class="hqli-premises">
            ${htmlPremises}
        </div>
        <div class="hqli-conclusion">${question.conclusion}</div>
        <div class="hqli-answer-user">${answerUser}</div>
        <div class="hqli-answer">${("" + question.isValid).toUpperCase()}</div>
        ${responseTimeHtml}
        <div class="hqli-footer">
            <div class="index"></div>
            <div>${question.category}</div>
        </div>
    </div>
</div>`;
    parent.innerHTML = html;
    return parent.firstElementChild;
}

load();
switchButtonPositions();
init();
