import { Injectable, Output, EventEmitter } from "@angular/core";
import { TableHeaderListItem, TableConfig, SortInfo, TableHeaderListValueType } from "./table.models";
// import { readableFromCamelCase } from "@sebgroup/frontend-tools/dist/dateDiff";
// import { dateDiff } from "@sebgroup/frontend-tools/dist/dateDiff"; // NOTE: try this if sort table by date is not working with current implementation
import { toDate } from "@sebgroup/frontend-tools/dist/toDate";
import { readableFromCamelCase } from "../utils";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TableService<T extends object> {
    // ------------- INITIALISATION -------------
    // ============ TABLE =======================
    private _table: Array<T>;
    private get table(): Array<T> {
        return this._table;
    }
    private set table(table: Array<T>) {
        this._table = table;
    }

    // ============ TABLE CONFIG ================
    private _tableConfig: TableConfig<T> = {};
    private get tableConfig(): TableConfig<T> {
        return this._tableConfig;
    }
    private set tableConfig(value: TableConfig<T>) {
        const defaultTypes: TableConfig<T>["types"] = this.initConfigTypes();
        this._tableConfig = {
            ...value,
            types: { ...defaultTypes, ...value.types },
        };
    }

    // ============ SORT INFO ===================
    private _sortInfo: SortInfo;
    private get sortInfo(): SortInfo {
        if (!this._sortInfo) {
            if (this.tableConfig && this.tableConfig.sort) {
                this._sortInfo = this.tableConfig.sort;
            }
        }

        return this._sortInfo;
    }
    private set sortInfo(value: SortInfo) {
        this._sortInfo = { ...value };
    }

    @Output() currentSortInfo: BehaviorSubject<SortInfo<keyof T>> = new BehaviorSubject(null);

    private columnsList: string[];

    /** The Master Table, Sorted */
    private _sortedTable: T[] = [];
    @Output() sortedTable: BehaviorSubject<T[]> = new BehaviorSubject([]);
    /** The Master Table, Paginated */
    private _paginatedTable: T[][] = [[]];
    @Output() paginatedTable: BehaviorSubject<T[][]> = new BehaviorSubject([[]]);
    /** The Currently Visible Page of the Sorted and Paginated Master Table */
    private _currentTable: T[] = [];
    @Output() currentTable: BehaviorSubject<T[]> = new BehaviorSubject([]);
    /** The Index of the currently selected page */
    private _currentPageIndex: number = 0;
    @Output() currentPageIndex: BehaviorSubject<number> = new BehaviorSubject(0);
    /** The Header List of The Master Table with all the Column Info */
    private _tableHeaderList: Array<TableHeaderListItem<T>> = [];
    @Output() tableHeaderList: BehaviorSubject<Array<TableHeaderListItem<T>>> = new BehaviorSubject([]);

    // ------------- CONSTRUCTOR ----------------
    constructor() {}

    public registerDatasource(table: Array<T>, config: TableConfig<T> = {}) {
        this.table = table;
        this.tableConfig = config;
        this.reloadTable();
    }

    // ------------- HELPERS --------------------
    /**
     * INIT CONFIG TYPES
     * @returns the initial configuration for config types
     */
    private initConfigTypes(): TableConfig<T>["types"] {
        if (this.table && this.table.length) {
            const types: TableConfig<T>["types"] = this.table.reduce((result, item) => {
                for (const key in item) {
                    if (item[key]) {
                        const type = (typeof item[key]).toLowerCase();
                        if (type === "string" || type === "date" || type === "number") {
                            result[key.toString()] = type;
                        } else {
                            result[key.toString()] = "string";
                        }
                    }
                }
                return result;
            }, {});
            return types;
        }

        return {};
    }

    /**
     * RELOAD TABLE:
     * Responsible for recalculation (or initialisation) of everything needed for the table including the sort and pagination and rebuilds all the table components
     */
    private reloadTable(): void {
        const table: Array<T> = this.table && this.table.length ? [...this.table] : [];

        const maxItems: number = this.calculateMaxItemsPerPage();
        const config: TableConfig<T> = this.tableConfig;
        const { types, labels, columns, order }: TableConfig<T> = config;

        this.setupColumnsList(columns, table, order);

        this.setupTable(table, this.sortInfo, maxItems);

        this.setupTableHeader(types, labels);

        this.currentSortInfo.next(this.sortInfo);
        this.sortedTable.next(this._sortedTable);
        this.paginatedTable.next(this._paginatedTable);
        this.currentTable.next(this._currentTable);
        this.tableHeaderList.next(this._tableHeaderList);
        this.currentPageIndex.next(this._currentPageIndex);
    }

    /**
     * CALCULATE MAX ITEMS PER PAGE:
     * Calculates the current max items per page
     */
    private calculateMaxItemsPerPage = (): number => {
        if (this.tableConfig.pagination) {
            return this.tableConfig.pagination.maxItems;
        } else {
            return this.table ? this.table.length : 0;
        }
    };

    /**
     * SETUP COLUMN LIST
     * Sets up the list of columns which should be displayed in the table based on the config or it will be inferred from the data itself
     * @param columns the list of columns which should be displayed in the table from the table config
     * @param table the table itself
     * @param order the order or the columns
     */
    private setupColumnsList(columns: TableConfig<T>["columns"], table: Array<T>, order?: TableConfig<T>["order"]): void {
        let columnsList: Array<string> = [];
        if (columns && columns.length) {
            columnsList = columns as string[];
        } else {
            for (const tableListItem of table) {
                columnsList = [...new Set([...columnsList, ...Object.keys(tableListItem)])];
            }

            if (order) {
                columnsList = columnsList.sort((a: string, b: string) => {
                    const firstItem: number = this.tableConfig.order[a] ? this.tableConfig.order[a] : 1;
                    const secondItem: number = this.tableConfig.order[b] ? this.tableConfig.order[b] : -1;
                    return firstItem - secondItem;
                });
            }
        }

        this.columnsList = [...columnsList];
    }

    /**
     * SETUP TABLE:
     * Sets up the sorted, paginated and current page table
     * @param {Array<T>} table the table
     * @param {SortInfo} sortInfo The information on how to sort the table: column name, type and asc/desc
     * @param {number} maxItems The maximum number of items to be displayed per page
     */
    private setupTable(table: Array<T>, sortInfo: SortInfo, maxItems: number): void {
        this._sortedTable = this.makeSortedTable(table, sortInfo);
        this._paginatedTable = this.makePaginatedTable(this._sortedTable, maxItems);
        if (this._currentPageIndex > this._paginatedTable.length - 1) {
            this._currentPageIndex = this._paginatedTable.length - 1;
        }
        this._currentTable = [...this._paginatedTable[this._currentPageIndex]];
    }

    /**
     * MAKE SORTED TABLE
     * @param table that table you wish to sort
     * @param sort the sort info
     * @returns The new sorted table
     */
    private makeSortedTable(table: Array<T>, sort?: SortInfo): Array<T> {
        if (sort) {
            return this.sortTable(table, sort);
        }
        return [...table];
    }

    /**
     * MAKE PAGINATED TABLE
     * @param table the table you wish to paginate
     * @param maxItems the number of max items on one page
     * @returns the paginated table as array or arrays
     */
    private makePaginatedTable(table: Array<T>, maxItems: number): Array<Array<T>> {
        const paginatedTable = [];

        while (table.length > 0) {
            paginatedTable.push(table.splice(0, maxItems));
        }

        if (paginatedTable.length === 0) {
            paginatedTable.push([]);
        }

        return paginatedTable;
    }

    /**
     * SETUP TABLE HEADER:
     * Sets up the table header according to the current master table and it's config info
     * @param {object} types a REQUIRED map of every column name what type of data it represents
     * @param {object} labels an OPTIONAL map of column names and what label to display as column
     */
    private setupTableHeader(types: TableConfig<T>["types"], labels?: TableConfig<T>["labels"]): void {
        const tableHeaderList: Array<TableHeaderListItem<T>> = [];

        for (const columnName of this.columnsList) {
            const tableKeySelector: keyof T = columnName as keyof T;
            const label: string = labels && labels[columnName] ? labels[columnName] : readableFromCamelCase(columnName);
            const valueType: TableHeaderListValueType = types[columnName] || "string";
            tableHeaderList.push({
                tableKeySelector,
                valueType,
                label,
            });
        }
        this._tableHeaderList = tableHeaderList;
    }

    /**
     * Sort the table:
     *
     * This method will sort the table based on the column selected and it's ascending/descending property
     * @param {Array<T>} table the table to be sorted
     * @param {SortInfo<keyof T>} sortInfo The information on how to sort the table: column name, type and asc/desc
     * @returns the sorted table
     */
    private sortTable = (table: Array<T>, sortInfo: SortInfo): Array<T> => {
        const { column, isAscending, type }: SortInfo<keyof T> = sortInfo;
        const newSortedTable: Array<T> = table.sort((a: any, b: any) => {
            // flipping the first and second items based on ascending/descending
            const firstItem: string | Date = isAscending ? a[column] : b[column];
            const secondItem: string | Date = isAscending ? b[column] : a[column];
            switch (type) {
                case "string":
                    return String(firstItem).toLowerCase().localeCompare(String(secondItem).toLowerCase());
                case "date":
                    return toDate(firstItem) > toDate(secondItem) ? 1 : -1;
                default:
                    return (firstItem as any) - (secondItem as any);
            }
        });

        return [...(newSortedTable ? newSortedTable : [])];
    };

    /**
     * GET PAGINATION OFFSET
     * Calculates the offset (number of pages displayed) for pagination
     * @returns the offset as integer
     */
    public getPaginationOffset(): number {
        if (this._paginatedTable) {
            const PTableLength: number = this._paginatedTable.length;
            if (PTableLength > 5) {
                const offset = Math.round(PTableLength / 2);
                const max = 10;
                if (offset > max) {
                    return max;
                }
                return offset;
            } else {
                return PTableLength;
            }
        }

        return 0;
    }

    // ------------- EVENTS -----------------------
    /**
     * HANDLE CHANGE SORT
     * Handles the logic for sorting the table (updates the sortInfo and reloads the table)
     * @param {SortInfo} value the SortInfo
     */
    public handleChangeSort = (selectedColumn: keyof T): void => {
        let newSortInfo: Partial<SortInfo<keyof T>> = { column: selectedColumn };

        if (this.sortInfo && this.sortInfo?.column === selectedColumn) {
            newSortInfo.isAscending = !this.sortInfo?.isAscending;
        } else {
            newSortInfo.isAscending = true;
        }
        newSortInfo.type = this._tableConfig?.types[selectedColumn] || "string";
        this.sortInfo = newSortInfo as SortInfo<keyof T>;
        this.reloadTable();
    };

    /**
     * HANDLE CHANGE PAGINATION
     * Handles the logic for changing the current pagination index
     * @param {number} newIndex the new page navigation index
     */
    public handleChangePagination = (newIndex: number): void => {
        const index: number = newIndex - 1;
        if (index >= 0 && index < this._paginatedTable.length) {
            this._currentPageIndex = index;
            this.reloadTable();
        } else {
            console.warn("The page index is out of range");
        }
    };
}
