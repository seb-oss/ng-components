
import { TableComponent } from "./table.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TableTHComponent } from "./table-th/table-th.component";
import { TableTDComponent } from "./table-td/table-td.component";
import { TableHeaderComponent } from "./table-header/table-header.component";
import { TableBodyComponent } from "./table-body/table-body.component";

describe("Component: TableComponent", () => {
    let fixture: ComponentFixture<TableComponent>;
    let component: TableComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [
                TableComponent,
                TableTHComponent,
                TableTDComponent,
                TableHeaderComponent,
                TableBodyComponent,
            ],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TableComponent);
            component = fixture.componentInstance;
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));
});
