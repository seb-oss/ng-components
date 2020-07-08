import { Component, OnInit } from "@angular/core";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-checkbox",
    templateUrl: "./checkBox.component.html",
    styleUrls: ["./checkBox.component.scss"],
})
export class CheckBoxComponent implements OnInit {
    formcontrol: FormControl = new FormControl();
    model: boolean = true;
    formGroup: FormGroup;
    formBuilder: FormBuilder = new FormBuilder();
    submitError: string = null;

    constructor() {
        this.formGroup = this.formBuilder.group({
            checkboxControl: [false, Validators.requiredTrue],
        });
    }

    ngOnInit(): void {
        this.formcontrol.setValue(true);
    }

    logMe(param: boolean): void {
        console.log("param", param);
    }

    submit(): void {
        this.submitError = this.formGroup.controls.checkboxControl.errors ? "Required" : null;
    }
}
