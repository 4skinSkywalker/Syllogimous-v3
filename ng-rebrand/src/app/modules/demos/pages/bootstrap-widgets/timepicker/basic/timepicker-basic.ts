import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-timepicker-basic',
    standalone: true,
    imports: [ NgbTimepickerModule, FormsModule, CommonModule ],
    templateUrl: './timepicker-basic.html',
})
export class NgbdTimepickerBasic {
    time = { hour: 13, minute: 30 };
}
