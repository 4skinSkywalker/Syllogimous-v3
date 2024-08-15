import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'appd-are-you-sure',
    standalone: true,
    imports: [ CommonModule ],
    template: `
        <div class="modal-header">

            <h4 class="modal-title" id="modal-title">
                {{ name ? name : 'Records' }} deletion
            </h4>

            <button
                type="button"
                class="btn-close" 
                (click)="activeModal.dismiss('Cross click')"
            ></button>
        </div>

        <div class="modal-body">

            <p *ngIf="name"><strong>Are you sure you want to delete {{ name }}?</strong></p>

            <p *ngIf="!name"><strong>Are you sure you want to delete the selected records?</strong></p>

            <ul *ngIf="rows">
                <li *ngFor="let row of rows">{{ row.name }}</li>
            </ul>

            <p>
                All information will be permanently deleted.<br>
                <span class="text-danger">This operation can not be undone.</span>
            </p>
        </div>
        
        <div class="modal-footer">

            <button
                type="button"
                class="btn btn-outline-secondary"
                (click)="activeModal.dismiss('Cancel click')"
            >
                Cancel
            </button>

            <button
                type="button"
                class="btn btn-danger"
                (click)="activeModal.close('Ok click')"
            >
                Ok
            </button>
        </div>
    `,
})
export class AppdAreYouSure {

    @Input("name") name!: string;
    @Input("rows") rows!: any[];

    constructor(
        public activeModal: NgbActiveModal
    ) {}
}