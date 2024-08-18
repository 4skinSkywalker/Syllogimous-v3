import { Component } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";

@Component({
    selector: "app-body-in-game",
    templateUrl: "./in-game.component.html",
    styleUrls: ["./in-game.component.css"]
})
export class BodyInGameComponent {

    constructor(
        public sylSrv: SyllogimousService
    ) {}
}