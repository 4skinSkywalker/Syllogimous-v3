import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-level-change',
    templateUrl: './modal-level-change.component.html',
    styleUrls: ['./modal-level-change.component.css']
})
export class ModalLevelChangeComponent {
    @Input("title") title?: string;
    @Input("content") content?: string;
    contents: string[] = [];

    constructor(
        public activeModal: NgbActiveModal
    ) { }

    ngOnInit() {
        if (this.content) {
            this.contents = this.content.split("\n");
        }
    }
}
