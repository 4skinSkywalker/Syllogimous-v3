import { Component } from "@angular/core";
import { SyllogimousService } from "../../../../syllogimous.service";

@Component({
    selector: "app-body-tutorials",
    templateUrl: "./tutorials.component.html",
    styleUrls: ["./tutorials.component.css"]
})
export class BodyTutorialsComponent {

    constructor(
        public sylSrv: SyllogimousService
    ) {}

    ngOnInit() {}
}