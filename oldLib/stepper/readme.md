## Element name
```javascript
Name: Stepper Component
Module: "StepperModule"
Selector: "ac-stepper"
Import: "seb-angular-components/stepper"
Type: Form Component
```

## Element Information 
This Angular component supports customization and configurations. The module name of this component is `StepperModule` and the selector is `ac-stepper`.

## Basic use
```html
<ac-stepper
      [(ngModel)]="stepperValue"
      [min]="1"
      [max]="10">
</ac-stepper>   
```

## Properties
These are the current available properties:

| Property    | Type      | Descrition                      |
| ----------- | --------- | ------------------------------- |
| [(ngModel)] | `string`  | The current value               |
| min         | `number`  | min value                       |
| max         | `number`  | max value                       |
| _id?        | `string`  | element id                      |
| name?       | `string`  | element name                    |
| label?      | `string`  | element label                   |
| className?  | `string`  | Custom class can be passed here |
| disabled?   | `boolean` | disable                         |
| error?      | `string`  | error message                   |
| warning?    | `string`  | warning message                 |
