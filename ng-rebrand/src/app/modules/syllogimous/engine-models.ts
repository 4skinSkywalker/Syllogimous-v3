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
    removeNegationExplainer = false;
    enableStroopEffect = false;
    enableMeta = false;

    enableDistinction = true;
    distinctionTimer = 30;

    enableComparison = true;
    comparisonTimer = 30;

    enableTemporal = true;
    temporalTimer = 30;

    enableSyllogism = true;
    syllogismTimer = 30;

    enableDirection = true;
    directionTimer = 30;

    enableDirection3D = false;
    direction3DTimer = 30;

    enableDirection4D = false;
    direction4DTimer = 30;

    enableAnalogy = false;
    analogyTimer = 30;
    onlyAnalogy = false;

    enableBinary = false;
    binaryTimer = 30;
    onlyBinary = false;
    nestedBinaryDepth = 1;
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
}

export class Question {
    type: EnumQuestionType;
    isValid = false;
    rule = "";
    bucket: string[] = [];
    premises: string[] = [];
    conclusion = "";
    createdAt = new Date().getTime();

    constructor(
        type: EnumQuestionType
    ) {
        this.type = type;
    }
}