/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdProgressbarBasic } from './basic/progressbar-basic';
import { NgbdProgressbarConfig } from './config/progressbar-config';
import { NgbdProgressbarHeight } from './height/progressbar-height';
import { NgbdProgressbarLabels } from './labels/progressbar-labels';
import { NgbdProgressbarShowvalue } from './showvalue/progressbar-showvalue';
import { NgbdProgressbarStriped } from './striped/progressbar-striped';
import { NgbdProgressbarTextTypes } from './texttypes/progressbar-texttypes';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Contextual progress bars',
        type: NgbdProgressbarBasic,
        code: require('!!raw-loader!./basic/progressbar-basic').default,
        markup: require('!!raw-loader!./basic/progressbar-basic.html').default,
    },
    texttypes: {
        title: 'Contextual text progress bars',
        type: NgbdProgressbarTextTypes,
        code: require('!!raw-loader!./texttypes/progressbar-texttypes').default,
        markup: require('!!raw-loader!./texttypes/progressbar-texttypes.html').default,
    },
    showvalue: {
        title: 'Progress bars with current value labels',
        type: NgbdProgressbarShowvalue,
        code: require('!!raw-loader!./showvalue/progressbar-showvalue').default,
        markup: require('!!raw-loader!./showvalue/progressbar-showvalue.html').default,
    },
    striped: {
        title: 'Striped progress bars',
        type: NgbdProgressbarStriped,
        code: require('!!raw-loader!./striped/progressbar-striped').default,
        markup: require('!!raw-loader!./striped/progressbar-striped.html').default,
    },
    labels: {
        title: 'Progress bars with custom labels',
        type: NgbdProgressbarLabels,
        code: require('!!raw-loader!./labels/progressbar-labels').default,
        markup: require('!!raw-loader!./labels/progressbar-labels.html').default,
    },
    height: {
        title: 'Progress bars with height',
        type: NgbdProgressbarHeight,
        code: require('!!raw-loader!./height/progressbar-height').default,
        markup: require('!!raw-loader!./height/progressbar-height.html').default,
    },
    config: {
        title: 'Global configuration of progress bars',
        type: NgbdProgressbarConfig,
        code: require('!!raw-loader!./config/progressbar-config').default,
        markup: require('!!raw-loader!./config/progressbar-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/progress/',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/progressbar/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('progressbar', demos),
            },
        ],
    },
];
