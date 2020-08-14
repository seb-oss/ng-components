import { Injectable } from "@angular/core";
import {
    TableHeaderListItem,
    TableConfig,
    SortInfo,
    TableHeaderListValueType,
    TableServiceSubject,
    TableServiceAction,
    TableServiceSubscriber,
    TableServiceHandler,
    TableServiceDataAndHandlers,
} from "./table.models";
import { toDate } from "@sebgroup/frontend-tools/dist/toDate";
import { readableFromCamelCase } from "./utils";
import { BehaviorSubject } from "rxjs";

interface TableRowWithMeta<T extends object> {
    row: T;
    selected: boolean;
}
@Injectable({
    providedIn: "root",
})
export class TableService {
    // ------------- INITIALISATION -------------
    // ============ TABLE =======================
    private table: { [k: string]: any[] } = {};

    // ============ TABLE CONFIG ================
    private _tableConfigs: { [k: string]: TableConfig<any> } = {};
    private getTableConfig = <T extends {} = {}>(id: string): TableConfig<T> => {
        return this._tableConfigs[id];
    };
    private setTableConfig = (id: string, value: TableConfig<any>): void => {
        const defaultTypes: TableConfig["types"] = this.initConfigTypes(id);
        this._tableConfigs[id] = {
            ...value,
            types: { ...defaultTypes, ...value.types },
        };
    };

    // ============ SORT INFO ===================
    private _sortInfos: { [k: string]: SortInfo } = {};
    private getSortInfo = (id: string): SortInfo => {
        if (!this._sortInfos[id]) {
            const tc: TableConfig = this.getTableConfig(id);
            if (tc && tc.sort) {
                this._sortInfos[id] = tc.sort;
            }
        }

        return this._sortInfos[id];
    };
    private setSortInfo = (id: string, value: SortInfo): void => {
        this._sortInfos[id] = value ? { ...value } : null;
    };

    private currentSortInfo: { [k: string]: BehaviorSubject<SortInfo> } = {};

    /** The indexes of the selected rows, paginated */
    private _selectedRows: { [k: string]: number[][] } = {};
    private selectedRows: { [k: string]: BehaviorSubject<number[][]> } = {};

    private isAllSelected: { [k: string]: BehaviorSubject<boolean> } = {};

    private columnsList: { [k: string]: string[] } = {};

    /** The Index of the currently selected page */
    private _currentPageIndex: { [k: string]: number } = {};
    private currentPageIndex: { [k: string]: BehaviorSubject<number> } = {};

    /** The Header List of The Master Table with all the Column Info */
    private _tableHeaderList: { [k: string]: Array<TableHeaderListItem<any>> } = {};
    private tableHeaderList: { [k: string]: BehaviorSubject<TableHeaderListItem<any>[]> } = {};
    /** The Master Table, Sorted */
    private _sortedTable: { [k: string]: any[] } = {};
    private sortedTable: { [k: string]: BehaviorSubject<any[]> } = {};
    /** The Master Table, Paginated */
    private _paginatedTable: { [k: string]: any[][] } = {};
    private paginatedTable: { [k: string]: BehaviorSubject<any[][]> } = {};
    /** The Currently Visible Page of the Sorted and Paginated Master Table */
    private _currentTable: { [k: string]: any[] } = {};
    private currentTable: { [k: string]: BehaviorSubject<any[]> } = {};

    /**
     * GET
     * Generic way of fetching subscribable properties like currentTable, tableHeaderList, etc...
     * @param id the id of the table
     * @param property the property to get
     */
    private get = (id: string): TableServiceSubscriber => (property: TableServiceSubject): any => {
        if ((property as any) === "get") {
            console.warn("Can't get self, please provide another key.");
        } else if (property.startsWith("handle") || property.startsWith("register")) {
            console.warn("Can't get table service methods, use them directly instead");
        } else {
            return this[property][id];
        }
    };

    /**
     * CHANGE
     * Generic way of fetching handlers like changeSort, changePagination, etc...
     * @param id the id of the table
     * @param property the name of the handler to get
     */
    private change = (id: string): TableServiceHandler => (property: TableServiceAction): ((...args: any[]) => void) => {
        return this[property](id);
    };

    // ------------- CONSTRUCTOR ----------------
    constructor() {}

