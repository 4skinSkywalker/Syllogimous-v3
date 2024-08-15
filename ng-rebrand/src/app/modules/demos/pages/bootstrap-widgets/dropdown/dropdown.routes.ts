/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdDropdownBasic } from './basic/dropdown-basic';
import { NgbdDropdownConfig } from './config/dropdown-config';
import { NgbdDropdownContainer } from './container/dropdown-container';
import { NgbdDropdownForm } from './form/dropdown-form';
import { NgbdDropdownManual } from './manual/dropdown-manual';
import { NgbdDropdownNavbar } from './navbar/dropdown-navbar';
import { NgbdDropdownSplit } from './split/dropdown-split';
import { NgbdDropdownDisabled } from './disabled/dropdown-disabled';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Dropdown',
        type: NgbdDropdownBasic,
        code: require('!!raw-loader!./basic/dropdown-basic').default,
        markup: require('!!raw-loader!./basic/dropdown-basic.html').default,
    },
    manual: {
        title: 'Manual and custom triggers',
        type: NgbdDropdownManual,
        code: require('!!raw-loader!./manual/dropdown-manual').default,
        markup: require('!!raw-loader!./manual/dropdown-manual.html').default,
    },
    split: {
        title: 'Button groups and split buttons',
        type: NgbdDropdownSplit,
        code: require('!!raw-loader!./split/dropdown-split').default,
        markup: require('!!raw-loader!./split/dropdown-split.html').default,
    },
    disabled: {
        title: 'Disabled items',
        type: NgbdDropdownDisabled,
        code: require('!!raw-loader!./disabled/dropdown-disabled').default,
        markup: require('!!raw-loader!./disabled/dropdown-disabled.html').default,
    },
    form: {
        title: 'Mixed menu items and form',
        type: NgbdDropdownForm,
        code: require('!!raw-loader!./form/dropdown-form').default,
        markup: require('!!raw-loader!./form/dropdown-form.html').default,
    },
    container: {
        title: 'Container “body”',
        type: NgbdDropdownContainer,
        code: require('!!raw-loader!./container/dropdown-container').default,
        markup: require('!!raw-loader!./container/dropdown-container.html').default,
    },
    navbar: {
        title: 'Dynamic positioning in a navbar',
        type: NgbdDropdownNavbar,
        code: require('!!raw-loader!./navbar/dropdown-navbar').default,
        markup: require('!!raw-loader!./navbar/dropdown-navbar.html').default,
    },
    config: {
        title: 'Global configuration of dropdowns',
        type: NgbdDropdownConfig,
        code: require('!!raw-loader!./config/dropdown-config').default,
        markup: require('!!raw-loader!./config/dropdown-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/dropdowns/',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/dropdown/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('dropdown', demos),
            },
        ],
    },
];
