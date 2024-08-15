import { Component } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ngbd-popover-visibility',
    standalone: true,
    imports: [ NgbPopoverModule, CommonModule ],
    templateUrl: './popover-visibility.html',
})
export class NgbdPopoverVisibility {
    lastShown!: Date;
    lastHidden!: Date;

    recordShown() {
        this.lastShown = new Date();
    }

    recordHidden() {
        this.lastHidden = new Date();
    }
}
