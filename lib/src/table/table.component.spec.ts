import { ViewChild, Component, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TableComponent } from "./table.component";
import { TableHeaderListItem, SortInfo } from "./table.models";
import { TableModule } from "./table.module";
import { By } from "@angular/platform-browser";

interface TestTableDataType {
    label: string;
    value: string;
}
@Component({
    selector: "test-seb-table",
    template: `
        <seb-table
            [fixedHeight]="fixedHeight"
            [rows]="rows"
            [headerList]="headerList"
            [sortInfo]="sortInfo"
            [selectable]="selectable"
            [selectedRowIndexes]="selectedRows"
            [isAllSelected]="isAllSelected"
            (sortClicked)="handleSortClicked($event)"
            (rowClicked)="handleSelectRow($event)"
            (selectAllClicked)="handleSelectAll()"
        ></seb-table>
    `,
})
class TableTestComponent {
    @ViewChild(TableComponent) tableComponent: TableComponent;
    rows: TestTableDataType[] = [
        { label: "Nigeria", value: "NN" },
        { label: "Iraq", value: "ID" },
        { label: "Malaysia", value: "RM" },
        { label: "Slovenia", value: "EUR" },
        { label: "Morocco", value: "MAD" },
    ];
    headerList: TableHeaderListItem<TestTableDataType>[] = [
        { tableKeySelector: "label", valueType: "string", label: "Label" },
        { tableKeySelector: "value", valueType: "string", label: "Value" },
    ];
    sortInfo?: SortInfo;
    selectable?: boolean = false;
    selectedRows?: number[] = [];
    isAllSelected?: boolean = false;
    fixedHeight: string;

    handleSortClicked(e) {}
    handleSelectRow(e) {}
    handleSelectAll() {}
}

