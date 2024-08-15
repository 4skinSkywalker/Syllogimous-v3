import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { countries } from '../mock';

@Component({
    selector: 'appd-table-searchable',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './table-searchable.html',
})
export class AppdTableSearchable {

    countries = countries;
    
}