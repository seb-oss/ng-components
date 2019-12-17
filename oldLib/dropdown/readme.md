## Element name
```javascript
Name: Dropdown Component
Module: "DropDownModule"
Selector: "ac-dropdown"
Import: "seb-angular-components/dropdown"
Type: Form Component
```

## Element Information 
Supports customization and configurations. The module name of this component is `DropDownModule` and the selector is `ac-dropdown`.

## Basic use
```html
<ac-dropdown
      [(ngModel)]="selectedItemObj"
      [handleChange]="changeDropdown"
      name="myDropdown"
      [list]="dropDownListObj">
</ac-dropdown>
```

## Use with forms
```html
<ac-dropdown
      [formControl]="formControlObject"
      name="myDropdown"
      [list]="dropDownListObj">
</ac-dropdown>
```

## Properties
These are the current available properties:

| Property          | Type                                                                          | Descrition                          |
| ----------------- | ----------------------------------------------------------------------------- | ----------------------------------- |
| [(ngModel)]       | `DropdownItem`<sup>1</sup>                                                    | The current selected value          |
| name              | `string`                                                                      | Element name                        |
| list              | `Array<DropdownItem>`                                                         | The list of items in the drop down  |
| id?               | `string`                                                                      | Toggle button element id            |
| handleChange?     | `(event: DropdownItem \| Array<DropdownItem> \| UIEvent) => void`<sup>2</sup> | The Change event                    |
| label?            | `string`                                                                      | Element label                       |
| error?            | `string`                                                                      | Error message (if any)              |
| placeHolder?      | `string`                                                                      | Element placeholder                 |
| className?        | `string`                                                                      | Custom class can be passed here     |
| disabled?         | `boolean`                                                                     | Disabled status                     |
| native?           | `boolean`                                                                     | Use the browser/device native style |
| multi?            | `boolean`                                                                     | Allow multi-select                  |
| ellipsisMode?     | `boolean`                                                                     | Version with three dots trigger button |
| clearable?<sup>3  | `boolean`                                                                     | Allow clearning selected value      |
| searchable?<sup>3 | `boolean`                                                                     | Allow searching                     |

## Footnote
1. `list` items has an exported interface named `DropdownItem`
```javascript
{
      text: string;
      value: any;
}
```
2. onChange passes the change event of type `UIEvent` if you are using the **native** version. Otherwise, it will pass either `DropdownItem` or `Array<DropdownItem>` depending on whether you choose it to be single-select or multi-select dropdown.
3. Does not work in the native version