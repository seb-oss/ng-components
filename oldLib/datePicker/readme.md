
## Element name
```javascript
Name: DatePicker Component
Module: "DatePickerModule"
Selector: "ac-date-picker"
Import: "seb-angular-components/datePicker"
Type: Form Component
```

## Element Information 
This Angular component is based on `ngbDatepicker`. Supports customization and configurations. The module name of this component is `DatePickerModule` and the selector is `ac-date-picker`.

## Basic use
```html
<ac-date-picker
      [(ngModel)]="datepickerObj"
      name="myDatepicker"
      [minDate]="minimumDesiredDateObj"
      [maxDate]="maximumDesiredDateObj">
</ac-date-picker>      
```

## Properties
These are the current available properties:

| Property     | Type                        | Descrition                      |
| ------------ | --------------------------- | ------------------------------- |
| [(ngModel)]  | `NgbDateStruct`<sup>1</sup> | The current value               |
| name         | `string`                    | Element name                    |
| label?       | `string`                    | Label to be displayed beside it |
| _id?          | `string`                    | id property of the datePicker   |
| error?       | `string`                    | Error message (if any)          |
| placeHolder? | `string`                    | Placeholder                     |
| className?   | `string`                    | Custom class can be passed here |
| readOnly?    | `boolean`                   | ReadOnly status                 |
| minDate?     | `NgbDateStruct`             | Minimum date allowed            |
| maxDate?     | `NgbDateStruct`             | Maximum date allowed            |

## Reference
This component is a wrapper around [ngbDatepicker](https://ng-bootstrap.github.io/#/components/datepicker/overview)

## Footnote
1. This element uses an exported interface named `NgbDateStruct` declated in `@ng-bootstrap`:
```typescript
{
      year: number;
      month: number;
      day: number;
}
```