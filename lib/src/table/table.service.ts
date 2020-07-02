import { Injectable, Output } from "@angular/core";
import { TableHeaderListItem, TableConfig, SortInfo, TableHeaderListValueType } from "./table.models";
import { toDate } from "@sebgroup/frontend-tools/dist/toDate";
import { readableFromCamelCase } from "../utils";
import { BehaviorSubject } from "rxjs";

interface TableRowWithMeta<T extends object> {
    row: T;
    selected: boolean;
}
@Injectable({
    providedIn: "root",
})
export class TableService<T extends object> {
    // ------------- INITIALISATION -------------
    // ============ TABLE =======================
    private _table: T[];
    private get table(): T[] {
        return this._table;
    }
    private set table(table: T[]) {
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
    @Output() isAllSelected: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private columnsList: string[];

    /** The Master Table, Sorted */
    private _sortedTable: T[] = [];
    @Output() sortedTable: BehaviorSubject<T[]> = new BehaviorSubject([]);
    /** The Master Table, Paginated */
    private _paginatedTable: T[][] = [[]];
    @Output() paginatedTable: BehaviorSubject<T[][]> = new BehaviorSubject([[]]);
    /** The indexes of the selected rows, paginated */
    private _selectedRows: number[][] = [[]];
    @Output() selectedRows: BehaviorSubject<number[][]> = new BehaviorSubject([[]]);
    /** The Currently Visible Page of the Sorted and Paginated Master Table */
    private _currentTable: T[] = [];
    @Output() currentTable: BehaviorSubject<T[]> = new BehaviorSubject([]);
    /** The Index of the currently selected page */
    private _currentPageIndex: number = 0;
    @Output() currentPageIndex: BehaviorSubject<number> = new BehaviorSubject(0);
    /** The Header List of The Master Table with all the Column Info */
    private _tableHeaderList: Array<TableHeaderListItem<T>> = [];
    @Output() tableHeaderList: BehaviorSubject<TableHeaderListItem<T>[]> = new BehaviorSubject([]);

    // ------------- CONSTRUCTOR ----------------
    constructor() {}

    public registerDatasource(table: T[], config: TableConfig<T> = {}) {
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
                        const type: string = (typeof item[key]).toLowerCase();
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
        const table: T[] = this.table && this.table.length ? [...this.table] : [];

        const maxItems: number = this.calculateMaxItemsPerPage();
        const config: TableConfig<T> = this.tableConfig;
        const { types, labels, columns, order }: TableConfig<T> = config;

        this.setupColumnsList(columns, table, order);

        this.setupTable(table, this.sortInfo, maxItems);

        this.setupTableHeader(types, labels);

        this.currentSortInfo.next(this.sortInfo);
        this.sortedTable.next(this._sortedTable);
        this.paginatedTable.next(this._paginatedTable);
        this.selectedRows.next(this._selectedRows);
        this.isAllSelected.next(this.checkIsAllSelected());
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
    private setupColumnsList(columns: TableConfig<T>["columns"], table: T[], order?: TableConfig<T>["order"]): void {
        let columnsList: string[] = [];
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
     * @param {T[]} table the table
     * @param {SortInfo} sortInfo The information on how to sort the table: column name, type and asc/desc
     * @param {number} maxItems The maximum number of items to be displayed per page
     * @param {number[]} selectedRowIndexes the indexes of the rows selected in the master table
     */
    private setupTable(table: T[], sortInfo: SortInfo, maxItems: number, selectedRowIndexes?: number[]): void {
        const tableWithMeta: TableRowWithMeta<T>[] = table.map((row: T, rowIndex: number) => {
            return { row, selected: !!selectedRowIndexes?.includes(rowIndex) };
        });
        const sortedTableWithMeta: TableRowWithMeta<T>[] = this.makeSortedTable(tableWithMeta, sortInfo);
        this._sortedTable = [...sortedTableWithMeta.map(item => item.row)];

        const paginatedTableWithMeta: TableRowWithMeta<T>[][] = this.makePaginatedTable(sortedTableWithMeta, maxItems);
        this._paginatedTable = [...paginatedTableWithMeta.map(item => item.map(x => x.row))];

        this._selectedRows = [...paginatedTableWithMeta.map(item => item.map((x, i) => (x.selected ? i : null)).filter(y => y !== null))];

        if (this._currentPageIndex > this._paginatedTable.length - 1) {
            this._currentPageIndex = this._paginatedTable.length - 1;
        }
        this._currentTable = [...this._paginatedTable[this._currentPageIndex]];
    }

    /**
     * MAKE SORTED TABLE
     * @param table the table you wish to sort with meta data
     * @param sort the sort info
     * @returns The new sorted table
     */
    private makeSortedTable(table: TableRowWithMeta<T>[], sort?: SortInfo): TableRowWithMeta<T>[] {
        if (sort) {
            return this.sortTable(table, sort);
        }
        return [...table];
    }

    /**
     * MAKE PAGINATED TABLE
     * @param table the table you wish to paginate with meta data
     * @param maxItems the number of max items on one page
     * @returns the paginated table as array or arrays
     */
    private makePaginatedTable(table: TableRowWithMeta<T>[], maxItems: number): TableRowWithMeta<T>[][] {
        const paginatedTable: TableRowWithMeta<T>[][] = [];

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
        const tableHeaderList: TableHeaderListItem<T>[] = [];

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
     * @param {TableRowWithMeta<T>[]} table the table to be sorted with meta data
     * @param {SortInfo<keyof T>} sortInfo The information on how to sort the table: column name, type and asc/desc
     * @returns the sorted table
     */
    private sortTable = (table: TableRowWithMeta<T>[], sortInfo: SortInfo): TableRowWithMeta<T>[] => {
        const { column, isAscending, type }: SortInfo<keyof T> = sortInfo;
        const newSortedTable: TableRowWithMeta<T>[] = table.sort((a: TableRowWithMeta<T>, b: TableRowWithMeta<T>) => {
            // flipping the first and second items based on ascending/descending
            const firstItem: any = isAscending ? a.row[column] : b.row[column];
            const secondItem: any = isAscending ? b.row[column] : a.row[column];
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
     * CHECK IS ALL SELECTED
     * Checks the selected rows of each table and check returns true/false if all rows in every table are selected
     * @returns {boolean}
     */
    private checkIsAllSelected(): boolean {
        return this._selectedRows?.map((e, i) => e?.length === this._paginatedTable[i]?.length).every(e => e === true);
    }

    /**
     * CHECK HAS SOME SELECTIONS
     * Checks if any rows (at least 1) are selected
     * @returns {boolean}
     */
    private checkHasSelection(): boolean {
        return this._selectedRows?.map((e, i) => e?.length > 0).some(e => e === true);
    }

    /**
     * GET PAGINATION OFFSET
     * Calculates the offset (number of pages displayed) for pagination
     * @returns the offset as integer
     */
    public getPaginationOffset(): number {
        if (this._paginatedTable) {
            const PTableLength: number = this._paginatedTable.length;
            if (PTableLength > 5) {
                const offset: number = Math.round(PTableLength / 2);
                const max: number = 10;
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
        let selectedRowIndexes: number[] = [];
        // check if table has any rows selected
        if (this._selectedRows && this.checkHasSelection()) {
            // map them against the current table to get the selected row indexes
            // and keep the metadata within the scope of this method
            this._selectedRows.map((selectedRows: number[], pageIndex: number) => {
                selectedRows?.map((selectedRowsIndex: number) => {
                    const targetElement: T = this._paginatedTable[pageIndex][selectedRowsIndex];
                    selectedRowIndexes.push(this.table.indexOf(targetElement));
                });
            });
        }

        let newSortInfo: Partial<SortInfo<keyof T>> = { column: selectedColumn };

        if (this.sortInfo && this.sortInfo?.column === selectedColumn) {
            newSortInfo.isAscending = !this.sortInfo?.isAscending;
        } else {
            newSortInfo.isAscending = true;
        }
        newSortInfo.type = this._tableConfig?.types[selectedColumn] || "string";
        this.sortInfo = newSortInfo as SortInfo<keyof T>;

        // setup the new table
        const table: T[] = this.table && this.table.length ? [...this.table] : [];
        const maxItems: number = this.calculateMaxItemsPerPage();
        this.setupTable(table, this.sortInfo, maxItems, selectedRowIndexes);

        // emmit new data =======
        // sort info
        this.currentSortInfo.next(this.sortInfo);

        // tables
        this.sortedTable.next(this._sortedTable);
        this.paginatedTable.next(this._paginatedTable);
        this.currentTable.next(this._currentTable);

        // selected rows
        this.selectedRows.next(this._selectedRows);
        this.isAllSelected.next(this.checkIsAllSelected());
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
            this._currentTable = [...this._paginatedTable[this._currentPageIndex]];
            this.currentPageIndex.next(this._currentPageIndex);
            this.currentTable.next(this._currentTable);
        } else {
            console.warn("The page index is out of range");
        }
    };

    /**
     * HANDLE SELECT ROW
     * Handles the logic for changing the state of a row (selected/not selected)
     * @param {number} index index of the row of which selection should be toggled
     */
    public handleSelectRow = (index: number): void => {
        if (this._currentPageIndex < 0 || index < 0) {
            console.warn("Page or row index can not be negative");
        } else {
            if (this._selectedRows.length === this._paginatedTable.length) {
                const rowIsSelected: boolean = this._selectedRows[this._currentPageIndex]?.includes(index);
                if (rowIsSelected) {
                    this._selectedRows[this._currentPageIndex] = [
                        ...this._selectedRows[this._currentPageIndex].filter(val => val !== index),
                    ];
                } else {
                    this._selectedRows[this._currentPageIndex] = [...this._selectedRows[this._currentPageIndex], index];
                }
            } else {
                console.warn("Error: please register table source before consuming the handle methods");
            }
            this.selectedRows.next([...this._selectedRows]);
            this.isAllSelected.next(this.checkIsAllSelected());
        }
    };

    /**
     * handles the logic for toggling the state of selected rows to select all or deselect all
     */
    public handleSelectAllRows(): void {
        if (this._selectedRows.length === this._paginatedTable.length) {
            if (this.checkIsAllSelected()) {
                this._selectedRows = [...this._paginatedTable.map(_ => [])];
            } else {
                this._selectedRows = [...this._paginatedTable.map(e => [...e?.map((_, i) => i)])];
            }
            this.selectedRows.next([...this._selectedRows]);
            this.isAllSelected.next(this.checkIsAllSelected());
        } else {
            console.warn("Error: please register table source before consuming the handle methods");
        }
    }
}
