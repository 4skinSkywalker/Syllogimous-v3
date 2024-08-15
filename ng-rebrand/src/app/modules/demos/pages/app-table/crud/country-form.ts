import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { Country } from '../mock';
import { AppdAreYouSure } from './are-you-sure';

@Component({
    selector: 'appd-country-form',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    template: `
        <div class="modal-header">

            <h4 class="modal-title" id="modal-title">
                {{ country ? 'Edit ' + country.name : 'Create new country' }}
            </h4>

            <button
                type="button"
                class="btn-close" 
                (click)="activeModal.dismiss('Cross click')"
            ></button>
        </div>

        <div class="modal-body">
            <form [formGroup]="form" class="d-grid gap-2">

                <app-input
                    [ngControl]="name"
                    [floatingLabel]="true"
                    name="name"
                    label="Name"
                ></app-input>

                <app-input
                    type="number"
                    [ngControl]="area"
                    [floatingLabel]="true"
                    name="area"
                    label="Area"
                ></app-input>

                <app-input
                    type="number"
                    [ngControl]="population"
                    [floatingLabel]="true"
                    name="population"
                    label="Population"
                ></app-input>
            </form>
        </div>
        
        <div class="modal-footer">

            <button
                *ngIf="country"
                type="button"
                class="btn btn-danger me-auto"
                (click)="confirmDelete()"
            >
                Delete
            </button>

            <button
                type="button"
                class="btn btn-outline-secondary"
                (click)="activeModal.dismiss('Cancel')"
            >
                Cancel
            </button>

            <button
                type="button"
                class="btn btn-primary"
                (click)="activeModal.close('Save')"
            >
                Save
            </button>
        </div>
    `,
})
export class AppdCountryForm {

    @Input("country") country!: Country;

    name!: FormControl;
    area!: FormControl;
    population!: FormControl;
    form!: FormGroup;

    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal
    ) {}

    ngOnInit() {

        this.name = new FormControl(this.country?.name);
        this.area = new FormControl(this.country?.area);
        this.population = new FormControl(this.country?.population);

        this.form = new FormGroup({
            name: this.name,
            area: this.area,
            population: this.population
        });
    }

    async confirmDelete() {

        const modalRef = this.modalService.open(AppdAreYouSure);
        modalRef.componentInstance.name = this.country.name;

        const result = await modalRef.result;
        console.log("Deleting", this.country.name);

        this.activeModal.close('Deleted')
    }
}