/* eslint-disable @typescript-eslint/no-var-requires */
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { NgbdDatepickerAdapter } from './adapter/datepicker-adapter';
import { NgbdDatepickerBasic } from './basic/datepicker-basic';
import { NgbdDatepickerConfig } from './config/datepicker-config';
import { NgbdDatepickerCustomday } from './customday/datepicker-customday';
import { NgbdDatepickerCustommonth } from './custommonth/datepicker-custommonth';
import { NgbdDatepickerDisabled } from './disabled/datepicker-disabled';
import { NgbdDatepickerFootertemplate } from './footertemplate/datepicker-footertemplate';
import { NgbdDatepickerI18n } from './i18n/datepicker-i18n';
import { NgbdDatepickerKeyboard } from './keyboard/datepicker-keyboard';
import { NgbdDatepickerMultiple } from './multiple/datepicker-multiple';
import { NgbdDatepickerPopup } from './popup/datepicker-popup';
import { NgbdDatepickerPositiontarget } from './positiontarget/datepicker-positiontarget';
import { NgbdDatepickerRangePopup } from './range-popup/datepicker-range-popup';
import { NgbdDatepickerRange } from './range/datepicker-range';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Basic datepicker',
        type: NgbdDatepickerBasic,
        code: require('!!raw-loader!./basic/datepicker-basic').default,
        markup: require('!!raw-loader!./basic/datepicker-basic.html').default,
    },
    popup: {
        title: 'Datepicker in a popup',
        type: NgbdDatepickerPopup,
        code: require('!!raw-loader!./popup/datepicker-popup').default,
        markup: require('!!raw-loader!./popup/datepicker-popup.html').default,
    },
    multiple: {
        title: 'Multiple months',
        type: NgbdDatepickerMultiple,
        code: require('!!raw-loader!./multiple/datepicker-multiple').default,
        markup: require('!!raw-loader!./multiple/datepicker-multiple.html').default,
    },
    range: {
        title: 'Range selection',
        type: NgbdDatepickerRange,
        code: require('!!raw-loader!./range/datepicker-range').default,
        markup: require('!!raw-loader!./range/datepicker-range.html').default,
    },
    'range-popup': {
        title: 'Range selection in a popup',
        type: NgbdDatepickerRangePopup,
        code: require('!!raw-loader!./range-popup/datepicker-range-popup').default,
        markup: require('!!raw-loader!./range-popup/datepicker-range-popup.html').default,
    },
    disabled: {
        title: 'Disabled datepicker',
        type: NgbdDatepickerDisabled,
        code: require('!!raw-loader!./disabled/datepicker-disabled').default,
        markup: require('!!raw-loader!./disabled/datepicker-disabled.html').default,
    },
    adapter: {
        title: 'Custom date adapter and formatter',
        type: NgbdDatepickerAdapter,
        code: require('!!raw-loader!./adapter/datepicker-adapter').default,
        markup: require('!!raw-loader!./adapter/datepicker-adapter.html').default,
    },
    i18n: {
        title: 'Internationalization of datepickers',
        type: NgbdDatepickerI18n,
        code: require('!!raw-loader!./i18n/datepicker-i18n').default,
        markup: require('!!raw-loader!./i18n/datepicker-i18n.html').default,
    },
    customday: {
        title: 'Custom day view',
        type: NgbdDatepickerCustomday,
        code: require('!!raw-loader!./customday/datepicker-customday').default,
        markup: require('!!raw-loader!./customday/datepicker-customday.html').default,
    },
    custommonth: {
        title: 'Custom month layout',
        type: NgbdDatepickerCustommonth,
        code: require('!!raw-loader!./custommonth/datepicker-custommonth').default,
        markup: require('!!raw-loader!./custommonth/datepicker-custommonth.html').default,
    },
    footertemplate: {
        title: 'Footer template',
        type: NgbdDatepickerFootertemplate,
        code: require('!!raw-loader!./footertemplate/datepicker-footertemplate').default,
        markup: require('!!raw-loader!./footertemplate/datepicker-footertemplate.html').default,
    },
    positiontarget: {
        title: 'Position target',
        type: NgbdDatepickerPositiontarget,
        code: require('!!raw-loader!./positiontarget/datepicker-positiontarget').default,
        markup: require('!!raw-loader!./positiontarget/datepicker-positiontarget.html').default,
    },
    keyboard: {
        title: 'Custom keyboard navigation',
        type: NgbdDatepickerKeyboard,
        code: require('!!raw-loader!./keyboard/datepicker-keyboard').default,
        markup: require('!!raw-loader!./keyboard/datepicker-keyboard.html').default,
    },
    config: {
        title: 'Global configuration of datepickers',
        type: NgbdDatepickerConfig,
        code: require('!!raw-loader!./config/datepicker-config').default,
        markup: require('!!raw-loader!./config/datepicker-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/datepicker/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('datepicker', demos),
            },
        ],
    },
];
