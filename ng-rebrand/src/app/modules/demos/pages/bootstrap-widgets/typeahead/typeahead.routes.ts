/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdTypeaheadBasic } from './basic/typeahead-basic';
import { NgbdTypeaheadConfig } from './config/typeahead-config';
import { NgbdTypeaheadFocus } from './focus/typeahead-focus';
import { NgbdTypeaheadFormat } from './format/typeahead-format';
import { NgbdTypeaheadHttp } from './http/typeahead-http';
import { NgbdTypeaheadTemplate } from './template/typeahead-template';
import { NgbdTypeaheadPreventManualEntry } from './prevent-manual-entry/typeahead-prevent-manual-entry';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Simple Typeahead',
        type: NgbdTypeaheadBasic,
        code: require('!!raw-loader!./basic/typeahead-basic').default,
        markup: require('!!raw-loader!./basic/typeahead-basic.html').default,
    },
    focus: {
        title: 'Open on focus',
        type: NgbdTypeaheadFocus,
        code: require('!!raw-loader!./focus/typeahead-focus').default,
        markup: require('!!raw-loader!./focus/typeahead-focus.html').default,
    },
    format: {
        title: 'Formatted results',
        type: NgbdTypeaheadFormat,
        code: require('!!raw-loader!./format/typeahead-format').default,
        markup: require('!!raw-loader!./format/typeahead-format.html').default,
    },
    http: {
        title: 'Wikipedia search',
        type: NgbdTypeaheadHttp,
        code: require('!!raw-loader!./http/typeahead-http').default,
        markup: require('!!raw-loader!./http/typeahead-http.html').default,
    },
    template: {
        title: 'Template for results',
        type: NgbdTypeaheadTemplate,
        code: require('!!raw-loader!./template/typeahead-template').default,
        markup: require('!!raw-loader!./template/typeahead-template.html').default,
    },
    'prevent-manual-entry': {
        title: 'Prevent manual entry',
        type: NgbdTypeaheadPreventManualEntry,
        code: require('!!raw-loader!./prevent-manual-entry/typeahead-prevent-manual-entry').default,
        markup: require('!!raw-loader!./prevent-manual-entry/typeahead-prevent-manual-entry.html').default,
    },
    config: {
        title: 'Global configuration of typeaheads',
        type: NgbdTypeaheadConfig,
        code: require('!!raw-loader!./config/typeahead-config').default,
        markup: require('!!raw-loader!./config/typeahead-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/typeahead/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('typeahead', demos),
            },
        ],
    },
];
