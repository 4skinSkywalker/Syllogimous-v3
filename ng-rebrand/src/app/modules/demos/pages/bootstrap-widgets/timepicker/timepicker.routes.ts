/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdTimepickerAdapter } from './adapter/timepicker-adapter';
import { NgbdTimepickerBasic } from './basic/timepicker-basic';
import { NgbdTimepickerConfig } from './config/timepicker-config';
import { NgbdTimepickerMeridian } from './meridian/timepicker-meridian';
import { NgbdTimepickerSeconds } from './seconds/timepicker-seconds';
import { NgbdTimepickerSpinners } from './spinners/timepicker-spinners';
import { NgbdTimepickerSteps } from './steps/timepicker-steps';
import { NgbdTimepickerValidation } from './validation/timepicker-validation';
import { NgbdTimepickerI18n } from './i18n/timepicker-i18n';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Timepicker',
        type: NgbdTimepickerBasic,
        code: require('!!raw-loader!./basic/timepicker-basic').default,
        markup: require('!!raw-loader!./basic/timepicker-basic.html').default,
    },
    meridian: {
        title: 'Meridian',
        type: NgbdTimepickerMeridian,
        code: require('!!raw-loader!./meridian/timepicker-meridian').default,
        markup: require('!!raw-loader!./meridian/timepicker-meridian.html').default,
    },
    seconds: {
        title: 'Seconds',
        type: NgbdTimepickerSeconds,
        code: require('!!raw-loader!./seconds/timepicker-seconds').default,
        markup: require('!!raw-loader!./seconds/timepicker-seconds.html').default,
    },
    spinners: {
        title: 'Spinners',
        type: NgbdTimepickerSpinners,
        code: require('!!raw-loader!./spinners/timepicker-spinners').default,
        markup: require('!!raw-loader!./spinners/timepicker-spinners.html').default,
    },
    steps: {
        title: 'Custom steps',
        type: NgbdTimepickerSteps,
        code: require('!!raw-loader!./steps/timepicker-steps').default,
        markup: require('!!raw-loader!./steps/timepicker-steps.html').default,
    },
    validation: {
        title: 'Custom validation',
        type: NgbdTimepickerValidation,
        code: require('!!raw-loader!./validation/timepicker-validation').default,
        markup: require('!!raw-loader!./validation/timepicker-validation.html').default,
    },
    adapter: {
        title: 'Custom time adapter',
        type: NgbdTimepickerAdapter,
        code: require('!!raw-loader!./adapter/timepicker-adapter').default,
        markup: require('!!raw-loader!./adapter/timepicker-adapter.html').default,
    },
    i18n: {
        title: 'Internationalization of timepickers',
        type: NgbdTimepickerI18n,
        code: require('!!raw-loader!./i18n/timepicker-i18n').default,
        markup: require('!!raw-loader!./i18n/timepicker-i18n.html').default,
    },
    config: {
        title: 'Global configuration of timepickers',
        type: NgbdTimepickerConfig,
        code: require('!!raw-loader!./config/timepicker-config').default,
        markup: require('!!raw-loader!./config/timepicker-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/timepicker/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('timepicker', demos),
            },
        ],
    },
];
