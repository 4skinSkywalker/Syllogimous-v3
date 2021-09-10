var nouns = [
  "Actor",
  "Advertisement",
  "Afternoon",
  "Airport",
  "Ambulance",
  "Animal",
  "Answer",
  "Apple",
  "Army",
  "Australia",
  "Balloon",
  "Banana",
  "Battery",
  "Beach",
  "Beard",
  "Bed",
  "Belgium",
  "Boy",
  "Branch",
  "Breakfast",
  "Brother",
  "Camera",
  "Candle",
  "Car",
  "Caravan",
  "Carpet",
  "Cartoon",
  "China",
  "Church",
  "Crayon",
  "Crowd",
  "Daughter",
  "Death",
  "Denmark",
  "Diamond",
  "Dinner",
  "Disease",
  "Doctor",
  "Dog",
  "Dream",
  "Dress",
  "Easter",
  "Egg",
  "Eggplant",
  "Egypt",
  "Elephant",
  "Energy",
  "Engine",
  "England",
  "Evening",
  "Eye",
  "Family",
  "Finland",
  "Fish",
  "Flag",
  "Flower",
  "Football",
  "Forest",
  "Fountain",
  "France",
  "Furniture",
  "Garage",
  "Garden",
  "Gas",
  "Ghost",
  "Girl",
  "Glass",
  "Gold",
  "Grass",
  "Greece",
  "Guitar",
  "Hair",
  "Hamburger",
  "Helicopter",
  "Helmet",
  "Holiday",
  "Honey",
  "Horse",
  "Hospital",
  "House",
  "Hydrogen",
  "Ice",
  "Insect",
  "Insurance",
  "Iron",
  "Island",
  "Jackal",
  "Jelly",
  "Jewellery",
  "Jordan",
  "Juice",
  "Kangaroo",
  "King",
  "Kitchen",
  "Kite",
  "Knife",
  "Lamp",
  "Lawyer",
  "Leather",
  "Library",
  "Lighter",
  "Lion",
  "Lizard",
  "Lock",
  "London",
  "Lunch",
  "Machine",
  "Magazine",
  "Magician",
  "Manchester",
  "Market",
  "Match",
  "Microphone",
  "Monkey",
  "Morning",
  "Motorcycle",
  "Nail",
  "Napkin",
  "Needle",
  "Nest",
  "Nigeria",
  "Night",
  "Notebook",
  "Ocean",
  "Oil",
  "Orange",
  "Oxygen",
  "Oyster",
  "Painting",
  "Parrot",
  "Pencil",
  "Piano",
  "Pillow",
  "Pizza",
  "Planet",
  "Plastic",
  "Portugal",
  "Potato",
  "Queen",
  "Quill",
  "Rain",
  "Rainbow",
  "Raincoat",
  "Refrigerator",
  "Restaurant",
  "River",
  "Rocket",
  "Room",
  "Rose",
  "Russia",
  "Sandwich",
  "School",
  "Scooter",
  "Shampoo",
  "Shoe",
  "Soccer",
  "Spoon",
  "Stone",
  "Sugar",
  "Sweden",
  "Teacher",
  "Telephone",
  "Television",
  "Tent",
  "Thailand",
  "Tomato",
  "Toothbrush",
  "Traffic",
  "Train",
  "Truck",
  "Uganda",
  "Umbrella",
  "Van",
  "Vase",
  "Vegetable",
  "Vulture",
  "Wall",
  "Whale",
  "Window",
  "Wire",
  "Xylophone",
  "Yacht",
  "Yak",
  "Zebra",
  "Zoo"
];

function shuffle(array) {
  let len = array.length;
  let copyOfArray = [...array];
  let shuffled = [];
  for (let i = 0; i < len; i++) {
      let rnd = Math.floor(Math.random()*copyOfArray.length);
      shuffled.push(copyOfArray.splice(rnd, 1).pop());
  }
  return shuffled;
}

function createSameOpposite(length) {
  if (length < 3) {
      length = 3;
  }

  let rnd = Math.floor(Math.random()*nouns.length);
  let first = nouns[rnd]
  let prev = first;
  let curr;
  let seen = [rnd];
  
  let buckets = [[prev], []];
  let prevBucket = 0;

  let premises = [];

  for (let i = 0; i < length - 1; i++) {
      let rnd = Math.floor(Math.random()*nouns.length);
      while (seen.includes(rnd)) {
          rnd = Math.floor(Math.random()*nouns.length);
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
          let rnd = Math.floor(Math.random()*nouns.length);
          while (seen.includes(rnd)) {
              rnd = Math.floor(Math.random()*nouns.length);
          }
          seen.push(rnd);
          return nouns[rnd];
      });
  
  let sign = [-1, 1][Math.floor(Math.random()*2)];

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
          let rnd = Math.floor(Math.random()*nouns.length);
          while (seen.includes(rnd)) {
              rnd = Math.floor(Math.random()*nouns.length);
          }
          seen.push(rnd);
          return nouns[rnd];
      });

  let premises = [];
  
  let conclusion;
  let isValid = Math.random() > 0.5;
  if (isValid) {
      [premises[0], premises[1], conclusion] = getSyllogism(bucket[0], bucket[1], bucket[2], validRules[Math.floor(Math.random()*validRules.length)]);
  } else {
      [premises[0], premises[1], conclusion] = getSyllogism(bucket[0], bucket[1], bucket[2], getRandomInvalidRule());
  }

  for (let i = 3; i < length; i++) {
      let rnd = Math.floor(Math.random()*(i - 1));
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