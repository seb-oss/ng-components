import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DatePickerComponent } from "./date-picker.component";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { SafeHtmlPipe } from "./safe-html.pipe";

@NgModule({
    imports: [NgbDatepickerModule, CommonModule, FormsModule],
    declarations: [DatePickerComponent, SafeHtmlPipe],
    exports: [DatePickerComponent],
})
export class DatePickerModule {}
