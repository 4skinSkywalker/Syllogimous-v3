import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
    providedIn: 'root'
})
export class HolySidebarService {

    isLeftOpen = true;
    isRightOpen = true;

    constructor(
        public breakpointObserver: BreakpointObserver
    ) {
        if (window.innerWidth <= 700) {
            this.isLeftOpen = false;
            this.isRightOpen = false;
        }
    }

    toggleLeft() {
        this.isLeftOpen = !this.isLeftOpen;
    }

    toggleRight() {
        this.isRightOpen = !this.isRightOpen;
    }
}