/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdNavBasic } from './basic/nav-basic';
import { NgbdNavMarkup } from './markup/nav-markup';
import { NgbdNavConfig } from './config/nav-config';
import { NgbdNavCustomStyle } from './custom-style/nav-custom-style';
import { NgbdNavSelection } from './selection/nav-selection';
import { NgbdNavDynamic } from './dynamic/nav-dynamic';
import { NgbdNavKeep } from './keep-content/nav-keep-content';
import { NgbdNavVertical } from './vertical/nav-vertical';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Basic navs',
        type: NgbdNavBasic,
        code: require('!!raw-loader!./basic/nav-basic').default,
        markup: require('!!raw-loader!./basic/nav-basic.html').default,
    },
    markup: {
        title: 'Alternative markup',
        type: NgbdNavMarkup,
        code: require('!!raw-loader!./markup/nav-markup').default,
        markup: require('!!raw-loader!./markup/nav-markup.html').default,
    },
    vertical: {
        title: 'Vertical pills',
        type: NgbdNavVertical,
        code: require('!!raw-loader!./vertical/nav-vertical').default,
        markup: require('!!raw-loader!./vertical/nav-vertical.html').default,
    },
    selection: {
        title: 'Selecting navs',
        type: NgbdNavSelection,
        code: require('!!raw-loader!./selection/nav-selection').default,
        markup: require('!!raw-loader!./selection/nav-selection.html').default,
    },
    'keep-content': {
        title: 'Keep content',
        type: NgbdNavKeep,
        code: require('!!raw-loader!./keep-content/nav-keep-content').default,
        markup: require('!!raw-loader!./keep-content/nav-keep-content.html').default,
    },
    dynamic: {
        title: 'Dynamic navs',
        type: NgbdNavDynamic,
        code: require('!!raw-loader!./dynamic/nav-dynamic').default,
        markup: require('!!raw-loader!./dynamic/nav-dynamic.html').default,
    },
    'custom-style': {
        title: 'Custom style',
        type: NgbdNavCustomStyle,
        code: require('!!raw-loader!./custom-style/nav-custom-style').default,
        markup: require('!!raw-loader!./custom-style/nav-custom-style.html').default,
    },
    config: {
        title: 'Global configuration of navs',
        type: NgbdNavConfig,
        code: require('!!raw-loader!./config/nav-config').default,
        markup: require('!!raw-loader!./config/nav-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/navs/',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/nav/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('nav', demos),
            },
        ]
    },
];
