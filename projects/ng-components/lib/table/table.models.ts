/** The type of a data the values in a column represent  */
export type TableHeaderListValueType = "number" | "string" | "date" | "datetime" | "bool" | "custom-html";

/** The Table config object Interface */
export interface TableConfig<T extends {} = {}> {
    /** a map of every column name what type of data it represents */
    types?: { [key in keyof T]?: TableHeaderListValueType };
    /** an optional map of column names and what label to display as column */
    labels?: { [key in keyof T]?: string };
    /** an optional map of column names and what order they should appear in */
    order?: { [key in keyof T]?: number };
    /** an optional initial sort */
    sort?: SortInfo<keyof T>;
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
export interface SortInfo<K extends string | number | symbol = any> {
    /** column name */
    column: K;
    /** is ascending (false for descending) */
    isAscending: boolean;
    /** the type of value: string, date or number */
    type?: TableHeaderListValueType;
}
