if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}

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

const keySettingMap = {
    "p-1": "enableDistinction",
    "p-2": "enableComparison",
    "p-3": "enableSyllogism",
    "p-4": "enableAnalogy",
    "p-5": "premises",
    "p-6": "enableDirection",
    "p-7": "enableBinary",
    "p-8": "enableMeaningfulWords",
    "p-9": "enableCarouselMode"
};

const strings = [
    "QAW",
    "QAR",
    "QAT",
    "QAP",
    "QAS",
    "QAD",
    "QAF",
    "QAG",
    "QAK",
    "QAL",
    "QAZ",
    "QAX",
    "QAC",
    "QAV",
    "QAB",
    "QAN",
    "QAM",
    "QEW",
    "QER",
    "QET",
    "QEP",
    "QES",
    "QED",
    "QEF",
    "QEG",
    "QEK",
    "QEL",
    "QEZ",
    "QEX",
    "QEC",
    "QEV",
    "QEB",
    "QEN",
    "QEM",
    "QIW",
    "QIR",
    "QIT",
    "QIP",
    "QIS",
    "QID",
    "QIF",
    "QIG",
    "QIK",
    "QIL",
    "QIZ",
    "QIX",
    "QIC",
    "QIV",
    "QIB",
    "QIN",
    "QIM",
    "QOW",
    "QOR",
    "QOT",
    "QOP",
    "QOS",
    "QOD",
    "QOF",
    "QOG",
    "QOK",
    "QOL",
    "QOZ",
    "QOX",
    "QOC",
    "QOV",
    "QOB",
    "QON",
    "QOM",
    "QUW",
    "QUR",
    "QUT",
    "QUP",
    "QUS",
    "QUD",
    "QUF",
    "QUG",
    "QUK",
    "QUL",
    "QUZ",
    "QUX",
    "QUC",
    "QUV",
    "QUB",
    "QUN",
    "QUM",
    "WAQ",
    "WAR",
    "WAT",
    "WAP",
    "WAS",
    "WAD",
    "WAF",
    "WAG",
    "WAK",
    "WAL",
    "WAZ",
    "WAX",
    "WAC",
    "WAV",
    "WAB",
    "WAN",
    "WAM",
    "WEQ",
    "WER",
    "WET",
    "WEP",
    "WES",
    "WED",
    "WEF",
    "WEG",
    "WEK",
    "WEL",
    "WEZ",
    "WEX",
    "WEC",
    "WEV",
    "WEB",
    "WEN",
    "WEM",
    "WIQ",
    "WIR",
    "WIT",
    "WIP",
    "WIS",
    "WID",
    "WIF",
    "WIG",
    "WIK",
    "WIL",
    "WIZ",
    "WIX",
    "WIC",
    "WIV",
    "WIB",
    "WIN",
    "WIM",
    "WOQ",
    "WOR",
    "WOT",
    "WOP",
    "WOS",
    "WOD",
    "WOF",
    "WOG",
    "WOK",
    "WOL",
    "WOZ",
    "WOX",
    "WOC",
    "WOV",
    "WOB",
    "WON",
    "WOM",
    "WUQ",
    "WUR",
    "WUT",
    "WUP",
    "WUS",
    "WUD",
    "WUF",
    "WUG",
    "WUK",
    "WUL",
    "WUZ",
    "WUX",
    "WUC",
    "WUV",
    "WUB",
    "WUN",
    "WUM",
    "RAQ",
    "RAW",
    "RAT",
    "RAP",
    "RAS",
    "RAD",
    "RAF",
    "RAG",
    "RAK",
    "RAL",
    "RAZ",
    "RAX",
    "RAC",
    "RAV",
    "RAB",
    "RAN",
    "RAM",
    "REQ",
    "REW",
    "RET",
    "REP",
    "RES",
    "RED",
    "REF",
    "REG",
    "REK",
    "REL",
    "REZ",
    "REX",
    "REC",
    "REV",
    "REB",
    "REN",
    "REM",
    "RIQ",
    "RIW",
    "RIT",
    "RIP",
    "RIS",
    "RID",
    "RIF",
    "RIG",
    "RIK",
    "RIL",
    "RIZ",
    "RIX",
    "RIC",
    "RIV",
    "RIB",
    "RIN",
    "RIM",
    "ROQ",
    "ROW",
    "ROT",
    "ROP",
    "ROS",
    "ROD",
    "ROF",
    "ROG",
    "ROK",
    "ROL",
    "ROZ",
    "ROX",
    "ROC",
    "ROV",
    "ROB",
    "RON",
    "ROM",
    "RUQ",
    "RUW",
    "RUT",
    "RUP",
    "RUS",
    "RUD",
    "RUF",
    "RUG",
    "RUK",
    "RUL",
    "RUZ",
    "RUX",
    "RUC",
    "RUV",
    "RUB",
    "RUN",
    "RUM",
    "TAQ",
    "TAW",
    "TAR",
    "TAP",
    "TAS",
    "TAD",
    "TAF",
    "TAG",
    "TAK",
    "TAL",
    "TAZ",
    "TAX",
    "TAC",
    "TAV",
    "TAB",
    "TAN",
    "TAM",
    "TEQ",
    "TEW",
    "TER",
    "TEP",
    "TES",
    "TED",
    "TEF",
    "TEG",
    "TEK",
    "TEL",
    "TEZ",
    "TEX",
    "TEC",
    "TEV",
    "TEB",
    "TEN",
    "TEM",
    "TIQ",
    "TIW",
    "TIR",
    "TIP",
    "TIS",
    "TID",
    "TIF",
    "TIG",
    "TIK",
    "TIL",
    "TIZ",
    "TIX",
    "TIC",
    "TIV",
    "TIB",
    "TIN",
    "TIM",
    "TOQ",
    "TOW",
    "TOR",
    "TOP",
    "TOS",
    "TOD",
    "TOF",
    "TOG",
    "TOK",
    "TOL",
    "TOZ",
    "TOX",
    "TOC",
    "TOV",
    "TOB",
    "TON",
    "TOM",
    "TUQ",
    "TUW",
    "TUR",
    "TUP",
    "TUS",
    "TUD",
    "TUF",
    "TUG",
    "TUK",
    "TUL",
    "TUZ",
    "TUX",
    "TUC",
    "TUV",
    "TUB",
    "TUN",
    "TUM",
    "PAQ",
    "PAW",
    "PAR",
    "PAT",
    "PAS",
    "PAD",
    "PAF",
    "PAG",
    "PAK",
    "PAL",
    "PAZ",
    "PAX",
    "PAC",
    "PAV",
    "PAB",
    "PAN",
    "PAM",
    "PEQ",
    "PEW",
    "PER",
    "PET",
    "PES",
    "PED",
    "PEF",
    "PEG",
    "PEK",
    "PEL",
    "PEZ",
    "PEX",
    "PEC",
    "PEV",
    "PEB",
    "PEN",
    "PEM",
    "PIQ",
    "PIW",
    "PIR",
    "PIT",
    "PIS",
    "PID",
    "PIF",
    "PIG",
    "PIK",
    "PIL",
    "PIZ",
    "PIX",
    "PIC",
    "PIV",
    "PIB",
    "PIN",
    "PIM",
    "POQ",
    "POW",
    "POR",
    "POT",
    "POS",
    "POD",
    "POF",
    "POG",
    "POK",
    "POL",
    "POZ",
    "POX",
    "POC",
    "POV",
    "POB",
    "PON",
    "POM",
    "PUQ",
    "PUW",
    "PUR",
    "PUT",
    "PUS",
    "PUD",
    "PUF",
    "PUG",
    "PUK",
    "PUL",
    "PUZ",
    "PUX",
    "PUC",
    "PUV",
    "PUB",
    "PUN",
    "PUM",
    "SAQ",
    "SAW",
    "SAR",
    "SAT",
    "SAP",
    "SAD",
    "SAF",
    "SAG",
    "SAK",
    "SAL",
    "SAZ",
    "SAX",
    "SAC",
    "SAV",
    "SAB",
    "SAN",
    "SAM",
    "SEQ",
    "SEW",
    "SER",
    "SET",
    "SEP",
    "SED",
    "SEF",
    "SEG",
    "SEK",
    "SEL",
    "SEZ",
    "SEX",
    "SEC",
    "SEV",
    "SEB",
    "SEN",
    "SEM",
    "SIQ",
    "SIW",
    "SIR",
    "SIT",
    "SIP",
    "SID",
    "SIF",
    "SIG",
    "SIK",
    "SIL",
    "SIZ",
    "SIX",
    "SIC",
    "SIV",
    "SIB",
    "SIN",
    "SIM",
    "SOQ",
    "SOW",
    "SOR",
    "SOT",
    "SOP",
    "SOD",
    "SOF",
    "SOG",
    "SOK",
    "SOL",
    "SOZ",
    "SOX",
    "SOC",
    "SOV",
    "SOB",
    "SON",
    "SOM",
    "SUQ",
    "SUW",
    "SUR",
    "SUT",
    "SUP",
    "SUD",
    "SUF",
    "SUG",
    "SUK",
    "SUL",
    "SUZ",
    "SUX",
    "SUC",
    "SUV",
    "SUB",
    "SUN",
    "SUM",
    "DAQ",
    "DAW",
    "DAR",
    "DAT",
    "DAP",
    "DAS",
    "DAF",
    "DAG",
    "DAK",
    "DAL",
    "DAZ",
    "DAX",
    "DAC",
    "DAV",
    "DAB",
    "DAN",
    "DAM",
    "DEQ",
    "DEW",
    "DER",
    "DET",
    "DEP",
    "DES",
    "DEF",
    "DEG",
    "DEK",
    "DEL",
    "DEZ",
    "DEX",
    "DEC",
    "DEV",
    "DEB",
    "DEN",
    "DEM",
    "DIQ",
    "DIW",
    "DIR",
    "DIT",
    "DIP",
    "DIS",
    "DIF",
    "DIG",
    "DIK",
    "DIL",
    "DIZ",
    "DIX",
    "DIC",
    "DIV",
    "DIB",
    "DIN",
    "DIM",
    "DOQ",
    "DOW",
    "DOR",
    "DOT",
    "DOP",
    "DOS",
    "DOF",
    "DOG",
    "DOK",
    "DOL",
    "DOZ",
    "DOX",
    "DOC",
    "DOV",
    "DOB",
    "DON",
    "DOM",
    "DUQ",
    "DUW",
    "DUR",
    "DUT",
    "DUP",
    "DUS",
    "DUF",
    "DUG",
    "DUK",
    "DUL",
    "DUZ",
    "DUX",
    "DUC",
    "DUV",
    "DUB",
    "DUN",
    "DUM",
    "FAQ",
    "FAW",
    "FAR",
    "FAT",
    "FAP",
    "FAS",
    "FAD",
    "FAG",
    "FAK",
    "FAL",
    "FAZ",
    "FAX",
    "FAC",
    "FAV",
    "FAB",
    "FAN",
    "FAM",
    "FEQ",
    "FEW",
    "FER",
    "FET",
    "FEP",
    "FES",
    "FED",
    "FEG",
    "FEK",
    "FEL",
    "FEZ",
    "FEX",
    "FEC",
    "FEV",
    "FEB",
    "FEN",
    "FEM",
    "FIQ",
    "FIW",
    "FIR",
    "FIT",
    "FIP",
    "FIS",
    "FID",
    "FIG",
    "FIK",
    "FIL",
    "FIZ",
    "FIX",
    "FIC",
    "FIV",
    "FIB",
    "FIN",
    "FIM",
    "FOQ",
    "FOW",
    "FOR",
    "FOT",
    "FOP",
    "FOS",
    "FOD",
    "FOG",
    "FOK",
    "FOL",
    "FOZ",
    "FOX",
    "FOC",
    "FOV",
    "FOB",
    "FON",
    "FOM",
    "FUQ",
    "FUW",
    "FUR",
    "FUT",
    "FUP",
    "FUS",
    "FUD",
    "FUG",
    "FUK",
    "FUL",
    "FUZ",
    "FUX",
    "FUC",
    "FUV",
    "FUB",
    "FUN",
    "FUM",
    "GAQ",
    "GAW",
    "GAR",
    "GAT",
    "GAP",
    "GAS",
    "GAD",
    "GAF",
    "GAK",
    "GAL",
    "GAZ",
    "GAX",
    "GAC",
    "GAV",
    "GAB",
    "GAN",
    "GAM",
    "GEQ",
    "GEW",
    "GER",
    "GET",
    "GEP",
    "GES",
    "GED",
    "GEF",
    "GEK",
    "GEL",
    "GEZ",
    "GEX",
    "GEC",
    "GEV",
    "GEB",
    "GEN",
    "GEM",
    "GIQ",
    "GIW",
    "GIR",
    "GIT",
    "GIP",
    "GIS",
    "GID",
    "GIF",
    "GIK",
    "GIL",
    "GIZ",
    "GIX",
    "GIC",
    "GIV",
    "GIB",
    "GIN",
    "GIM",
    "GOQ",
    "GOW",
    "GOR",
    "GOT",
    "GOP",
    "GOS",
    "GOD",
    "GOF",
    "GOK",
    "GOL",
    "GOZ",
    "GOX",
    "GOC",
    "GOV",
    "GOB",
    "GON",
    "GOM",
    "GUQ",
    "GUW",
    "GUR",
    "GUT",
    "GUP",
    "GUS",
    "GUD",
    "GUF",
    "GUK",
    "GUL",
    "GUZ",
    "GUX",
    "GUC",
    "GUV",
    "GUB",
    "GUN",
    "GUM",
    "KAQ",
    "KAW",
    "KAR",
    "KAT",
    "KAP",
    "KAS",
    "KAD",
    "KAF",
    "KAG",
    "KAL",
    "KAZ",
    "KAX",
    "KAC",
    "KAV",
    "KAB",
    "KAN",
    "KAM",
    "KEQ",
    "KEW",
    "KER",
    "KET",
    "KEP",
    "KES",
    "KED",
    "KEF",
    "KEG",
    "KEL",
    "KEZ",
    "KEX",
    "KEC",
    "KEV",
    "KEB",
    "KEN",
    "KEM",
    "KIQ",
    "KIW",
    "KIR",
    "KIT",
    "KIP",
    "KIS",
    "KID",
    "KIF",
    "KIG",
    "KIL",
    "KIZ",
    "KIX",
    "KIC",
    "KIV",
    "KIB",
    "KIN",
    "KIM",
    "KOQ",
    "KOW",
    "KOR",
    "KOT",
    "KOP",
    "KOS",
    "KOD",
    "KOF",
    "KOG",
    "KOL",
    "KOZ",
    "KOX",
    "KOC",
    "KOV",
    "KOB",
    "KON",
    "KOM",
    "KUQ",
    "KUW",
    "KUR",
    "KUT",
    "KUP",
    "KUS",
    "KUD",
    "KUF",
    "KUG",
    "KUL",
    "KUZ",
    "KUX",
    "KUC",
    "KUV",
    "KUB",
    "KUN",
    "KUM",
    "LAQ",
    "LAW",
    "LAR",
    "LAT",
    "LAP",
    "LAS",
    "LAD",
    "LAF",
    "LAG",
    "LAK",
    "LAZ",
    "LAX",
    "LAC",
    "LAV",
    "LAB",
    "LAN",
    "LAM",
    "LEQ",
    "LEW",
    "LER",
    "LET",
    "LEP",
    "LES",
    "LED",
    "LEF",
    "LEG",
    "LEK",
    "LEZ",
    "LEX",
    "LEC",
    "LEV",
    "LEB",
    "LEN",
    "LEM",
    "LIQ",
    "LIW",
    "LIR",
    "LIT",
    "LIP",
    "LIS",
    "LID",
    "LIF",
    "LIG",
    "LIK",
    "LIZ",
    "LIX",
    "LIC",
    "LIV",
    "LIB",
    "LIN",
    "LIM",
    "LOQ",
    "LOW",
    "LOR",
    "LOT",
    "LOP",
    "LOS",
    "LOD",
    "LOF",
    "LOG",
    "LOK",
    "LOZ",
    "LOX",
    "LOC",
    "LOV",
    "LOB",
    "LON",
    "LOM",
    "LUQ",
    "LUW",
    "LUR",
    "LUT",
    "LUP",
    "LUS",
    "LUD",
    "LUF",
    "LUG",
    "LUK",
    "LUZ",
    "LUX",
    "LUC",
    "LUV",
    "LUB",
    "LUN",
    "LUM",
    "ZAQ",
    "ZAW",
    "ZAR",
    "ZAT",
    "ZAP",
    "ZAS",
    "ZAD",
    "ZAF",
    "ZAG",
    "ZAK",
    "ZAL",
    "ZAX",
    "ZAC",
    "ZAV",
    "ZAB",
    "ZAN",
    "ZAM",
    "ZEQ",
    "ZEW",
    "ZER",
    "ZET",
    "ZEP",
    "ZES",
    "ZED",
    "ZEF",
    "ZEG",
    "ZEK",
    "ZEL",
    "ZEX",
    "ZEC",
    "ZEV",
    "ZEB",
    "ZEN",
    "ZEM",
    "ZIQ",
    "ZIW",
    "ZIR",
    "ZIT",
    "ZIP",
    "ZIS",
    "ZID",
    "ZIF",
    "ZIG",
    "ZIK",
    "ZIL",
    "ZIX",
    "ZIC",
    "ZIV",
    "ZIB",
    "ZIN",
    "ZIM",
    "ZOQ",
    "ZOW",
    "ZOR",
    "ZOT",
    "ZOP",
    "ZOS",
    "ZOD",
    "ZOF",
    "ZOG",
    "ZOK",
    "ZOL",
    "ZOX",
    "ZOC",
    "ZOV",
    "ZOB",
    "ZON",
    "ZOM",
    "ZUQ",
    "ZUW",
    "ZUR",
    "ZUT",
    "ZUP",
    "ZUS",
    "ZUD",
    "ZUF",
    "ZUG",
    "ZUK",
    "ZUL",
    "ZUX",
    "ZUC",
    "ZUV",
    "ZUB",
    "ZUN",
    "ZUM",
    "XAQ",
    "XAW",
    "XAR",
    "XAT",
    "XAP",
    "XAS",
    "XAD",
    "XAF",
    "XAG",
    "XAK",
    "XAL",
    "XAZ",
    "XAC",
    "XAV",
    "XAB",
    "XAN",
    "XAM",
    "XEQ",
    "XEW",
    "XER",
    "XET",
    "XEP",
    "XES",
    "XED",
    "XEF",
    "XEG",
    "XEK",
    "XEL",
    "XEZ",
    "XEC",
    "XEV",
    "XEB",
    "XEN",
    "XEM",
    "XIQ",
    "XIW",
    "XIR",
    "XIT",
    "XIP",
    "XIS",
    "XID",
    "XIF",
    "XIG",
    "XIK",
    "XIL",
    "XIZ",
    "XIC",
    "XIV",
    "XIB",
    "XIN",
    "XIM",
    "XOQ",
    "XOW",
    "XOR",
    "XOT",
    "XOP",
    "XOS",
    "XOD",
    "XOF",
    "XOG",
    "XOK",
    "XOL",
    "XOZ",
    "XOC",
    "XOV",
    "XOB",
    "XON",
    "XOM",
    "XUQ",
    "XUW",
    "XUR",
    "XUT",
    "XUP",
    "XUS",
    "XUD",
    "XUF",
    "XUG",
    "XUK",
    "XUL",
    "XUZ",
    "XUC",
    "XUV",
    "XUB",
    "XUN",
    "XUM",
    "CAQ",
    "CAW",
    "CAR",
    "CAT",
    "CAP",
    "CAS",
    "CAD",
    "CAF",
    "CAG",
    "CAK",
    "CAL",
    "CAZ",
    "CAX",
    "CAV",
    "CAB",
    "CAN",
    "CAM",
    "CEQ",
    "CEW",
    "CER",
    "CET",
    "CEP",
    "CES",
    "CED",
    "CEF",
    "CEG",
    "CEK",
    "CEL",
    "CEZ",
    "CEX",
    "CEV",
    "CEB",
    "CEN",
    "CEM",
    "CIQ",
    "CIW",
    "CIR",
    "CIT",
    "CIP",
    "CIS",
    "CID",
    "CIF",
    "CIG",
    "CIK",
    "CIL",
    "CIZ",
    "CIX",
    "CIV",
    "CIB",
    "CIN",
    "CIM",
    "COQ",
    "COW",
    "COR",
    "COT",
    "COP",
    "COS",
    "COD",
    "COF",
    "COG",
    "COK",
    "COL",
    "COZ",
    "COX",
    "COV",
    "COB",
    "CON",
    "COM",
    "CUQ",
    "CUW",
    "CUR",
    "CUT",
    "CUP",
    "CUS",
    "CUD",
    "CUF",
    "CUG",
    "CUK",
    "CUL",
    "CUZ",
    "CUX",
    "CUV",
    "CUB",
    "CUN",
    "CUM",
    "VAQ",
    "VAW",
    "VAR",
    "VAT",
    "VAP",
    "VAS",
    "VAD",
    "VAF",
    "VAG",
    "VAK",
    "VAL",
    "VAZ",
    "VAX",
    "VAC",
    "VAB",
    "VAN",
    "VAM",
    "VEQ",
    "VEW",
    "VER",
    "VET",
    "VEP",
    "VES",
    "VED",
    "VEF",
    "VEG",
    "VEK",
    "VEL",
    "VEZ",
    "VEX",
    "VEC",
    "VEB",
    "VEN",
    "VEM",
    "VIQ",
    "VIW",
    "VIR",
    "VIT",
    "VIP",
    "VIS",
    "VID",
    "VIF",
    "VIG",
    "VIK",
    "VIL",
    "VIZ",
    "VIX",
    "VIC",
    "VIB",
    "VIN",
    "VIM",
    "VOQ",
    "VOW",
    "VOR",
    "VOT",
    "VOP",
    "VOS",
    "VOD",
    "VOF",
    "VOG",
    "VOK",
    "VOL",
    "VOZ",
    "VOX",
    "VOC",
    "VOB",
    "VON",
    "VOM",
    "VUQ",
    "VUW",
    "VUR",
    "VUT",
    "VUP",
    "VUS",
    "VUD",
    "VUF",
    "VUG",
    "VUK",
    "VUL",
    "VUZ",
    "VUX",
    "VUC",
    "VUB",
    "VUN",
    "VUM",
    "BAQ",
    "BAW",
    "BAR",
    "BAT",
    "BAP",
    "BAS",
    "BAD",
    "BAF",
    "BAG",
    "BAK",
    "BAL",
    "BAZ",
    "BAX",
    "BAC",
    "BAV",
    "BAN",
    "BAM",
    "BEQ",
    "BEW",
    "BER",
    "BET",
    "BEP",
    "BES",
    "BED",
    "BEF",
    "BEG",
    "BEK",
    "BEL",
    "BEZ",
    "BEX",
    "BEC",
    "BEV",
    "BEN",
    "BEM",
    "BIQ",
    "BIW",
    "BIR",
    "BIT",
    "BIP",
    "BIS",
    "BID",
    "BIF",
    "BIG",
    "BIK",
    "BIL",
    "BIZ",
    "BIX",
    "BIC",
    "BIV",
    "BIN",
    "BIM",
    "BOQ",
    "BOW",
    "BOR",
    "BOT",
    "BOP",
    "BOS",
    "BOD",
    "BOF",
    "BOG",
    "BOK",
    "BOL",
    "BOZ",
    "BOX",
    "BOC",
    "BOV",
    "BON",
    "BOM",
    "BUQ",
    "BUW",
    "BUR",
    "BUT",
    "BUP",
    "BUS",
    "BUD",
    "BUF",
    "BUG",
    "BUK",
    "BUL",
    "BUZ",
    "BUX",
    "BUC",
    "BUV",
    "BUN",
    "BUM",
    "NAQ",
    "NAW",
    "NAR",
    "NAT",
    "NAP",
    "NAS",
    "NAD",
    "NAF",
    "NAG",
    "NAK",
    "NAL",
    "NAZ",
    "NAX",
    "NAC",
    "NAV",
    "NAB",
    "NAM",
    "NEQ",
    "NEW",
    "NER",
    "NET",
    "NEP",
    "NES",
    "NED",
    "NEF",
    "NEG",
    "NEK",
    "NEL",
    "NEZ",
    "NEX",
    "NEC",
    "NEV",
    "NEB",
    "NEM",
    "NIQ",
    "NIW",
    "NIR",
    "NIT",
    "NIP",
    "NIS",
    "NID",
    "NIF",
    "NIG",
    "NIK",
    "NIL",
    "NIZ",
    "NIX",
    "NIC",
    "NIV",
    "NIB",
    "NIM",
    "NOQ",
    "NOW",
    "NOR",
    "NOT",
    "NOP",
    "NOS",
    "NOD",
    "NOF",
    "NOG",
    "NOK",
    "NOL",
    "NOZ",
    "NOX",
    "NOC",
    "NOV",
    "NOB",
    "NOM",
    "NUQ",
    "NUW",
    "NUR",
    "NUT",
    "NUP",
    "NUS",
    "NUD",
    "NUF",
    "NUG",
    "NUK",
    "NUL",
    "NUZ",
    "NUX",
    "NUC",
    "NUV",
    "NUB",
    "NUM",
    "MAQ",
    "MAW",
    "MAR",
    "MAT",
    "MAP",
    "MAS",
    "MAD",
    "MAF",
    "MAG",
    "MAK",
    "MAL",
    "MAZ",
    "MAX",
    "MAC",
    "MAV",
    "MAB",
    "MAN",
    "MEQ",
    "MEW",
    "MER",
    "MET",
    "MEP",
    "MES",
    "MED",
    "MEF",
    "MEG",
    "MEK",
    "MEL",
    "MEZ",
    "MEX",
    "MEC",
    "MEV",
    "MEB",
    "MEN",
    "MIQ",
    "MIW",
    "MIR",
    "MIT",
    "MIP",
    "MIS",
    "MID",
    "MIF",
    "MIG",
    "MIK",
    "MIL",
    "MIZ",
    "MIX",
    "MIC",
    "MIV",
    "MIB",
    "MIN",
    "MOQ",
    "MOW",
    "MOR",
    "MOT",
    "MOP",
    "MOS",
    "MOD",
    "MOF",
    "MOG",
    "MOK",
    "MOL",
    "MOZ",
    "MOX",
    "MOC",
    "MOV",
    "MOB",
    "MON",
    "MUQ",
    "MUW",
    "MUR",
    "MUT",
    "MUP",
    "MUS",
    "MUD",
    "MUF",
    "MUG",
    "MUK",
    "MUL",
    "MUZ",
    "MUX",
    "MUC",
    "MUV",
    "MUB",
    "MUN"
];

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

const dirNames = [
    null,
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West"
];

const dirCoords = [
    [ 0,  0],
    [ 0, -1],
    [ 1, -1],
    [ 1,  0],
    [ 1,  1],
    [ 0,  1],
    [-1,  1],
    [-1,  0],
    [-1, -1]
];

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
