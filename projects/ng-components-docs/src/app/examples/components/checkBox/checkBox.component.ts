import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: "app-checkbox",
    templateUrl: "./checkBox.component.html",
    styleUrls: ["./checkBox.component.scss"],
})
export class CheckBoxComponent implements OnInit {
    formcontrol: FormControl = new FormControl();
    model: boolean = true;

    ngOnInit(): void {
        this.formcontrol.setValue(true);
    }

    logMe(param) {
        console.log("param", param);
    }
}
