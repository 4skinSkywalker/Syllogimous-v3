import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'appd-wizard-basic',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './wizard-basic.html',
})
export class AppdWizardBasic {
    
    disabled = true;
    
}