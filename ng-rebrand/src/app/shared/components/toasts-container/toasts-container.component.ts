import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../../../services/toast.service';

@Component({
	selector: 'app-toasts',
	templateUrl: "./toasts-container.component.html",
	styleUrls: [ "./toasts-container.component.css" ]
})
export class ToastsContainer {
	
	constructor(public toastService: ToastService) {}

	isTemplate(toast: any) {
		return toast.textOrTpl instanceof TemplateRef;
	}

	deleteToast(index: number) {
		this.toastService.toasts.splice(index, 1);
	}

	filterToasts(position: "top-left" | "top-right" | "bottom-left" | "bottom-right") {
		return this.toastService.toasts.filter(t => t.position === position)
	}

	trackById(index: number, toast: { guid: string }): string {
		return toast.guid;
	}
}
