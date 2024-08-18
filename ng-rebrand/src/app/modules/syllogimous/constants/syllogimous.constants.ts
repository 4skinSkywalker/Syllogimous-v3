import { ISettings } from "../models/settings.models";
import { EnumTiers } from "../models/syllogimous.models";

export const TIER_COLORS: Record<string, {bgColor: string, textColor: string}> = {
    [EnumTiers.Adept]: { bgColor: "#F0F8FF", textColor: "#045D56" },  // Alice Blue with Teal
    [EnumTiers.Savant]: { bgColor: "#E6E6FA", textColor: "#4B0082" },  // Lavender with Indigo
    [EnumTiers.Mastermind]: { bgColor: "#DDA0DD", textColor: "#483D8B" },  // Plum with Dark Slate Blue
    [EnumTiers.Visionary]: { bgColor: "#B0E0E6", textColor: "#002366" },  // Powder Blue with Royal Blue
    [EnumTiers.Genius]: { bgColor: "#AFEEEE", textColor: "#004953" },  // Pale Turquoise with Deep Aqua
    [EnumTiers.Luminary]: { bgColor: "#98FB98", textColor: "#006400" },  // Pale Green with Dark Green
    [EnumTiers.Prodigy]: { bgColor: "#FFFACD", textColor: "#556B2F" },  // Lemon Chiffon with Dark Olive Green
    [EnumTiers.Oracle]: { bgColor: "#FFDAB9", textColor: "#A0522D" },  // Peach Puff with Sienna
    [EnumTiers.Sage]: { bgColor: "#FFC0CB", textColor: "#8B0000" },  // Pink with Dark Red
    [EnumTiers.Philosopher]: { bgColor: "#D8BFD8", textColor: "#4A235A" },  // Thistle with Dark Purple
    [EnumTiers.Mystic]: { bgColor: "#C71585", textColor: "#FFE4E1" },  // Medium Violet Red with Misty Rose
    [EnumTiers.Transcendent]: { bgColor: "#4B0082", textColor: "#F0F8FF" }   // Indigo with Alice Blue
};

export const TIER_SCORE_RANGES: Record<string, { minScore: number, maxScore: number }> = {
    [EnumTiers.Adept]: { minScore: -Infinity, maxScore: 99 },
    [EnumTiers.Savant]: { minScore: 100, maxScore: 249 },
    [EnumTiers.Mastermind]: { minScore: 250, maxScore: 549 },
    [EnumTiers.Visionary]: { minScore: 550, maxScore: 999 },
    [EnumTiers.Genius]: { minScore: 1000, maxScore: 1599 },
    [EnumTiers.Luminary]: { minScore: 1600, maxScore: 2399 },
    [EnumTiers.Prodigy]: { minScore: 2400, maxScore: 3399 },
    [EnumTiers.Oracle]: { minScore: 3400, maxScore: 4599 },
    [EnumTiers.Sage]: { minScore: 4600, maxScore: 5999 },
    [EnumTiers.Philosopher]: { minScore: 6000, maxScore: 7599 },
    [EnumTiers.Mystic]: { minScore: 7600, maxScore: 9399 },
    [EnumTiers.Transcendent]: { minScore: 9400, maxScore: Infinity }
};

export const TIER_SCORE_ADJUSTMENTS: Record<string, { increment: number, decrement: number }> = {
    [EnumTiers.Adept]: { increment: 10, decrement: 5 },
    [EnumTiers.Savant]: { increment: 10, decrement: 5 },
    [EnumTiers.Mastermind]: { increment: 10, decrement: 5 },
    [EnumTiers.Visionary]: { increment: 10, decrement: 5 },
    [EnumTiers.Genius]: { increment: 10, decrement: 5 },
    [EnumTiers.Luminary]: { increment: 10, decrement: 5 },
    [EnumTiers.Prodigy]: { increment: 5, decrement: 5 },
    [EnumTiers.Oracle]: { increment: 5, decrement: 5 },
    [EnumTiers.Sage]: { increment: 5, decrement: 5 },
    [EnumTiers.Philosopher]: { increment: 5, decrement: 5 },
    [EnumTiers.Mystic]: { increment: 5, decrement: 5 },
    [EnumTiers.Transcendent]: { increment: 5, decrement: 5 }
};

