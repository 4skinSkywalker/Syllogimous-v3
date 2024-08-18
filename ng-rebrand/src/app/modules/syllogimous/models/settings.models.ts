export interface Picked<T> {
    picked: T[];
    remaining: T[];
}

export interface ISettings {
    enableMeaningfulWords: boolean;
    enableNegation: boolean;
    enableMeta: boolean;

    enableDistinction: boolean;
    enableComparisonNumerical: boolean;
    enableComparisonChronological: boolean;
    enableSyllogism: boolean;
    enableDirection: boolean;
    enableDirection3D: boolean;
    enableDirection4D: boolean;
    enableAnalogy: boolean;
    enableBinary: boolean;
    
    enableAnd: boolean;
    enableNand: boolean;
    enableOr: boolean;
    enableNor: boolean;
    enableXor: boolean;
    enableXnor: boolean;

    timerDistinction: number;
    timerComparisonNumerical: number;
    timerComparisonChronological: number;
    timerSyllogism: number;
    timerDirection: number;
    timerDirection3D: number;
    timerDirection4D: number;
    timerAnalogy: number;
    timerBinary: number;

    premisesDistinction: number;
    premisesComparisonNumerical: number;
    premisesComparisonChronological: number;
    premisesSyllogism: number;
    premisesDirection: number;
    premisesDirection3D: number;
    premisesDirection4D: number;
    premisesAnalogy: number;
    premisesBinary: number;
}
