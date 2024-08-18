import { Component } from "@angular/core";
import { SyllogimousService } from "./syllogimous.service";
import { EnumScreens } from "./models/syllogimous.models";

@Component({
    selector: "app-syllogimous",
    templateUrl: "./syllogimous.component.html",
    styleUrls: ["./syllogimous.component.scss"]
})
export class SyllogimousComponent {
    EnumScreens = EnumScreens;

    constructor(
        public sylSrv: SyllogimousService
    ) {}
}