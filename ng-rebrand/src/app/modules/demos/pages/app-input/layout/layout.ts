import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'appd-layout',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './layout.html',
    styles: [`

        .resizeable {
            position: relative;
            resize: horizontal;
            overflow: auto;
            border: 1px dashed rgb(170, 170, 170);
            padding: 0.75rem;
        }

        .resizeable::before {
            content: "Resize me to test";
            position: absolute;
            bottom: 0.15rem;
            right: 0.5rem;
            font-size: 0.75rem;
            line-height: 1;
            color: #aaa;
        }
    `]
})
export class AppdLayout {

    Array = Array;

}
