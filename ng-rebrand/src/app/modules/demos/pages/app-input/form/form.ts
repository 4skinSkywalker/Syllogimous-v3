import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { states } from '../autocomplete/mock';
import { flavorList } from '../tagger/mock';

const defaultState = { name: "Hawaii", flag: "e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png" };
const defaultFlavor = { id: 0, name: "Banana" };

@Component({
    selector: 'appd-form',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './form.html',
})
export class AppdForm {

    states = states; // imported from autocomplete/mock
    statesFormatter = (state: any) => state.name;
    statesFilter = (term: string, state: any) => {
        return state.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    }

    flavorList = flavorList; // imported from tagger/mock
    flavorsFormatter = (flavor: any) => flavor.name;
    flavorsFilter = (term: string, flavor: any) => {
        return flavor.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    }

    form = new FormGroup({
        firstName: new FormControl<string | null>(null),
        lastName: new FormControl<string | null>(null),
        email: new FormControl<string | null>(null, [ Validators.required, Validators.email ]),
        city: new FormControl<string | null>(null, [ Validators.required ]),
        state: new FormControl(defaultState, [ Validators.required ]),
        zip: new FormControl<number | null>(null, [ Validators.required ]),
        flavors: new FormControl([ defaultFlavor ]),
        agree: new FormControl(false, [ Validators.requiredTrue ])
    });

    disableForm = new FormControl(false);
    disableFields = new FormControl(false);

    ngOnInit() {
        this.disableForm.valueChanges
            .subscribe(disabled =>
                disabled
                    ? this.form.disable()
                    : this.form.enable()
            );
    }

    submit() {
        alert("Submitted!");
    }

    getFormattedForm() {
        return JSON.stringify(this.form.getRawValue(), null, 4);
    }
}
