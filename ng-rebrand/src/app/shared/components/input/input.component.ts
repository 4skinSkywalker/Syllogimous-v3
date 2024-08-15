import { Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self, SimpleChanges } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { isEqual } from 'lodash';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject, takeUntil } from 'rxjs';
import { guid } from 'src/app/utils/uuid';
import { DUMMY_VALUE_ACCESSOR, defaultFilter, defaultFormatter, defaultLimitTextFactory, supportedTypes } from './constants';

export interface SelectOption {
    value: any;
    text: string;
    disabled?: boolean;
}

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    providers: [{
        provide: ControlContainer,
        useExisting: FormGroupDirective
    }]
})
export class InputComponent implements OnInit, OnDestroy {

    destroy$ = new Subject<void>();

    guid!: string;
    _name!: string;

    currYear = new Date().getFullYear();
    yearPlusMinus = 6; // Example: 2017 ... 2023 ... 2029
    yearOptions: SelectOption[] = this.getYearOptions();

    @Input("floatingLabel") floatingLabel = false;
    @Input("feedback") feedback = true;
    @Input("disabled") disabled = false;
    @Input("type") type = "text";
    @Input("placeholder") placeholder = ' ';
    @Input("onlyCustomErrors") onlyCustomErrors = false;

    @Input("step") step?: any;

    min?: any;
    @Input("min")
    set _min(val: any) {
        this.min = val;
        this.yearOptions = this.getYearOptions(true);
    }

    max?: any;
    @Input("max") 
    set _max(val: any) {
        this.max = val;
        this.yearOptions = this.getYearOptions(true);
    }

    @Input("minlength") minLength?: any;
    @Input("maxlength") maxLength?: any;

    @Input("name") name!: string;
    @Input("label") label?: string;
    @Input("helper") helper!: string;
    @Input("mask") mask?: Array<string | RegExp>;
    @Input("ngControl") ngControl!: FormControl;

    // Autocomplete and tagger properties
    @Input("deduped") deduped = true;
    @Input("freeTag") freeTag = false;
    @Input("limit") limit: false | number = false;
    @Input("limitTextFactory") limitTextMaker = defaultLimitTextFactory;
    @Input("formatter") formatter = defaultFormatter;
    @Input("filter") filter = defaultFilter;
    @Input("template") template!: any;
    @Output("selectItem") selectItemEmitter = new EventEmitter<NgbTypeaheadSelectItemEvent>();

    @Input("customSearch") customSearch!: OperatorFunction<string, readonly any[]>;
    search!: OperatorFunction<string, readonly any[]>;
    instance!: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    _autocompleteChoice!: any;
    set autocompleteChoice(value: any) {
        this._autocompleteChoice = value;
        this.onAutocompleteChange(value);
    }
    get autocompleteChoice() {
        return this._autocompleteChoice;
    }

    options$ = new BehaviorSubject<any[] | null>(null);
    @Input("options")
    set options(options: any[] | null) {
        this.options$.next(options);
    };
    get options() {
        if (this.freeTag) {
            return [];
        }
        return this.options$.getValue();
    };

    tags: any[] = [];

    constructor(@Self() @Optional() private formControlName: NgControl) {
        if (this.formControlName) {
            this.formControlName.valueAccessor = DUMMY_VALUE_ACCESSOR;
        }
    }

