const savedata = {
    enableNegation: false
};

const symbols = [
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

const operandNames = [
    "AND",
    "NAND",
    "OR",
    "NOR",
    "XOR",
    "XNOR"
];

const questionClasses = [
    "Distinction",
    "Comparison",
    "Temporal",
    "Direction",
    "Syllogism"
];

const forms = [
    [
        'All <span class="subject">$</span> is <span class="subject">$</span>',
        'No <span class="subject">$</span> is <span class="subject">$</span>',
        'Some <span class="subject">$</span> is <span class="subject">$</span>',
        'Some <span class="subject">$</span> is not <span class="subject">$</span>'
    ],
    [
        'All <span class="subject">$</span> is <span class="subject">$</span>',
        'All <span class="subject">$</span> is not <span class="subject">$</span>',
        'Some <span class="subject">$</span> is <span class="subject">$</span>',
        'Not all <span class="subject">$</span> is <span class="subject">$</span>'
    ],
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

const nameInverseDir = {
    "North": "South",
    "North-East": "South-West",
    "East": "West",
    "South-East": "North-West",
    "South": "North",
    "South-West": "North-East",
    "West": "East",
    "North-West": "South-East"
};

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

const listPre = document.querySelector('pre.list');
const binTypeSelect = document.querySelector('#bin-type');
const negationCheck = document.querySelector('#negation');
const validCheck = document.querySelector('#valid');
const invalidCheck = document.querySelector('#invalid');
const premiseNum = document.querySelector('#premise-num');
const qtys = {
    createSameOpposite: document.querySelector('#same-opposite-qty'),
    createMoreLess: document.querySelector('#more-less-qty'),
    createBeforeAfter: document.querySelector('#before-after-qty'),
    createSyllogism: document.querySelector('#syllogism-qty'),
    createSameDifferent: document.querySelector('#same-different-qty'),
    createDirectionQuestion: document.querySelector('#direction-question-qty'),
    createBinaryQuestion: document.querySelector('#binary-question-qty')
};

negationCheck.addEventListener('input', evt => {
    savedata.enableNegation = evt.target.checked;
    console.log(savedata.enableNegation);
});

for (let key in qtys) {
    qtys[key].addEventListener("click", evt => evt.stopPropagation());
}

for (let cl of questionClasses) {
    for (let op of operandNames) {
        for (let cl2 of questionClasses) {
            if (cl !== cl2)
                binTypeSelect.innerHTML += `<option value="${cl} ${op} ${cl2}">${cl} ${op} ${cl2}</option>`;
        }
    }
}

function generate(clName) {

    if (+premiseNum.value < 3 && clName === 'createSameDifferent')
        return alert('Bump # of premises to more than 3 for SameDifferent');
    if (+premiseNum.value < 4 && clName === 'createBinaryQuestion')
        return alert('Bump # of premises to more than 4 for Binary');

    listPre.innerHTML = '';
    new Array(3e3).fill(0)
        .map(() => {
            if (clName === 'createSameOpposite') return createSameOpposite(+premiseNum.value);
            if (clName === 'createMoreLess') return createMoreLess(+premiseNum.value);
            if (clName === 'createBeforeAfter') return createBeforeAfter(+premiseNum.value);
            if (clName === 'createSyllogism') return createSyllogism(+premiseNum.value);
            if (clName === 'createSameDifferent') return createSameDifferent(+premiseNum.value);
            if (clName === 'createDirectionQuestion') return createDirectionQuestion(+premiseNum.value);
            if (clName === 'createBinaryQuestion') return createBinaryQuestion(+premiseNum.value);
        })
        .filter(x => {
            if (clName === 'createBinaryQuestion' && binTypeSelect.value !== '$')
                return ('Binary: ' + binTypeSelect.value) === x.category;
            return true;
        })
        .filter(x => {
            if (validCheck.checked)
                return x.isValid == validCheck.checked;
            if (invalidCheck.checked)
                return x.isValid !== invalidCheck.checked;
            return true;
        })
        .map(({ isValid, category, premises, conclusion }) => ({ valid: isValid, category, premises, conclusion }))
        .map(x =>
            JSON.stringify(x, null, 2)
                .replaceAll(
                    /<span.*?>(.*?)<\/span>/g,
                    (a, b, c) => {
                        return b;
                    }
                )
                .replaceAll(
                    /<div.*?>(.*?)<\/div>/g,
                    (a, b, c) => {
                        return b;
                    }
                )
                .replaceAll('"', '')
                .replaceAll('{', '')
                .replaceAll('}', '='.repeat(50))
        )
        .slice(0, +qtys[clName].value)
        .map(x => listPre.innerHTML += x);
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
                const ps = [
                    `<span class="subject">${prev}</span> is same as <span class="subject">${curr}</span>`,
                    `Opposite of <span class="subject">${prev}</span> is opposite of <span class="subject">${curr}</span>`,
                ];
                premises.push((!savedata.enableNegation) ? ps[0] : pickUniqueItems(ps, 1)[0]);
                buckets[prevBucket].push(curr);
            } else {
                const ps = [
                    `Opposite of <span class="subject">${prev}</span> is same as <span class="subject">${curr}</span>`,
                    `<span class="subject">${prev}</span> is opposite of <span class="subject">${curr}</span>`,
                ];
                premises.push((!savedata.enableNegation) ? ps[0] : pickUniqueItems(ps, 1)[0]);
                prevBucket = (prevBucket + 1) % 2;
                buckets[prevBucket].push(curr);
            }

            prev = curr;
        }

        if (coinFlip()) {
            const cs = [
                `<span class="subject">${first}</span> is same as <span class="subject">${curr}</span>`,
                `Opposite of <span class="subject">${first}</span> is opposite of <span class="subject">${curr}</span>`,
            ];
            conclusion = (!savedata.enableNegation) ? cs[0] : pickUniqueItems(cs, 1)[0];
            isValid = buckets[0].includes(curr);
        } else {
            const cs = [
                `<span class="subject">${first}</span> is opposite of <span class="subject">${curr}</span>`,
                `Opposite of <span class="subject">${first}</span> is same as <span class="subject">${curr}</span>`,
            ];
            conclusion = (!savedata.enableNegation) ? cs[0] : pickUniqueItems(cs, 1)[0];
            isValid = buckets[1].includes(curr);
        }
    } while(isPremiseSimilarToConlusion(premises, conclusion));

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
                    const ps = [
                        `<span class="subject">${next}</span> is more than <span class="subject">${curr}</span>`,
                        `Opposite of <span class="subject">${next}</span> is less than <span class="subject">${curr}</span>`,
                    ];
                    premises.push((!savedata.enableNegation) ? ps[0] : pickUniqueItems(ps, 1)[0]);
                } else {
                    const ps = [
                        `<span class="subject">${curr}</span> is more than <span class="subject">${next}</span>`,
                        `Opposite of <span class="subject">${curr}</span> is less than <span class="subject">${next}</span>`,
                    ];
                    premises.push((!savedata.enableNegation) ? ps[0] : pickUniqueItems(ps, 1)[0]);
                }
            } else {
                if (sign === 1) {
                    const ps = [
                        `<span class="subject">${curr}</span> is less than <span class="subject">${next}</span>`,
                        `Opposite of <span class="subject">${curr}</span> is more than <span class="subject">${next}</span>`,
                    ];
                    premises.push((!savedata.enableNegation) ? ps[0] : pickUniqueItems(ps, 1)[0]);
                } else {
                    const ps = [
                        `<span class="subject">${next}</span> is less than <span class="subject">${curr}</span>`,
                        `Opposite of <span class="subject">${next}</span> is more than <span class="subject">${curr}</span>`,
                    ];
                    premises.push((!savedata.enableNegation) ? ps[0] : pickUniqueItems(ps, 1)[0]);
                }
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
                `Opposite of <span class="subject">${bucket[a]}</span> is more than <span class="subject">${bucket[b]}</span>`,
            ];
            conclusion = (!savedata.enableNegation) ? cs[0] : pickUniqueItems(cs, 1)[0];
            isValid = sign === 1 && a < b || sign === -1 && a > b;
        } else {
            const cs = [
                `<span class="subject">${bucket[a]}</span> is more than <span class="subject">${bucket[b]}</span>`,
                `Opposite of <span class="subject">${bucket[a]}</span> is less than <span class="subject">${bucket[b]}</span>`,
            ];
            conclusion = (!savedata.enableNegation) ? cs[0] : pickUniqueItems(cs, 1)[0];
            isValid = sign === 1 && a > b || sign === -1 && a < b;
        }
    } while(isPremiseSimilarToConlusion(premises, conclusion));

    shuffle(premises);

    return {
        category,
        bucket,
        isValid,
        premises,
        conclusion
    }
}

