import { Component, OnDestroy, OnInit } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";
import { EnumScreens } from "../../../models/syllogimous.models";

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
        this.timerFull = (this.sylSrv.settings as any)["timer" + this.sylSrv.question.type];
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