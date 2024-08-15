import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs';

export interface SearchRoute {
    title: string;
    path: string;
}

@Component({
    selector: 'app-search-router',
    templateUrl: './search-router.component.html',
    styleUrls: ['./search-router.component.css']
})
export class SearchRouterComponent {

    @Input("searchRoutes") searchRoutes!: SearchRoute[];

    cmpControl = new FormControl();
    cmpFormatter = (cmp: any) => cmp.title;

    constructor(
        private router: Router
    ) {

        this.cmpControl.valueChanges
            .pipe(
                filter(value => !!value),
                tap(value => this.router.navigateByUrl(value.path))
            )
            .subscribe();
    }
}
