import { Component } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";
import { Question } from "../../../models/question.models";
import { LS_HISTORY } from "../../../constants/local-storage.constants";

@Component({
    selector: "app-body-history",
    templateUrl: "./history.component.html",
    styleUrls: ["./history.component.css"]
})
export class BodyHistoryComponent {
    questions: Question[] = [];

    constructor(
        public sylSrv: SyllogimousService
    ) {}

    ngOnInit() {
        this.questions = this.sylSrv.questionsFromLS;
    }
}