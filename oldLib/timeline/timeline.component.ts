import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

export interface TimelineListItem {
    title: string;
    time: string;
    desc?: string;
}

@Component({
    selector: "ac-timeline",
    templateUrl: "./timeline.component.html",
    styleUrls: ["./timeline.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit {
    @Input() list: Array<TimelineListItem>;
    @Input() direction?: string = "vertical";
    @Input() clickAction?: (index: number) => void;
    @Input() className?: string;

    topList: Array<any> = [];
    bottomList: Array<any> = [];

    ngOnInit() {
        const list: Array<any> = this.prepareList(this.list);
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
}
