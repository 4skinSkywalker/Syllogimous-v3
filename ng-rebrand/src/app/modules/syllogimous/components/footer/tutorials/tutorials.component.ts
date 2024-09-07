import { Component } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";
import { Question } from "../../../models/question.models";
import { EnumScreens } from "../../../models/syllogimous.models";

@Component({
    selector: "app-footer-tutorials",
    templateUrl: "./tutorials.component.html",
    styleUrls: ["./tutorials.component.css"]
})
export class FooterTutorialsComponent {
    EnumScreens = EnumScreens;
    questions: Question[] = [];

    constructor(
        public sylSrv: SyllogimousService
    ) {}

    ngOnInit() {}
}