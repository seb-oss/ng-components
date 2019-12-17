import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TableComponent } from "./table.component";
import { TableTHComponent } from "./table-th/table-th.component";
import { TableTDComponent } from "./table-td/table-td.component";
import { TableHeaderComponent } from "./table-header/table-header.component";
import { TableBodyComponent } from "./table-body/table-body.component";

@NgModule({
    declarations: [
        TableComponent,
        TableTHComponent,
        TableTDComponent,
        TableHeaderComponent,
        TableBodyComponent,
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        TableComponent,
        TableTHComponent,
        TableTDComponent,
        TableHeaderComponent,
        TableBodyComponent
    ]
})
export class TableModule { }
