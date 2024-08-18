import { Component } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";

@Component({
    selector: "app-footer-intro",
    templateUrl: "./intro.component.html",
    styleUrls: ["./intro.component.css"]
})
export class FooterIntroComponent {

    constructor(
        public sylSrv: SyllogimousService
    ) {}
}