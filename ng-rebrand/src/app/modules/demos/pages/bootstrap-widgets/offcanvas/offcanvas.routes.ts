/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdOffcanvasBasic } from './basic/offcanvas-basic';
import { NgbdOffcanvasComponent } from './component/offcanvas-component';
import { NgbdOffcanvasOptions } from './options/offcanvas-options';
import { NgbdOffcanvasFocus } from './focus/offcanvas-focus';
import { NgbdOffcanvasConfig } from './config/offcanvas-config';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Basic offcanvas',
        type: NgbdOffcanvasBasic,
        code: require('!!raw-loader!./basic/offcanvas-basic').default,
        markup: require('!!raw-loader!./basic/offcanvas-basic.html').default,
    },
    component: {
        title: 'Components as content',
        type: NgbdOffcanvasComponent,
        code: require('!!raw-loader!./component/offcanvas-component').default,
        markup: require('!!raw-loader!./component/offcanvas-component.html').default,
    },
    options: {
        title: 'Offcanvas options',
        type: NgbdOffcanvasOptions,
        code: require('!!raw-loader!./options/offcanvas-options').default,
        markup: require('!!raw-loader!./options/offcanvas-options.html').default,
    },
    focus: {
        title: 'Focus management',
        type: NgbdOffcanvasFocus,
        code: require('!!raw-loader!./focus/offcanvas-focus').default,
        markup: require('!!raw-loader!./focus/offcanvas-focus.html').default,
    },
    config: {
        title: 'Global configuration of Offcanvas',
        type: NgbdOffcanvasConfig,
        code: require('!!raw-loader!./config/offcanvas-config').default,
        markup: require('!!raw-loader!./config/offcanvas-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/offcanvas/',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/offcanvas/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('offcanvas', demos),
            },
        ],
    },
];
