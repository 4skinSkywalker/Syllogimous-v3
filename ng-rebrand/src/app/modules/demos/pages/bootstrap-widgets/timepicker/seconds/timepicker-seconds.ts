import { Component } from '@angular/core';
import { NgbTimepickerModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ngbd-timepicker-seconds',
    standalone: true,
    imports: [ NgbTimepickerModule, FormsModule, CommonModule ],
    templateUrl: './timepicker-seconds.html',
})
export class NgbdTimepickerSeconds {
    time: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
    seconds = true;

    toggleSeconds() {
        this.seconds = !this.seconds;
    }
}
