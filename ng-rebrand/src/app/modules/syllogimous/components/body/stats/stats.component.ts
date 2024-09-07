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
    timeBasedStats: Record<string, any> = {};

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
            if (q.userAnswer !== undefined) {
                const dt = q.answeredAt - q.createdAt;
                this.timeBasedStats[ps].sum += dt;
                this.timeBasedStats[ps].count += 1;
                if (this.timeBasedStats[ps].fastest === 0 || dt < this.timeBasedStats[ps].fastest) {
                    this.timeBasedStats[ps].fastest = dt;
                }
                if (this.timeBasedStats[ps].fastest === 0 || dt > this.timeBasedStats[ps].slowest) {
                    this.timeBasedStats[ps].slowest = dt;
                }
            }
        }
    }
}