import { Component, OnDestroy } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'ngbd-toast-global',
    standalone: true,
    imports: [ NgbTooltipModule ],
    templateUrl: './toast-global.html',
})
export class NgbdToastGlobal implements OnDestroy {
    constructor(public toastService: ToastService) {}

    showStandard() {
        this.toastService.show('I am a standard toast');
    }

    showSuccess() {
        this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
    }

    showDanger(dangerTpl: any) {
        this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
    }

    positioned(position: "top-left" | "top-right" | "bottom-left" | "bottom-right") {
        this.toastService.show('Position: ' + position, { classname: 'bg-success text-light', position, delay: 10000 });
    }

    ngOnDestroy(): void {
        this.toastService.clear();
    }
}
