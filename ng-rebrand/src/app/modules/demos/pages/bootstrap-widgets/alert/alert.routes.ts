import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { NgbdAlertBasic } from './basic/alert-basic';
import { NgbdAlertConfig } from './config/alert-config';
import { NgbdAlertCustom } from './custom/alert-custom';
import { NgbdAlertSelfclosing } from './selfclosing/alert-selfclosing';
import { NgbdAlertCloseable } from './closeable/alert-closeable';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Basic Alert',
        code: require('!raw-loader!./basic/alert-basic').default,
        markup: require('!raw-loader!./basic/alert-basic.html').default,
        type: NgbdAlertBasic,
    },
    closeable: {
        title: 'Closable Alert',
        code: require('!raw-loader!./closeable/alert-closeable').default,
        markup: require('!raw-loader!./closeable/alert-closeable.html').default,
        type: NgbdAlertCloseable,
    },
    selfclosing: {
        title: 'Self closing alert',
        code: require('!raw-loader!./selfclosing/alert-selfclosing').default,
        markup: require('!raw-loader!./selfclosing/alert-selfclosing.html').default,
        type: NgbdAlertSelfclosing,
    },
    custom: {
        title: 'Custom alert',
        code: require('!raw-loader!./custom/alert-custom').default,
        markup: require('!raw-loader!./custom/alert-custom.html').default,
        type: NgbdAlertCustom,
    },
    config: {
        title: 'Global configuration of alerts',
        code: require('!raw-loader!./config/alert-config').default,
        markup: require('!raw-loader!./config/alert-config.html').default,
        type: NgbdAlertConfig,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/alerts/',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/alert/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('alert', demos),
            },
        ],
    },
];