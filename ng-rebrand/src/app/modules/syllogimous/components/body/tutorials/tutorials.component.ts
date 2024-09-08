import { Component } from "@angular/core";
import { Question } from "src/app/modules/syllogimous/models/question.models";
import { LS_HISTORY } from "src/app/modules/syllogimous/constants/local-storage.constants";
import { SyllogimousService } from "../../../syllogimous.service";

@Component({
    selector: "app-body-tutorials",
    templateUrl: "./tutorials.component.html",
    styleUrls: ["./tutorials.component.css"]
})
export class BodyTutorialsComponent {
    questions: Question[] = [];
    seenQs: Record<string, boolean> = {};

    constructor(
        public sylSrv: SyllogimousService
    ) {}

    ngOnInit() {
        const history = localStorage.getItem(LS_HISTORY);
        if (history) {
            this.questions = JSON.parse(history).reverse();
            this.seenQs = this.questions.reduce((acc, curr) => (acc[curr.type] = true, acc), {} as any);
        }
    }
}