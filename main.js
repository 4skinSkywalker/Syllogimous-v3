// Constants and variables
const localKey = "sllgms-v3";

const premisesEl = document.querySelector(".premises");
const conclusionEl = document.querySelector(".conclusion");
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
const carousel = document.querySelector(".carousel");
const carouselDisplayLabelType = carousel.querySelector(".carousel_display_label_type");
const carouselDisplayLabelProgress = carousel.querySelector(".carousel_display_label_progress");
const carouselDisplayText = carousel.querySelector(".carousel_display_text");
const carouselBackButton = carousel.querySelector("#carousel-back");
const carouselNextButton = carousel.querySelector("#carousel-next");
const confirmationButtons = carousel.querySelector(".confirmation-buttons");

const nouns = [
    "Ability",
    "Access",
    "Accident",
    "Account",
    "Action",
    "Activity",
    "Actor",
    "Addition",
    "Address",
    "Advice",
    "Affair",
    "Agency",
    "Airport",
    "Alcohol",
    "Ambition",
    "Amount",
    "Analysis",
    "Analyst",
    "Animal",
    "Answer",
    "Anxiety",
    "Apple",
    "Area",
    "Argument",
    "Army",
    "Arrival",
    "Article",
    "Aspect",
    "Attempt",
    "Attitude",
    "Audience",
    "Aunt",
    "Average",
    "Back",
    "Balance",
    "Ball",
    "Bank",
    "Baseball",
    "Basis",
    "Basket",
    "Bath",
    "Bathroom",
    "Bedroom",
    "Beer",
    "Benefit",
    "Bird",
    "Birth",
    "Birthday",
    "Blood",
    "Board",
    "Boat",
    "Body",
    "Bonus",
    "Book",
    "Boss",
    "Bottom",
    "Bread",
    "Breath",
    "Brother",
    "Building",
    "Business",
    "Buyer",
    "Cabinet",
    "Camera",
    "Cancer",
    "Capital",
    "Card",
    "Care",
    "Career",
    "Case",
    "Cash",
    "Category",
    "Cause",
    "Cell",
    "Chance",
    "Chapter",
    "Charity",
    "Cheek",
    "Chest",
    "Chicken",
    "Child",
    "Choice",
    "Church",
    "City",
    "Class",
    "Client",
    "Climate",
    "Clothes",
    "Coast",
    "Coffee",
    "College",
    "Company",
    "Computer",
    "Concept",
    "Contact",
    "Context",
    "Contract",
    "Control",
    "Cookie",
    "Country",
    "County",
    "Courage",
    "Course",
    "Cousin",
    "Craft",
    "Credit",
    "Culture",
    "Currency",
    "Customer",
    "Cycle",
    "Data",
    "Database",
    "Date",
    "Dealer",
    "Death",
    "Debt",
    "Decision",
    "Delivery",
    "Demand",
    "Depth",
    "Design",
    "Desk",
    "Device",
    "Diamond",
    "Dinner",
    "Director",
    "Dirt",
    "Disaster",
    "Disease",
    "Disk",
    "Drama",
    "Drawer",
    "Drawing",
    "Driver",
    "Earth",
    "Economy",
    "Editor",
    "Effect",
    "Effort",
    "Election",
    "Elevator",
    "Emotion",
    "Emphasis",
    "Employee",
    "Employer",
    "Energy",
    "Engine",
    "Entry",
    "Error",
    "Estate",
    "Event",
    "Exam",
    "Example",
    "Exchange",
    "Exercise",
    "Extent",
    "Face",
    "Fact",
    "Failure",
    "Family",
    "Farmer",
    "Feature",
    "Feedback",
    "Field",
    "Figure",
    "Film",
    "Finding",
    "Fire",
    "Fish",
    "Flight",
    "Focus",
    "Food",
    "Football",
    "Force",
    "Form",
    "Fortune",
    "Frame",
    "Freedom",
    "Funeral",
    "Future",
    "Game",
    "Garbage",
    "Garden",
    "Gate",
    "Gene",
    "Gift",
    "Girl",
    "Goal",
    "Grocery",
    "Group",
    "Growth",
    "Guest",
    "Guidance",
    "Guide",
    "Guitar",
    "Hair",
    "Half",
    "Hall",
    "Hand",
    "Head",
    "Health",
    "Hearing",
    "Heart",
    "Heat",
    "Height",
    "Highway",
    "History",
    "Home",
    "Homework",
    "Honey",
    "Hope",
    "Hospital",
    "Hotel",
    "House",
    "Housing",
    "Idea",
    "Image",
    "Impact",
    "Income",
    "Industry",
    "Injury",
    "Insect",
    "Inside",
    "Instance",
    "Interest",
    "Internet",
    "Issue",
    "Item",
    "Judgment",
    "Kind",
    "King",
    "Ladder",
    "Lady",
    "Lake",
    "Language",
    "Leader",
    "Length",
    "Level",
    "Library",
    "Life",
    "Light",
    "Line",
    "Link",
    "List",
    "Location",
    "Loss",
    "Love",
    "Machine",
    "Magazine",
    "Mall",
    "Manager",
    "Market",
    "Marriage",
    "Material",
    "Math",
    "Matter",
    "Meal",
    "Meaning",
    "Meat",
    "Media",
    "Medicine",
    "Medium",
    "Member",
    "Memory",
    "Menu",
    "Message",
    "Metal",
    "Method",
    "Midnight",
    "Mind",
    "Mixture",
    "Mode",
    "Model",
    "Moment",
    "Money",
    "Month",
    "Mood",
    "Morning",
    "Mouse",
    "Movie",
    "Music",
    "Name",
    "Nation",
    "Nature",
    "Network",
    "News",
    "Night",
    "Note",
    "Nothing",
    "Number",
    "Object",
    "Office",
    "Opinion",
    "Orange",
    "Order",
    "Outcome",
    "Outside",
    "Oven",
    "Owner",
    "Page",
    "Paint",
    "Painting",
    "Paper",
    "Part",
    "Passion",
    "Patience",
    "Payment",
    "Penalty",
    "People",
    "Period",
    "Person",
    "Phone",
    "Photo",
    "Physics",
    "Piano",
    "Picture",
    "Piece",
    "Pizza",
    "Place",
    "Plan",
    "Platform",
    "Player",
    "Poem",
    "Poet",
    "Poetry",
    "Point",
    "Police",
    "Policy",
    "Politics",
    "Position",
    "Post",
    "Potato",
    "Power",
    "Practice",
    "Presence",
    "Pressure",
    "Price",
    "Priority",
    "Problem",
    "Process",
    "Product",
    "Profit",
    "Program",
    "Property",
    "Proposal",
    "Purpose",
    "Quality",
    "Quantity",
    "Queen",
    "Question",
    "Radio",
    "Range",
    "Rate",
    "Ratio",
    "Reaction",
    "Reality",
    "Reason",
    "Recipe",
    "Record",
    "Region",
    "Relation",
    "Republic",
    "Research",
    "Resource",
    "Response",
    "Result",
    "Revenue",
    "Review",
    "Risk",
    "River",
    "Road",
    "Rock",
    "Role",
    "Room",
    "Rule",
    "Safety",
    "Salad",
    "Salt",
    "Sample",
    "Scale",
    "Scene",
    "School",
    "Science",
    "Screen",
    "Section",
    "Sector",
    "Security",
    "Sense",
    "Series",
    "Service",
    "Session",
    "Setting",
    "Shape",
    "Share",
    "Shirt",
    "Side",
    "Sign",
    "Singer",
    "Sister",
    "Site",
    "Size",
    "Skill",
    "Society",
    "Software",
    "Soil",
    "Solution",
    "Song",
    "Sound",
    "Soup",
    "Source",
    "Space",
    "Speaker",
    "Speech",
    "Sport",
    "Square",
    "Standard",
    "Star",
    "State",
    "Steak",
    "Step",
    "Stock",
    "Storage",
    "Store",
    "Story",
    "Stranger",
    "Strategy",
    "Stress",
    "Student",
    "Studio",
    "Study",
    "Style",
    "Subject",
    "Success",
    "Surgery",
    "Sympathy",
    "System",
    "Table",
    "Tale",
    "Task",
    "Teacher",
    "Tennis",
    "Tension",
    "Term",
    "Test",
    "Thanks",
    "Theory",
    "Thing",
    "Thought",
    "Throat",
    "Time",
    "Tongue",
    "Tool",
    "Tooth",
    "Topic",
    "Town",
    "Trade",
    "Trainer",
    "Training",
    "Truth",
    "Type",
    "Uncle",
    "Union",
    "Unit",
    "User",
    "Value",
    "Variety",
    "Vehicle",
    "Version",
    "Video",
    "View",
    "Village",
    "Virus",
    "Voice",
    "Volume",
    "Warning",
    "Water",
    "Weakness",
    "Wealth",
    "Weather",
    "Wedding",
    "Week",
    "While",
    "Wife",
    "Wind",
    "Winner",
    "Woman",
    "Wood",
    "Word",
    "Work",
    "Worker",
    "World",
    "Writer",
    "Writing",
    "Year",
    "Youth"
];

