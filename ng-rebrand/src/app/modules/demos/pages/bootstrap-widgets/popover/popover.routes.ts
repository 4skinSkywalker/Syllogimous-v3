/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdPopoverAutoclose } from './autoclose/popover-autoclose';
import { NgbdPopoverBasic } from './basic/popover-basic';
import { NgbdPopoverConfig } from './config/popover-config';
import { NgbdPopoverContainer } from './container/popover-container';
import { NgbdPopoverCustomclass } from './customclass/popover-customclass';
import { NgbdPopoverDelay } from './delay/popover-delay';
import { NgbdPopoverTplcontent } from './tplcontent/popover-tplcontent';
import { NgbdPopoverTplwithcontext } from './tplwithcontext/popover-tplwithcontext';
import { NgbdPopoverTriggers } from './triggers/popover-triggers';
import { NgbdPopoverVisibility } from './visibility/popover-visibility';
import { NgbdPopoverTarget } from './custom-target/popover-target';
import { Routes } from '@angular/router';
import { NgbdPopoverOptions } from './options/popover-options';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Quick and easy popovers',
        type: NgbdPopoverBasic,
        code: require('!!raw-loader!./basic/popover-basic').default,
        markup: require('!!raw-loader!./basic/popover-basic.html').default,
    },
    tplcontent: {
        title: 'HTML and bindings in popovers',
        type: NgbdPopoverTplcontent,
        code: require('!!raw-loader!./tplcontent/popover-tplcontent').default,
        markup: require('!!raw-loader!./tplcontent/popover-tplcontent.html').default,
    },
    triggers: {
        title: 'Custom and manual triggers',
        type: NgbdPopoverTriggers,
        code: require('!!raw-loader!./triggers/popover-triggers').default,
        markup: require('!!raw-loader!./triggers/popover-triggers.html').default,
    },
    autoclose: {
        title: 'Automatic closing with keyboard and mouse',
        type: NgbdPopoverAutoclose,
        code: require('!!raw-loader!./autoclose/popover-autoclose').default,
        markup: require('!!raw-loader!./autoclose/popover-autoclose.html').default,
    },
    tplwithcontext: {
        title: 'Context and manual triggers',
        type: NgbdPopoverTplwithcontext,
        code: require('!!raw-loader!./tplwithcontext/popover-tplwithcontext').default,
        markup: require('!!raw-loader!./tplwithcontext/popover-tplwithcontext.html').default,
    },
    target: {
        title: 'Custom target',
        type: NgbdPopoverTarget,
        code: require('!!raw-loader!./custom-target/popover-target').default,
        markup: require('!!raw-loader!./custom-target/popover-target.html').default,
    },
    delay: {
        title: 'Open and close delays',
        type: NgbdPopoverDelay,
        code: require('!!raw-loader!./delay/popover-delay').default,
        markup: require('!!raw-loader!./delay/popover-delay.html').default,
    },
    visibility: {
        title: 'Popover visibility events',
        type: NgbdPopoverVisibility,
        code: require('!!raw-loader!./visibility/popover-visibility').default,
        markup: require('!!raw-loader!./visibility/popover-visibility.html').default,
    },
    container: {
        title: 'Append popover in the body',
        type: NgbdPopoverContainer,
        code: require('!!raw-loader!./container/popover-container').default,
        markup: require('!!raw-loader!./container/popover-container.html').default,
    },
    customclass: {
        title: 'Popover with custom class',
        type: NgbdPopoverCustomclass,
        code: require('!!raw-loader!./customclass/popover-customclass').default,
        markup: require('!!raw-loader!./customclass/popover-customclass.html').default,
    },
    options: {
        title: 'Popper options',
        type: NgbdPopoverOptions,
        code: require('!!raw-loader!./options/popover-options').default,
        markup: require('!!raw-loader!./options/popover-options.html').default,
    },
    config: {
        title: 'Global configuration of popovers',
        type: NgbdPopoverConfig,
        code: require('!!raw-loader!./config/popover-config').default,
        markup: require('!!raw-loader!./config/popover-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/popovers/',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/popover/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('popover', demos),
            },
        ],
    },
];