describe("TableComponent", () => {
    let component: TableTestComponent;
    let fixture: ComponentFixture<TableTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TableModule],
            declarations: [TableTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should render a header with all columns", () => {
        expect(fixture.debugElement.queryAll(By.css(".seb-table>table>thead>tr")).length).toBe(1);
        expect(fixture.debugElement.queryAll(By.css(".seb-table>table>thead>tr>th")).length).toBe(component.headerList.length);
    });

    it("should render a body with all rows and data cells", () => {
        expect(fixture.debugElement.queryAll(By.css(".seb-table>table>tbody>tr")).length).toBe(component.rows.length);
        expect(fixture.debugElement.queryAll(By.css(".seb-table>table>tbody>tr>td")).length).toBe(
            component.rows.length * Object.keys(component.rows[0]).length
        );
    });

    it("should not show checkboxes by default", () => {
        expect(fixture.debugElement.queryAll(By.css(".table-checkbox")).length).toBe(0);
    });

    describe("Selectable Table: ", () => {
        let onSelectRow: jasmine.Spy;
        let onSelectAll: jasmine.Spy;

        beforeEach(() => {
            component.selectable = true;
            onSelectRow = spyOn(component, "handleSelectRow");
            onSelectAll = spyOn(component, "handleSelectAll");
            fixture.detectChanges();
            expect(fixture.debugElement).toBeTruthy();
        });

        it("should enable hoverable rows to indicate they can be clicked", () => {
            expect(fixture.debugElement.queryAll(By.css(".seb-table>table.table-hover")).length).toBe(1);
        });

        it("should show checkboxes if selectable", () => {
            expect(fixture.debugElement.queryAll(By.css(".table-checkbox")).length).toBe(component.rows.length + 1); // all rows plus header row
        });

        it("should select the right rows and show them as checked", () => {
            component.selectedRows = [0, 3];
            fixture.detectChanges();

            expect(fixture.debugElement.queryAll(By.css(".table-checkbox>input.form-control:checked")).length).toBe(
                component.selectedRows.length
            );

            component.selectedRows.map(row => {
                expect(
                    fixture.debugElement.queryAll(By.css(".seb-table>table>tbody>tr"))[row].queryAll(By.css("td"))[1].childNodes[0]
                        .nativeNode.textContent
                ).toBe(component.rows[row].label);
            });
        });

        it("should show the select all checkbox in the header as checked if isAllSelected is true", () => {
            component.isAllSelected = true;
            fixture.detectChanges();

            expect(fixture.debugElement.queryAll(By.css(".table-checkbox>input.form-control:checked")).length).toBe(1);
        });

        it("should output the row selected event when clicking on the row with the correct event info", () => {
            const rowIndexToTest: number = 1;
            const match: DebugElement = fixture.debugElement.queryAll(By.css(".seb-table>table>tbody>tr"))[rowIndexToTest];
            expect(match).toBeTruthy();
            match.nativeElement.dispatchEvent(new Event("click"));
            expect(onSelectRow).toHaveBeenCalledTimes(1);
            expect(onSelectRow).toHaveBeenCalledWith({ item: component.rows[rowIndexToTest], index: rowIndexToTest });
        });

        it("should output the select all event when clicking on the checkbox in the header", () => {
            const matches: DebugElement[] = fixture.debugElement.queryAll(By.css(".seb-table>table>thead>tr>th.table-checkbox"));

            expect(matches).toBeTruthy();
            expect(matches.length).toBe(1);
            matches[0].nativeElement.dispatchEvent(new Event("click"));
            expect(onSelectAll).toHaveBeenCalledTimes(1);
        });
    });

    it("should not enable sorting by default", () => {
        expect(fixture.debugElement.queryAll(By.css(".seb-table>table>thead>tr>th.sort")).length).toBe(0);
    });

    describe("Sortable Table: ", () => {
        let onSort: jasmine.Spy;
        let headerListToTest: TableHeaderListItem<TestTableDataType>;

        beforeEach(() => {
            headerListToTest = component.headerList[0];
            component.sortInfo = { isAscending: true, type: "string", column: headerListToTest.tableKeySelector };
            onSort = spyOn(component, "handleSortClicked");
            fixture.detectChanges();

            expect(fixture.debugElement).toBeTruthy();
        });

        it("should enable sorting when sortInfo provided", () => {
            expect(fixture.debugElement.queryAll(By.css(".seb-table>table>thead>tr>th.sort")).length).toBe(component.headerList.length);
        });

        it("should hightlight which column is the table sorted by correctly", () => {
            expect(fixture.debugElement.queryAll(By.css(".seb-table>table>thead>tr>th.sort.sort-asc")).length).toBe(1);
            expect(
                fixture.debugElement.queryAll(By.css(".seb-table>table>thead>tr>th.sort.sort-asc>span"))[0].nativeElement.textContent
            ).toBe(headerListToTest.label);
        });

        it("should indicate if the column is ascending or descending correctly", () => {
            component.sortInfo = { ...component.sortInfo, isAscending: false };
            fixture.detectChanges();

            expect(fixture.debugElement.queryAll(By.css(".seb-table>table>thead>tr>th.sort.sort-desc")).length).toBe(1);
            expect(
                fixture.debugElement.queryAll(By.css(".seb-table>table>thead>tr>th.sort.sort-desc>span"))[0].nativeElement.textContent
            ).toBe(headerListToTest.label);
        });

        it("should output the sort clicked event when clicking on the column with the correct event info", () => {
            fixture.debugElement
                .queryAll(By.css(".seb-table>table>thead>tr>th.sort.sort-asc"))[0]
                .nativeElement.dispatchEvent(new Event("click"));
            expect(onSort).toHaveBeenCalledTimes(1);
            expect(onSort).toHaveBeenCalledWith(headerListToTest.tableKeySelector);
        });
    });

    describe("Fixed Height Table: ", () => {
        beforeEach(() => {
            component.fixedHeight = "100px";
            fixture.detectChanges();

            expect(fixture.debugElement).toBeTruthy();
        });

        it("should fix the height of the table with the provided value", () => {
            expect(fixture.debugElement.queryAll(By.css(".seb-table.seb-table-fixed-height")).length).toBe(1);
            expect(fixture.debugElement.queryAll(By.css(".seb-table.seb-table-fixed-height"))[0].styles.height).toBe(component.fixedHeight);
        });
    });
});
