import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toast.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { jsonCopy } from 'src/app/utils/json';
import { AppdAreYouSure } from '../crud/are-you-sure';
import { AppdCountryForm } from '../crud/country-form';
import { countries, Country } from '../mock';

@Component({
    selector: 'appd-table-complete',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './table-complete.html',
})
export class AppdTableComplete {

    @ViewChild("dt") dt!: TableComponent;

    countries: Country[] = jsonCopy(countries);
    totArea!: number;
    totPopulation!: number;

    constructor(
        private toastService: ToastService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.totArea = this.countries.reduce(
            (a, b) => a + (b.area || 0),
            0
        );
        this.totPopulation = this.countries.reduce(
            (a, b) => a + (b.population || 0),
            0
        );
    }

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

    async confirmDeleteSingle(country: Country) {

        const modalRef = this.modalService.open(AppdAreYouSure);
        modalRef.componentInstance.name = country.name;

        const result = await modalRef.result;
        console.log("Deleting single?", result, country.name);
    }

    async confirmDeleteMultiple() {

        const modalRef = this.modalService.open(AppdAreYouSure);
        modalRef.componentInstance.rows = this.dt.selectedRows;

        const result = await modalRef.result;
        console.log("Deleting multiple?", result, this.dt.selectedRows);
    }

    async create() {
        const modalRef = this.modalService.open(AppdCountryForm);
        const result = await modalRef.result;
        console.log("Create?", result);
    }

    async edit(country: Country) {

        const modalRef = this.modalService.open(AppdCountryForm);
        modalRef.componentInstance.country = country;

        const result = await modalRef.result;
        console.log("Edit?", result);
    }
}