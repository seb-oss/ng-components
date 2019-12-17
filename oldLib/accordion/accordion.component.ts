import { Component, Input, ViewEncapsulation, OnInit } from "@angular/core";

export interface AccordionText {
    title?: string;
    desc?: string;
}

export interface AccrodionListItem {
    category: string;
    text?: AccordionText | Array<AccordionText>;
}

@Component({
    selector: "ac-accordion",
    templateUrl: "./accordion.component.html",
    styleUrls: ["./accordion.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AccordionComponent implements OnInit {
    @Input() list: Array<AccrodionListItem>;
    @Input() className?: string;

    active: number;
    randomIds: Array<string> = [];
    angleRightIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" /></svg>`;

    ngOnInit() {
        if (this.list) {
            this.randomIds = this.list.map((item: AccrodionListItem) => {
                const identifier = Math.floor(Math.random() * 100) + (new Date()).getTime();
                return (item && item.category) ? item.category.split(" ")[0].concat("-") + identifier : (identifier.toString());
            });
        }
    }
    /**
     *
     * @param event: Keyboard event
     */
    onKeyDown(index: number, e: KeyboardEvent): void {
        if (e.key.toLowerCase() === " ") {
            this.toggle(index);
        }
    }

    toggle(i: number) {
        if (this.active === i) {
            this.active = null;
        } else {
            this.active = i;
        }
    }

    isArray(obj: any) {
        return obj instanceof Array;
    }
}
