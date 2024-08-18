import { Component } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";

@Component({
    selector: "app-footer-tutorial",
    templateUrl: "./tutorial.component.html",
    styleUrls: ["./tutorial.component.css"]
})
export class FooterTutorialComponent {

    constructor(
        public sylSrv: SyllogimousService
    ) {}
}