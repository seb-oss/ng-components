import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "ac-pagination",
    templateUrl: "pagination.component.html",
    styleUrls: ["./pagination.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class PaginationComponent {
    @Input() value: number;
    @Input() size: number;
    @Input() offset?: number = 10;
    @Input() useTextNav?: boolean;
    @Input() useFirstAndLast?: boolean = false;
    @Input() nextText?: string = "Next";
    @Input() previousText?: string = "Previous";
    @Input() firstText?: string = "First";
    @Input() lastText?: string = "Last";
    @Input() useDotNav?: boolean;
    @Input() className?: string;
    @Input() changeAction?: (value: number) => void;

    leftDoubleIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M153.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L192.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L153 264.5c-4.6-4.7-4.6-12.3.1-17zm-128 17l117.8 116c4.7 4.7 12.3 4.7 17 0l7.1-7.1c4.7-4.7 4.7-12.3 0-17L64.7 256l102.2-100.4c4.7-4.7 4.7-12.3 0-17l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L25 247.5c-4.6 4.7-4.6 12.3.1 17z"/></svg>`;
    leftSingleIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"/></svg>`;

    rightDoubleIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17zm128-17l-117.8-116c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17L255.3 256 153.1 356.4c-4.7 4.7-4.7 12.3 0 17l7.1 7.1c4.7 4.7 12.3 4.7 17 0l117.8-116c4.6-4.7 4.6-12.3-.1-17z"/></svg>`;
    rightSingleIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"/></svg>`;

    /**
     * Handles the change in pagination from clicking on the pages
     * @param {number} value The new value obtained from click event
     */
    handleChange(value: number): void {
        if (Number(value) >= 1 && Number(value) <= Number(this.size)) {
            if (this.changeAction) { this.changeAction(Number(value)); }
        }
    }

    /**
     * Generates an array of the pages that needs to be displayed
     * It depends on the size, offset, and the current value
     * @param {number} value The current value of the pagination component
     * @param {number} size The size of the pagination component
     * @param {number} offset The offset of the pagination component
     * @returns {Array<number>} An array of the pages that needs to be displayed
     */
    getList(value: number, size: number, offset: number): Array<number> {
        const list: Array<number> = [];
        let i: number = 1;
        const range: { min: number, max: number } = { min: 0, max: 0 };
        if (value <= (Math.ceil(Number(offset) / 2))) {
            for (i = 1; i <= Number(offset); i++) {
                list.push(i);
            }
        } else if (value >= (Number(size) + 1 - (Math.ceil(Number(offset) / 2)))) {
            range.min = Number(size) + 1 - Number(offset);
            range.max = Number(size);
            for (i = range.min; i <= range.max; i++) {
                list.push(i);
            }
        } else {
            range.min = value + 1 - (Math.ceil(Number(offset) / 2));
            range.max = range.min + Number(offset) - 1;
            for (i = range.min; i <= range.max; i++) {
                list.push(i);
            }
        }
        return list;
    }
}
