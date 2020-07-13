import { NgModule } from "@angular/core";
import { DatePickerModule } from "@sebgroup/ng-components/date-picker";
import { DatepickerPageComponent } from "./datepicker-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: DatepickerPageComponent }];

@NgModule({
    declarations: [DatepickerPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, DatePickerModule],
    exports: [RouterModule, DatePickerModule],
})
export class DatepickerPageModule {}
