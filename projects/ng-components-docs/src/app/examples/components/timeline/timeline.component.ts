import { Component, OnInit } from "@angular/core";
import { TimelineListItem } from "lib/src/timeline/timeline.component";

@Component({
    templateUrl: "./timeline.component.html",
})
export class TimelineComponent implements OnInit {
    timelineList: Array<TimelineListItem>;

    constructor() {
        this.clickAction = this.clickAction.bind(this);
    }

    ngOnInit(): void {
        this.timelineList = [
            {
                title: "Current Day",
                time: "2016 - Present",
                desc:
                    "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae semper quis lectus nulla at volutpat.",
            },
            {
                title: "Previously",
                time: "2012 - 2016",
                desc: "Leo in vitae turpis massa sed elementum tempus egestas sed. Suspendisse ultrices gravida dictum fusce ut.",
            },
            {
                title: "At the begining",
                time: "2008 - 2012",
                desc:
                    "Fermentum dui faucibus in ornare quam viverra orci. Vitae tempus quam pellentesque nec. Praesent tristique magna sit amet purus gravida.",
            },
        ];
    }

    clickAction(index: number) {
        alert(`Item ${index} clicked`);
    }
}
