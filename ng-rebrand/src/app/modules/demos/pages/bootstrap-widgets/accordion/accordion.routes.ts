import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { NgbdAccordionBasic } from './basic/accordion-basic';
import { NgbdAccordionConfig } from './config/accordion-config';
import { NgbdAccordionHeader } from './header/accordion-header';
import { NgbdAccordionPreventchange } from './preventchange/accordion-preventchange';
import { NgbdAccordionStatic } from './static/accordion-static';
import { NgbdAccordionToggle } from './toggle/accordion-toggle';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Accordion',
        code: require('!raw-loader!./basic/accordion-basic').default,
        markup: require('!raw-loader!./basic/accordion-basic.html').default,
        type: NgbdAccordionBasic,
    },
    static: {
        title: 'One open panel at a time',
        code: require('!!raw-loader!./static/accordion-static').default,
        markup: require('!!raw-loader!./static/accordion-static.html').default,
        type: NgbdAccordionStatic,
    },
    toggle: {
        title: 'Toggle panels',
        code: require('!!raw-loader!./toggle/accordion-toggle').default,
        markup: require('!!raw-loader!./toggle/accordion-toggle.html').default,
        type: NgbdAccordionToggle,
    },
    header: {
        title: 'Custom header',
        code: require('!!raw-loader!./header/accordion-header').default,
        markup: require('!!raw-loader!./header/accordion-header.html').default,
        type: NgbdAccordionHeader,
    },
    preventchange: {
        title: 'Prevent panel toggle',
        code: require('!!raw-loader!./preventchange/accordion-preventchange').default,
        markup: require('!!raw-loader!./preventchange/accordion-preventchange.html').default,
        type: NgbdAccordionPreventchange,
    },
    config: {
        title: 'Global configuration of accordions',
        code: require('!!raw-loader!./config/accordion-config').default,
        markup: require('!!raw-loader!./config/accordion-config.html').default,
        type: NgbdAccordionConfig,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/collapse/#accordion-example',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/accordion/overview',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('accordion', demos),
            },
        ],
    },
];
