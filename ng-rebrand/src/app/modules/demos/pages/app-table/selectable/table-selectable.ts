import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { countries } from '../mock';

@Component({
    selector: 'appd-table-selectable',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './table-selectable.html',
})
export class AppdTableSelectable {

    countries = countries;

    constructor(
        private toastService: ToastService
    ) {}

    selectedToast(row: any) {
        this.toastService.show(
            "Selected " + row.name,
            { classname: 'bg-success text-light', delay: 4000 }
        );
    }

    deselectedToast(row: any) {
        this.toastService.show(
            "Deselected " + row.name,
            { classname: 'bg-danger text-light', delay: 6000 }
        );
    }
}