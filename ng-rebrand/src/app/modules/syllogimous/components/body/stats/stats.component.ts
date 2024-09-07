import { Component } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";

@Component({
    selector: "app-body-stats",
    templateUrl: "./stats.component.html",
    styleUrls: ["./stats.component.css"]
})
export class BodyStatsComponent {

    constructor(
        public sylSrv: SyllogimousService
    ) {}
}