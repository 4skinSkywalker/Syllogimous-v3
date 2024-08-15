import { Component } from '@angular/core';
import { NgbTimepickerModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ngbd-timepicker-steps',
    standalone: true,
    imports: [ NgbTimepickerModule, FormsModule, CommonModule ],
    templateUrl: './timepicker-steps.html',
})
export class NgbdTimepickerSteps {
    time: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
    hourStep = 1;
    minuteStep = 15;
    secondStep = 30;
}
