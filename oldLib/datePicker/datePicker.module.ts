import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DatePickerComponent } from "./datePicker.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SafeHtmlPipe } from "./datePicker.pipe";

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        FormsModule
    ],
    declarations: [DatePickerComponent, SafeHtmlPipe],
    exports: [DatePickerComponent]
})
export class DatePickerModule { }
