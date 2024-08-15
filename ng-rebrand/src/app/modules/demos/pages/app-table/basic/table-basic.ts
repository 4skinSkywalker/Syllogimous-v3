import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { countries } from '../mock';

@Component({
    selector: 'appd-table-basic',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './table-basic.html',
})
export class AppdTableBasic {

    countries: any[] = countries;
    
}