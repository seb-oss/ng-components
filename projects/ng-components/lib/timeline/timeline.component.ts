import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from "@angular/core";

export interface TimelineListItem {
    title: string;
    time: string;
    desc?: string;
}

@Component({
    selector: "sebng-timeline",
    templateUrl: "./timeline.component.html",
    styleUrls: ["./timeline.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class TimelineComponent implements OnInit {
    @Input() list: Array<TimelineListItem>;
    @Input() direction?: string = "vertical";
    @Output() onClick? = new EventEmitter<number>();

    @Input() className?: string;

    topList: Array<any> = [];
    bottomList: Array<any> = [];

    public items: Array<number> = [];

    ngOnInit() {
        const list: Array<any> = this.prepareList(this.list);
        this.items = Array(3)
            .fill(0)
            .map((x: number, index: number) => index + 1);
        this.topList = list[0];
        this.bottomList = list[1];
    }

    prepareList(list: Array<TimelineListItem>): Array<any> {
        const topList: Array<any> = [];
        const bottomList: Array<any> = [];
        for (let i: number = 0; i < list.length; i++) {
            if (i % 2) {
                topList.push(list[i]);
                bottomList.push(null);
            } else {
                bottomList.push(list[i]);
                topList.push(null);
            }
        }
        return [topList, bottomList];
    }

    handleClick(e: MouseEvent, index: number) {
        if (this.onClick) {
            this.onClick.emit(index);
        }
        e.preventDefault();
    }
}