function createBeforeAfter(length) {
    length++;

    const category = "Temporal";
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
                    const ps = [
                        `<span class="subject">${next}</span> is after <span class="subject">${curr}</span>`,
                        `Opposite of <span class="subject">${next}</span> is before <span class="subject">${curr}</span>`,
                    ];
                    premises.push((!savedata.enableNegation) ? ps[0] : pickUniqueItems(ps, 1)[0]);
                } else {
                    const ps = [
                        `<span class="subject">${curr}</span> is after <span class="subject">${next}</span>`,
                        `Opposite of <span class="subject">${curr}</span> is before <span class="subject">${next}</span>`,
                    ];
                    premises.push((!savedata.enableNegation) ? ps[0] : pickUniqueItems(ps, 1)[0]);
                }
            } else {
                if (sign === 1) {
                    const ps = [
                        `<span class="subject">${curr}</span> is before <span class="subject">${next}</span>`,
                        `Opposite of <span class="subject">${curr}</span> is after <span class="subject">${next}</span>`,
                    ];
                    premises.push((!savedata.enableNegation) ? ps[0] : pickUniqueItems(ps, 1)[0]);
                } else {
                    const ps = [
                        `<span class="subject">${next}</span> is before <span class="subject">${curr}</span>`,
                        `Opposite of <span class="subject">${next}</span> is after <span class="subject">${curr}</span>`,
                    ];
                    premises.push((!savedata.enableNegation) ? ps[0] : pickUniqueItems(ps, 1)[0]);
                }
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
                `Opposite of <span class="subject">${bucket[a]}</span> is after <span class="subject">${bucket[b]}</span>`,
            ];
            conclusion = (!savedata.enableNegation) ? cs[0] : pickUniqueItems(cs, 1)[0];
            isValid = sign === 1 && a < b || sign === -1 && a > b;
        } else {
            const cs = [
                `<span class="subject">${bucket[a]}</span> is after <span class="subject">${bucket[b]}</span>`,
                `Opposite of <span class="subject">${bucket[a]}</span> is before <span class="subject">${bucket[b]}</span>`,
            ];
            conclusion = (!savedata.enableNegation) ? cs[0] : pickUniqueItems(cs, 1)[0];
            isValid = sign === 1 && a > b || sign === -1 && a < b;
        }
    } while(isPremiseSimilarToConlusion(premises, conclusion));

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
            createBeforeAfter,
            createDirectionQuestion,
            createSyllogism
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
    // 2. Before/After;
    // 3. Direction.
    const choiceIndex = Math.floor(Math.random()*4);
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
    else if (choiceIndex === 2) {

        choice = createBeforeAfter(length);
        subtype = "Before/After";

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
            const cs = [
                '<div style="margin: 2px 0;">is the same as</div>',
                '<div style="margin: 2px 0;">is not different from</div>',
            ];
            conclusion += (!savedata.enableNegation) ? cs[0] : pickUniqueItems(cs, 1)[0];
        }
        else {
            const cs = [
                '<div style="font-size: 14px; margin: 2px 0;">has the same relation as</div>',
                '<div style="font-size: 14px; margin: 2px 0;">has not a different relation from</div>',
            ];
            conclusion += (!savedata.enableNegation) ? cs[0] : pickUniqueItems(cs, 1)[0];
        }
    }
    else {
        isValid = !isValidSame;
        if (choiceIndex < 1) {
            const cs = [
                '<div style="margin: 2px 0;">is different from</div>',
                '<div style="margin: 2px 0;">is not the same as</div>',
            ];
            conclusion += (!savedata.enableNegation) ? cs[0] : pickUniqueItems(cs, 1)[0];

        }
        else {
            const cs = [
                '<div style="font-size: 12px; margin: 4px 0;">has a different relation from</div>',
                '<div style="font-size: 12px; margin: 4px 0;">has not the same relation as</div>',
            ];
            conclusion += (!savedata.enableNegation) ? cs[0] : pickUniqueItems(cs, 1)[0];
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
            const ps = [
                `<span class="subject">${words[i+1]}</span> is at ${dirName} of <span class="subject">${words[i]}</span>`,
                `<span class="subject">${words[i+1]}</span> is at opposite of ${nameInverseDir[dirName]} of <span class="subject">${words[i]}</span>`,
            ];
            premises.push((!savedata.enableNegation) ? ps[0] : pickUniqueItems(ps, 1)[0]);
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
            `<span class="subject">${words[0]}</span> is at opposite of ${nameInverseDir[conclusionDirName]} of <span class="subject">${words[words.length-1]}</span>`,
        ];
        conclusion = (!savedata.enableNegation) ? cs[0] : pickUniqueItems(cs, 1)[0];
    }
    else {            // wrong
        isValid = false;
        let oppositeDirection = findDirection(
            wordCoordMap[words[length-1]],
            wordCoordMap[words[0]]
        );
        const cs = [
            `<span class="subject">${words[0]}</span> is at ${oppositeDirection} of <span class="subject">${words[words.length-1]}</span>`,
            `<span class="subject">${words[0]}</span> is at opposite of ${nameInverseDir[oppositeDirection]} of <span class="subject">${words[words.length-1]}</span>`
        ];
        conclusion = (!savedata.enableNegation) ? cs[0] : pickUniqueItems(cs, 1)[0];;
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

    const _forms = (!savedata.enableNegation) ? forms[0] : pickUniqueItems(forms, 1)[0];

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
    } while(isPremiseSimilarToConlusion(premises, conclusion));

    premises = shuffle(premises);

    return {
        category,
        bucket,
        isValid,
        premises,
        conclusion
    }
}

function extractSubjects(phrase) {
    return [...phrase.matchAll(/<span class="subject">(.*?)<\/span>/g)].map(a => a[1]);
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
