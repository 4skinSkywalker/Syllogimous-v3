import { LOCALSTORAGE_KEY } from "./engine-constants";

export interface Picked<T> {
    picked: T[];
    remaining: T[];
}

export class Settings {
    premises = 2;
    score = 0;
    questions = [];

    enableCarouselMode = false;
    enableMeaningfulWords = true;
    enableNegation = false;
    enableMeta = false;

    enableDistinction = true;
    timerDistinction = 30;

    enableComparisonNumerical = true;
    timerComparisonNumerical = 30;

    enableComparisonChronological = true;
    timerComparisonChronological = 30;

    enableSyllogism = true;
    timerSyllogism = 30;

    enableDirection = true;
    timerDirection = 30;

    enableDirection3D = false;
    timerDirection3D = 30;

    enableDirection4D = false;
    timerDirection4D = 30;

    enableAnalogy = false;
    timerAnalogy = 30;
    onlyAnalogy = false;

    enableBinary = false;
    timerBinary = 30;

    enableAnd = true;
    enableNand = true;
    enableOr = true;
    enableNor = true;
    enableXor = true;
    enableXnor = true;

    constructor() {

        // Load settings from localStorage
        const _settings = localStorage.getItem(LOCALSTORAGE_KEY);
        if (_settings) {
            const settings = JSON.parse(_settings);
            Object.keys(settings)
                .filter(k => k in this)
                .forEach(k => (this as any)[k] = settings[k]);
        }

        // Setup a proxy so that all changes gets saved into localStorage
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