    /**
     * REGISTER DATASOURCE (INITIALIZE TABLE SERVICE)
     * Initialize the table service with the table data and configuration object for initial settings
     * @param {any[]} name the unique name of your data
     * @param {any[]} table the raw data
     * @param {TableConfig} config the table configuration settings
     * @returns {TableServiceSubscriber} a generic getter for any subscribable property
     */
    public registerDatasource<T extends {} = { [k: string]: any }>(
        name: string,
        table: any[],
        config: TableConfig<T> = {}
    ): TableServiceDataAndHandlers<T> {
        this.setSortInfo(name, null);
        this.currentSortInfo[name] = new BehaviorSubject<SortInfo>(null);
        this.currentSortInfo[name].next(this.getSortInfo(name));
        this._currentPageIndex[name] = 0;
        this.currentPageIndex[name] = new BehaviorSubject<number>(0);
        this.currentPageIndex[name].next(this._currentPageIndex[name]);
        this.table[name] = table;
        this.setTableConfig(name, config);

        this._sortedTable[name] = [];
        this.sortedTable[name] = new BehaviorSubject<any[]>(this._sortedTable[name]);
        this._paginatedTable[name] = [[]];
        this.paginatedTable[name] = new BehaviorSubject<any[][]>(this._paginatedTable[name]);
        this._selectedRows[name] = [[]];
        this.selectedRows[name] = new BehaviorSubject<number[][]>(this._selectedRows[name]);
        this.isAllSelected[name] = new BehaviorSubject<boolean>(false);
        this._currentTable[name] = [];
        this.currentTable[name] = new BehaviorSubject<any[]>(this._currentTable[name]);
        this._tableHeaderList[name] = [];
        this.tableHeaderList[name] = new BehaviorSubject<TableHeaderListItem<any>[]>(this._tableHeaderList[name]);

        this.reloadTable(name);

        return {
            get: {
                headerList: this.get(name)("tableHeaderList"),
                rows: this.get(name)("currentTable"),
                sortInfo: this.get(name)("currentSortInfo"),
                selectedRows: this.get(name)("selectedRows"),
                isAllSelected: this.get(name)("isAllSelected"),
                pageNo: this.get(name)("currentPageIndex"),
            },
            handle: {
                changeColumns: this.change(name)("changeColumns"),
                changePage: this.change(name)("changePagination"),
                sort: this.change(name)("changeSort"),
                selectAllRows: this.change(name)("selectAllRows"),
                selectRow: this.change(name)("selectRow"),
            },
        };
    }

