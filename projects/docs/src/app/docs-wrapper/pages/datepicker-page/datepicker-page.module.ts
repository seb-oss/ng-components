import { NgModule } from "@angular/core";
import { DatepickerModule } from "@sebgroup/ng-components/datepicker";
import { DatepickerPageComponent } from "./datepicker-page.component";
import { CommonModule } from "@angular/common";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";
import { DatepickerPageRoutingModule } from "./datepicker-page-routing.module";

@NgModule({
    declarations: [DatepickerPageComponent],
    imports: [CommonModule, DatepickerPageRoutingModule, FormsModule, DocPageModule, DatepickerModule, CheckboxModule],
})
export class DatepickerPageModule {}
