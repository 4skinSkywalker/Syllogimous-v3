import { Component, Input } from '@angular/core';
import { delay } from 'src/app/utils/promise';

const size = 32;
const spacing = 8;

@Component({
	selector: 'app-linear-loading-indicator',
	template: `
        <div class="lli-list">
            <div
                *ngFor="let char of chars"
                class="lli-item"
            >
                {{ char }}
            </div>
        </div>
	`,
    styles: [`

        .lli-list {
            position: relative;
            height: ${size}px;
            margin: 0 auto;
        }

        .lli-item {
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            display: grid;
            place-items: center;
            background: rgba(var(--app-primary_500), 1);
            box-shadow: 0 0 10px #0002;
            color: rgba(var(--app-gray_0), 1);
            font-weight: bold;
            top: 0px;
            left: 0px;
            text-transform: uppercase;
            transition:
                border-radius 300ms ease,
                top 300ms ease,
                left 300ms ease;
        }

        .lli-item.lli-item--active {
            background: rgba(var(--app-primary_200), 1);
            border-radius: 50%;
            top: -40px;
        }
    `]
})
export class LinearLoadingIndicatorComponent {

    _text = "loading";
    @Input("text")
    set text(value: string) {
        this._text = value;
        this.chars = value.split("");
    }

    chars = this._text.split("");

    i = 0;
    stop = false;
    lliList!: any[];
    positions!: number[];
	
	ngAfterViewInit() {

        // Get items
        this.lliList = [ ...document.querySelectorAll(".lli-item") as any ];

        // Set parent width
        (document.querySelector(".lli-list") as any).style.width = (this.lliList.length * size + (this.lliList.length - 1) * spacing) + "px";

        // Calculate left offsets
        this.positions = Array(this.lliList.length).fill(0).map((_, index) => index * (size + spacing));

        this.loop();
    }

    ngOnDestroy() {
        this.stop = true;
    }

    async loop() {

        // Avoid infinite loop
        if (this.stop) return;

        // Set initial positions
        for (let j = 0; j < this.lliList.length; j++) {
            this.lliList[(j + this.i) % this.lliList.length].style.left = this.positions[j] + "px";
        }

        await delay(300);

        // Set active (raise it)
        const active = this.lliList[this.i % this.lliList.length];
        active.classList.add("lli-item--active");

        // Shift elements to the left
        for (let j = 0; j < this.lliList.length; j++) {
            await delay(300);
            this.lliList[(j + this.i + 1) % this.lliList.length].style.left = this.positions[j] + "px";
        }

        // Shift active element to the end
        active.style.left = this.positions[this.lliList.length - 1] + "px";

        // Remove active state (lower it)
        await delay(300);
        active.classList.remove("lli-item--active");

        // Rinse and repeat
        this.i++;
        this.loop();
    }
}