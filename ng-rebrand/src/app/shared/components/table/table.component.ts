import { Component, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, merge, Subject, takeUntil, tap } from 'rxjs';
import { resolve } from 'src/app/utils/object';
import { guid } from 'src/app/utils/uuid';
import { AppSortableHeader, compare, SortDirection, SortEvent } from '../../directives/sortable-header';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {

    destroy$ = new Subject<void>();

    _guid = "app-table-" + guid();

    @Input("thead") thead!: TemplateRef<any>;
    @Input("tbody") tbody!: TemplateRef<any>;
    @Input("animated") animated = false;
    @Input("rowExpand") rowExpand!: TemplateRef<any>;
    @Input("tfoot") tfoot!: TemplateRef<any>;
    @Input("showFootIfEmpty") showFootIfEmpty = false;
    @Input("items") items!: any[];
    @Input("trackByFn") trackByFn = (index: number, item: any): any => item;
    @Input("emptyTemplate") emptyTemplate?: TemplateRef<any>;
    @Input("emptyMessage") emptyMessage: string = "No results to display";
    @Input("stickyHead") stickyHead = false;
    @Input("maxHeight") maxHeight: string | boolean = false;

    @Input("tableFixed") tableFixed = false;
    @Input("colspan") colspan = 99;

    // Search and pagination fields
    @Input("searchable") searchable: string[] | boolean = false;
    @Input("paginated") paginated = false;
    @Input("pageSize") pageSize = 5;
    @Input("pageSizes") pageSizes = [ 5, 10, 25, 50 ];
    @Input("duplicateControls") duplicateControls = false;

    paginatedItems$ = new BehaviorSubject<any[]>([]);
    collectionSize!: number;
    page = 1;

    searchInput = new FormControl("", { nonNullable: true });
    searchInputRelay = new FormControl("", { nonNullable: true });
    lastTerm$ = new BehaviorSubject("");
    filteredItems: any[] = [];

    // Sorting fields
    @ContentChildren(AppSortableHeader) headers!: QueryList<AppSortableHeader>;
    lastColumn = "";
    lastDirection: SortDirection = "";
    sortedItems: any[] = [];

    // Selectable fields
    @Input("selectable") selectable = false;
    get selectedRows() {
        return this.paginatedItems$.getValue()
            .filter(item => item._selected);
    }

    @Output("rowSelected") rowSelected = new EventEmitter<any>();
    @Output("rowDeselected") rowDeselected = new EventEmitter<any>();

    ngOnInit() {

        if (!this.thead) {
            throw Error("AppTable needs a thead template");
        }

        if (!this.tbody) {
            throw Error("AppTable needs a tbody template");
        }

        if (!this.items || this.items && !Array.isArray(this.items)) {
            throw Error("AppTable needs the items array");
        }

        // Double controls needs to keep the two search inputs in-sync
        const [a, b] = [this.searchInput, this.searchInputRelay];
        const opt = {
            onlySelf: true,
            emitEvent: false,
            emitModelToViewChange: true
        };
        a.valueChanges.subscribe(v => b.setValue(v, opt));
        b.valueChanges.subscribe(v => a.setValue(v, opt));

        // Set reactive search on both search controls
        merge(a.valueChanges, b.valueChanges)
            .pipe(
                takeUntil(this.destroy$),
                tap(term => {
                    this.lastTerm$.next(term);
                    this.search();
                }),
            )
            .subscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ("items" in changes) {

            const previousItems = changes.items.previousValue;
            const items = changes.items.currentValue;

            if (!items || !Array.isArray(items)) {
                console.warn("Items must have a value and be an array.");
            }
            else if (previousItems !== items) {
                if (!this.paginated) this.pageSize = items.length;
                this.collectionSize = items.length;
                this.search();
            }
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    search() {
        this.filter();
        this.sort({
            column: this.lastColumn,
            direction: this.lastDirection
        });
    }

    filter() {

        const term = (this.lastTerm$.getValue() || "").toLowerCase();

        this.filteredItems = this.items.filter(item => {

            // Targeted search by fields provided in searchable array
            if (this.searchable && Array.isArray(this.searchable) && this.searchable.length) {
                return this.searchable.some(path =>
                    ((resolve(path, item) || "") + "").toLowerCase().includes(term)
                );
            }

            // Global hacky search
            const serialized = JSON.stringify(item).toLowerCase();
            return serialized.includes(term);
        });

        this.collectionSize = this.filteredItems.length;
    }

    sort({ column, direction }: SortEvent) {

        if (!this.headers) {
            this.sortedItems = this.filteredItems;
            this.paginate();
            return;
        }

        // Reset others column direction
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = "";
            }
        });

        if (column === "" || direction === "") {
            this.sortedItems = this.filteredItems;
        }
        else {
            this.sortedItems = [...this.filteredItems]
                .sort((a, b) => {

                    const compared = compare(
                        resolve(column, a),
                        resolve(column, b)
                    );

                    return direction === "asc" ? compared : -compared;
                });
        }

        this.lastColumn = column;
        this.lastDirection = direction;

        this.paginate();
    }

    paginate() {

        // Deselect items (to prevent keeping items not in view selected)
        this.sortedItems.forEach(item => item._selected = false);

        const slice = this.sortedItems.slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize,
        );

        this.paginatedItems$.next(slice);
    }

    onRowSelect(item: any) {
        this.rowSelected.emit(item);
    }

    onRowDeselect(item: any) {
        this.rowDeselected.emit(item);
    }

    onEveryRowSelect() {
        const items = this.paginatedItems$.getValue();
        items.forEach(item => item._selected = true);
    }

    onEveryRowDeselect() {
        const items = this.paginatedItems$.getValue();
        items.forEach(item => item._selected = false);
    }
}
