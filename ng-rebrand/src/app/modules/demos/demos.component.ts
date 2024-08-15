import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { SearchRoute } from 'src/app/shared/components/search-router/search-router.component';
import { environment } from 'src/environments/environment';
import { routes } from './demos.module';
import { NgbdDemoListService } from './ngbd-demo-list.service';

@Component({
    selector: 'app-demos',
    templateUrl: './demos.component.html',
    styleUrls: ['./demos.component.css']
})
export class DemosComponent {

    destroy$ = new Subject<void>();

    searchRoutes: SearchRoute[] = routes
        .filter(r => !!r.path)
        .map((r: any) => ({
            title: r.path[0].toUpperCase() + r.path.slice(1).toLowerCase(),
            path: '/docs/demos/' + r.path
        }));

    checks: { [key: number]: boolean } = {};

    componentName: string | undefined;
    demos: any = [];

    bootstrapUrl?: string;
    ngBootstrapUrl?: string;

    constructor(
        private demoList: NgbdDemoListService,
        private route: ActivatedRoute,
        private router: Router
    ) {

        const bootstrapUrl = this.route.snapshot.data["bootstrap"];
        if (bootstrapUrl) {
            this.bootstrapUrl = bootstrapUrl.replace("%version%", environment.bootstrap);
        }

        const ngBootstrapUrl = this.route.snapshot.data["ngBootstrap"];
        if (ngBootstrapUrl) {
            this.ngBootstrapUrl = ngBootstrapUrl.replace("%version%", environment.ngBootstrap);
        }

        this.componentName = route.parent?.snapshot.url[0].path;

        if (this.componentName) {

            const demos = demoList.getDemos(this.componentName);

            if (demos) {
                this.demos = Object.keys(demos)
                    .map((id) => ({ id, ...demos[id] }));
            }
        }
    }

    async ngOnInit() {

        this.route.fragment
            .pipe(
                takeUntil(this.destroy$),
                tap(fragment => {
                    const element = document.querySelector("#" + fragment);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                })
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    toggle(id: number) {
        if (this.checks[id] === undefined) {
            this.checks[id] = true;
        }
        else {
            this.checks[id] = !this.checks[id];
        }
    }
}
