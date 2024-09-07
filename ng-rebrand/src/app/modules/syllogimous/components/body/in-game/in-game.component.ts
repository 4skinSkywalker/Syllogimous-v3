import { Component, OnDestroy, OnInit } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";
import { EnumQuestionType } from "../../../models/question.models";

@Component({
    selector: "app-body-in-game",
    templateUrl: "./in-game.component.html",
    styleUrls: ["./in-game.component.css"]
})
export class BodyInGameComponent implements OnInit, OnDestroy {
    timerFull = 0;
    timerLeft = 0;
    timer: any;

    constructor(
        public sylSrv: SyllogimousService
    ) {}

    ngOnInit() {
        this.timerFull = 90;
        switch (this.sylSrv.question.type) {
            case EnumQuestionType.Syllogism: {
                this.timerFull = this.sylSrv.settings.timerSyllogism;
                break;
            }
            case EnumQuestionType.Distinction: {
                this.timerFull = this.sylSrv.settings.timerDistinction;
                break;
            }
            case EnumQuestionType.ComparisonChronological: {
                this.timerFull = this.sylSrv.settings.timerComparisonChronological;
                break;
            }
            case EnumQuestionType.ComparisonNumerical: {
                this.timerFull = this.sylSrv.settings.timerComparisonNumerical;
                break;
            }
            case EnumQuestionType.Binary: {
                this.timerFull = this.sylSrv.settings.timerBinary;
                break;
            }
            case EnumQuestionType.Direction: {
                this.timerFull = this.sylSrv.settings.timerDirection;
                break;
            }
            case EnumQuestionType.Direction3D: {
                this.timerFull = this.sylSrv.settings.timerDirection3D;
                break;
            }
            case EnumQuestionType.Direction4D: {
                this.timerFull = this.sylSrv.settings.timerDirection4D;
                break;
            }
            case EnumQuestionType.Analogy: {
                this.timerFull = this.sylSrv.settings.timerAnalogy;
                break;
            }
        }
        
        this.timerLeft = this.timerFull;
        this.timer = setInterval(() => {
            this.timerLeft -= 1;
            if (this.timerLeft < 0) {
                this.sylSrv.checkQuestion();
            }
        }, 1000);
        console.log("start timer", this.timer, "with time", this.timerFull);
    }

    ngOnDestroy() {
        if (this.timer) {
            console.log("end timer", this.timer, "with time", this.timerLeft);
            clearInterval(this.timer);
        }
    }
}