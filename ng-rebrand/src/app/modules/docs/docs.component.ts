import { Component, QueryList, ViewChildren } from '@angular/core';
import { NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { HolySidebarService } from 'src/app/shared/components/holy-grail/holy-sidebar.service';
import { intersection } from 'src/app/utils/array';
import { delay } from 'src/app/utils/promise';

interface SidebarSubitem {
    title: string;
    path?: string;
    icon?: string;
}

interface SidebarItem {
    isActive: boolean; // Make the collapse work
    title: string;
    path?: string;
    icon?: string;
    children?: SidebarSubitem[];
}

@Component({
    selector: 'app-docs',
    templateUrl: './docs.component.html',
    styleUrls: ['./docs.component.css']
})
export class DocsComponent {

    destroy$ = new Subject<void>();

    // Get all view children with #rla applied
    @ViewChildren('rla')
    rlaList!: QueryList<RouterLinkActive>;

    intersection = intersection;

    sidebarItems: SidebarItem[] = [
        {
            isActive: false,
            title: 'Kitchen Sink',
            icon: 'bi-list-columns',
            path: '/docs/kitchen-sink',
        },
        {
            isActive: false,
            title: 'App input',
            icon: 'bi-ui-radios',
            path: '/docs/demos/app-input',
        },
        {
            isActive: false,
            title: 'App table',
            icon: 'bi-table',
            path: '/docs/demos/app-table',
        },
        {
            isActive: false,
            title: 'App chart',
            icon: 'bi-bar-chart-fill',
            path: '/docs/demos/app-chart',
        },
        {
            isActive: false,
            title: 'Wizard',
            icon: 'bi-eyeglasses',
            path: '/docs/demos/wizard'
        },
        {
            isActive: false,
            title: 'Bootstrap widgets',
            icon: 'bi-grid',
            children: [
                {
                    path: '/docs/demos/accordion',
                    title: 'Accordion'
                },
                {
                    path: '/docs/demos/alert',
                    title: 'Alert'
                },
                {
                    path: '/docs/demos/carousel',
                    title: 'Carousel'
                },
                {
                    path: '/docs/demos/collapse',
                    title: 'Collapse'
                },
                {
                    path: '/docs/demos/datepicker',
                    title: 'Datepicker'
                },
                {
                    path: '/docs/demos/dropdown',
                    title: 'Dropdown'
                },
                {
                    path: '/docs/demos/modal',
                    title: 'Modal'
                },
                {
                    path: '/docs/demos/nav',
                    title: 'Nav'
                },
                {
                    path: '/docs/demos/offcanvas',
                    title: 'Offcanvas'
                },
                {
                    path: '/docs/demos/pagination',
                    title: 'Pagination'
                },
                {
                    path: '/docs/demos/popover',
                    title: 'Popover'
                },
                {
                    path: '/docs/demos/progressbar',
                    title: 'Progress Bar'
                },
                {
                    path: '/docs/demos/rating',
                    title: 'Rating'
                },
                {
                    path: '/docs/demos/table',
                    title: 'Table'
                },
                {
                    path: '/docs/demos/timepicker',
                    title: 'Timepicker'
                },
                {
                    path: '/docs/demos/toast',
                    title: 'Toast'
                },
                {
                    path: '/docs/demos/tooltip',
                    title: 'Tooltip'
                },
                {
                    path: '/docs/demos/typeahead',
                    title: 'Typeahead'
                },
            ]
        },
    ];

    constructor(
        private sidebarService: HolySidebarService,
        private router: Router
    ) { }

    ngOnInit() {
        // Autoscroll to top on route change
        this.router.events
          .pipe(
            takeUntil(this.destroy$),
            filter(event => event instanceof NavigationEnd),
            tap(() => document.querySelector('#main-stuff')?.scrollTop)
          )
          .subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    async closeSidebar() {
        if (window.innerWidth <= 700) {
            await delay(200);
            this.sidebarService.toggleLeft();
        }
    }
}