    ngOnInit() {

        // Provide compatibility with formControlName directive
        if (!this.ngControl && this.formControlName) {
            this.ngControl = this.formControlName.control as FormControl;
        }

        this.handleErrors();

        this.guid = guid();
        this._name = this.name + "-" + this.guid;

        this.addOptionIds();

        if (this.type === "autocomplete") {
            this.setAutocompleteDefault();
            this.setAutocompleteSearch();
            this.setAutocompleteReactivity();
        }
        if (this.type === "tagger") {
            this.setTaggerDefault();
            this.setAutocompleteSearch();
            this.setTaggerReactivity();
        }
        if (["autocomplete", "tagger"].includes(this.type) && this.limit) {
            this.appendLimitExplainerStylesheet();
        }

        // Sync this.disabled value to ngControl status
        if (this.ngControl.disabled) {
            this.disabled = true;
        }
        this.ngControl.statusChanges
            .pipe(
                takeUntil(this.destroy$),
                map(status => status === "DISABLED"),
                filter(disabled => this.disabled !== disabled)
            )
            .subscribe(disabled => {
                this.disabled = disabled;
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        // Sync ngControl status with this.disabled value
        if (changes.disabled && this.ngControl) {
            if (changes.disabled.currentValue) {
                this.ngControl.disable({ onlySelf: true, emitEvent: false });
            }
            else {
                this.ngControl.enable({ onlySelf: true, emitEvent: false });
            }
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        if (["autocomplete", "tagger"].includes(this.type) && this.limit) {
            this.removeLimitExplainerStylesheet();
        }
    }

    handleErrors() {
        if (!supportedTypes.includes(this.type)) {
            throw Error("Type " + this.type + " is not supported.");
        }
        if (!this.ngControl) {
            throw Error("app-input needs a ngControl");
        }
        if (!this.name) {
            throw Error("app-input needs a name");
        }
        if (this.type === "select" || this.type === "radio") {
            if (!this.options || this.options && !Array.isArray(this.options)) {
                throw Error("Select and radio need the options array");
            }
        }
        if (this.type === "autocomplete" && !this.customSearch) {
            if (!this.options || this.options && !Array.isArray(this.options)) {
                throw Error("Autocomplete without a custom search needs the options array");
            }
        }
        if (this.type === "tagger" && !this.freeTag) {
            if (!this.options || this.options && !Array.isArray(this.options)) {
                throw Error("Tagger without a free tag needs the options array");
            }
        }
    }

    isInvalid() {
        return this.ngControl.touched && this.ngControl.errors;
    }

    getYearOptions(fromSetter = false) {

        if (fromSetter && this.type !== "year") {
            return [];
        }

        // Dynamically create the list of years
        const min = this.min ? parseInt(this.min) : this.currYear - this.yearPlusMinus;
        const max = this.max ? parseInt(this.max) : this.currYear + this.yearPlusMinus;

        if (max < min) {
            throw new Error('"max" cannot be less than "min"');
        }

        return Array(max - min)
            .fill(0)
            .map((_, index) => min + index)
            .map((year) => ({ text: year + "", value: year }));
    }

    //  █████╗ ██╗   ██╗████████╗ ██████╗  ██████╗ ██████╗ ███╗   ███╗██████╗ ██╗     ███████╗████████╗███████╗
    // ██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗██╔════╝██╔═══██╗████╗ ████║██╔══██╗██║     ██╔════╝╚══██╔══╝██╔════╝
    // ███████║██║   ██║   ██║   ██║   ██║██║     ██║   ██║██╔████╔██║██████╔╝██║     █████╗     ██║   █████╗  
    // ██╔══██║██║   ██║   ██║   ██║   ██║██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║     ██╔══╝     ██║   ██╔══╝  
    // ██║  ██║╚██████╔╝   ██║   ╚██████╔╝╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ███████╗███████╗   ██║   ███████╗
    // ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚══════╝╚══════╝   ╚═╝   ╚══════╝
    appendLimitExplainerStylesheet() {
        // Create CSS for description
        const css =
`input[role="combobox"].autocomplete-${this.guid} + ngb-typeahead-window::before {
    content: "${this.limitTextMaker(this.limit as number)}";
    white-space: pre;
    color: #888;
    display: block;
    font-size: 0.9rem;
    padding: 0 10px 5px;
    text-align: center;
}`;
        // Create stylesheet
        const style = document.createElement("style");
        style.id = "autocomplete-" + this.guid;
        style.appendChild(document.createTextNode(css));
        // Append stylesheet to head
        const head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
    }

    removeLimitExplainerStylesheet() {
        const el = document.getElementById("autocomplete-" + this.guid)!;
        el.remove();
    }

    // Add an ids to options in order to differentiate radios
    addOptionIds() {
        this.options$
            .pipe(takeUntil(this.destroy$))
            .subscribe(options => {
                if (this.type === "radio" && options && Array.isArray(options)) {
                    options.forEach(opt => opt._id = this.name + "-" + guid());
                }
            });
    }

    setAutocompleteSearch() {
        this.search = (text$: Observable<string>) => {

            const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
            const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
            const inputFocus$ = this.focus$;

            const combined$ = merge(debouncedText$, inputFocus$, clicksWithClosedPopup$);

            let searchObs$;
            if (this.customSearch) {
                searchObs$ = this.customSearch(combined$);
            }
            else {
                searchObs$ = combined$
                    .pipe(
                        map((term: string) => {
                            if (this.options) {
                                return this.options.filter(value => this.filter(term, value));
                            }
                            return [];
                        })
                    );
            }

            if (this.limit) {
                return searchObs$.pipe(map(array => array.slice(0, this.limit as number)));
            }

            return searchObs$;
        };
    };

    setAutocompleteDefault() {
        if (this.ngControl.value) {
            this.autocompleteChoice = this.ngControl.value;
        }
    }

    setAutocompleteReactivity() {
        this.ngControl.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
                this._autocompleteChoice = value;
            });
    }

    onAutocompleteChange(value: any) {

        const input = document.getElementById(this._name);
        if (this.isInvalid()) {
            input?.classList.add("is-invalid");
        }
        else {
            input?.classList.remove("is-invalid");
        }

        if (this.type !== "tagger" && this.ngControl.value !== value) {
            this.ngControl.setValue(value);
        }
    }

    onAutocompleteClick(instance: NgbTypeahead, event: any) {
        this.instance = instance;
        this.click$.next(event.target.value);
    }

    selectItem(selectEvent: NgbTypeaheadSelectItemEvent) {
        this.selectItemEmitter.emit(selectEvent);
    }

    // ████████╗ █████╗  ██████╗  ██████╗ ███████╗██████╗ 
    // ╚══██╔══╝██╔══██╗██╔════╝ ██╔════╝ ██╔════╝██╔══██╗
    //    ██║   ███████║██║  ███╗██║  ███╗█████╗  ██████╔╝
    //    ██║   ██╔══██║██║   ██║██║   ██║██╔══╝  ██╔══██╗
    //    ██║   ██║  ██║╚██████╔╝╚██████╔╝███████╗██║  ██║
    //    ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝
    setTaggerDefault() {
        if (this.ngControl.value) {
            this.tags = this.ngControl.value;
        }
    }

    setTaggerReactivity() {
        this.ngControl.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                filter(tags => Array.isArray(tags))
            )
            .subscribe(tags => {
                this.tags = tags;
            });
    }

    taggerChoiceSelected(value: any) {
        if (this.deduped && this.tags?.some(tag => isEqual(tag, value.item))) {
            console.warn("Entry already present");
        }
        else {
            this.ngControl.setValue([...this.tags, value.item]);
        }
        setTimeout(() => this._autocompleteChoice = null, 0);
    }

    freeTagOnEnter(event: any) {

        if (!this.freeTag) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const value = event.target.value;
        if (value === "") {
            return;
        }

        const trimmed = value.trim();
        if (this.deduped && this.tags.some(tag => isEqual(tag, trimmed))) {
            console.warn("Entry already present");
        }
        else {
            this.ngControl.setValue([...this.tags, trimmed]);
        }
        setTimeout(() => this._autocompleteChoice = null, 0);
    }

    removeTag(item: any) {
        const itemIndex = this.tags.lastIndexOf(item);
        if (itemIndex > -1) {
            this.ngControl.setValue([
                ...this.tags.slice(0, itemIndex),
                ...this.tags.slice(itemIndex + 1)
            ]);
            setTimeout(() => this._autocompleteChoice = null, 0);
        }
    }

    markAsTouched() {
        this.ngControl.markAsTouched();
    }
}
