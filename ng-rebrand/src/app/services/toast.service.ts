import { Injectable, TemplateRef } from '@angular/core';
import { guid } from '../utils/uuid';

interface IToastOptions {
	classname?: string;
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	delay?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
    
	toasts: any[] = [];

	show(textOrTpl: string | TemplateRef<any>, options: IToastOptions = {}) {
		this.toasts.push({
			textOrTpl,
			guid: guid(),
			position: "top-right",
			...options
		});
	}

	remove(toast: any) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}