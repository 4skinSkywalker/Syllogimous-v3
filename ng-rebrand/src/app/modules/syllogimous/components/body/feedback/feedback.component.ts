import { Component } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";

@Component({
    selector: "app-body-feedback",
    templateUrl: "./feedback.component.html",
    styleUrls: ["./feedback.component.css"]
})
export class BodyFeedbackComponent {

    constructor(
        public sylSrv: SyllogimousService
    ) {}
}