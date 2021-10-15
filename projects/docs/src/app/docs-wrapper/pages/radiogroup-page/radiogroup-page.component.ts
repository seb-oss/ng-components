import { Component, OnInit } from "@angular/core";
import { RadioGroupItem } from "@sebgroup/ng-components/radio-group";

@Component({
    selector: "app-radiogroup-page",
    template: `
        <app-doc-page [importString]="importString">
            <ng-container example>
                <sebng-radio-group
                    [list]="list"
                    [disabled]="disabled"
                    [condensed]="condensed"
                    [inline]="inline"
                    [error]="customError ? customErrorTmpl : stringError && 'here is an error'"
                ></sebng-radio-group>
                <ng-template #customErrorTmpl>
                    <div class="text-danger">
                        Click on the <a href="www.google.com" rel="noopener noreferrer" target="_blank">error link</a>
                    </div>
                </ng-template>
            </ng-container>
            <ng-container controls>
                <sebng-checkbox label="Inline" description="Show radio buttons inlined." [(ngModel)]="inline"></sebng-checkbox>
                <sebng-checkbox
                    label="Condensed"
                    description="Show radio buttons with less padding in between."
                    [(ngModel)]="condensed"
                ></sebng-checkbox>
                <sebng-checkbox
                    label="Disable All"
                    description="Disable all elements in the group."
                    [(ngModel)]="disabled"
                ></sebng-checkbox>
                <sebng-checkbox label="radio group error" [(ngModel)]="stringError"></sebng-checkbox>
                <sebng-checkbox label="custom radio group error" [(ngModel)]="customError"></sebng-checkbox>
            </ng-container>
            <ng-container code>{{ snippet }}</ng-container>
        </app-doc-page>
    `,
})
export class RadioGroupPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/radio-group/radio-group.component");
    snippet: string = `<sebng-radio-group [list]="list"></sebng-radio-group>`;
    stringError: boolean = false;
    customError: boolean = false;

    // control
    disabled: boolean;
    condensed: boolean;
    inline: boolean;
    list: RadioGroupItem[] = [
        { value: "1", label: "First", description: "with description" },
        { value: "2", label: "Second" },
        { value: "3", label: "Third (disabled)", disabled: true },
        { value: "4", customTemplate: "<code>4️⃣ Fourth (using custom template)</code> 😊" },
        { value: "5", label: "Fifth" },
    ];

    constructor() {
        document.title = "Radio Group - SEB Angular Components";
    }

    ngOnInit(): void {}
}
