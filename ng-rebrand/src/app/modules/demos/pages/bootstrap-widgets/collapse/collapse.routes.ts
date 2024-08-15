import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { NgbdCollapseBasic } from './basic/collapse-basic';
import { NgbdCollapseHorizontal } from './horizontal/collapse-horizontal';
import { NgbdCollapseNavbar } from './navbar/collapse-navbar';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Collapse',
        type: NgbdCollapseBasic,
        code: require('!!raw-loader!./basic/collapse-basic').default,
        markup: require('!!raw-loader!./basic/collapse-basic.html').default,
    },
    horizontal: {
        title: 'Horizontal collapse',
        type: NgbdCollapseHorizontal,
        code: require('!!raw-loader!./horizontal/collapse-horizontal').default,
        markup: require('!!raw-loader!./horizontal/collapse-horizontal.html').default,
    },
    navbar: {
        title: 'Responsive Navbar',
        type: NgbdCollapseNavbar,
        code: require('!!raw-loader!./navbar/collapse-navbar').default,
        markup: require('!!raw-loader!./navbar/collapse-navbar.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/collapse/',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/collapse/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('collapse', demos),
            },
        ],
    },
];
