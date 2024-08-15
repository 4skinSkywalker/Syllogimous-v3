import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PieChartConfiguration } from 'src/app/shared/components/chart.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'appd-pie-chart',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './pie-chart.html',
    styles: [`
        app-chart {
            height: 50vh;
        }
    `]
})
export class AppdPieChart {


    data = { series: [5, 3, 4] };
    sum(a: number, b: number) { return a + b };
    simplePieChart: PieChartConfiguration = {
        type: "Pie",
        data: this.data,
        options: {
            labelInterpolationFnc: (value: number) => {
                return Math.round(value / this.data.series.reduce(this.sum) * 100) + '%';
            }
        }
    };



    customLabels: PieChartConfiguration = {
        type: "Pie",
        data: {
            labels: ['Bananas', 'Apples', 'Grapes'],
            series: [20, 15, 40]
        },
        options: {
            labelInterpolationFnc: function (value: any) {
                return value[0]
            }
        },
        responsiveOptions: [
            ['screen and (min-width: 640px)', {
                chartPadding: 30,
                labelOffset: 100,
                labelDirection: 'explode',
                labelInterpolationFnc: function (value) {
                    return value;
                }
            }],
            ['screen and (min-width: 1024px)', {
                labelOffset: 80,
                chartPadding: 20
            }]
        ]
    };



    gauge: PieChartConfiguration = {
        type: "Pie",
        data: {
            series: [20, 10, 30, 40]
        },
        options: {
            donut: true,
            donutWidth: 60,
            startAngle: 270,
            total: 200,
            showLabel: true
        }
    };
}


