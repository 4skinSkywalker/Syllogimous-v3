import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'appd-text',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './text.html',
})
export class AppdText {

    text = new FormControl();
    number = new FormControl();
    password = new FormControl();
    textarea = new FormControl();

    textDisabled = new FormControl();
    numberDisabled = new FormControl();
    passwordDisabled = new FormControl();
    textareaDisabled = new FormControl();

}


