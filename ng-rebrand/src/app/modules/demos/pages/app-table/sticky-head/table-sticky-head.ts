import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { countries } from '../mock';

@Component({
    selector: 'appd-table-sticky-head',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './table-sticky-head.html',
})
export class AppdTableStickyHead {

    countries = countries;

}