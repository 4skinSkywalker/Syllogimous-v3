import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { jsonCopy } from 'src/app/utils/json';
import { countries, Country } from '../mock';
import { AppdAreYouSure } from './are-you-sure';
import { AppdCountryForm } from './country-form';

@Component({
    selector: 'appd-table-crud',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './table-crud.html',
})
export class AppdTableCrud {

    @ViewChild("dt") dt!: TableComponent;

    countries: any[] = jsonCopy(countries);

    constructor(
        private modalService: NgbModal
    ) { }

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