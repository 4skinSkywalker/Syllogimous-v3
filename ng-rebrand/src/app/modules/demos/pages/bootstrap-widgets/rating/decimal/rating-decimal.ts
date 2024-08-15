import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-rating-decimal',
    standalone: true,
    imports: [ NgbRatingModule, CommonModule ],
    templateUrl: './rating-decimal.html',
    styles: [
        `
            i {
                position: relative;
                display: inline-block;
                font-size: 2.5rem;
                padding-right: 0.1rem;
                color: #d3d3d3;
            }

            .filled {
                color: red;
                overflow: hidden;
                position: absolute;
                top: 0;
                left: 0;
            }
        `,
    ],
})
export class NgbdRatingDecimal {
    currentRate = 3.14;

    ariaValueText(current: number, max: number) {
        return `${current} out of ${max} hearts`;
    }
}
