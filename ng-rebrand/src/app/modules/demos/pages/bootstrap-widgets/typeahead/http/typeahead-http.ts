import { Component } from '@angular/core';
import { Observable, of, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap, delay } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { bestBooks } from '../../../app-input/autocomplete/mock';

@Component({
    selector: 'ngbd-typeahead-http',
    standalone: true,
    imports: [ NgbTypeaheadModule, FormsModule, CommonModule ],
    templateUrl: './typeahead-http.html',
    styles: [
        `
            .form-control {
                width: 300px;
            }
        `,
    ],
})
export class NgbdTypeaheadHttp {
    model: any;
    searching = false;
    searchFailed = false;

    constructor() {}

    search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap(term => 
                of(
                    bestBooks.filter(b => // Filter books
                        b.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
                    )
                )
                .pipe(
                    map(books => books.map(b => b.title)), // Extract only titles
                    delay(100 + Math.random() * 1000) // Simulate HTTP request with delay
                )
            ),
            tap(() => (this.searching = false)),
        );
}
