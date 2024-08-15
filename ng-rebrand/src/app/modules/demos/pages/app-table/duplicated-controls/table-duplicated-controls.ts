import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { countries } from '../mock';

@Component({
    selector: 'appd-table-duplicated-controls.',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './table-duplicated-controls.html',
})
export class AppdTableDuplicatedControls {

    countries = countries;
    
}