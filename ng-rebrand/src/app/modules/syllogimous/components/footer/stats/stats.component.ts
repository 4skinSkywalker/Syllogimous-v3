import { Component } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";
import { EnumScreens } from "../../../models/syllogimous.models";

@Component({
    selector: "app-footer-stats",
    templateUrl: "./stats.component.html",
    styleUrls: ["./stats.component.css"]
})
export class FooterStatsComponent {
    EnumScreens = EnumScreens;
    constructor(
        public sylSrv: SyllogimousService
    ) {}

    ngOnInit() {}
}