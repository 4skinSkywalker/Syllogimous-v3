import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MonthpickerStruct } from 'src/app/shared/components/monthpicker/monthpicker.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'appd-date',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './date.html',
})
export class AppdDate {

    date1 = new FormControl();
    date2 = new FormControl();
    date3 = new FormControl();

    year1 = new FormControl();
    year2 = new FormControl(2023);

    startMonth = new FormControl<MonthpickerStruct | null>(null, [Validators.required]);
    endMonth = new FormControl<MonthpickerStruct | null>(null, [Validators.required]);

    monthWithoutYear = new FormControl<MonthpickerStruct | null>(null, [Validators.required]);
}
