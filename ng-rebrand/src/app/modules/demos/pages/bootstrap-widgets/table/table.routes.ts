/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdTableBasic } from './basic/table-basic';
import { NgbdTableComplete } from './complete/table-complete';
import { NgbdTableFiltering } from './filtering/table-filtering';
import { NgbdTablePagination } from './pagination/table-pagination';
import { NgbdTableSortable } from './sortable/table-sortable';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Basic table',
        type: NgbdTableBasic,
        files: [
            {
                name: 'table-basic.html',
                source: require('!!raw-loader!./basic/table-basic.html').default,
            },
            {
                name: 'table-basic.ts',
                source: require('!!raw-loader!./basic/table-basic').default,
            },
        ],
    },
    sortable: {
        title: 'Sortable table',
        type: NgbdTableSortable,
        files: [
            {
                name: 'table-sortable.html',
                source: require('!!raw-loader!./sortable/table-sortable.html').default,
            },
            {
                name: 'table-sortable.ts',
                source: require('!!raw-loader!./sortable/table-sortable').default,
            },
        ],
    },
    filtering: {
        title: 'Search and filtering',
        type: NgbdTableFiltering,
        files: [
            {
                name: 'table-filtering.html',
                source: require('!!raw-loader!./filtering/table-filtering.html').default,
            },
            {
                name: 'table-filtering.ts',
                source: require('!!raw-loader!./filtering/table-filtering').default,
            },
        ],
    },
    pagination: {
        title: 'Pagination',
        type: NgbdTablePagination,
        files: [
            {
                name: 'table-pagination.html',
                source: require('!!raw-loader!./pagination/table-pagination.html').default,
            },
            {
                name: 'table-pagination.ts',
                source: require('!!raw-loader!./pagination/table-pagination').default,
            },
        ],
    },
    complete: {
        title: 'Complete example',
        type: NgbdTableComplete,
        files: [
            {
                name: 'countries.ts',
                source: require('!!raw-loader!./complete/countries').default,
            },
            {
                name: 'country.service.ts',
                source: require('!!raw-loader!./complete/country.service').default,
            },
            {
                name: 'country.ts',
                source: require('!!raw-loader!./complete/country').default,
            },
            {
                name: 'table-complete.html',
                source: require('!!raw-loader!./complete/table-complete.html').default,
            },
            {
                name: 'table-complete.ts',
                source: require('!!raw-loader!./complete/table-complete').default,
            },
            {
                name: 'sortable.directive.ts',
                source: require('!!raw-loader!./complete/sortable.directive').default,
            },
        ],
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/table/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('table', demos),
            },
        ],
    },
];
