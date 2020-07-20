import { Component } from "@angular/core";

@Component({
    selector: "app-checkbox-page",
    templateUrl: "./checkbox-page.component.html",
})
export class CheckboxPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/checkbox/checkbox.component");
    model: boolean;
    showDescription: boolean;
    disableCheckbox: boolean = false;
    errorCheckbox: boolean = false;
    customLabelCheckbox: boolean = false;
    customErrorCheckbox: boolean = false;
    customDescriptionCheckbox: boolean = false;

    snippet: string = `<sebng-checkbox [(ngModel)]="value" label="Checkbox label"></sebng-checkbox>`;

    constructor() {
        document.title = "Checkbox - SEB Angular Components";
    }

    simpleCheckboxHTML: string = `<sebng-checkbox 
    label="string label" 
    description="description label">
</sebng-checkbox>`;

    templateCheckboxHTML: string = `<sebng-checkbox 
    [label]="customLabel" 
    [description]="customDescription">
        <ng-template #customLabel>
            <div class="custom-label">I am a custom label <a href="#">read me please</a></div>
        </ng-template>
        <ng-template #customDescription>
            <div class="custom-description">I am a custom description <a href="#">read me please</a></div>
        </ng-template>
</sebng-checkbox>`;
}
