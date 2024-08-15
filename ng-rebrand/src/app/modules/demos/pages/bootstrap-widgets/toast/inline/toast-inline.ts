import { Component } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ngbd-toast-inline',
    standalone: true,
    imports: [ NgbToastModule, CommonModule ],
    templateUrl: './toast-inline.html',
})
export class NgbdToastInline {
    show = true;
}
