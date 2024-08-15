import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-breadcrumb-router',
    templateUrl: './breadcrumb-router.component.html',
    styleUrls: ['./breadcrumb-router.component.css']
})
export class BreadcrumbRouterComponent {

    incrementalSegments!: { label: string, path: string }[];

    constructor(
        private locationStrategy: LocationStrategy
    ) {

        // Remove baseHref to work with GitHub pages
        const baseHref = this.locationStrategy.getBaseHref();
        let pathname = location.pathname;
        if (baseHref !== '/')
            pathname = '/' + location.pathname.replaceAll(baseHref, '');

        const labels = pathname.split('/').slice(1);

        this.incrementalSegments = [];

        for (let i = 0; i < labels.length; i++) {

            const label = labels[i];
            const path = '/' + labels.slice(0, i + 1).join('/');

            this.incrementalSegments.push({ label, path });
        }
    }
}
