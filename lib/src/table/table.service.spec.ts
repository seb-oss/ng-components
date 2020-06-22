import { TestBed } from "@angular/core/testing";

import { TableService } from "./table.service";
import { TableConfig } from "./table.models";

interface TestTableDataType {
    country: string;
    currency: string;
}

describe("TableService", () => {
    let service: TableService<TestTableDataType>;
    let datasource: TestTableDataType[];
    let pagination: TableConfig["pagination"];
    let noOfPages: number;
    let sort: TableConfig<TestTableDataType>["sort"];

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject<TableService<TestTableDataType>>(TableService);
        datasource = [
            { country: "Nigeria", currency: "NN" },
            { country: "Iraq", currency: "ID" },
            { country: "Malaysia", currency: "RM" },
            { country: "Slovenia", currency: "EUR" },
            { country: "Morocco", currency: "MAD" },
        ];
        pagination = { maxItems: 2 };
        noOfPages = Math.round(Math.ceil(datasource.length / pagination.maxItems));
        sort = { isAscending: true, column: "country", type: "string" };

        service.registerDatasource(datasource);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should output initial transformed data after datasource registration ", () => {
        expect(service.currentTable.value.length).toBe(datasource.length);
        expect(service.currentPageIndex.value).toBe(0);
        expect(service.isAllSelected.value).toBe(false);
    });

    it("should handle selection", () => {
        service.handleSelectRow(0);
        expect(service.selectedRows.value).toEqual([[0]]);

        service.handleSelectRow(datasource.length - 1);
        expect(service.selectedRows.value).toEqual([[0, datasource.length - 1]]);
        expect(service.isAllSelected.value).toBe(false);

        service.handleSelectAllRows();
        expect(service.selectedRows.value).toEqual([[...datasource.map((e, i) => i)]]);
        expect(service.isAllSelected.value).toBe(true);

        service.handleSelectAllRows();
        expect(service.selectedRows.value).toEqual([[]]);
        expect(service.isAllSelected.value).toBe(false);
    });

    it("should handle pagination", () => {
        service.registerDatasource(datasource, { pagination });
        expect(service.paginatedTable.value.length).toBe(noOfPages); // correct number of pages
        expect(service.currentPageIndex.value).toBe(0); // should be page 1 by default
        expect(service.currentTable.value).toEqual(datasource.slice(0, pagination.maxItems)); // returns page 1 with correct number of rows

        service.handleChangePagination(2); // navigate to next page (page 2)
        expect(service.currentTable.value).toEqual(service.paginatedTable.value[1]); // returns page 2 with correct number of rows

        service.handleChangePagination(3); // navigate to last page
        expect(service.currentTable.value).toEqual(service.paginatedTable.value[2]); // returns last page with correct number of rows

        service.handleChangePagination(datasource.length * 2); // fail gracefully when index out of range
        service.handleChangePagination(-datasource.length * 2); // fail gracefully when index out of range
        expect(service.currentTable.value.length).toBeGreaterThan(0);
    });

    it("should handle sorting", () => {
        service.registerDatasource(datasource, { sort }); // set initial sort
        expect(service.currentSortInfo.value).toEqual(sort);
        expect(service.sortedTable.value).toEqual(service.currentTable.value);
        expect(service.currentTable.value[0].country).toEqual("Iraq"); // label in first row is correct
        expect(service.currentTable.value[service.currentTable.value.length - 1].country).toEqual("Slovenia"); // label last row is correct

        service.handleChangeSort("country"); // trigger sort on the same column again which should change from ascending to descending
        expect(service.currentSortInfo.value.isAscending).toEqual(false);
        expect(service.currentTable.value[0].country).toEqual("Slovenia"); // last row is the first row now

        service.handleChangeSort("currency"); // change sort to different column
        expect(service.currentSortInfo.value.column).toEqual("currency");
        expect(service.currentSortInfo.value.isAscending).toEqual(true); // should be initially ascending by default on new column
        expect(service.currentTable.value[service.currentTable.value.length - 1].country).toEqual("Malaysia"); // label of the last row is correct
    });

    it("should preserve selection on sort and pagination changes", () => {
        service.registerDatasource(datasource, { sort, pagination }); // set initial sort to country ascending and default pagination config
        expect(service.currentTable.value).toEqual([datasource[1], datasource[2]]); // initially sorted by country ascending, should expect Iraq and Malaysia

        // select first two rows
        service.handleSelectRow(0);
        service.handleSelectRow(1);

        expect(service.selectedRows.value).toEqual([[0, 1], [], []]); // selected rows respects pagination so we should expect this result

        service.handleChangeSort("currency"); // sort by second column - currency
        service.handleChangePagination(2); // navigate to next page (page 2)

        expect(service.selectedRows.value).toEqual([[1], [], [0]]); // show same rows selected but according to the sort changes

        service.handleChangeSort("country"); // revert sort back
        service.handleChangePagination(1); // back to page 1

        expect(service.selectedRows.value).toEqual([[0, 1], [], []]); // should be the same as the first check above
    });

    it("should respect column order", () => {
        const order: TableConfig<TestTableDataType>["order"] = { country: 1, currency: 2 };
        service.registerDatasource(datasource, { order }); // set config for order
        expect(service.tableHeaderList.value[0].tableKeySelector).toBe("country");
        expect(service.tableHeaderList.value[1].tableKeySelector).toBe("currency");
    });

    it("should display all columns by default and if whitelist is empty", () => {
        expect(service.tableHeaderList.value.length).toBe(Object.keys(datasource[0]).length); // showing all columns
        service.registerDatasource(datasource, { columns: [] }); // set config for columns
        expect(service.tableHeaderList.value.length).toBe(Object.keys(datasource[0]).length); // still showing all columns
    });

    it("should respect column whitelist if at lest one element is provided", () => {
        const columns: TableConfig<TestTableDataType>["columns"] = ["country"];
        service.registerDatasource(datasource, { columns }); // set config for columns
        expect(service.tableHeaderList.value.length).toBe(1);
        expect(service.tableHeaderList.value[0].tableKeySelector).toBe("country");
    });

    it("should handle custom header labels", () => {
        const labels: TableConfig<TestTableDataType>["labels"] = { country: "Place of birth" };
        service.registerDatasource(datasource, { labels }); // set config for order
        expect(service.tableHeaderList.value[0].label).toBe("Place of birth"); // custom
        expect(service.tableHeaderList.value[1].label).toBe("Currency"); // default label
    });

    it("should respect custom data types", () => {
        const types: TableConfig<TestTableDataType>["types"] = { currency: "custom-html" };
        service.registerDatasource(datasource, { types }); // set config for types
        expect(service.tableHeaderList.value.length).toBe(2);
        expect(service.tableHeaderList.value[0].valueType).toBe("string");
        expect(service.tableHeaderList.value[1].tableKeySelector).toBe("currency");
        expect(service.tableHeaderList.value[1].valueType).toBe("custom-html");
    });
});
