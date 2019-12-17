
## Element name
```javascript
Name: Timepicker Component
Module: "TimepickerModule"
Selector: "<ac-timepicker/>"
Import: "seb-angular-components/timepicker"
Type: UI Component
```

## Element information 
This Angular component supports customization and configurations. The component name is `TimepickerModule` and the selector is `ac-timepicker`.

## Basic use
```html
<ac-timepicker
    [(ngModel)]="timerpickerValueObj"
    name="myTimepicker">
</ac-timepicker>
```

## Properties
These are the current available properties:

| Property   | Type                          | Descrition                  |
| ---------- | ----------------------------- | --------------------------- |
| name       | `string`                      | element name                |
| ngModel    | `TimepickerValue`<sup>1</sup> | the value of the timepicker |
| className? | `string`                      | custom class                |

## Footnote
1. `value` has an exported interface named `TimepickerValue`:
```javascript
interface TimepickerValue {
      hours: number;
      minutes: number;
      dayperiod: string; // "AM" or "PM"
}
```