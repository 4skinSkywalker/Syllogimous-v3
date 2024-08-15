/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdModalBasic } from './basic/modal-basic';
import { NgbdModalComponent } from './component/modal-component';
import { NgbdModalConfig } from './config/modal-config';
import { NgbdModalFocus } from './focus/modal-focus';
import { NgbdModalOptions } from './options/modal-options';
import { NgbdModalStacked } from './stacked/modal-stacked';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Modal with default options',
        type: NgbdModalBasic,
        code: require('!!raw-loader!./basic/modal-basic').default,
        markup: require('!!raw-loader!./basic/modal-basic.html').default,
    },
    component: {
        title: 'Components as content',
        type: NgbdModalComponent,
        code: require('!!raw-loader!./component/modal-component').default,
        markup: require('!!raw-loader!./component/modal-component.html').default,
    },
    focus: {
        title: 'Focus management',
        type: NgbdModalFocus,
        code: require('!!raw-loader!./focus/modal-focus').default,
        markup: require('!!raw-loader!./focus/modal-focus.html').default,
    },
    options: {
        title: 'Modal with options',
        type: NgbdModalOptions,
        code: require('!!raw-loader!./options/modal-options').default,
        markup: require('!!raw-loader!./options/modal-options.html').default,
    },
    stacked: {
        title: 'Stacked modals',
        type: NgbdModalStacked,
        code: require('!!raw-loader!./stacked/modal-stacked').default,
        markup: require('!!raw-loader!./stacked/modal-stacked.html').default,
    },
    config: {
        title: 'Global configuration of modals',
        type: NgbdModalConfig,
        code: require('!!raw-loader!./config/modal-config').default,
        markup: require('!!raw-loader!./config/modal-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/modal/',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/modal/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('modal', demos),
            },
        ],
    },
];
