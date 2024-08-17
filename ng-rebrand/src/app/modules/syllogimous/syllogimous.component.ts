import { Component } from "@angular/core";
import { Engine } from "./engine/engine";
import { Question } from "./engine/engine-models";

export enum EnumScreens {
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
    EnumScreens = EnumScreens;
    
    screen = EnumScreens.Start;

    engine = new Engine();
    question?: Question;

    start() {
        // TODO:
        // 1. Generate question
        this.question = this.engine.createSyllogism(3);
        // 2. Check if to display the tutorial
        this.screen = EnumScreens.Tutorial;
        // 3. Go to In Game phase
    }

    skipTutorial(dontShowAnymore: boolean) {
        // TODO:
        // 1. Register into LS the information
        // 2. Go to In Game phase
        this.screen = EnumScreens.InGame;
    }

    checkQuestion(value: boolean) {
        this.screen = EnumScreens.Feedback;
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