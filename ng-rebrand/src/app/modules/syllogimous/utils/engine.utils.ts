import { DIRECTION_COORDS, DIRECTION_COORDS_3D, DIRECTION_NAMES, DIRECTION_NAMES_3D, FORMS, NOUNS, STRINGS, TIME_NAMES, VALID_RULES } from "../constants/engine.constants";
import { EnumQuestionType, Question } from "../models/question.models";
import { ISettings, Picked } from "../models/settings.models";

export function genBinKey(booleans: boolean[]) {
    return booleans.map(value => (value ? '1' : '0')).join('');
}

export function coinFlip() {
    return Math.random() > 0.5;
}

export function pickUniqueItems<T>(array: T[], n: number): Picked<T> {
    const copy = [...array];
    const picked = [];
    while (n > 0) {
        const rnd = Math.floor(Math.random() * copy.length);
        picked.push(copy.splice(rnd, 1)[0]);
        n--;
    }
    return { picked, remaining: copy };
}

export function shuffle<T>(array: T[]) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

export function getDirectionString(x: number, y: number, z: number) {
    let res = "";
    if (z === 1) res = "Above";
    if (z === -1) res = "Below";
    if (z && (x || y)) res += " and ";
    if (y === 1) res += "North";
    if (y === -1) res += "South";
    if (y && x) res += "-";
    if (x === 1) res += "East";
    if (x === -1) res += "West";
    return res;
}

export function findDirection(aCoord: [number, number], bCoord: [number, number]) {
    const x = aCoord[0];
    const y = aCoord[1];
    const x2 = bCoord[0];
    const y2 = bCoord[1];

    const dx = ((x - x2) / Math.abs(x - x2)) || 0;
    const dy = ((y - y2) / Math.abs(y - y2)) || 0;

    const dirIndex = DIRECTION_COORDS.findIndex(c => c[0] === dx && c[1] === dy);
    const dirName = DIRECTION_NAMES[dirIndex];

    return dirName!;
}

export function findDirection3D(aCoord: [number, number, number], bCoord: [number, number, number]) {
    const x = aCoord[0];
    const y = aCoord[1];
    const z = aCoord[2];
    const x2 = bCoord[0];
    const y2 = bCoord[1];
    const z2 = bCoord[2];

    const dx = ((x - x2) / Math.abs(x - x2)) || 0;
    const dy = ((y - y2) / Math.abs(y - y2)) || 0;
    const dz = ((z - z2) / Math.abs(z - z2)) || 0;

    const dirIndex = DIRECTION_COORDS_3D.findIndex(c => c[0] === dx && c[1] === dy && c[2] === dz);
    const dirName = DIRECTION_NAMES_3D[dirIndex];
    return dirName;
}

export function findDirection4D(aCoord: [number, number, number, number], bCoord: [number, number, number, number]) {
    const a = aCoord[3];
    const a2 = bCoord[3];

    return {
        spatial: findDirection3D(aCoord as any, bCoord as any),
        temporal: TIME_NAMES[Math.sign(a-a2) + 1]
    };
}

export function getRandomRuleValid() {
    return VALID_RULES[Math.floor(Math.random() * VALID_RULES.length)];
}

export function getRandomRuleInvalid() {
    let rule;
    while (!rule || VALID_RULES.includes(rule)) {
        rule = "";
        for (let i = 0; i < 3; i++) {
            rule += Math.floor(Math.random() * 4); // Form
        }
        rule += 1 + Math.floor(Math.random() * 4); // Figure
    }
    return rule;
}

export function extractSubjects(phrase: string) {
    return [...phrase.matchAll(/<span class="subject">(.*?)<\/span>/g)].map(a => a[1]);
}

export function isPremiseLikeConclusion(premises: string[], conclusion: string) {
    const subjectsOfPremises = premises.map(p => extractSubjects(p));
    const subjectsOfConclusion = extractSubjects(conclusion);
    for (const subjects of subjectsOfPremises) {
        const toCompare = subjectsOfConclusion[0]+subjectsOfConclusion[1];
        if (subjects[0]+subjects[1] === toCompare || subjects[1]+subjects[0] === toCompare)
            return true;
    }
    return false;
}

