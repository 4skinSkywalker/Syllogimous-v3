import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { noop } from 'chartist';
import { BarChartConfiguration } from 'src/app/shared/components/chart.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'appd-bar-chart',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './bar-chart.html',
    styles: [`
        app-chart {
            height: 50vh;
        }
    `]
})
export class AppdBarChart {



    bipolarChart: BarChartConfiguration = {
        type: "Bar",
        data: {
            labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
            series: [
                [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
            ]
        },
        options: {
            high: 10,
            low: -10,
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 2 === 0 ? value : null;
                }
            }
        }
    };



    overlappingBars: BarChartConfiguration = {
        type: "Bar",
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
            ]
        },
        options: {
            seriesBarDistance: 10
        },
        responsiveOptions: [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value: any) {
                        return value[0];
                    }
                }
            }]
        ]
    };



    multilineLabels: BarChartConfiguration = {
        type: "Bar",
        data: {
            labels: ['First quarter of the year', 'Second quarter of the year', 'Third quarter of the year', 'Fourth quarter of the year'],
            series: [
                [60000, 40000, 80000, 70000],
                [40000, 30000, 70000, 65000],
                [8000, 3000, 10000, 6000]
            ]
        },
        options: {
            seriesBarDistance: 10,
            axisX: {
                offset: 60
            },
            axisY: {
                offset: 80,
                labelInterpolationFnc: function (value) {
                    return value + ' CHF'
                },
                scaleMinSpace: 15
            }
        }
    };



    horizontalBars: BarChartConfiguration = {
        type: "Bar",
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [
                [5, 4, 3, 7, 5, 10, 3],
                [3, 2, 9, 5, 4, 6, 4]
            ]
        },
        options: {
            seriesBarDistance: 10,
            reverseData: true,
            horizontalBars: true,
            axisY: {
                offset: 70
            }
        }
    };



    extremeResponsiveConfiguration: BarChartConfiguration = {
        type: "Bar",
        data: {
            labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
            series: [
                [5, 4, 3, 7],
                [3, 2, 9, 5],
                [1, 5, 8, 4],
                [2, 3, 4, 6],
                [4, 1, 2, 1]
            ]
        },
        options: {
            // Default mobile configuration
            stackBars: true,
            axisX: {
                labelInterpolationFnc: function (value: string) {
                    return value.split(/\s+/).map(function (word) {
                        return word[0];
                    }).join('');
                }
            },
            axisY: {
                offset: 20
            }
        },
        responsiveOptions: [
            // Options override for media > 400px
            ['screen and (min-width: 400px)', {
                reverseData: true,
                horizontalBars: true,
                axisX: {
                    labelInterpolationFnc: noop
                },
                axisY: {
                    offset: 60
                }
            }],
            // Options override for media > 800px
            ['screen and (min-width: 800px)', {
                stackBars: false,
                seriesBarDistance: 10
            }],
            // Options override for media > 1000px
            ['screen and (min-width: 1000px)', {
                reverseData: false,
                horizontalBars: false,
                seriesBarDistance: 15
            }]
        ]
    };



    distributedSeries: BarChartConfiguration = {
        type: "Bar",
        data: {
            labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            series: [20, 60, 120, 200, 180, 20, 10]
        },
        options: {
            distributeSeries: true
        }
    };



    labelPlacement: BarChartConfiguration = {
        type: "Bar",
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            series: [
                [5, 4, 3, 7, 5, 10, 3],
                [3, 2, 9, 5, 4, 6, 4]
            ]
        },
        options: {
            axisX: {
                // On the x-axis start means top and end means bottom
                position: 'start'
            },
            axisY: {
                // On the y-axis start means left and end means right
                position: 'end'
            }
        }
    };
}


