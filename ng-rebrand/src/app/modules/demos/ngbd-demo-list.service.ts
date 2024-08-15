import { Injectable } from '@angular/core';

export interface NgbdDemoConfig {
	id?: string;
	title: string;
	code?: string;
	markup?: string;
	type: any;
}

export interface NgbdDemoListConfig {
	[demo: string]: NgbdDemoConfig;
}

@Injectable({ providedIn: 'root' })
export class NgbdDemoListService {
  
	private _demos: { [widget: string]: NgbdDemoListConfig } = {};

	register(
		widget: string,
		list: NgbdDemoListConfig
	) {
		this._demos[widget] = list;
	}

	getDemos(widget: string) {
		return this._demos[widget];
	}
}