import { Component } from '@angular/core';
import { Question } from 'src/app/modules/syllogimous/models/question.models';
import { SyllogimousService } from 'src/app/modules/syllogimous/syllogimous.service';

@Component({
    selector: 'app-type-based-stats',
    templateUrl: './type-based-stats.component.html',
    styleUrls: ['./type-based-stats.component.css']
})
export class TypeBasedStatsComponent {
    questions: Question[] = [];
    types: string[] = [];
    typeBasedStats: Record<string, { type: string, completed: number, accuracy: number, stats: Record<string, any> }> = {};

    constructor(
        public sylSrv: SyllogimousService
    ) { }

    ngOnInit() {
        this.questions = this.sylSrv.questionsFromLS;

        this.types = [ ...new Set(this.questions.map(q => q.type)) ];
        this.typeBasedStats = this.types.reduce((acc, curr) => (acc[curr] = { type: "", completed: 0, accuracy: 0, stats: {} }, acc), {} as Record<string, any>);
        this.types
            .map(type => this.questions.filter(q => q.type === type))
            .forEach((questions, idx) => {
                const type = this.types[idx];

                this.typeBasedStats[type].type = type;
                this.typeBasedStats[type].completed = questions.length;
                this.typeBasedStats[type].accuracy = questions.length && (questions.filter(q => q.userAnswer === q.isValid).length / questions.length);

                questions.forEach(q => {
                    const ps = q.premises.length;
                    this.typeBasedStats[type].stats[ps] = this.typeBasedStats[type].stats[ps] || {
                        sum: 0,
                        count: 0,
                        fastest: 0,
                        slowest: 0,
                    };
        
                    const dt = q.answeredAt - q.createdAt;
        
                    this.typeBasedStats[type].stats[ps].sum += dt;
                    this.typeBasedStats[type].stats[ps].count += 1;
        
                    if (q.userAnswer !== undefined) {
                        if (this.typeBasedStats[type].stats[ps].fastest === 0 || dt < this.typeBasedStats[type].stats[ps].fastest) {
                            this.typeBasedStats[type].stats[ps].fastest = dt;
                        }
                        if (this.typeBasedStats[type].stats[ps].slowest === 0 || dt > this.typeBasedStats[type].stats[ps].slowest) {
                            this.typeBasedStats[type].stats[ps].slowest = dt;
                        }
                    }
                });
            });
    }
}
