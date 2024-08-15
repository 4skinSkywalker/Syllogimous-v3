import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { DemosComponent } from '../../demos.component';
import { NgbdDemoListService } from '../../ngbd-demo-list.service';
import { AppdText } from './text/text';
import { AppdTextMasking } from './text-masking/text-masking';
import { AppdAutocomplete } from './autocomplete/autocomplete';
import { AppdForm } from './form/form';
import { AppdDate } from './date/date';
import { AppdLayout } from './layout/layout';
import { AppdTagger } from './tagger/tagger';
import { AppdSelectionPatterns } from './selection-patterns/selection-patterns';
import { AppdValidation } from './validation/validation';
import { AppdImageUploader } from './image-uploader/image-uploader';

declare var require: any;

const demos = {
    form: {
        title: 'Complete form',
        code: require('!raw-loader!./form/form').default,
        markup: require('!raw-loader!./form/form.html').default,
        type: AppdForm,
    },
    text: {
        title: 'Textual inputs',
        code: require('!raw-loader!./text/text').default,
        markup: require('!raw-loader!./text/text.html').default,
        type: AppdText,
    },
    validation: {
        title: 'Validation',
        code: require('!raw-loader!./validation/validation').default,
        markup: require('!raw-loader!./validation/validation.html').default,
        type: AppdValidation,
    },
    textMasking: {
        title: 'Text masking',
        code: require('!raw-loader!./text-masking/text-masking').default,
        markup: require('!raw-loader!./text-masking/text-masking.html').default,
        type: AppdTextMasking,
    },
    date: {
        title: 'Date',
        code: require('!raw-loader!./date/date').default,
        markup: require('!raw-loader!./date/date.html').default,
        type: AppdDate,
    },
    selectionPatterns: {
        title: 'Select, radio & checkbox',
        code: require('!raw-loader!./selection-patterns/selection-patterns').default,
        markup: require('!raw-loader!./selection-patterns/selection-patterns.html').default,
        type: AppdSelectionPatterns,
    },
    autocomplete: {
        title: 'Autocomplete',
        code: require('!raw-loader!./autocomplete/autocomplete').default,
        markup: require('!raw-loader!./autocomplete/autocomplete.html').default,
        type: AppdAutocomplete,
    },
    tagger: {
        title: 'Tagger',
        code: require('!raw-loader!./tagger/tagger').default,
        markup: require('!raw-loader!./tagger/tagger.html').default,
        type: AppdTagger,
    },
    imageUploader: {
        title: 'Image uploader',
        code: require('!raw-loader!./image-uploader/image-uploader').default,
        markup: require('!raw-loader!./image-uploader/image-uploader.html').default,
        type: AppdImageUploader,
    },
    layout: {
        title: 'Flexgrid',
        code: require('!raw-loader!./layout/layout').default,
        markup: require('!raw-loader!./layout/layout.html').default,
        type: AppdLayout,
    },
};

export const routes: Routes = [
    {
        path: '',
        component: DemosComponent,
        providers: [
            {
                provide: ENVIRONMENT_INITIALIZER,
                multi: true,
                useValue: () =>
                    inject(NgbdDemoListService).register('app-input', demos),
            },
        ],
    },
];