export function getSymbols(settings: ISettings) {
    return settings.enableMeaningfulWords ? [...NOUNS] : [...STRINGS];
}

export function getRandomSymbols(settings: ISettings, length: number) {
    const symbols = getSymbols(settings);
    const seen = new Set();
    return Array(length).fill(0)
            .map(() => {
                let rnd = Math.floor(Math.random() * symbols.length);
                while (seen.has(rnd)) {
                    rnd = Math.floor(Math.random() * symbols.length);
                }
                seen.add(rnd);
                return symbols[rnd];
            });
}

export function getSyllogism(settings: ISettings, s: string, p: string, m: string, rule: string) {
    
    const _forms = (!settings.enableNegation)
        ? FORMS[0]
        : pickUniqueItems(FORMS, 1).picked[0];

    let major = _forms[+rule[0]];
    let minor = _forms[+rule[1]];
    let conclusion = _forms[+rule[2]];

    const figure = +rule[3];
    switch (figure) {
        case 1:
            major = major.replace("$", m);
            major = major.replace("$", p);
            minor = minor.replace("$", s);
            minor = minor.replace("$", m);
            break;
        case 2:
            major = major.replace("$", p);
            major = major.replace("$", m);
            minor = minor.replace("$", s);
            minor = minor.replace("$", m);
            break;
        case 3:
            major = major.replace("$", m);
            major = major.replace("$", p);
            minor = minor.replace("$", m);
            minor = minor.replace("$", s);
            break;
        case 4:
            major = major.replace("$", p);
            major = major.replace("$", m);
            minor = minor.replace("$", m);
            minor = minor.replace("$", s);
            break;
    }

    conclusion = conclusion.replace("$", s);
    conclusion = conclusion.replace("$", p);

    return [major, minor, conclusion];
}

export function getMetaReplacer(settings: ISettings, choosenPair: Picked<string>, relations: string[], negations: boolean[]) {
    const choosenSubjects = [...choosenPair.picked[0].matchAll(/<span class="subject">(.*?)<\/span>/g)];
    const [a, b] = choosenSubjects.map(m => m[1]);

    const isSameAs = (relations[0] === relations[1]) === (negations[0] === negations[1]);
    const relation = getRelation(settings, EnumQuestionType.Distinction, isSameAs);

    return `$1 ${relation} (<span class="subject">${a}</span> to <span class="subject">${b}</span>) to `;
}

export function getRelation(settings: ISettings, type: EnumQuestionType, isPositive: boolean) {
    let positive = "";
    let negative = "";

    switch (type) {
        case EnumQuestionType.Distinction:
            positive = "same as";
            negative = "opposite of";
            break;
        case EnumQuestionType.ComparisonNumerical:
            positive = "more than";
            negative = "less than";
            break;
        case EnumQuestionType.ComparisonChronological:
            positive = "after";
            negative = "before";
            break;
    }

    let relation = isPositive ? positive : negative;
    if (settings.enableNegation && coinFlip()) {
        switch (relation) {
            case positive:
                relation = `<span class="is-negated">${negative}</span>`;
                break;
            case negative:
                relation = `<span class="is-negated">${positive}</span>`;
                break;
        }
    }
    return relation;
}

export function makeMetaRelations(settings: ISettings, question: Question, length: number) {
    if (settings.enableMeta && coinFlip()) {
        const numOfMetaRelations = 1 + Math.floor(Math.random() * Math.floor((length - 1) / 2));
        let _premises = pickUniqueItems(question.premises, numOfMetaRelations * 2);
        question.premises = [ ..._premises.remaining ];
    
        while (_premises.picked.length) {
            const choosenPair = pickUniqueItems(_premises.picked, 2);
            const negations = choosenPair.picked.map(p => /is-negated/.test(p));
            const relations = choosenPair.picked.map(p => p.match(/is (?:<span class="is-negated">)*(.*?)(?:<\/span>)* /)![1]);
    
            const replacer = getMetaReplacer(settings, choosenPair, relations, negations);
            const newPremise = choosenPair.picked[1].replace(/(is) (.*)(?=<span class="subject">)/, replacer);
    
            question.premises.push(choosenPair.picked[0], newPremise);
    
            _premises = { picked: choosenPair.remaining, remaining: [] };
        }
    }
}