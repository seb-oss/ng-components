import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "sebng-pagination",
    templateUrl: "./pagination.component.html",
    styleUrls: ["./pagination.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent implements OnChanges {
    @Input() size: number;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Input() value: number;

    @Input() className?: string;
    @Input() firstText?: string;
    @Input() id?: string;
    @Input() lastText?: string;
    @Input() nextText?: string;
    @Input() offset?: number;
    @Input() pagingLength?: number;
    @Input() previousText?: string;

    @Input() useDotNav?: boolean;
    @Input() useFirstAndLast?: boolean;
    @Input() useTextNav?: boolean;

    list: Array<number> = [];
    dotnavList: Array<number> = [];
    pagingSize: number = 0;

    setPagingSize() {
        const initialOffset: number = this.offset ? this.offset : 10;
        this.pagingSize = Math.ceil(Number(this.size) / initialOffset);
        this.generateList();
    }
    /**
     * Generates an array of the pages that needs to be displayed
     * It depends on the size, offset, and the current value
     * @param {number} value The current value. The current page.
     * @param {number} length The length of the pagination, number of pages to be displayed.
     * @returns void
     */
    generateList(): void {
        const genList: Array<number> = [];
        const length: number = this.pagingLength ? this.pagingLength : 5;

        for (let i = 1; i <= this.pagingSize; i++) {
            genList.push(i);
        }

        const medianValue: number = Math.ceil(length / 2);
        let start: number = 0;
        let end: number = this.pagingSize;

        if (length < this.pagingSize) {
            if (this.pagingSize - this.value < medianValue) {
                start = this.pagingSize - length;
            } else if (this.value - medianValue > -1) {
                start = this.value - medianValue;
            }

            end = start + length;
        }
        this.dotnavList = genList;
        this.list = genList.slice(start, end);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.offset || changes.size) {
            this.setPagingSize();
        }

        if (changes.pagingLength || changes.value) {
            this.generateList();
        }
    }

    handleOnChange(value: number): void {
        this.onChange.emit(value);
    }
}
