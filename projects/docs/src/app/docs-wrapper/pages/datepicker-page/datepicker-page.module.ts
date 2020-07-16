import { NgModule } from "@angular/core";
import { DatepickerModule } from "@sebgroup/ng-components/datePicker";
import { DatepickerPageComponent } from "./datepicker-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckBoxModule } from "@sebgroup/ng-components/checkBox";

const routes: Routes = [{ path: "", component: DatepickerPageComponent }];

@NgModule({
    declarations: [DatepickerPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, DatepickerModule, CheckBoxModule],
    exports: [RouterModule, DatepickerModule],
})
export class DatepickerPageModule {}
