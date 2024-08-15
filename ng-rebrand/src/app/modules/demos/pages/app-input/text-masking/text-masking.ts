import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NumberMask } from 'src/app/utils/mask';
import { emailMask } from 'src/app/shared/directives/deps/text2mask/textMaskAddons';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'appd-text-masking',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './text-masking.html',
})
export class AppdTextMasking {

    numMask = new NumberMask({
        suffix: " €",
        allowDecimal: true,
        allowNegative: true,
        thousandsSeparatorSymbol: ".",
        decimalSymbol: ","
    });
    euro = new FormControl(this.numMask.numberToMask(1234.56));

    phoneMask = [ "+", /\d/, /\d/, " ", /[1-9]/, /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, /\d/ ];
    phone = new FormControl("+39 347 00 00 000");

    emailMask = emailMask;
    email = new FormControl("fredocorleone@email.com");

    unmaskPhone(maskedPhone?: string | null) {
        return (maskedPhone || "").replaceAll(/[^+0-9]/g, "");
    }
}


