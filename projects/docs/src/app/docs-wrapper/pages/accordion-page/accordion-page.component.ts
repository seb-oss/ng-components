import { Component, OnInit } from "@angular/core";
import { AccrodionListItem, AccordionProps } from "@sebgroup/ng-components/accordion";

@Component({
    selector: "app-accordion-page",
    templateUrl: "./accordion-page.component.html",
})
export class AccordionPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/accordion/accordion.component");
    isAlt: boolean = false;
    activeIndex: number = 0;
    accordionList: Array<AccrodionListItem> = [
        {
            header: "Accordion List Item 1",
            subHeaderText: "Accordion Sub Header",
            content: {
                title: "Tempor incididun",
                desc:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus. Lectus mauris ultrices eros in cursus turpis massa tincidunt.",
            },
        },
        {
            header: "Accordion List Item 2",
            content: [
                {
                    title: "Excepteur sint",
                    desc:
                        "Vitae suscipit tellus mauris a diam maecenas sed. Feugiat in fermentum posuere urna nec tincidunt praesent semper. Tellus id interdum velit laoreet id donec. Morbi enim nunc faucibus a pellentesque sit. Vitae congue mauris rhoncus aenean.",
                },
                {
                    title: "Duis aute",
                    desc:
                        "Eleifend donec pretium vulputate sapien nec sagittis. Malesuada fames ac turpis egestas. Molestie ac feugiat sed lectus vestibulum mattis. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed.",
                },
            ],
        },
    ];
    iconPosition: AccordionProps["iconPosition"] = "left";
    code: string = `<sebng-accordion [list]="accordionList"></sebng-accordion>`;

    constructor() {
        document.title = "Accordion - SEB Angular Components";
    }

    ngOnInit(): void {}
}
