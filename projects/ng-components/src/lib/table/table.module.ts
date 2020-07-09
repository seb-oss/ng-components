import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TableComponent } from "./table.component";
import { TableTHComponent } from "./table-th/table-th.component";
import { TableTDComponent } from "./table-td/table-td.component";
import { TableHeaderComponent } from "./table-header/table-header.component";
import { TableBodyComponent } from "./table-body/table-body.component";
import { SafeHtmlPipe } from "./table.pipe";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TableComponent, TableTHComponent, TableTDComponent, TableHeaderComponent, TableBodyComponent, SafeHtmlPipe],
    exports: [TableComponent],
})
export class TableModule {}
