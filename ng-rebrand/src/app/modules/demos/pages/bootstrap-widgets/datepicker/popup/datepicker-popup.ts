import { Component } from '@angular/core';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ngbd-datepicker-popup',
    standalone: true,
    imports: [ NgbDatepickerModule, NgbAlertModule, FormsModule, CommonModule ],
    templateUrl: './datepicker-popup.html',
})
export class NgbdDatepickerPopup {
    model!: NgbDateStruct;
}
