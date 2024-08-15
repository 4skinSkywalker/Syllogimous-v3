import { Component } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ngbd-toast-closeable',
    standalone: true,
    imports: [ NgbToastModule, CommonModule ],
    templateUrl: './toast-closeable.html',
})
export class NgbdToastCloseable {
    show = true;

    close() {
        this.show = false;
        setTimeout(() => (this.show = true), 3000);
    }
}
