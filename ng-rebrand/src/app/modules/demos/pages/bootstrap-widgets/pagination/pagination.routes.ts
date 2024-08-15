/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdPaginationAdvanced } from './advanced/pagination-advanced';
import { NgbdPaginationBasic } from './basic/pagination-basic';
import { NgbdPaginationConfig } from './config/pagination-config';
import { NgbdPaginationCustomization } from './customization/pagination-customization';
import { NgbdPaginationDisabled } from './disabled/pagination-disabled';
import { NgbdPaginationJustify } from './justify/pagination-justify';
import { NgbdPaginationSize } from './size/pagination-size';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Basic pagination',
        type: NgbdPaginationBasic,
        code: require('!!raw-loader!./basic/pagination-basic').default,
        markup: require('!!raw-loader!./basic/pagination-basic.html').default,
    },
    advanced: {
        title: 'Advanced pagination',
        type: NgbdPaginationAdvanced,
        code: require('!!raw-loader!./advanced/pagination-advanced').default,
        markup: require('!!raw-loader!./advanced/pagination-advanced.html').default,
    },
    customization: {
        title: 'Custom links and pages',
        type: NgbdPaginationCustomization,
        code: require('!!raw-loader!./customization/pagination-customization').default,
        markup: require('!!raw-loader!./customization/pagination-customization.html').default,
    },
    size: {
        title: 'Pagination size',
        type: NgbdPaginationSize,
        code: require('!!raw-loader!./size/pagination-size').default,
        markup: require('!!raw-loader!./size/pagination-size.html').default,
    },
    justify: {
        title: 'Pagination alignment',
        type: NgbdPaginationJustify,
        code: require('!!raw-loader!./justify/pagination-justify').default,
        markup: require('!!raw-loader!./justify/pagination-justify.html').default,
    },
    disabled: {
        title: 'Disabled pagination',
        type: NgbdPaginationDisabled,
        code: require('!!raw-loader!./disabled/pagination-disabled').default,
        markup: require('!!raw-loader!./disabled/pagination-disabled.html').default,
    },
    config: {
        title: 'Global configuration',
        type: NgbdPaginationConfig,
        code: require('!!raw-loader!./config/pagination-config').default,
        markup: require('!!raw-loader!./config/pagination-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/pagination/',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/pagination/overview',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('pagination', demos),
            },
        ],
    },
];
