
## Element name
```javascript
Name: Check Box Component
Module: "CheckBoxModule"
Selector: "ac-checkbox"
Import: "seb-angular-components/checkBox"
Type: Form Component
```
## Element Information 
This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The module name of this component is `CheckBoxModule` and the selector is `ac-checkbox`.

## Basic use
```html
<ac-checkbox
    name="myCheckBox"
    [(ngModel)]="checkBoxObj">
</ac-checkbox>      
```

## Properties
These are the current available properties:

| Property     | Type                   | Descrition                          |
| ------------ | ---------------------- | ----------------------------------- |
| [(ngModel)]  | `any`                  | Two-way data binding                |
| changeAction | `(event: any) => void` | Change event                        |
| name?        | `string`               | Name of the element                 |
| className?   | `string`               | Custom class                        |
| _id?         | `string`               | id property of the checkbox         |
| label        | `string`               | Normal label placed besides it      |
| topLabel?    | `string`               | Label place on top (forms style)    |
| disabled?    | `boolean`              | Disabled status                     |
| inline?      | `boolean`              | Inline placement                    |
| description? | `string`               | Dimmed description placed beside it |
| error?       | `string`               | Error message (if any)              |