import { Component } from "@angular/core";

@Component({
    selector: "app-syllogimous",
    templateUrl: "./syllogimous.component.html",
    styleUrls: ["./syllogimous.component.css"]
})
export class SyllogimousComponent {
    
    phaseIndex = 0;
    phases = ["start", "play", "feedback"];

    phaseNext() {
        this.phaseIndex = (this.phaseIndex + 1) % this.phases.length;
    }
}