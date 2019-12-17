## Element name
```javascript
Name: Pagination Component
Module: "PaginationModule"
Selector: "ac-pagination"
Import: "seb-angular-components/pagination"
Type: UI Component
```

## Element Information 
This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The module name of this component is `PaginationModule` and the selector is `ac-pagination`.

## Basic use
```html
<ac-pagination
      [value]="currentPageObj"
      [size]="20"
      [offset]="5"
      [changeAction]="callbackMethod">
</ac-pagination>      
```

## Properties
These are the current available properties:

| Property         | Type                      | Descrition                                               |
| ---------------- | ------------------------- | -------------------------------------------------------- |
| value            | `number`                  | Current page                                             |
| size             | `number`                  | maximum number of pages                                  |
| offset?          | `number`                  | Maximum number of buttons to show (default: `10`)        |
| changeAction?    | `(value: number) => void` | Change event passes the number of page to be displayed   |
| useTextNav?      | `boolean`                 | Use text-base navigation buttons (default: `false`)      |
| useFirstAndLast? | `boolean`                 | Use first and last navigation buttons (default: `false`) |
| nextText?        | `string`                  | Next text value (default: `'Next'`)                      |
| previousText?    | `string`                  | Previous text value (default: `'Previous'`)              |
| firstText?       | `string`                  | First text value (default: `'First'`)                    |
| lastText?        | `string`                  | Last text value (default: `'Last'`)                      |
| useDotNav?       | `boolean`                 | Use dot-navigation<sup>1</sup>                           |
| className?       | `string`                  | Custom class can be passed here                          |

## Footnote
1. Dot navigation does not support `offset`, it is not meant to have big size navigation. For that, use the normal numbered navigation.