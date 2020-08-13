import { TestBed } from "@angular/core/testing";

import { TableService } from "./table.service";
import { TableConfig, TableServiceSubscriber, TableServiceHandler } from "./table.models";

interface TestTableDataType {
    country: string;
    currency: string;
}

describe("TableService", () => {
    let TABLE_ID = "test";
    let service: TableService;
    let datasource: TestTableDataType[];
    let pagination: TableConfig["pagination"];
    let noOfPages: number;
    let sort: TableConfig["sort"];
    let getData: TableServiceSubscriber;
    let change: TableServiceHandler;

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

        getData = service.registerDatasource(TABLE_ID, datasource).getSubscription;
        change = service.registerDatasource(TABLE_ID, datasource).handle;
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should output initial transformed data after datasource registration ", () => {
        expect(getData("currentTable").value.length).toBe(datasource.length);
        expect(getData("currentPageIndex").value).toBe(0);
        expect(getData("isAllSelected").value).toBe(false);
    });

    it("should handle selection", () => {
        change("selectRow")(0);
        expect(getData("selectedRows").value).toEqual([[0]]);

        change("selectRow")(datasource.length - 1);
        expect(getData("selectedRows").value).toEqual([[0, datasource.length - 1]]);
        expect(getData("isAllSelected").value).toBe(false);

        change("selectAllRows")();
        expect(getData("selectedRows").value).toEqual([[...datasource.map((e, i) => i)]]);
        expect(getData("isAllSelected").value).toBe(true);

        change("selectAllRows")();
        expect(getData("selectedRows").value).toEqual([[]]);
        expect(getData("isAllSelected").value).toBe(false);
    });

    it("should handle pagination", () => {
        service.registerDatasource(TABLE_ID, datasource, { pagination });
        expect(getData("paginatedTable").value.length).toBe(noOfPages); // correct number of pages
        expect(getData("currentPageIndex").value).toBe(0); // should be page 1 by default
        expect(getData("currentTable").value).toEqual(datasource.slice(0, pagination.maxItems)); // returns page 1 with correct number of rows

        change("changePagination")(2); // navigate to next page (page 2)
        expect(getData("currentTable").value).toEqual(getData("paginatedTable").value[1]); // returns page 2 with correct number of rows

        change("changePagination")(3); // navigate to last page
        expect(getData("currentTable").value).toEqual(getData("paginatedTable").value[2]); // returns last page with correct number of rows

        change("changePagination")(datasource.length * 2); // fail gracefully when index out of range
        change("changePagination")(-datasource.length * 2); // fail gracefully when index out of range
        expect(getData("currentTable").value.length).toBeGreaterThan(0);
    });

    it("should handle sorting", () => {
        service.registerDatasource(TABLE_ID, datasource, { sort }); // set initial sort
        expect(getData("currentSortInfo")[TABLE_ID].value).toEqual(sort);
        expect(getData("sortedTable").value).toEqual(getData("currentTable").value);
        expect(getData("currentTable").value[0].country).toEqual("Iraq"); // label in first row is correct
        expect(getData("currentTable").value[getData("currentTable").value.length - 1].country).toEqual("Slovenia"); // label last row is correct

        change("changeSort")("country"); // trigger sort on the same column again which should change from ascending to descending
        expect(getData("currentSortInfo").value.isAscending).toEqual(false);
        expect(getData("currentTable").value[0].country).toEqual("Slovenia"); // last row is the first row now

        change("changeSort")("currency"); // change sort to different column
        expect(getData("currentSortInfo").value.column).toEqual("currency");
        expect(getData("currentSortInfo").value.isAscending).toEqual(true); // should be initially ascending by default on new column
        expect(getData("currentTable").value[getData("currentTable").value.length - 1].country).toEqual("Malaysia"); // label of the last row is correct
    });

    it("should preserve selection on sort and pagination changes", () => {
        service.registerDatasource(TABLE_ID, datasource, { sort, pagination }); // set initial sort to country ascending and default pagination config
        expect(getData("currentTable").value).toEqual([datasource[1], datasource[2]]); // initially sorted by country ascending, should expect Iraq and Malaysia

        // select first two rows
        change("selectRow")(0);
        change("selectRow")(1);

        expect(getData("selectedRows").value).toEqual([[0, 1], [], []]); // selected rows respects pagination so we should expect this result

        change("changeSort")("currency"); // sort by second column - currency
        change("changePagination")(2); // navigate to next page (page 2)

        expect(getData("selectedRows").value).toEqual([[1], [], [0]]); // show same rows selected but according to the sort changes

        change("changeSort")("country"); // revert sort back
        change("changePagination")(1); // back to page 1

        expect(getData("selectedRows").value).toEqual([[0, 1], [], []]); // should be the same as the first check above
    });

    it("should respect column order", () => {
        const order: TableConfig<TestTableDataType>["order"] = { country: 1, currency: 2 };
        service.registerDatasource(TABLE_ID, datasource, { order }); // set config for order
        expect(getData("tableHeaderList").value[0].tableKeySelector).toBe("country");
        expect(getData("tableHeaderList").value[1].tableKeySelector).toBe("currency");
    });

    it("should display all columns by default and if whitelist is empty", () => {
        expect(getData("tableHeaderList").value.length).toBe(Object.keys(datasource[0]).length); // showing all columns
        service.registerDatasource(TABLE_ID, datasource, { columns: [] }); // set config for columns
        expect(getData("tableHeaderList").value.length).toBe(Object.keys(datasource[0]).length); // still showing all columns
    });

    it("should respect column whitelist if at lest one element is provided", () => {
        const columns: TableConfig<TestTableDataType>["columns"] = ["country"];
        service.registerDatasource(TABLE_ID, datasource, { columns }); // set config for columns
        expect(getData("tableHeaderList").value.length).toBe(1);
        expect(getData("tableHeaderList").value[0].tableKeySelector).toBe("country");
    });

    it("should handle custom header labels", () => {
        const labels: TableConfig<TestTableDataType>["labels"] = { country: "Place of birth" };
        service.registerDatasource(TABLE_ID, datasource, { labels }); // set config for order
        expect(getData("tableHeaderList").value[0].label).toBe("Place of birth"); // custom
        expect(getData("tableHeaderList").value[1].label).toBe("Currency"); // default label
    });

    it("should respect custom data types", () => {
        const types: TableConfig<TestTableDataType>["types"] = { currency: "custom-html" };
        service.registerDatasource(TABLE_ID, datasource, { types }); // set config for types
        expect(getData("tableHeaderList").value.length).toBe(2);
        expect(getData("tableHeaderList").value[0].valueType).toBe("string");
        expect(getData("tableHeaderList").value[1].tableKeySelector).toBe("currency");
        expect(getData("tableHeaderList").value[1].valueType).toBe("custom-html");
    });
});
