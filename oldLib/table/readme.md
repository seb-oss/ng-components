## Element name
```javascript
Name: Table Component
Module: "TableModule"
Selector: "ac-table"
Import: "seb-angular-components/table"
Type: UI Component
```

## Element Information 
This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The module name of this component is `TableModule` and the selector is `ac-table`.

## Basic use
```html
<ac-table
    [headerList]="headerList"
    [rows]="rows"
    [rowClickedAction]="handleClickRow"
    [sortClickedAction]="handleSortRow"
>
</ac-table>      
```
<sup>*Please note* the callback functions you pass to **rowClickedAction** and **sortClickedAction** need to be arrow functions or you need to bind them to `this`</sup>

## Properties
These are the current available properties:

| Property           | Type                                                 | Description                                                           | Default Value  |
| ------------------ | ---------------------------------------------------- | --------------------------------------------------------------------- | -------------- |
| headerList         | `Array<TableHeaderListItem>` <sup>1</sup>            | List of Header Items                                                  | `[]`           |
| rows               | `Array<any>`                                         | An Array of any objects                                               | `[]`           |
| rowClickedAction?  | `(value: TableRowClickedEvent) => void` <sup>2</sup> | An event emmiter which will fire up when a row is clicked             | -              |
| sortClickedAction? | `(value: SortInfo) => void` <sup>3</sup>             | An event emmiter which will fire up when a column sort is clicked     | -              |
| fixedHeight?       | `string`                                             | An optional custom fixed height value                                 | -              |
| className?         | `string`                                             | Custom class can be passed here                                       | -              |

## Footnote
`table` has an exported interface named
1. `TableHeaderListItem`
```javascript
{
    /** The label displayed */
    label: string;
    /** the key selector corresponding to to the TableList Item which this column is targeting */
    tableKeySelector: string | symbol | number;
    /** the type of value: string, date or number */
    valueType: "number" | "string" | "date";
    /** is ascending? */
    asc: boolean;
    /** is active (currently selected)? */
    active: boolean;
}
```
2. `TableRowClickedEvent`
```javascript
{
    /** The object which was clicked */
    item: object;
    /** The index of the clicked object */
    index: number;
}
```
3. `SortInfo`
```javascript
{
    /** column name */
    column: string | number | symbol;
    /** is ascending (false for descending) */
    isAscending: boolean;
    /** the type of value */
    type: "number" | "string" | "date";
}
```