export const TIER_SETTINGS: Record<EnumTiers, ISettings> = {
    [EnumTiers.Adept]: {
        enableMeaningfulWords: true,
        enableNegation: false,
        enableMeta: false,

        enableDistinction: true, // Enabled
        enableComparisonNumerical: false,
        enableComparisonChronological: false,
        enableSyllogism: false,
        enableDirection: false,
        enableDirection3D: false,
        enableDirection4D: false,
        enableAnalogy: false,
        enableBinary: false,
        
        enableAnd: false,
        enableNand: false,
        enableOr: false,
        enableNor: false,
        enableXor: false,
        enableXnor: false,

        timerDistinction: 60,
        timerComparisonNumerical: 60,
        timerComparisonChronological: 60,
        timerSyllogism: 60,
        timerDirection: 60,
        timerDirection3D: 60,
        timerDirection4D: 60,
        timerAnalogy: 60,
        timerBinary: 60,

        premisesDistinction: 2,
        premisesComparisonNumerical: 2,
        premisesComparisonChronological: 2,
        premisesSyllogism: 2,
        premisesDirection: 2,
        premisesDirection3D: 2,
        premisesDirection4D: 2,
        premisesAnalogy: 3,
        premisesBinary: 4,
    },
    [EnumTiers.Savant]: {
        enableMeaningfulWords: true,
        enableNegation: false,
        enableMeta: false,

        enableDistinction: true, // Enabled
        enableComparisonNumerical: false,
        enableComparisonChronological: false,
        enableSyllogism: false,
        enableDirection: false,
        enableDirection3D: false,
        enableDirection4D: false,
        enableAnalogy: false,
        enableBinary: false,
        
        enableAnd: false,
        enableNand: false,
        enableOr: false,
        enableNor: false,
        enableXor: false,
        enableXnor: false,

        timerDistinction: 60,
        timerComparisonNumerical: 60,
        timerComparisonChronological: 60,
        timerSyllogism: 60,
        timerDirection: 60,
        timerDirection3D: 60,
        timerDirection4D: 60,
        timerAnalogy: 60,
        timerBinary: 60,

        premisesDistinction: 2,
        premisesComparisonNumerical: 2,
        premisesComparisonChronological: 2,
        premisesSyllogism: 2,
        premisesDirection: 2,
        premisesDirection3D: 2,
        premisesDirection4D: 2,
        premisesAnalogy: 3,
        premisesBinary: 4,
    },
    [EnumTiers.Mastermind]: {
        enableMeaningfulWords: true,
        enableNegation: false,
        enableMeta: false,

        enableDistinction: true, // Enabled
        enableComparisonNumerical: false,
        enableComparisonChronological: false,
        enableSyllogism: false,
        enableDirection: false,
        enableDirection3D: false,
        enableDirection4D: false,
        enableAnalogy: false,
        enableBinary: false,
        
        enableAnd: false,
        enableNand: false,
        enableOr: false,
        enableNor: false,
        enableXor: false,
        enableXnor: false,

        timerDistinction: 60,
        timerComparisonNumerical: 60,
        timerComparisonChronological: 60,
        timerSyllogism: 60,
        timerDirection: 60,
        timerDirection3D: 60,
        timerDirection4D: 60,
        timerAnalogy: 60,
        timerBinary: 60,

        premisesDistinction: 2,
        premisesComparisonNumerical: 2,
        premisesComparisonChronological: 2,
        premisesSyllogism: 2,
        premisesDirection: 2,
        premisesDirection3D: 2,
        premisesDirection4D: 2,
        premisesAnalogy: 3,
        premisesBinary: 4,
    },
    [EnumTiers.Visionary]: {
        enableMeaningfulWords: true,
        enableNegation: false,
        enableMeta: false,

        enableDistinction: true, // Enabled
        enableComparisonNumerical: false,
        enableComparisonChronological: false,
        enableSyllogism: false,
        enableDirection: false,
        enableDirection3D: false,
        enableDirection4D: false,
        enableAnalogy: false,
        enableBinary: false,
        
        enableAnd: false,
        enableNand: false,
        enableOr: false,
        enableNor: false,
        enableXor: false,
        enableXnor: false,

        timerDistinction: 60,
        timerComparisonNumerical: 60,
        timerComparisonChronological: 60,
        timerSyllogism: 60,
        timerDirection: 60,
        timerDirection3D: 60,
        timerDirection4D: 60,
        timerAnalogy: 60,
        timerBinary: 60,

        premisesDistinction: 2,
        premisesComparisonNumerical: 2,
        premisesComparisonChronological: 2,
        premisesSyllogism: 2,
        premisesDirection: 2,
        premisesDirection3D: 2,
        premisesDirection4D: 2,
        premisesAnalogy: 3,
        premisesBinary: 4,
    },
    [EnumTiers.Genius]: {
        enableMeaningfulWords: true,
        enableNegation: false,
        enableMeta: false,

        enableDistinction: true, // Enabled
        enableComparisonNumerical: false,
        enableComparisonChronological: false,
        enableSyllogism: false,
        enableDirection: false,
        enableDirection3D: false,
        enableDirection4D: false,
        enableAnalogy: false,
        enableBinary: false,
        
        enableAnd: false,
        enableNand: false,
        enableOr: false,
        enableNor: false,
        enableXor: false,
        enableXnor: false,

        timerDistinction: 60,
        timerComparisonNumerical: 60,
        timerComparisonChronological: 60,
        timerSyllogism: 60,
        timerDirection: 60,
        timerDirection3D: 60,
        timerDirection4D: 60,
        timerAnalogy: 60,
        timerBinary: 60,

        premisesDistinction: 2,
        premisesComparisonNumerical: 2,
        premisesComparisonChronological: 2,
        premisesSyllogism: 2,
        premisesDirection: 2,
        premisesDirection3D: 2,
        premisesDirection4D: 2,
        premisesAnalogy: 3,
        premisesBinary: 4,
    },
    [EnumTiers.Luminary]: {
        enableMeaningfulWords: true,
        enableNegation: false,
        enableMeta: false,

        enableDistinction: true, // Enabled
        enableComparisonNumerical: false,
        enableComparisonChronological: false,
        enableSyllogism: false,
        enableDirection: false,
        enableDirection3D: false,
        enableDirection4D: false,
        enableAnalogy: false,
        enableBinary: false,
        
        enableAnd: false,
        enableNand: false,
        enableOr: false,
        enableNor: false,
        enableXor: false,
        enableXnor: false,

        timerDistinction: 60,
        timerComparisonNumerical: 60,
        timerComparisonChronological: 60,
        timerSyllogism: 60,
        timerDirection: 60,
        timerDirection3D: 60,
        timerDirection4D: 60,
        timerAnalogy: 60,
        timerBinary: 60,

        premisesDistinction: 2,
        premisesComparisonNumerical: 2,
        premisesComparisonChronological: 2,
        premisesSyllogism: 2,
        premisesDirection: 2,
        premisesDirection3D: 2,
        premisesDirection4D: 2,
        premisesAnalogy: 3,
        premisesBinary: 4,
    },
    [EnumTiers.Prodigy]: {
        enableMeaningfulWords: true,
        enableNegation: false,
        enableMeta: false,

        enableDistinction: true, // Enabled
        enableComparisonNumerical: false,
        enableComparisonChronological: false,
        enableSyllogism: false,
        enableDirection: false,
        enableDirection3D: false,
        enableDirection4D: false,
        enableAnalogy: false,
        enableBinary: false,
        
        enableAnd: false,
        enableNand: false,
        enableOr: false,
        enableNor: false,
        enableXor: false,
        enableXnor: false,

        timerDistinction: 60,
        timerComparisonNumerical: 60,
        timerComparisonChronological: 60,
        timerSyllogism: 60,
        timerDirection: 60,
        timerDirection3D: 60,
        timerDirection4D: 60,
        timerAnalogy: 60,
        timerBinary: 60,

        premisesDistinction: 2,
        premisesComparisonNumerical: 2,
        premisesComparisonChronological: 2,
        premisesSyllogism: 2,
        premisesDirection: 2,
        premisesDirection3D: 2,
        premisesDirection4D: 2,
        premisesAnalogy: 3,
        premisesBinary: 4,
    },
    [EnumTiers.Oracle]: {
        enableMeaningfulWords: true,
        enableNegation: false,
        enableMeta: false,

        enableDistinction: true, // Enabled
        enableComparisonNumerical: false,
        enableComparisonChronological: false,
        enableSyllogism: false,
        enableDirection: false,
        enableDirection3D: false,
        enableDirection4D: false,
        enableAnalogy: false,
        enableBinary: false,
        
        enableAnd: false,
        enableNand: false,
        enableOr: false,
        enableNor: false,
        enableXor: false,
        enableXnor: false,

        timerDistinction: 60,
        timerComparisonNumerical: 60,
        timerComparisonChronological: 60,
        timerSyllogism: 60,
        timerDirection: 60,
        timerDirection3D: 60,
        timerDirection4D: 60,
        timerAnalogy: 60,
        timerBinary: 60,

        premisesDistinction: 2,
        premisesComparisonNumerical: 2,
        premisesComparisonChronological: 2,
        premisesSyllogism: 2,
        premisesDirection: 2,
        premisesDirection3D: 2,
        premisesDirection4D: 2,
        premisesAnalogy: 3,
        premisesBinary: 4,
    },
    [EnumTiers.Sage]: {
        enableMeaningfulWords: true,
        enableNegation: false,
        enableMeta: false,

        enableDistinction: true, // Enabled
        enableComparisonNumerical: false,
        enableComparisonChronological: false,
        enableSyllogism: false,
        enableDirection: false,
        enableDirection3D: false,
        enableDirection4D: false,
        enableAnalogy: false,
        enableBinary: false,
        
        enableAnd: false,
        enableNand: false,
        enableOr: false,
        enableNor: false,
        enableXor: false,
        enableXnor: false,

        timerDistinction: 60,
        timerComparisonNumerical: 60,
        timerComparisonChronological: 60,
        timerSyllogism: 60,
        timerDirection: 60,
        timerDirection3D: 60,
        timerDirection4D: 60,
        timerAnalogy: 60,
        timerBinary: 60,

        premisesDistinction: 2,
        premisesComparisonNumerical: 2,
        premisesComparisonChronological: 2,
        premisesSyllogism: 2,
        premisesDirection: 2,
        premisesDirection3D: 2,
        premisesDirection4D: 2,
        premisesAnalogy: 3,
        premisesBinary: 4,
    },
    [EnumTiers.Philosopher]: {
        enableMeaningfulWords: true,
        enableNegation: false,
        enableMeta: false,

        enableDistinction: true, // Enabled
        enableComparisonNumerical: false,
        enableComparisonChronological: false,
        enableSyllogism: false,
        enableDirection: false,
        enableDirection3D: false,
        enableDirection4D: false,
        enableAnalogy: false,
        enableBinary: false,
        
        enableAnd: false,
        enableNand: false,
        enableOr: false,
        enableNor: false,
        enableXor: false,
        enableXnor: false,

        timerDistinction: 60,
        timerComparisonNumerical: 60,
        timerComparisonChronological: 60,
        timerSyllogism: 60,
        timerDirection: 60,
        timerDirection3D: 60,
        timerDirection4D: 60,
        timerAnalogy: 60,
        timerBinary: 60,

        premisesDistinction: 2,
        premisesComparisonNumerical: 2,
        premisesComparisonChronological: 2,
        premisesSyllogism: 2,
        premisesDirection: 2,
        premisesDirection3D: 2,
        premisesDirection4D: 2,
        premisesAnalogy: 3,
        premisesBinary: 4,
    },
    [EnumTiers.Mystic]: {
        enableMeaningfulWords: true,
        enableNegation: false,
        enableMeta: false,

        enableDistinction: true, // Enabled
        enableComparisonNumerical: false,
        enableComparisonChronological: false,
        enableSyllogism: false,
        enableDirection: false,
        enableDirection3D: false,
        enableDirection4D: false,
        enableAnalogy: false,
        enableBinary: false,
        
        enableAnd: false,
        enableNand: false,
        enableOr: false,
        enableNor: false,
        enableXor: false,
        enableXnor: false,

        timerDistinction: 60,
        timerComparisonNumerical: 60,
        timerComparisonChronological: 60,
        timerSyllogism: 60,
        timerDirection: 60,
        timerDirection3D: 60,
        timerDirection4D: 60,
        timerAnalogy: 60,
        timerBinary: 60,

        premisesDistinction: 2,
        premisesComparisonNumerical: 2,
        premisesComparisonChronological: 2,
        premisesSyllogism: 2,
        premisesDirection: 2,
        premisesDirection3D: 2,
        premisesDirection4D: 2,
        premisesAnalogy: 3,
        premisesBinary: 4,
    },
    [EnumTiers.Transcendent]: {
        enableMeaningfulWords: true,
        enableNegation: false,
        enableMeta: false,

        enableDistinction: true, // Enabled
        enableComparisonNumerical: false,
        enableComparisonChronological: false,
        enableSyllogism: false,
        enableDirection: false,
        enableDirection3D: false,
        enableDirection4D: false,
        enableAnalogy: false,
        enableBinary: false,
        
        enableAnd: false,
        enableNand: false,
        enableOr: false,
        enableNor: false,
        enableXor: false,
        enableXnor: false,

        timerDistinction: 60,
        timerComparisonNumerical: 60,
        timerComparisonChronological: 60,
        timerSyllogism: 60,
        timerDirection: 60,
        timerDirection3D: 60,
        timerDirection4D: 60,
        timerAnalogy: 60,
        timerBinary: 60,

        premisesDistinction: 2,
        premisesComparisonNumerical: 2,
        premisesComparisonChronological: 2,
        premisesSyllogism: 2,
        premisesDirection: 2,
        premisesDirection3D: 2,
        premisesDirection4D: 2,
        premisesAnalogy: 3,
        premisesBinary: 4,
    }
}