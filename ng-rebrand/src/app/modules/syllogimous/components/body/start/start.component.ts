import { Component } from "@angular/core";
import { SyllogimousService } from "../../../syllogimous.service";

@Component({
    selector: "app-body-start",
    templateUrl: "./start.component.html",
    styleUrls: ["./start.component.css"]
})
export class BodyStartComponent {

    constructor(
        public sylSrv: SyllogimousService
    ) {}
}