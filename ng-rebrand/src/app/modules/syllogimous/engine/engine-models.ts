import { LOCALSTORAGE_KEY } from "./engine-constants";

export interface Picked<T> {
    picked: T[];
    remaining: T[];
}

export class Settings {
    score = 0;
    history = [];

    enableCarouselMode = false;
    enableMeaningfulWords = true;
    enableNegation = false;
    enableMeta = false;

    enableDistinction = true;
    enableComparisonNumerical = true;
    enableComparisonChronological = true;
    enableSyllogism = true;
    enableDirection = true;
    enableDirection3D = false;
    enableDirection4D = false;
    enableAnalogy = false;
    enableBinary = false;
    
    enableAnd = true;
    enableNand = true;
    enableOr = true;
    enableNor = true;
    enableXor = true;
    enableXnor = true;

    timerDistinction = 30;
    timerComparisonNumerical = 30;
    timerComparisonChronological = 30;
    timerSyllogism = 30;
    timerDirection = 30;
    timerDirection3D = 30;
    timerDirection4D = 30;
    timerAnalogy = 30;
    timerBinary = 30;

    premisesDistinction = 2;
    premisesComparisonNumerical = 2;
    premisesComparisonChronological = 2;
    premisesSyllogism = 2;
    premisesDirection = 2;
    premisesDirection3D = 2;
    premisesDirection4D = 2;
    premisesAnalogy = 2;
    premisesBinary = 2;

    constructor() {
        const _settings = localStorage.getItem(LOCALSTORAGE_KEY);
        if (_settings) {
            const settings = JSON.parse(_settings);
            Object.keys(settings)
                .filter(k => k in this)
                .forEach(k => (this as any)[k] = settings[k]);
        }

        return new Proxy(this, {
            set: (target, property, value) => {
                if (property in target) {
                    const oldValue = (target as any)[property];
                    if (oldValue !== value) {
                        (target as any)[property] = value;
                        this.onFieldChange(property as string, oldValue, value);
                    }
                    return true;
                }
                return false;
            }
        });
    }

    private onFieldChange(fieldName: string, oldValue: any, newValue: any) {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ ...this }));
    }
}

export enum EnumQuestionType {
    Syllogism = "Syllogism",
    Distinction = "Distinction",
    ComparisonNumerical = "Comparison - Numerical",
    ComparisonChronological = "Comparison - Chronological",
    Binary = "Binary",
    Direction = "Direction",
    Direction3D = "Direction3D",
    Direction4D = "Direction4D",
    Analogy = "Analogy",
}

export class Question {
    type: EnumQuestionType;
    isValid = false;
    rule = "";
    bucket: string[] = [];
    buckets: string[][][] = [];
    wordCoordMap: Record<string, [number, number] | [number, number, number] | [number, number, number, number]> = {};
    premises: string[] = [];
    conclusion = "";
    createdAt = new Date().getTime();

    constructor(
        type: EnumQuestionType
    ) {
        this.type = type;
    }
}