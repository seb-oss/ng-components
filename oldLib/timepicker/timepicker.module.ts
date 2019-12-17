import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TimepickerComponent } from "./timepicker.component";
import { SafeHtmlPipe } from "./timepicker.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [TimepickerComponent],
    declarations: [TimepickerComponent, SafeHtmlPipe]
})
export class TimepickerModule { }
