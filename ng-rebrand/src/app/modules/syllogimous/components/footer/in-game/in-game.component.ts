import { Component } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";

@Component({
    selector: "app-footer-in-game",
    templateUrl: "./in-game.component.html",
    styleUrls: ["./in-game.component.css"]
})
export class FooterInGameComponent {

    constructor(
        public sylSrv: SyllogimousService
    ) {}
}