import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-copy-paster',
    templateUrl: './copy-paster.component.html',
    styleUrls: ['./copy-paster.component.css']
})
export class CopyPasterComponent {

    @Input("value") value!: string;

    hasCopied = false;

    copy() {

        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.value;

        document.body.appendChild(selBox);

        selBox.focus();
        selBox.select();

        document.execCommand('copy');
        document.body.removeChild(selBox);

        this.hasCopied = true;
        setTimeout(() => this.hasCopied = false, 3000)
    }
}
