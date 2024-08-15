import { Pipe, PipeTransform } from '@angular/core';
import hljs from 'highlight.js';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): unknown {
        return hljs.highlightAuto(value).value;
    }

}
