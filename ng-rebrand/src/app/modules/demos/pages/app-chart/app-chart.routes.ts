import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { DemosComponent } from '../../demos.component';
import { NgbdDemoListService } from '../../ngbd-demo-list.service';
import { AppdBarChart } from './bar-chart/bar-chart';
import { AppdLineChart } from './line-chart/line-chart';
import { AppdPieChart } from './pie-chart/pie-chart';

declare var require: any;

const demos = {
    LineChart: {
        title: 'Line chart',
        code: require('!raw-loader!./line-chart/line-chart').default,
        markup: require('!raw-loader!./line-chart/line-chart.html').default,
        type: AppdLineChart,
    },
    barChart: {
        title: 'Bar chart',
        code: require('!raw-loader!./bar-chart/bar-chart').default,
        markup: require('!raw-loader!./bar-chart/bar-chart.html').default,
        type: AppdBarChart,
    },
    PieChart: {
        title: 'Pie chart',
        code: require('!raw-loader!./pie-chart/pie-chart').default,
        markup: require('!raw-loader!./pie-chart/pie-chart.html').default,
        type: AppdPieChart,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('app-chart', demos),
            },
        ],
    },
];
