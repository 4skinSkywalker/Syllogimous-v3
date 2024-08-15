import { ControlValueAccessor } from "@angular/forms";

export const DUMMY_VALUE_ACCESSOR: ControlValueAccessor = {
    writeValue() { },
    registerOnChange() { },
    registerOnTouched() { }
};

export const supportedTypes = [
    "text",
    "textarea",
    "password",
    "number",
    "year",
    "date",
    "time",
    "datetime",
    "select",
    "checkbox",
    "radio",
    "autocomplete",
    "tagger"
];

export const defaultLimitTextFactory = (limit: number) => {
    return "Limited to " + limit + " items, type for more results.";
}

export const defaultFormatter = (item: any, index: number): any => {
    if (typeof item === "object") {
        return Object.values(item).join(" ");
    }
    else if (typeof item === "string") {
        return item;
    }
    return "";
};

export const defaultFilter = (term: string, item: any) => {
    if (typeof item === "object") {
        const stringifiedValues = JSON.stringify(Object.values(item)).toLowerCase();
        return stringifiedValues.includes(term.toLowerCase());
    }
    else if (typeof item === "string") {
        return item.toLowerCase().includes(term.toLowerCase());
    }
    else {
        return true;
    }
};