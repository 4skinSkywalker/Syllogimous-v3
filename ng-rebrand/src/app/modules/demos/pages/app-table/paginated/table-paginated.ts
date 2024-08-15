import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { countries } from '../mock';

@Component({
    selector: 'appd-table-paginated',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './table-paginated.html',
})
export class AppdTablePaginated {

    countries = countries;
    
}