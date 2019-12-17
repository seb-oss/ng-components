
## Element name
```javascript
Name: Button Component
Module: "ButtonModule"
Selector: "ac-button"
Import: "seb-angular-components/button"
Type: UI Component
```
## Element information 
This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The module name of this component is `ButtonModule` and the selector is `ac-button`.

## Basic use
```html
<ac-button
      label="button text"
      [clickAction]="clickFunction">
</ac-button>
```

## Properties
These are the current available properties:

| Property      | Type                          | Descrition                                                       |
| ------------- | ----------------------------- | ---------------------------------------------------------------- |
| label         | `string`                      | Button name                                                      |
| clickAction   | `(event: MouseEvent) => void` | Click action                                                     |
| className?    | `string`                      | custom class                                                     |
| disabled?     | `boolean`                     | Disabled status                                                  |
| theme?        | `string`                      | Based on SEB predefined colors: (default: `primary`)<sup>1</sup> |
| title?        | `string`                      | The HTML title for the element                                   |
| icon?         | `string`                      | You should pass an SVG in string format then we render it safely |
| type?         | `string`                      | Button type. (default: `button`)<sup>2<sup>                      |
| iconPosition? | `string`                      | to style the childern on `left` or `right`, default is `left`    |
| _id?          | `string`                      | id property of the button                                        |

## Footnote
1. Supported themes: `primary`, `secondary`, `anchor`
2. Supported button types as described by [w3schools](https://www.w3schools.com/tags/att_button_type.asp) are `button`, `submit` or `reset`