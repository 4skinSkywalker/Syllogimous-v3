/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdToastCloseable } from './closeable/toast-closeable';
import { NgbdToastCustomHeader } from './custom-header/toast-custom-header';
import { NgbdToastGlobal } from './howto-global/toast-global';
import { NgbdToastInline } from './inline/toast-inline';
import { NgbdToastPreventAutohide } from './prevent-autohide/toast-prevent-autohide';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    inline: {
        title: 'Declarative inline usage',
        type: NgbdToastInline,
        code: require('!!raw-loader!./inline/toast-inline').default,
        markup: require('!!raw-loader!./inline/toast-inline.html').default,
    },
    'custom-header': {
        title: 'Using a Template as header',
        type: NgbdToastCustomHeader,
        code: require('!!raw-loader!./custom-header/toast-custom-header').default,
        markup: require('!!raw-loader!./custom-header/toast-custom-header.html').default,
    },
    closeable: {
        title: 'Closeable toast',
        type: NgbdToastCloseable,
        code: require('!!raw-loader!./closeable/toast-closeable').default,
        markup: require('!!raw-loader!./closeable/toast-closeable.html').default,
    },
    'prevent-autohide': {
        title: 'Prevent autohide on mouseover',
        type: NgbdToastPreventAutohide,
        code: require('!!raw-loader!./prevent-autohide/toast-prevent-autohide').default,
        markup: require('!!raw-loader!./prevent-autohide/toast-prevent-autohide.html').default,
    },
    'howto-global': {
        title: 'Toast management service',
        type: NgbdToastGlobal,
        code: require('!!raw-loader!./howto-global/toast-global').default,
        markup: require('!!raw-loader!./howto-global/toast-global.html').default,
    },
};


export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/toasts/',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/toast/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('toast', demos),
            },
        ],
    },
];
