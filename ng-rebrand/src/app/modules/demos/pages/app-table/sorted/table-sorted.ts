import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { countries } from '../mock';

@Component({
    selector: 'appd-table-sorted',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './table-sorted.html',
})
export class AppdTableSorted {

    countries = countries;
    
}