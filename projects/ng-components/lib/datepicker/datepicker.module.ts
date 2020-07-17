import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatepickerComponent } from "./datepicker.component";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [DatepickerComponent],
    exports: [DatepickerComponent],
})
export class DatepickerModule {}
