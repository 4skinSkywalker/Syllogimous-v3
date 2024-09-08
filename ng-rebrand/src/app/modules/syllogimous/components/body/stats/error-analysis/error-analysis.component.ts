import { Component } from '@angular/core';
import { Question } from 'src/app/modules/syllogimous/models/question.models';
import { SyllogimousService } from 'src/app/modules/syllogimous/syllogimous.service';

@Component({
    selector: 'app-error-analysis',
    templateUrl: './error-analysis.component.html',
    styleUrls: ['./error-analysis.component.css']
})
export class ErrorAnalysisComponent {
    questions: Question[] = [];
    mostCommonMistake = "No Mistakes Yet";
    leastCommonMistake = "No Mistakes Yet";

    constructor(
        public sylSrv: SyllogimousService
    ) {}

    ngOnInit() {
        this.questions = this.sylSrv.questionsFromLS;

        const typeMistakesCount: Record<string, number> = {};
        this.questions
            .filter(q => q.isValid !== q.userAnswer)
            .forEach(q => {
                typeMistakesCount[q.type] = typeMistakesCount[q.type] || 0;
                typeMistakesCount[q.type]++;
            });
        const sorted = Object.entries(typeMistakesCount).sort((a, b) => a[1] - b[1]);
        if (sorted.length) {
            this.mostCommonMistake = sorted[sorted.length - 1][0];
            this.leastCommonMistake = sorted[0][0];
        }
    }
}
