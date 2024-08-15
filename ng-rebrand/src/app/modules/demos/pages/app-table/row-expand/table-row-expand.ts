import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { countries } from '../mock';

@Component({
    selector: 'appd-table-row-expand',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './table-row-expand.html',
})
export class AppdTableRowExpand {

    countries = countries;

}