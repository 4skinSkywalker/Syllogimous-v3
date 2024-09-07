import { Component } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";
import { TIER_COLORS, TIER_SCORE_RANGES, TIER_SETTINGS } from "../../../constants/syllogimous.constants";
import { EnumTiers } from "../../../models/syllogimous.models";

@Component({
    selector: "app-body-stats",
    templateUrl: "./stats.component.html",
    styleUrls: ["./stats.component.css"]
})
export class BodyStatsComponent {
    TIER_COLORS = TIER_COLORS;
    TIER_SCORE_RANGES = TIER_SCORE_RANGES;
    tiers = Object.values(EnumTiers);
    Infinity = Infinity;

    nextTier = "Adept";
    pointsRemaining = 0;

    constructor(
        public sylSrv: SyllogimousService
    ) {}

    ngOnInit() {
        const currTierIdx = this.tiers.findIndex(tier => tier === this.sylSrv.tier);
        this.nextTier = this.tiers[currTierIdx + 1] || "--";
        this.pointsRemaining = this.nextTier ? (TIER_SCORE_RANGES[this.nextTier].minScore - this.sylSrv.score) : 0
    }
}