import { Directive, EventEmitter, Input, Output } from "@angular/core";

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

export function compare(v1: string | number, v2: string | number) {

	// Let's put non values on top of the comparison
	const v1IsNonValue = v1 === null || v1 === undefined;
	const v2IsNonValue = v2 === null || v2 === undefined;

	if (v1IsNonValue && v2IsNonValue) return 0;
	if (v1IsNonValue) return -1;
	if (v2IsNonValue) return 1;

    return (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
}

export interface SortEvent {
	column: string;
	direction: SortDirection;
}

@Directive({
	selector: 'th[sortable]',
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class AppSortableHeader {

	@Input() sortable = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}