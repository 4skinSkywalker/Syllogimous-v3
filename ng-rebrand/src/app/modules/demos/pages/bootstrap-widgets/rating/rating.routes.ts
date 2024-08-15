/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdRatingBasic } from './basic/rating-basic';
import { NgbdRatingConfig } from './config/rating-config';
import { NgbdRatingDecimal } from './decimal/rating-decimal';
import { NgbdRatingEvents } from './events/rating-events';
import { NgbdRatingForm } from './form/rating-form';
import { NgbdRatingTemplate } from './template/rating-template';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Basic demo',
        type: NgbdRatingBasic,
        code: require('!!raw-loader!./basic/rating-basic').default,
        markup: require('!!raw-loader!./basic/rating-basic.html').default,
    },
    events: {
        title: 'Events and readonly ratings',
        type: NgbdRatingEvents,
        code: require('!!raw-loader!./events/rating-events').default,
        markup: require('!!raw-loader!./events/rating-events.html').default,
    },
    template: {
        title: 'Custom star template',
        type: NgbdRatingTemplate,
        code: require('!!raw-loader!./template/rating-template').default,
        markup: require('!!raw-loader!./template/rating-template.html').default,
    },
    decimal: {
        title: 'Custom decimal rating',
        type: NgbdRatingDecimal,
        code: require('!!raw-loader!./decimal/rating-decimal').default,
        markup: require('!!raw-loader!./decimal/rating-decimal.html').default,
    },
    form: {
        title: 'Form integration',
        type: NgbdRatingForm,
        code: require('!!raw-loader!./form/rating-form').default,
        markup: require('!!raw-loader!./form/rating-form.html').default,
    },
    config: {
        title: 'Global configuration of ratings',
        type: NgbdRatingConfig,
        code: require('!!raw-loader!./config/rating-config').default,
        markup: require('!!raw-loader!./config/rating-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/rating/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('rating', demos),
            },
        ],
    },
];
