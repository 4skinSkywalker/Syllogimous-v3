import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[ngLet]'
})
export class LetDirective {

    private ctx = { ngLet: null };

    constructor(
        vcr: ViewContainerRef,
        tr: TemplateRef<any>
    ) {
        vcr.createEmbeddedView(tr, this.ctx);
    }

    @Input()
    set ngLet(value: any) {
        this.ctx.ngLet = value;
    }
}