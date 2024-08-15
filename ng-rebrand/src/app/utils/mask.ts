import createNumberMask from "../shared/directives/deps/text2mask/createNumberMask";

export interface NumberMaskOptions {
    prefix?: string;
    suffix?: string;
    allowDecimal?: boolean;
    allowNegative?: boolean;
    integerLimit?: number;
    decimalLimit?: number;
    thousandsSeparatorSymbol?: "." | ",";
    decimalSymbol?: "." | ",";
}

export interface NumberMaskConfig extends NumberMaskOptions {
    prefix: string;
    suffix: string;
    thousandsSeparatorSymbol: "." | ",";
    decimalSymbol: "." | ",";
}

export class NumberMask {

    private config: NumberMaskConfig;
    private numberMask: any;

    constructor(opts?: NumberMaskOptions) {

        // DO NOT touch the default values
        this.config = {
            prefix:                     opts?.prefix                    || "",
            suffix:                     opts?.suffix                    || "",
            allowNegative:              opts?.allowNegative             || false,
            allowDecimal:               opts?.allowDecimal              || true,
            integerLimit:               opts?.integerLimit              || 6,
            decimalLimit:               opts?.decimalLimit              || 2,
            thousandsSeparatorSymbol:   opts?.thousandsSeparatorSymbol  || ".",
            decimalSymbol:              opts?.decimalSymbol             || ","
        };

        if (this.config?.thousandsSeparatorSymbol === this.config?.decimalSymbol) {
            throw new Error("NumberMask: thousandsSeparatorSymbol cannot be the same as decimalSymbol.");
        }
        
        this.numberMask = createNumberMask({ ...this.config });
    }

    getMask() {
        return this.numberMask;
    }

    numberToMask(num?: number | null) {
        const numStr = num ? (num + "") : "0"; // Cast number to string or "0"
        return this.numStrToMask(numStr);
    }

    numStrToMask(unmasked?: string | null) {

        const [ prefix, suffix, thousandsSeparator, decimal ] = [
            this.config.prefix,
            this.config.suffix,
            this.config.thousandsSeparatorSymbol,
            this.config.decimalSymbol,
        ];

        unmasked = unmasked || ""; // Guard against falsy values
        
        return prefix + unmasked.replace(thousandsSeparator, decimal) + suffix;
    }

    maskToNumber(numStr?: string | null) {
        const fixed = this.config.prefix + "0" + this.config.suffix;
        return parseFloat(this.maskToNumStr(numStr || fixed));
    }

    maskToNumStr(masked: string) {
        // Remove prefix and suffix
        const fixRemoved = masked.replace(this.config.prefix, "").replace(this.config.suffix, "");
        // If comma is the decimal separator, then remove dots and replace comma with dot
        if (this.config.decimalSymbol === ",") {
            return fixRemoved.replaceAll(".", "").replace(",", ".");
        }
        // Else dot is the decimal separator, so only remove the commas
        return fixRemoved.replaceAll(",", "");
    }
}