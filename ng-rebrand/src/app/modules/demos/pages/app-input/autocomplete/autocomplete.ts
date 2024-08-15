import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { delay, Observable, of, OperatorFunction, switchMap, tap } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { states, bestBooks } from './mock';

@Component({
    selector: 'appd-autocomplete',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './autocomplete.html',
})
export class AppdAutocomplete {
    
    states = states;
    statesFormatter = (state: any) => state.name;
    statesFilter = (term: string, state: any) => {
        return state.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    }
    onlyFewStatesTextFactory = (limit: number) => {
        return "I'm only showing " + limit + " results, type for more!";
    }
    state = new FormControl();

    searching = false;
    booksFormatter = (book: any) => book.title;
    customBookSearch: OperatorFunction<string, readonly any[]> = (debouncedText$: Observable<string>) => {
        return debouncedText$
            .pipe(
                tap(() => this.searching = true),
                switchMap(term =>
                    of(
                        bestBooks.filter(b => // Filter books
                            b.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
                        )
                    )
                    .pipe(
                        delay(100 + Math.random() * 1000) // Simulate HTTP request with delay
                    )
                ),
                tap(() => this.searching = false),
            );
    }
    book = new FormControl();
}
