import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ngbd-carousel-basic',
    standalone: true,
    imports: [ CommonModule, NgbCarouselModule ],
    templateUrl: './carousel-basic.html',
})
export class NgbdCarouselBasic {
    images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
