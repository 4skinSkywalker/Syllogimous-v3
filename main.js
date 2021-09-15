var nouns = [
    "Ability",
    "Access",
    "Accident",
    "Account",
    "Action",
    "Activity",
    "Actor",
    "Addition",
    "Address",
    "Administration",
    "Advantage",
    "Advertising",
    "Advice",
    "Affair",
    "Agency",
    "Agreement",
    "Airport",
    "Alcohol",
    "Ambition",
    "Amount",
    "Analysis",
    "Analyst",
    "Animal",
    "Answer",
    "Anxiety",
    "Apartment",
    "Appearance",
    "Apple",
    "Application",
    "Appointment",
    "Area",
    "Argument",
    "Army",
    "Arrival",
    "Article",
    "Aspect",
    "Assignment",
    "Assistance",
    "Assistant",
    "Association",
    "Assumption",
    "Atmosphere",
    "Attempt",
    "Attention",
    "Attitude",
    "Audience",
    "Aunt",
    "Average",
    "Awareness",
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
    "Beginning",
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
    "Boyfriend",
    "Bread",
    "Breath",
    "Brother",
    "Building",
    "Business",
    "Buyer",
    "Cabinet",
    "Camera",
    "Cancer",
    "Candidate",
    "Capital",
    "Card",
    "Care",
    "Career",
    "Case",
    "Cash",
    "Category",
    "Cause",
    "Celebration",
    "Cell",
    "Championship",
    "Chance",
    "Chapter",
    "Charity",
    "Cheek",
    "Chemistry",
    "Chest",
    "Chicken",
    "Child",
    "Childhood",
    "Chocolate",
    "Choice",
    "Church",
    "Cigarette",
    "City",
    "Class",
    "Classroom",
    "Client",
    "Climate",
    "Clothes",
    "Coast",
    "Coffee",
    "Collection",
    "College",
    "Combination",
    "Committee",
    "Communication",
    "Community",
    "Company",
    "Comparison",
    "Competition",
    "Complaint",
    "Computer",
    "Concept",
    "Conclusion",
    "Condition",
    "Confusion",
    "Connection",
    "Consequence",
    "Construction",
    "Contact",
    "Context",
    "Contract",
    "Contribution",
    "Control",
    "Conversation",
    "Cookie",
    "Country",
    "County",
    "Courage",
    "Course",
    "Cousin",
    "Craft",
    "Credit",
    "Criticism",
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
    "Definition",
    "Delivery",
    "Demand",
    "Department",
    "Departure",
    "Depression",
    "Depth",
    "Description",
    "Design",
    "Desk",
    "Development",
    "Device",
    "Diamond",
    "Difference",
    "Difficulty",
    "Dinner",
    "Direction",
    "Director",
    "Dirt",
    "Disaster",
    "Discipline",
    "Discussion",
    "Disease",
    "Disk",
    "Distribution",
    "Drama",
    "Drawer",
    "Drawing",
    "Driver",
    "Earth",
    "Economics",
    "Economy",
    "Editor",
    "Education",
    "Effect",
    "Efficiency",
    "Effort",
    "Election",
    "Elevator",
    "Emotion",
    "Emphasis",
    "Employee",
    "Employer",
    "Employment",
    "Energy",
    "Engine",
    "Entertainment",
    "Enthusiasm",
    "Entry",
    "Environment",
    "Equipment",
    "Error",
    "Establishment",
    "Estate",
    "Event",
    "Exam",
    "Examination",
    "Example",
    "Exchange",
    "Excitement",
    "Exercise",
    "Experience",
    "Explanation",
    "Expression",
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
    "Foundation",
    "Frame",
    "Freedom",
    "Friendship",
    "Funeral",
    "Future",
    "Game",
    "Garbage",
    "Garden",
    "Gate",
    "Gene",
    "Gift",
    "Girl",
    "Girlfriend",
    "Goal",
    "Government",
    "Grandmother",
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
    "Historian",
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
    "Imagination",
    "Impact",
    "Importance",
    "Impression",
    "Improvement",
    "Income",
    "Independence",
    "Indication",
    "Industry",
    "Inflation",
    "Information",
    "Initiative",
    "Injury",
    "Insect",
    "Inside",
    "Inspection",
    "Inspector",
    "Instance",
    "Instruction",
    "Insurance",
    "Intention",
    "Interaction",
    "Interest",
    "Internet",
    "Introduction",
    "Investment",
    "Issue",
    "Item",
    "Judgment",
    "Kind",
    "King",
    "Knowledge",
    "Ladder",
    "Lady",
    "Lake",
    "Language",
    "Leader",
    "Leadership",
    "Length",
    "Level",
    "Library",
    "Life",
    "Light",
    "Line",
    "Link",
    "List",
    "Literature",
    "Location",
    "Loss",
    "Love",
    "Machine",
    "Magazine",
    "Maintenance",
    "Mall",
    "Management",
    "Manager",
    "Manufacturer",
    "Market",
    "Marketing",
    "Marriage",
    "Material",
    "Math",
    "Matter",
    "Meal",
    "Meaning",
    "Measurement",
    "Meat",
    "Media",
    "Medicine",
    "Medium",
    "Member",
    "Membership",
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
    "Negotiation",
    "Network",
    "News",
    "Newspaper",
    "Night",
    "Note",
    "Nothing",
    "Number",
    "Object",
    "Obligation",
    "Office",
    "Operation",
    "Opinion",
    "Opportunity",
    "Orange",
    "Order",
    "Organization",
    "Outcome",
    "Outside",
    "Oven",
    "Owner",
    "Page",
    "Paint",
    "Painting",
    "Paper",
    "Part",
    "Passenger",
    "Passion",
    "Patience",
    "Payment",
    "Penalty",
    "People",
    "Percentage",
    "Perception",
    "Performance",
    "Period",
    "Permission",
    "Person",
    "Personality",
    "Perspective",
    "Philosophy",
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
    "Pollution",
    "Population",
    "Position",
    "Possession",
    "Possibility",
    "Post",
    "Potato",
    "Power",
    "Practice",
    "Preference",
    "Preparation",
    "Presence",
    "Presentation",
    "President",
    "Pressure",
    "Price",
    "Priority",
    "Problem",
    "Procedure",
    "Process",
    "Product",
    "Profession",
    "Professor",
    "Profit",
    "Program",
    "Promotion",
    "Property",
    "Proposal",
    "Protection",
    "Psychology",
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
    "Reception",
    "Recipe",
    "Recognition",
    "Recommendation",
    "Record",
    "Recording",
    "Reflection",
    "Refrigerator",
    "Region",
    "Relation",
    "Relationship",
    "Replacement",
    "Republic",
    "Reputation",
    "Requirement",
    "Research",
    "Resolution",
    "Resource",
    "Response",
    "Responsibility",
    "Restaurant",
    "Result",
    "Revenue",
    "Review",
    "Revolution",
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
    "Satisfaction",
    "Scale",
    "Scene",
    "School",
    "Science",
    "Screen",
    "Secretary",
    "Section",
    "Sector",
    "Security",
    "Selection",
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
    "Signature",
    "Significance",
    "Singer",
    "Sister",
    "Site",
    "Situation",
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
    "Statement",
    "Steak",
    "Step",
    "Stock",
    "Storage",
    "Store",
    "Story",
    "Stranger",
    "Strategy",
    "Stress",
    "Structure",
    "Student",
    "Studio",
    "Study",
    "Style",
    "Subject",
    "Success",
    "Suggestion",
    "Supermarket",
    "Surgery",
    "Sympathy",
    "System",
    "Table",
    "Tale",
    "Task",
    "Teacher",
    "Technology",
    "Television",
    "Temperature",
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
    "Tradition",
    "Trainer",
    "Training",
    "Transportation",
    "Truth",
    "Type",
    "Uncle",
    "Understanding",
    "Union",
    "Unit",
    "University",
    "User",
    "Value",
    "Variation",
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

function shuffle(array) {
    let len = array.length;
    let copyOfArray = [...array];
    let shuffled = [];
    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * copyOfArray.length);
        shuffled.push(copyOfArray.splice(rnd, 1).pop());
    }
    return shuffled;
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

        if (Math.random() > 0.5) {
            premises.push(`<span class="subject">${prev}</span> is same as <span class="subject">${curr}</span>`);
            buckets[prevBucket].push(curr);
        } else {
            premises.push(`<span class="subject">${prev}</span> is opposite of <span class="subject">${curr}</span>`);
            prevBucket = (prevBucket + 1) % 2;
            buckets[prevBucket].push(curr);
        }

        prev = curr;
    }

    premises = shuffle(premises);

    let conclusion;
    let isValid;
    if (Math.random() > 0.5) {
        conclusion = `<span class="subject">${first}</span> is same as <span class="subject">${curr}</span>`;
        isValid = buckets[0].includes(curr);
    } else {
        conclusion = `<span class="subject">${first}</span> is opposite of <span class="subject">${curr}</span>`;
        isValid = buckets[1].includes(curr);
    }

    return {
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
        if (Math.random() > 0.5) {
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

    premises = shuffle(premises);

    let conclusion;
    if (Math.random() > 0.5) {
        conclusion = `<span class="subject">${bucket[0]}</span> is less than <span class="subject">${next}</span>`;
        isValid = sign === 1;
    } else {
        conclusion = `<span class="subject">${bucket[0]}</span> is more than <span class="subject">${next}</span>`;
        isValid = sign === -1;
    }

    return {
        isValid,
        premises,
        conclusion
    }
}

let validRules = [
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

let forms = [
    'All <span class="subject">$</span> is <span class="subject">$</span>',
    'No <span class="subject">$</span> is <span class="subject">$</span>',
    'Some <span class="subject">$</span> is <span class="subject">$</span>',
    'Some <span class="subject">$</span> is not <span class="subject">$</span>'
];

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
    let isValid = Math.random() > 0.5;
    if (isValid) {
        [premises[0], premises[1], conclusion] = getSyllogism(bucket[0], bucket[1], bucket[2], validRules[Math.floor(Math.random() * validRules.length)]);
    } else {
        [premises[0], premises[1], conclusion] = getSyllogism(bucket[0], bucket[1], bucket[2], getRandomInvalidRule());
    }

    for (let i = 3; i < length; i++) {
        let rnd = Math.floor(Math.random() * (i - 1));
        let coinFlip = Math.random() > 0.5;
        let p = coinFlip ? bucket[i] : bucket[rnd];
        let m = coinFlip ? bucket[rnd] : bucket[i];
        premises.push(getSyllogism("#####", p, m, getRandomInvalidRule())[0]);
    }

    premises = shuffle(premises);

    return {
        isValid,
        premises,
        conclusion
    }
}

let premisesEl = document.querySelector(".premises");
let conclusionEl = document.querySelector(".conclusion");
let correctlyAnsweredEl = document.querySelector(".correctly-answered");
let nextLevelEl = document.querySelector(".next-level");
let lsKey = "SYLLOGIMOUSv3"

function dataLS(update) {
    if (update) {
        localStorage.setItem(lsKey, update);
        return;
    }
    let correctlyAnsweredLS = localStorage.getItem(lsKey);
    if (correctlyAnsweredLS) {
        return +correctlyAnsweredLS;
    } else {
        return 0;
    }
}

let correctlyAnswered = dataLS();
let question;
function init() {
    correctlyAnsweredEl.innerText = correctlyAnswered;
    nextLevelEl.innerText = Math.floor((correctlyAnswered + 100) / 100) * 100;

    let rnd = Math.random();
    if (rnd < 0.33) {
        question = createSyllogism(3 + Math.floor(correctlyAnswered / 100));
    } else if (rnd < 0.66) {
        question = createMoreLess(3 + Math.floor(correctlyAnswered / 100));
    } else {
        question = createSameOpposite(3 + Math.floor(correctlyAnswered / 100));
    }

    premisesEl.innerHTML = "";
    question.premises.forEach(premise => {
        let li = document.createElement("LI");
        li.innerHTML = premise;
        premisesEl.appendChild(li);
    });

    conclusionEl.innerHTML = question.conclusion;
}

function checkIfTrue() {
    if (question.isValid) {
        correctlyAnswered++;
    } else {
        correctlyAnswered--;
    }
    dataLS(correctlyAnswered);
    init();
}

function checkIfFalse() {
    if (!question.isValid) {
        correctlyAnswered++;
    } else {
        correctlyAnswered--;
    }
    dataLS(correctlyAnswered);
    init();
}

init();