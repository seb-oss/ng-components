import { TestBed } from "@angular/core/testing";

import { TableService } from "./table.service";
import { TableConfig, TableServiceData, TableServiceHandlers, TableServiceDataAndHandlers } from "./table.models";

interface TestTableDataType {
    country: string;
    currency: string;
}

describe("TableService", () => {
    let TABLE_ID = "test-table";
    let service: TableService;
    let datasource: TestTableDataType[];
    let pagination: TableConfig["pagination"];
    let noOfPages: number;
    let sort: TableConfig["sort"];
    let data: TableServiceData<TestTableDataType>;
    let handle: TableServiceHandlers<TestTableDataType>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject<TableService>(TableService);
        datasource = [
            { country: "Nigeria", currency: "NN" },
            { country: "Iraq", currency: "IQD" },
            { country: "Malaysia", currency: "RM" },
            { country: "Slovenia", currency: "EUR" },
            { country: "Morocco", currency: "MAD" },
        ];
        pagination = { maxItems: 2 };
        noOfPages = Math.round(Math.ceil(datasource.length / pagination.maxItems));
        sort = { isAscending: true, column: "country", type: "string" };

        const dataAndHandlers: TableServiceDataAndHandlers<TestTableDataType> = service.registerDatasource<TestTableDataType>(
            TABLE_ID,
            datasource
        );
        data = dataAndHandlers.get;
        handle = dataAndHandlers.handle;
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should output initial transformed data after datasource registration ", () => {
        expect(data.rows.value.length).toBe(datasource.length);
        expect(data.pageNo.value).toBe(0);
        expect(data.isAllSelected.value).toBe(false);
    });

    it("should handle selection", () => {
        handle.selectRow(0);
        expect(data.selectedRows.value).toEqual([[0]]);

        handle.selectRow(datasource.length - 1);
        expect(data.selectedRows.value).toEqual([[0, datasource.length - 1]]);
        expect(data.isAllSelected.value).toBe(false);

        handle.selectAllRows();
        expect(data.selectedRows.value).toEqual([[...datasource.map((e, i) => i)]]);
        expect(data.isAllSelected.value).toBe(true);

        handle.selectAllRows();
        expect(data.selectedRows.value).toEqual([[]]);
        expect(data.isAllSelected.value).toBe(false);
    });

    it("should handle pagination", () => {
        const { get, handle: h } = service.registerDatasource("paginated-test-table", datasource, { pagination });
        expect(get.paginatedTable.value.length).toBe(noOfPages); // correct number of pages
        expect(get.pageNo.value).toBe(0); // should be page 1 by default
        expect(get.rows.value).toEqual(datasource.slice(0, pagination.maxItems)); // returns page 1 with correct number of rows

        h.changePage(2); // navigate to next page (page 2)
        expect(get.rows.value).toEqual(get.paginatedTable.value[1]); // returns page 2 with correct number of rows

        h.changePage(3); // navigate to last page
        expect(get.rows.value).toEqual(get.paginatedTable.value[2]); // returns last page with correct number of rows

        h.changePage(datasource.length * 2); // fail gracefully when index out of range
        h.changePage(-datasource.length * 2); // fail gracefully when index out of range
        expect(get.rows.value.length).toBeGreaterThan(0);
    });

    it("should handle sorting", () => {
        const { get, handle: h } = service.registerDatasource("sorted-test-table", datasource, { sort }); // set initial sort
        expect(get.sortInfo.value).toEqual(sort);
        expect(get.sortedTable.value).toEqual(get.rows.value);
        expect(get.rows.value[0].country).toEqual("Iraq"); // label in first row is correct
        expect(get.rows.value[get.rows.value.length - 1].country).toEqual("Slovenia"); // label last row is correct

        h.sort("country"); // trigger sort on the same column again which should change from ascending to descending
        expect(get.sortInfo.value.isAscending).toEqual(false);
        expect(get.rows.value[0].country).toEqual("Slovenia"); // last row is the first row now

        h.sort("currency"); // change sort to different column
        expect(get.sortInfo.value.column).toEqual("currency");
        expect(get.sortInfo.value.isAscending).toEqual(true); // should be initially ascending by default on new column
        expect(get.rows.value[get.rows.value.length - 1].country).toEqual("Malaysia"); // label of the last row is correct
    });

    it("should preserve selection on sort and pagination changes", () => {
        const { get, handle: h } = service.registerDatasource("complex-test-table", datasource, { sort, pagination }); // set initial sort to country ascending and default pagination config
        expect(get.rows.value).toEqual([datasource[1], datasource[2]]); // initially sorted by country ascending, should expect Iraq and Malaysia

        // select first two rows
        h.selectRow(0);
        h.selectRow(1);

        expect(get.selectedRows.value).toEqual([[0, 1], [], []]); // selected rows respects pagination so we should expect this result

        h.sort("currency"); // sort by second column - currency
        h.changePage(2); // navigate to next page (page 2)

        expect(get.selectedRows.value).toEqual([[1], [], [0]]); // show same rows selected but according to the sort changes

        h.sort("country"); // revert sort back
        h.changePage(1); // back to page 1

        expect(get.selectedRows.value).toEqual([[0, 1], [], []]); // should be the same as the first check above
    });

    it("should respect column order", () => {
        const order: TableConfig<TestTableDataType>["order"] = { country: 1, currency: 2 };
        const { get } = service.registerDatasource("column-order-table", datasource, { order }); // set config for order
        expect(get.headerList.value[0].tableKeySelector).toBe("country");
        expect(get.headerList.value[1].tableKeySelector).toBe("currency");
    });

    it("should display all columns by default and if whitelist is empty", () => {
        expect(data.headerList.value.length).toBe(Object.keys(datasource[0]).length); // showing all columns
        const { get } = service.registerDatasource("test-whitelist-table", datasource, { columns: [] }); // set config for columns
        expect(get.headerList.value.length).toBe(Object.keys(datasource[0]).length); // still showing all columns
    });

    it("should respect column whitelist if at least one element is provided", () => {
        const columns: TableConfig<TestTableDataType>["columns"] = ["country"];
        const { get } = service.registerDatasource("one-element-column-table", datasource, { columns }); // set config for columns
        expect(get.headerList.value.length).toBe(1);
        expect(get.headerList.value[0].tableKeySelector).toBe("country");
    });

    it("should handle custom header labels", () => {
        const labels: TableConfig<TestTableDataType>["labels"] = { country: "Place of birth" };
        const { get } = service.registerDatasource("custom-header-labels-table", datasource, { labels }); // set config for order
        expect(get.headerList.value[0].label).toBe("Place of birth"); // custom
        expect(get.headerList.value[1].label).toBe("Currency"); // default label
    });

    it("should respect custom data types", () => {
        const types: TableConfig<TestTableDataType>["types"] = { currency: "custom-html" };
        const { get } = service.registerDatasource("custom-data-types-table", datasource, { types }); // set config for types
        expect(get.headerList.value.length).toBe(2);
        expect(get.headerList.value[0].valueType).toBe("string");
        expect(get.headerList.value[1].tableKeySelector).toBe("currency");
        expect(get.headerList.value[1].valueType).toBe("custom-html");
    });
});
