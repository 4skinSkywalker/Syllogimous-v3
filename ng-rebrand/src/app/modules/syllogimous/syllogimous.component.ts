import { Component } from "@angular/core";
import { Engine } from "./engine/engine";
import { EnumQuestionType, Question } from "./engine/engine-models";

export enum EnumScreens {
    Intro = "Intro",
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
    EnumQuestionType = EnumQuestionType;
    
    screen = EnumScreens.Intro;

    engine = new Engine();
    question?: Question;

    skipIntro(dontShowAnymore: boolean) {
        this.screen = EnumScreens.Start;
    }

    start() {
        // TODO:
        // 1. Generate question
        this.question = this.engine.createBinary(4);
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
        this.question!.userAnswer = value;
        this.engine.settings.history.push(this.question!);
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