import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FixedScaleAxis, Interpolation } from 'chartist';
import { format } from 'date-fns';
import { LineChartConfiguration } from 'src/app/shared/components/chart.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'appd-line-chart',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './line-chart.html',
    styles: [`
        app-chart {
            height: 50vh;
        }
    `]
})
export class AppdLineChart {



    simpleLineChart: LineChartConfiguration = {
        type: "Line",
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            series: [
                [12, 9, 7, 8, 5],
                [2, 1, 3.5, 7, 3],
                [1, 3, 4, 5, 6]
            ]
        },
        options: {
            fullWidth: true,
            chartPadding: {
                right: 40
            }
        }
    };



    holesInData: LineChartConfiguration = {
        type: "Line",
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            series: [
                [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
                [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null],
                [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null],
                [{ x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: undefined }, { x: 6, y: 4 }, { x: 7, y: null }, { x: 8, y: 4 }, { x: 9, y: 4 }]
            ]
        },
        options: {
            fullWidth: true,
            chartPadding: {
                right: 10
            },
            low: 0
        }
    };



    filledHolesInData: LineChartConfiguration = {
        type: "Line",
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            series: [
                [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
                [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null],
                [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null],
                [{ x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: undefined }, { x: 6, y: 4 }, { x: 7, y: null }, { x: 8, y: 4 }, { x: 9, y: 4 }]
            ]
        },
        options: {
            fullWidth: true,
            chartPadding: {
                right: 10
            },
            lineSmooth: Interpolation.cardinal({
                fillHoles: true,
            }),
            low: 0
        }
    };



    onlyWholeNumbers: LineChartConfiguration = {
        type: "Line",
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
                [1, 2, 3, 1, -2, 0, 1, 0],
                [-2, -1, -2, -1, -3, -1, -2, -1],
                [0, 0, 0, 1, 2, 3, 2, 1],
                [3, 2, 1, 0.5, 1, 0, -1, -3]
            ]
        },
        options: {
            high: 3,
            low: -3,
            fullWidth: true,
            // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
            axisY: {
                onlyInteger: true,
                offset: 20
            }
        }
    };



    times(n: number) { return Array.apply(null, new Array(n)); };
    lineScatterDiagram: LineChartConfiguration = {
        type: "Line",
        data: this.times(52)
            .map(Math.random)
            .reduce(
                function(data, rnd: number, index: number) {
                        data.labels.push(index + 1);
                        data.series.forEach(series => series.push(Math.random() * 100));
                
                        return data;
                },
                {
                    labels: [] as number[],
                    series: this.times(4).map(() => new Array())
                }
            ),
        options: {
            showLine: false,
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 13 === 0 ? 'W' + value : null;
                }
            }
        }
    };



    lineChartWithArea: LineChartConfiguration = {
        type: "Line",
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
                [5, 9, 7, 8, 5, 3, 5, 4]
            ]
        },
        options: {
            low: 0,
            showArea: true
        }
    };



    bipolarLineChart: LineChartConfiguration = {
        type: "Line",
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
                [1, 2, 3, 1, -2, 0, 1, 0],
                [-2, -1, -2, -1, -2.5, -1, -2, -1],
                [0, 0, 0, 1, 2, 2.5, 2, 1],
                [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
            ]
        },
        options: {
            high: 3,
            low: -3,
            showArea: true,
            showLine: false,
            showPoint: false,
            fullWidth: true,
            axisX: {
                showLabel: false,
                showGrid: false
            }
        }
    };



    lineSmoothing: LineChartConfiguration = {
        type: "Line",
        data: {
            labels: [1, 2, 3, 4, 5],
            series: [
                [1, 5, 10, 0, 1],
                [10, 15, 0, 1, 2]
            ]
        },
        options: {
            // Remove this configuration to see that chart rendered with cardinal spline interpolation
            // Sometimes, on large jumps in data values, it's better to use simple smoothing.
            lineSmooth: Interpolation.simple({
                divisor: 2
            }),
            fullWidth: true,
            chartPadding: {
                right: 20
            },
            low: 0
        }
    };



    seriesOverrides: LineChartConfiguration = {
        type: "Line",
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
            // Naming the series with the series object array notation
            series: [{
                name: 'series-1',
                data: [5, 2, -4, 2, 0, -2, 5, -3]
            }, {
                name: 'series-2',
                data: [4, 3, 5, 3, 1, 3, 6, 4]
            }, {
                name: 'series-3',
                data: [2, 4, 3, 1, 4, 5, 3, 2]
            }]
        },
        options: {
            fullWidth: true,
            // Within the series options you can use the series names
            // to specify configuration that will only be used for the
            // specific series.
            series: {
                'series-1': {
                    lineSmooth: Interpolation.step()
                },
                'series-2': {
                    lineSmooth: Interpolation.simple(),
                    showArea: true
                },
                'series-3': {
                    showPoint: false
                }
            }
        },
        responsiveOptions: [
            // You can even use responsive configuration overrides to
            // customize your series configuration even further!
            ['screen and (max-width: 320px)', {
                series: {
                    'series-1': {
                        lineSmooth: Interpolation.none()
                    },
                    'series-2': {
                        lineSmooth: Interpolation.none(),
                        showArea: false
                    },
                    'series-3': {
                        lineSmooth: Interpolation.none(),
                        showPoint: true
                    }
                }
            }]
        ]
    };



    timeSeriesWithDateFns: LineChartConfiguration = {
        type: "Line",
        data: {
            series: [
                {
                    name: 'series-1',
                    data: [
                        { x: new Date(143134652600), y: 53 },
                        { x: new Date(143234652600), y: 40 },
                        { x: new Date(143340052600), y: 45 },
                        { x: new Date(143366652600), y: 40 },
                        { x: new Date(143410652600), y: 20 },
                        { x: new Date(143508652600), y: 32 },
                        { x: new Date(143569652600), y: 18 },
                        { x: new Date(143579652600), y: 11 }
                    ]
                },
                {
                    name: 'series-2',
                    data: [
                        { x: new Date(143134652600), y: 53 },
                        { x: new Date(143234652600), y: 35 },
                        { x: new Date(143334652600), y: 30 },
                        { x: new Date(143384652600), y: 30 },
                        { x: new Date(143568652600), y: 10 }
                    ]
                }
            ]
        },
        options: {
            axisX: {
                type: FixedScaleAxis,
                divisor: 5,
                labelInterpolationFnc: function (value: number) {
                    return format(new Date(value), "MMM d");
                }
            }
        }
    };
}


