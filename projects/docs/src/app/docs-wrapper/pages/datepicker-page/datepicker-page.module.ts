import { NgModule } from "@angular/core";
import { DatepickerModule } from "@sebgroup/ng-components/datepicker";
import { DatepickerPageComponent } from "./datepicker-page.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DocPageModule } from "../../doc-page/doc-page.module";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "@sebgroup/ng-components/checkbox";

const routes: Routes = [{ path: "", component: DatepickerPageComponent }];

@NgModule({
    declarations: [DatepickerPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DocPageModule, DatepickerModule, CheckboxModule],
})
export class DatepickerPageModule {}