const validRules = [
    "0001",
    "1011",
    "0221",
    "1231",
    "0021",
    "1031",
    "0112",
    "1012",
    "1232",
    "0332",
    "0132",
    "1032",
    "0223",
    "2023",
    "3033",
    "1233",
    "0023",
    "1033",
    "0114",
    "2024",
    "1234",
    "0134",
    "1034",
    "0024"
];

const forms = [
    'All <span class="subject">$</span> is <span class="subject">$</span>',
    'No <span class="subject">$</span> is <span class="subject">$</span>',
    'Some <span class="subject">$</span> is <span class="subject">$</span>',
    'Some <span class="subject">$</span> is not <span class="subject">$</span>'
];

let savedata = {
    "timer": 10,
    "score": 0,
    "enableDistinction": true,
    "enableComparison": true,
    "enableSyllogism": true,
    "enableAnalogy": true,
    "questions": []
};

const keySettingMap = {
    "p-1": "enableDistinction",
    "p-2": "enableComparison",
    "p-3": "enableSyllogism",
    "p-4": "enableAnalogy"
};
const keySettingMapInverse = Object.entries(keySettingMap)
    .reduce((a, b) => (a[b[1]] = b[0], a), {});

// Events
load();

carouselBackButton.addEventListener("click", carouselBack);
carouselNextButton.addEventListener("click", carouselNext);

