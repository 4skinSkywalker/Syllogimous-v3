import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const onlyNumbers = (control: AbstractControl) => {
    const value = control.value;
    if (/^[^0-9]+$/.test(value)) {
        return { onlyNumbers: "Only numbers allowed" };
    }
    return null;
};

const notHelloWorld = (control: AbstractControl) => {
    const value = control.value;
    if (value && value.toLowerCase() === "hello world") {
        return { notHelloWorld: '"hello world" is not allowed' };
    }
    return null;
};

const customMinLength = (control: AbstractControl) => {
    const value = control.value;
    if (value && value !== "joe" && value.length < 4) {
        return { minLength: 'Except "joe" must be more than 4 chars' };
    }
    return null;
};

const customMaxLength = (control: AbstractControl) => {
    const value = control.value;
    if (value && value !== "abracadabra" && value.length > 6) {
        return { maxLength: 'Except "abracadabra" must be less than 6 chars' };
    }
    return null;
};

@Component({
    selector: 'appd-validation',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './validation.html',
})
export class AppdValidation {

    textValidation = new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(6)]);

    onlyNumbers = new FormControl("", [ onlyNumbers, Validators.required ]);
    notHelloWorld = new FormControl("", [ notHelloWorld, Validators.required ]);
    
    customMinLength = new FormControl("", [ customMinLength, Validators.required ]);
    customMaxLength = new FormControl("", [ customMaxLength, Validators.required ]);
}


