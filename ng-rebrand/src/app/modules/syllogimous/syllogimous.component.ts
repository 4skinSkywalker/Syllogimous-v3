import { Component } from "@angular/core";

export enum EnumPhases {
    Start = "Start",
    Tutorial = "Tutorial",
    InGame = "In Game",
    Feedback = "Feedback",
    LevelUp = "Level Up",
}

@Component({
    selector: "app-syllogimous",
    templateUrl: "./syllogimous.component.html",
    styleUrls: ["./syllogimous.component.css"]
})
export class SyllogimousComponent {
    
    phaseIndex = 0;
    phases = [
        EnumPhases.Start,
        EnumPhases.Tutorial,
        EnumPhases.InGame,
        EnumPhases.Feedback,
        EnumPhases.LevelUp,
    ];

    phaseNext() {
        this.phaseIndex = (this.phaseIndex + 1) % this.phases.length;
    }

    /*
    Adept
    Savant
    Mastermind
    Visionary
    Genius
    Luminary
    */
}