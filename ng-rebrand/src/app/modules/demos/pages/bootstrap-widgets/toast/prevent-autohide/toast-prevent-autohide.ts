import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-toast-prevent-autohide',
    standalone: true,
    imports: [ NgbToastModule, CommonModule ],
    templateUrl: './toast-prevent-autohide.html',
})
export class NgbdToastPreventAutohide {
    show = false;
    autohide = true;
}
