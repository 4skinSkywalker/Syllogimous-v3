/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdTooltipAutoclose } from './autoclose/tooltip-autoclose';
import { NgbdTooltipBasic } from './basic/tooltip-basic';
import { NgbdTooltipConfig } from './config/tooltip-config';
import { NgbdTooltipContainer } from './container/tooltip-container';
import { NgbdTooltipCustomclass } from './customclass/tooltip-customclass';
import { NgbdTooltipDelay } from './delay/tooltip-delay';
import { NgbdTooltipTarget } from './custom-target/tooltip-target';
import { NgbdTooltipTplcontent } from './tplcontent/tooltip-tplcontent';
import { NgbdTooltipTplwithcontext } from './tplwithcontext/tooltip-tplwithcontext';
import { NgbdTooltipTriggers } from './triggers/tooltip-triggers';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Quick and easy tooltips',
        type: NgbdTooltipBasic,
        code: require('!!raw-loader!./basic/tooltip-basic').default,
        markup: require('!!raw-loader!./basic/tooltip-basic.html').default,
    },
    tplcontent: {
        title: 'HTML and bindings in tooltips',
        type: NgbdTooltipTplcontent,
        code: require('!!raw-loader!./tplcontent/tooltip-tplcontent').default,
        markup: require('!!raw-loader!./tplcontent/tooltip-tplcontent.html').default,
    },
    triggers: {
        title: 'Custom and manual triggers',
        type: NgbdTooltipTriggers,
        code: require('!!raw-loader!./triggers/tooltip-triggers').default,
        markup: require('!!raw-loader!./triggers/tooltip-triggers.html').default,
    },
    autoclose: {
        title: 'Automatic closing with keyboard and mouse',
        type: NgbdTooltipAutoclose,
        code: require('!!raw-loader!./autoclose/tooltip-autoclose').default,
        markup: require('!!raw-loader!./autoclose/tooltip-autoclose.html').default,
    },
    tplwithcontext: {
        title: 'Context and manual triggers',
        type: NgbdTooltipTplwithcontext,
        code: require('!!raw-loader!./tplwithcontext/tooltip-tplwithcontext').default,
        markup: require('!!raw-loader!./tplwithcontext/tooltip-tplwithcontext.html').default,
    },
    target: {
        title: 'Custom target',
        type: NgbdTooltipTarget,
        code: require('!!raw-loader!./custom-target/tooltip-target').default,
        markup: require('!!raw-loader!./custom-target/tooltip-target.html').default,
    },
    delay: {
        title: 'Open and close delays',
        type: NgbdTooltipDelay,
        code: require('!!raw-loader!./delay/tooltip-delay').default,
        markup: require('!!raw-loader!./delay/tooltip-delay.html').default,
    },
    container: {
        title: 'Append tooltip in the body',
        type: NgbdTooltipContainer,
        code: require('!!raw-loader!./container/tooltip-container').default,
        markup: require('!!raw-loader!./container/tooltip-container.html').default,
    },
    customclass: {
        title: 'Tooltip with custom class',
        type: NgbdTooltipCustomclass,
        code: require('!!raw-loader!./customclass/tooltip-customclass').default,
        markup: require('!!raw-loader!./customclass/tooltip-customclass.html').default,
    },
    config: {
        title: 'Global configuration of tooltips',
        type: NgbdTooltipConfig,
        code: require('!!raw-loader!./config/tooltip-config').default,
        markup: require('!!raw-loader!./config/tooltip-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/tooltips/',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/tooltip/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('tooltip', demos),
            },
        ],
    },
];
