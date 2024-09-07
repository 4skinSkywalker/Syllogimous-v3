import { Component } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";
import { TIER_COLORS, TIER_SCORE_RANGES } from "../../../constants/syllogimous.constants";
import { EnumTiers } from "../../../models/syllogimous.models";
import { Question } from "../../../models/question.models";
import { LS_HISTORY } from "../../../constants/local-storage.constants";

@Component({
    selector: "app-body-stats",
    templateUrl: "./stats.component.html",
    styleUrls: ["./stats.component.css"]
})
export class BodyStatsComponent {
    TIER_COLORS = TIER_COLORS;
    TIER_SCORE_RANGES = TIER_SCORE_RANGES;
    tiers = Object.values(EnumTiers);

    nextTier = EnumTiers.Savant;
    pointsRemaining = 0;

    questions: Question[] = [];
    correctQs: Question[] = [];
    incorrectQs: Question[] = [];
    unansweredQs: Question[] = [];
    currentStreak: Question[] = [];
    longestStreak: Question[] = [];

    totalPlayTime = 0;
    avgAnswer = 0;
    fastestAnswer = 0;
    slowestAnswer = 0;
    timeBasedStats: Record<string, any> = {};

    mostCommonMistake = "";
    leastCommonMistake = "";

    types: string[] = [];
    typeBasedStats: Record<string, { type: string, completed: number, accuracy: number, stats: Record<string, any> }> = {};

    constructor(
        public sylSrv: SyllogimousService
    ) {}

    ngOnInit() {
        const currTierIdx = this.tiers.findIndex(tier => tier === this.sylSrv.tier);
        this.nextTier = this.tiers[currTierIdx + 1] || "--";
        this.pointsRemaining = this.nextTier ? (TIER_SCORE_RANGES[this.nextTier].minScore - this.sylSrv.score) : 0
    
        const history = localStorage.getItem(LS_HISTORY);
        if (history) {
            this.questions = JSON.parse(history).reverse();
        }

        this.correctQs = this.questions.filter(q => q.userAnswer !== undefined && q.isValid === q.userAnswer);
        this.incorrectQs = this.questions.filter(q => q.userAnswer !== undefined && q.isValid !== q.userAnswer);
        this.unansweredQs = this.questions.filter(q => q.userAnswer === undefined);

        for (const q of this.questions) {
            if (q.isValid !== q.userAnswer) {
                break;
            }
            this.currentStreak.push(q);
        }

        let streak = [];
        for (const q of this.questions) {
            if (q.isValid !== q.userAnswer) {
                if (streak.length > this.longestStreak.length) {
                    this.longestStreak = streak;
                    streak = [];
                }
                continue;
            }
            streak.push(q);
        }

        for (const q of this.questions) {
            const ps = q.premises.length;
            this.timeBasedStats[ps] = this.timeBasedStats[ps] || {
                sum: 0,
                count: 0,
                fastest: 0,
                slowest: 0,
            };

            const dt = q.answeredAt - q.createdAt;
            this.totalPlayTime += dt;

            this.timeBasedStats[ps].sum += dt;
            this.timeBasedStats[ps].count += 1;

            if (q.userAnswer !== undefined) {
                if (this.fastestAnswer === 0 || dt < this.fastestAnswer) {
                    this.fastestAnswer = dt;
                }
                if (this.slowestAnswer === 0 || dt > this.slowestAnswer) {
                    this.slowestAnswer = dt;
                }

                if (this.timeBasedStats[ps].fastest === 0 || dt < this.timeBasedStats[ps].fastest) {
                    this.timeBasedStats[ps].fastest = dt;
                }
                if (this.timeBasedStats[ps].slowest === 0 || dt > this.timeBasedStats[ps].slowest) {
                    this.timeBasedStats[ps].slowest = dt;
                }
            }
        }

        const typeMistakesCount: Record<string, number> = {};
        this.questions
            .filter(q => q.isValid !== q.userAnswer)
            .forEach(q => {
                typeMistakesCount[q.type] = typeMistakesCount[q.type] || 0;
                typeMistakesCount[q.type]++;
            });
        const sorted = Object.entries(typeMistakesCount).sort((a, b) => a[1] - b[1]);
        this.mostCommonMistake = sorted[sorted.length - 1][0];
        this.leastCommonMistake = sorted[0][0];

        this.types = [ ...new Set(this.questions.map(q => q.type)) ];
        this.typeBasedStats = this.types.reduce((acc, curr) => (acc[curr] = { type: "", completed: 0, accuracy: 0, stats: {} }, acc), {} as Record<string, any>);
        this.types
            .map(type => this.questions.filter(q => q.type === type))
            .forEach((questions, idx) => {
                const type = this.types[idx];

                this.typeBasedStats[type].type = type;
                this.typeBasedStats[type].completed = questions.length;
                this.typeBasedStats[type].accuracy = questions.length && (questions.filter(q => q.userAnswer === q.isValid).length / questions.length);

                questions.forEach(q => {
                    const ps = q.premises.length;
                    this.typeBasedStats[type].stats[ps] = this.typeBasedStats[type].stats[ps] || {
                        sum: 0,
                        count: 0,
                        fastest: 0,
                        slowest: 0,
                    };
        
                    const dt = q.answeredAt - q.createdAt;
                    this.totalPlayTime += dt;
        
                    this.typeBasedStats[type].stats[ps].sum += dt;
                    this.typeBasedStats[type].stats[ps].count += 1;
        
                    if (q.userAnswer !== undefined) {
                        if (this.typeBasedStats[type].stats[ps].fastest === 0 || dt < this.typeBasedStats[type].stats[ps].fastest) {
                            this.typeBasedStats[type].stats[ps].fastest = dt;
                        }
                        if (this.typeBasedStats[type].stats[ps].slowest === 0 || dt > this.typeBasedStats[type].stats[ps].slowest) {
                            this.typeBasedStats[type].stats[ps].slowest = dt;
                        }
                    }
                });
            });
    }

    formatTime(ms: number): string {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
      
        const remainingSeconds = seconds % 60;
        const remainingMinutes = minutes % 60;
      
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
}