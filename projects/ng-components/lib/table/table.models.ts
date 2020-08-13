export type TableServiceSubscriber = (property: TableServiceSubject) => any;
export type TableServiceHandler = (property: TableServiceAction) => (...args: any[]) => void;

export interface TableServicePublicApi {
    getSubscription: TableServiceSubscriber;
    handle: TableServiceHandler;
}
/** The name of a property that is possible to subscribe to from the Table Service */
export type TableServiceSubject =
    | "currentSortInfo"
    | "selectedRows"
    | "isAllSelected"
    | "currentPageIndex"
    | "tableHeaderList"
    | "sortedTable"
    | "paginatedTable"
    | "currentTable";

export type TableServiceAction = "changeColumns" | "changeSort" | "changePagination" | "selectRow" | "selectAllRows";

/** The type of a data the values in a column represent  */
export type TableHeaderListValueType = "number" | "string" | "date" | "datetime" | "bool" | "custom-html";

/** The optional theme of the table header  */
export type TableTHeadTheme = "light" | "dark";

/** The maximum breakpoint with which to have a responsive table */
export type TableResponsiveBreakpoint = "sm" | "md" | "lg" | "xl";

/** The Table config object Interface */
export interface TableConfig<T extends {} = { [k: string]: any }> {
    /** a map of every column name what type of data it represents */
    types?: { [key in keyof T]?: TableHeaderListValueType };
    /** an optional map of column names and what label to display as column */
    labels?: { [key in keyof T]?: string };
    /** an optional map of column names and what order they should appear in */
    order?: { [key in keyof T]?: number };
    /** an optional initial sort */
    sort?: SortInfo<T>;
    /** an optional array of column names which shall not be displayed */
    columns?: Array<keyof T>;
    /** Pagination config */
    pagination?: {
        /** number of maximum items to display per page */
        maxItems: number;
    };
}

/** Table Header List Item Interface */
export interface TableHeaderListItem<T extends {} = {}> {
    /** The label displayed */
    label: string;
    /** the key selector corresponding to to the TableList Item which this column is targeting */
    tableKeySelector: keyof T;
    /** the type of value: string, date or number */
    valueType: TableHeaderListValueType;
}

/** The object emmited when the table row is clicked */
export interface TableRowClickedEvent<T extends {} = {}> {
    item: T;
    index: number;
}

/** The information on the currently selected sort: column name, type and asc/desc  */
export interface SortInfo<T extends {} = { [k: string]: any }> {
    /** column name */
    column: keyof T;
    /** is ascending (false for descending) */
    isAscending: boolean;
    /** the type of value: string, date or number */
    type?: TableHeaderListValueType;
}
