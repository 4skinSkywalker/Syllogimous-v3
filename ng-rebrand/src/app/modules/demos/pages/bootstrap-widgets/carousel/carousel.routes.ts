/* eslint-disable @typescript-eslint/no-var-requires */
import { NgbdCarouselBasic } from './basic/carousel-basic';
import { NgbdCarouselConfig } from './config/carousel-config';
import { NgbdCarouselNavigation } from './navigation/carousel-navigation';
import { NgbdCarouselPause } from './pause/carousel-pause';
import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { DemosComponent } from '../../../demos.component';
import { NgbdDemoListService } from '../../../ngbd-demo-list.service';

declare var require: any;

const demos = {
    basic: {
        title: 'Carousel',
        type: NgbdCarouselBasic,
        code: require('!!raw-loader!./basic/carousel-basic').default,
        markup: require('!!raw-loader!./basic/carousel-basic.html').default,
    },
    navigation: {
        title: 'Navigation arrows and indicators',
        type: NgbdCarouselNavigation,
        code: require('!!raw-loader!./navigation/carousel-navigation').default,
        markup: require('!!raw-loader!./navigation/carousel-navigation.html').default,
    },
    pause: {
        title: 'Pause/cycle',
        type: NgbdCarouselPause,
        code: require('!!raw-loader!./pause/carousel-pause').default,
        markup: require('!!raw-loader!./pause/carousel-pause.html').default,
    },
    config: {
        title: 'Global configuration of carousels',
        type: NgbdCarouselConfig,
        code: require('!!raw-loader!./config/carousel-config').default,
        markup: require('!!raw-loader!./config/carousel-config.html').default,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        data: {
            bootstrap: 'https://getbootstrap.com/docs/%version%/components/carousel/',
            ngBootstrap: 'https://ng-bootstrap.github.io/releases/%version%/#/components/carousel/examples',
        },
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('carousel', demos),
            },
        ],
    },
];