for (let key in keySettingMap) {
    let value = keySettingMap[key];
    let check = document.querySelector("#" + key)
    
    check.addEventListener("click", evt => {
        savedata[value] = !!check.checked;
        save();
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
        document.querySelector("#" + id).checked = value;
    }

    timerInput.value = savedData.timer;
    timerTime = timerInput.value;

    renderHQL();
}

function carouselInit() {
    carouselIndex = 0;
    confirmationButtons.style.opacity = 0;
    carouselBackButton.disabled = true;
    carouselNextButton.disabled = false;

    carouselDisplayLabelType.textContent = "Premise";
    carouselDisplayLabelProgress.textContent = "1/" + question.premises.length;
    carouselDisplayText.innerHTML = question.premises[0];
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
    if (length < 3) {
        length = 3;
    }

    let rnd = Math.floor(Math.random() * nouns.length);
    let first = nouns[rnd]
    let prev = first;
    let curr;
    let seen = [rnd];

    let buckets = [[prev], []];
    let prevBucket = 0;

    let premises = [];

    for (let i = 0; i < length - 1; i++) {
        let rnd = Math.floor(Math.random() * nouns.length);
        while (seen.includes(rnd)) {
            rnd = Math.floor(Math.random() * nouns.length);
        }
        curr = nouns[rnd];
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

    shuffle(premises);

    let conclusion;
    let isValid;
    if (coinFlip()) {
        conclusion = `<span class="subject">${first}</span> is same as <span class="subject">${curr}</span>`;
        isValid = buckets[0].includes(curr);
    } else {
        conclusion = `<span class="subject">${first}</span> is opposite of <span class="subject">${curr}</span>`;
        isValid = buckets[1].includes(curr);
    }

    return {
        category: "Distinction",
        buckets,
        isValid,
        premises,
        conclusion
    }
}

function createMoreLess(length) {
    if (length < 3) {
        length = 3;
    }

    let seen = [];
    let bucket = Array(length).fill(0)
        .map(() => {
            let rnd = Math.floor(Math.random() * nouns.length);
            while (seen.includes(rnd)) {
                rnd = Math.floor(Math.random() * nouns.length);
            }
            seen.push(rnd);
            return nouns[rnd];
        });

    let sign = [-1, 1][Math.floor(Math.random() * 2)];

    let premises = [];
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

    console.log(bucket, sign);

    let conclusion;
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

    shuffle(premises);

    return {
        category: "Comparison",
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

function createSameDifferent(length) {
    // This kind of questions need at least a length of 4 which is why they will only be played after the number of premises has increased
    if (length < 4) {
        length = 4;
    }

    const kindOfQuestions = [createSameOpposite(length), createMoreLess(length)];
    const flip = 0; // coinFlip();
    const choice = kindOfQuestions[(flip ? 1 : 0)];
    let conclusion = "";
    let isValid, isValidSame;
    let a, b, c, d;
    let indexOfA, indexOfB, indexOfC, indexOfD;
    if (!flip) {
        // Pick 4 different items
        [a, b, c, d] = pickUniqueItems([...choice.buckets[0], ...choice.buckets[1]], 4);
        // Pick a relation (same/different), determine the truth
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
    else {
        // Pick 4 different items
        [a, b, c, d] = pickUniqueItems(choice.bucket, 4);
        // Pick a relation (same/different), determine the truth
        conclusion += `<span class="subject">${a}</span> to <span class="subject">${b}</span>`;
        // Find index of a and index of b
        [indexOfA, indexOfB] = [choice.bucket.indexOf(a), choice.bucket.indexOf(b)];
        // Find index of c and index of d
        [indexOfC, indexOfD] = [choice.bucket.indexOf(c), choice.bucket.indexOf(d)];
        conclusion += `<span class="subject">${c}</span> to <span class="subject">${d}</span>`;
        isValidSame = indexOfA > indexOfB && indexOfC > indexOfD
                   || indexOfA < indexOfB && indexOfC < indexOfD;
    }
    if (coinFlip()) {
        isValid = isValidSame;
        conclusion += '<br>is same as<br>';
    }
    else {
        isValid = !isValidSame;
        conclusion += '<br>is different from<br>';
    }
    conclusion += `<span class="subject">${c}</span> to <span class="subject">${d}</span>`;

    choice.isValid = isValid;
    choice.conclusion = conclusion;

    choice.category = "Analogy";

    return choice;
}

function coinFlip() {
    return Math.random() > 0.5;
}

function pickUniqueItems(array, n) {
    const copy = JSON.parse(JSON.stringify(array));
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
    if (length < 3) {
        length = 3;
    }

    let seen = [];
    let bucket = Array(length).fill(0)
        .map(() => {
            let rnd = Math.floor(Math.random() * nouns.length);
            while (seen.includes(rnd)) {
                rnd = Math.floor(Math.random() * nouns.length);
            }
            seen.push(rnd);
            return nouns[rnd];
        });

    let premises = [];

    let conclusion;
    let isValid = coinFlip();
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

    premises = shuffle(premises);

    return {
        category: "Syllogism",
        bucket,
        isValid,
        premises,
        conclusion
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
    init();
}

let question;
function init() {

    stopCountDown();
    if (timerToggled) startCountDown();

    correctlyAnsweredEl.innerText = savedata.score;
    nextLevelEl.innerText = savedata.questions.length;

    let rnd = Math.random();

    // Can use same/different kind of questions 1/4 of the time if user is experienced
    if (savedata.score > 100) {
        if (rnd < 0.25)
            question = createSameDifferent(3 + Math.floor(savedata.score / 100));
        else if (rnd < 0.5)
            question = createSyllogism(3 + Math.floor(savedata.score / 100));
        else if (rnd < 0.75)
            question = createMoreLess(3 + Math.floor(savedata.score / 100));
        else
            question = createSameOpposite(3 + Math.floor(savedata.score / 100));
    } 
    else {
        if (rnd < 0.33)
            question = createSyllogism(3 + Math.floor(savedata.score / 100));
        else if (rnd < 0.66)
            question = createMoreLess(3 + Math.floor(savedata.score / 100));
        else
            question = createSameOpposite(3 + Math.floor(savedata.score / 100));
    }

    carouselInit();
}

function checkIfTrue() {
    if (question.isValid) {
        savedata.score++;
    } else {
        savedata.score--;
    }
    delete question.bucket;
    delete question.buckets;
    question.answerUser = true;
    savedata.questions.push(question);
    save();
    renderHQL();
    init();
}

function checkIfFalse() {
    if (!question.isValid) {
        savedata.score++;
    } else {
        savedata.score--;
    }
    delete question.bucket;
    delete question.buckets;
    question.answerUser = false;
    savedata.questions.push(question);
    save();
    renderHQL();
    init();
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
    else if (answerUser === "true")
        answerUser = "TRUE";
    else
        answerUser = "FALSE";

    question.isValid = ("" + question.isValid).toUpperCase();
    
    const html =
`<div class="hqli ${classModifier}">
    <div class="inner">
        ${htmlPremises}
        <div class="hqli-conclusion">${question.conclusion}</div>
        <div class="hqli-answer-user">${answerUser}</div>
        <div class="hqli-answer">${question.isValid}</div>
        <div class="hqli-footer">
            <div class="index"></div>
            <div>${question.category}</div>
        </div>
    </div>
</div>`;
    parent.innerHTML = html;
    return parent.firstElementChild;
}


init();