    // ------------- HELPERS --------------------
    /**
     * INIT CONFIG TYPES
     * @returns the initial configuration for config types
     */
    private initConfigTypes<T>(id: string): TableConfig<T>["types"] {
        if (this.table[id] && this.table[id].length) {
            const types: TableConfig<T>["types"] = this.table[id].reduce((result, item) => {
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
    private reloadTable(id: string): void {
        const table: any[] = this.table[id] && this.table[id].length ? [...this.table[id]] : [];

        const config: TableConfig = this.getTableConfig(id);
        const { types, labels, columns, order }: TableConfig = config;

        this.setupColumnsList(id, columns, table, order);
        const sortInfo: SortInfo = this.getSortInfo(id);

        const maxItems: number = this.calculateMaxItemsPerPage(id);
        this.setupTable(id, table, sortInfo, maxItems);

        this.setupTableHeader(id, types, labels);

        this.currentSortInfo[id].next(sortInfo);
        this.sortedTable[id].next(this._sortedTable[id]);
        this.paginatedTable[id].next(this._paginatedTable[id]);
        this.selectedRows[id].next(this._selectedRows[id]);
        this.isAllSelected[id].next(this.checkIsAllSelected(id));
        this.currentTable[id].next(this._currentTable[id]);
        this.tableHeaderList[id].next(this._tableHeaderList[id]);
        this.currentPageIndex[id].next(this._currentPageIndex[id]);
    }

    /**
     * CALCULATE MAX ITEMS PER PAGE:
     * Calculates the current max items per page
     */
    private calculateMaxItemsPerPage = (id: string): number => {
        const config: TableConfig = this.getTableConfig(id);
        if (config?.pagination) {
            return config.pagination.maxItems;
        } else {
            return this.table[id] ? this.table[id].length : 0;
        }
    };

    /**
     * SETUP COLUMN LIST
     * Sets up the list of columns which should be displayed in the table based on the config or it will be inferred from the data itself
     * @param columns the list of columns which should be displayed in the table from the table config
     * @param table the table itself
     * @param order the order or the columns
     */
    private setupColumnsList(id: string, columns: TableConfig["columns"], table: any[], order?: TableConfig["order"]): void {
        const config: TableConfig = this.getTableConfig(id);
        let columnsList: string[] = [];
        if (columns && columns.length) {
            columnsList = columns as string[];
        } else {
            for (const tableListItem of table) {
                columnsList = [...new Set([...columnsList, ...Object.keys(tableListItem)])];
            }

            if (order) {
                columnsList = columnsList.sort((a: string, b: string) => {
                    const firstItem: number = config.order[a] ? config.order[a] : 1;
                    const secondItem: number = config.order[b] ? config.order[b] : -1;
                    return firstItem - secondItem;
                });
            }
        }

        this.columnsList[id] = [...columnsList];
    }

    /**
     * SETUP TABLE:
     * Sets up the sorted, paginated and current page table
     * @param {T[]} table the table
     * @param {SortInfo} sortInfo The information on how to sort the table: column name, type and asc/desc
     * @param {number} maxItems The maximum number of items to be displayed per page
     * @param {number[]} selectedRowIndexes the indexes of the rows selected in the master table
     */
    private setupTable(id: string, table: any[], sortInfo: SortInfo, maxItems: number, selectedRowIndexes?: number[]): void {
        const tableWithMeta: TableRowWithMeta<any>[] = table.map((row: any, rowIndex: number) => {
            return { row, selected: !!selectedRowIndexes?.includes(rowIndex) };
        });
        const sortedTableWithMeta: TableRowWithMeta<any>[] = this.makeSortedTable(tableWithMeta, sortInfo);
        this._sortedTable[id] = [...sortedTableWithMeta.map(item => item.row)];

        const paginatedTableWithMeta: TableRowWithMeta<any>[][] = this.makePaginatedTable(sortedTableWithMeta, maxItems);
        this._paginatedTable[id] = [...paginatedTableWithMeta.map(item => item.map(x => x.row))];

        this._selectedRows[id] = [
            ...paginatedTableWithMeta.map(item => item.map((x, i) => (x.selected ? i : null)).filter(y => y !== null)),
        ];

        if (this._currentPageIndex[id] > this._paginatedTable[id].length - 1) {
            this._currentPageIndex[id] = this._paginatedTable[id].length - 1;
        }
        this._currentTable[id] = [...this._paginatedTable[id][this._currentPageIndex[id]]];
    }

    /**
     * MAKE SORTED TABLE
     * @param table the table you wish to sort with meta data
     * @param sort the sort info
     * @returns The new sorted table
     */
    private makeSortedTable(table: TableRowWithMeta<any>[], sort?: SortInfo): TableRowWithMeta<any>[] {
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
    private makePaginatedTable(table: TableRowWithMeta<any>[], maxItems: number): TableRowWithMeta<any>[][] {
        const paginatedTable: TableRowWithMeta<any>[][] = [];

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
    private setupTableHeader(id: string, types: TableConfig<any>["types"], labels?: TableConfig<any>["labels"]): void {
        const tableHeaderList: TableHeaderListItem<any>[] = [];

        for (const columnName of this.columnsList[id]) {
            const tableKeySelector: string = columnName;
            const label: string = labels && labels[columnName] ? labels[columnName] : readableFromCamelCase(columnName);
            const valueType: TableHeaderListValueType = types[columnName] || "string";
            tableHeaderList.push({
                tableKeySelector,
                valueType,
                label,
            });
        }
        this._tableHeaderList[id] = tableHeaderList;
    }

    /**
     * Sort the table:
     *
     * This method will sort the table based on the column selected and it's ascending/descending property
     * @param {TableRowWithMeta<T>[]} table the table to be sorted with meta data
     * @param {SortInfo<keyof T>} sortInfo The information on how to sort the table: column name, type and asc/desc
     * @returns the sorted table
     */
    private sortTable = (table: TableRowWithMeta<any>[], sortInfo: SortInfo): TableRowWithMeta<any>[] => {
        const { column, isAscending, type = "string" }: SortInfo = sortInfo;
        const newSortedTable: TableRowWithMeta<any>[] = table.sort((a: TableRowWithMeta<any>, b: TableRowWithMeta<any>) => {
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
    private checkIsAllSelected(id: string): boolean {
        return this._selectedRows[id]?.map((e, i) => e?.length === this._paginatedTable[id][i]?.length).every(e => e);
    }

    /**
     * CHECK HAS SOME SELECTIONS
     * Checks if any rows (at least 1) are selected
     * @returns {boolean}
     */
    private checkHasSelection(id: string): boolean {
        return this._selectedRows[id]?.map(e => e?.length > 0).some(e => e);
    }

    // ------------- EVENTS -----------------------
    /**
     * HANDLE CHANGE COLUMNS
     * Handles the logic for changing the currently visible columns
     * @param {Array<keyof T>} newColumns the new array of visible columns
     */
    private changeColumns = (id: string) => (newColumns: TableConfig["columns"]): void => {
        const config: TableConfig = this.getTableConfig(id);
        this.setTableConfig(id, { ...config, columns: newColumns });
        this.reloadTable(id);
    };

    /**
     * HANDLE CHANGE SORT
     * Handles the logic for sorting the table (updates the sortInfo and reloads the table)
     * @param {SortInfo} value the SortInfo
     */
    private changeSort = (id: string) => (selectedColumn: string): void => {
        if (!id || typeof id !== "string") {
            console.warn("The firt argument for changeSort needs to be the id of the table");
            return;
        }

        let selectedRowIndexes: number[] = [];
        // check if table has any rows selected
        if (this._selectedRows[id] && this.checkHasSelection(id)) {
            // map them against the current table to get the selected row indexes
            // and keep the metadata within the scope of this method
            this._selectedRows[id].map((selectedRows: number[], pageIndex: number) => {
                selectedRows?.map((selectedRowsIndex: number) => {
                    const targetElement: any = this._paginatedTable[id][pageIndex][selectedRowsIndex];
                    selectedRowIndexes.push(this.table[id].indexOf(targetElement));
                });
            });
        }

        const sortInfo: SortInfo = this.getSortInfo(id);

        if (selectedColumn) {
            let newSortInfo: Partial<SortInfo> = { column: selectedColumn };

            if (sortInfo && sortInfo?.column === selectedColumn) {
                newSortInfo.isAscending = !sortInfo.isAscending;
            } else {
                newSortInfo.isAscending = true;
            }
            newSortInfo.type = this.getTableConfig(id)?.types[selectedColumn] || "string";
            this.setSortInfo(id, newSortInfo as SortInfo);
        } else {
            this.setSortInfo(id, null);
        }

        // setup the new table
        const table: any[] = this.table[id] && this.table[id].length ? [...this.table[id]] : [];
        const maxItems: number = this.calculateMaxItemsPerPage(id);
        this.setupTable(id, table, this.getSortInfo(id), maxItems, selectedRowIndexes);

        // emmit new data =======
        // sort info
        this.currentSortInfo[id].next(this.getSortInfo(id));

        // tables
        this.sortedTable[id].next(this._sortedTable[id]);
        this.paginatedTable[id].next(this._paginatedTable[id]);
        this.currentTable[id].next(this._currentTable[id]);

        // selected rows
        this.selectedRows[id].next(this._selectedRows[id]);
        this.isAllSelected[id].next(this.checkIsAllSelected(id));
    };

    /**
     * HANDLE CHANGE PAGINATION
     * Handles the logic for changing the current pagination index
     * @param {number} newIndex the new page navigation index
     */
    private changePagination = (id: string) => (newIndex: number): void => {
        const index: number = typeof newIndex === "number" ? newIndex - 1 : 0;
        if (index >= 0 && index < this._paginatedTable[id].length) {
            this._currentPageIndex[id] = index;
            this._currentTable[id] = [...this._paginatedTable[id][this._currentPageIndex[id]]];
            this.currentPageIndex[id].next(this._currentPageIndex[id]);
            this.currentTable[id].next(this._currentTable[id]);
        } else {
            console.warn("The page index is out of range");
        }
    };

    /**
     * HANDLE SELECT ROW
     * Handles the logic for changing the state of a row (selected/not selected)
     * @param {number} index index of the row of which selection should be toggled
     */
    private selectRow = (id: string) => (index: number): void => {
        if (this._currentPageIndex[id] < 0 || index < 0) {
            console.warn("Page or row index can not be negative");
        } else {
            if (this._selectedRows[id].length === this._paginatedTable[id].length) {
                const rowIsSelected: boolean = this._selectedRows[id][this._currentPageIndex[id]]?.includes(index);
                if (rowIsSelected) {
                    this._selectedRows[id][this._currentPageIndex[id]] = [
                        ...this._selectedRows[id][this._currentPageIndex[id]].filter(val => val !== index),
                    ];
                } else {
                    this._selectedRows[id][this._currentPageIndex[id]] = [...this._selectedRows[id][this._currentPageIndex[id]], index];
                }
            } else {
                console.warn("Error: please register table source before consuming the handle methods");
            }
            this.selectedRows[id].next([...this._selectedRows[id]]);
            this.isAllSelected[id].next(this.checkIsAllSelected(id));
        }
    };

    /**
     * handles the logic for toggling the state of selected rows to select all or deselect all
     */
    private selectAllRows = (id: string) => (): void => {
        if (this._selectedRows[id] && this._selectedRows[id].length === this._paginatedTable[id].length) {
            if (this.checkIsAllSelected(id)) {
                this._selectedRows[id] = [...this._paginatedTable[id].map(_ => [])];
            } else {
                this._selectedRows[id] = [...this._paginatedTable[id].map(e => [...e?.map((_, i) => i)])];
            }
            this.selectedRows[id].next([...this._selectedRows[id]]);
            this.isAllSelected[id].next(this.checkIsAllSelected(id));
        } else {
            console.warn("Error: please register table source before consuming the handle methods");
        }
    };
}
