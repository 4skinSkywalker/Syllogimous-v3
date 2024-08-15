import { Component } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ngbd-toast-customheader',
    standalone: true,
    imports: [ NgbToastModule, CommonModule ],
    templateUrl: './toast-custom-header.html',
})
export class NgbdToastCustomHeader {
    show = true;
}
