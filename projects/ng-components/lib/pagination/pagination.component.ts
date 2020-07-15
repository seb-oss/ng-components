import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewEncapsulation } from "@angular/core";

/** The Pagination component is used to separate long sets of data so that it is easier for a user to consume information. To change the current page simply click on the page number. */
@Component({
    selector: "sebng-pagination",
    templateUrl: "./pagination.component.html",
    styleUrls: ["./pagination.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent implements OnChanges {
    /** Total size of pagination */
    @Input() size: number;
    /** Selected index */
    @Input() value: number;
    /** Element class name */
    @Input() className?: string;
    /** First page text */
    @Input() firstText?: string;
    /** Element ID */
    @Input() id?: string;
    /** Last page text */
    @Input() lastText?: string;
    /** Next page text */
    @Input() nextText?: string;
    /** Offset per page */
    @Input() offset?: number;
    /** The length of the pagination or number of pages */
    @Input() pagingLength?: number;
    /** Previous page text */
    @Input() previousText?: string;
    /** Use dot-navigation */
    @Input() useDotNav?: boolean;
    /** Use first and last navigation buttons (default: false) */
    @Input() useFirstAndLast?: boolean;
    /** Use text-base navigation buttons (default: false) */
    @Input() useTextNav?: boolean;
    /** Callback on page change */
    @Output() change: EventEmitter<number> = new EventEmitter();

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
        this.change.emit(value);
    }
}
