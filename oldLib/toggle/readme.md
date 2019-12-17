## Element name
```javascript
Name: Toggle Component
Module: "ToggleModule"
Selector: "ac-toggle"
Import: "seb-angular-components/toggle"
Type: Form Component
```

## Element Information 
This Angular component supports customization and configurations. The module name of this component is `ToggleModule` and the selector is `ac-toggle`.

## Basic use
```html
<ac-toggle
      [(ngModel)]="toggleObj"
      name="myToggle">
</ac-toggle>      
```

## Properties
These are the current available properties:

| Property    | Type     | Descrition                      |
| ----------- | -------- | ------------------------------- |
| [(ngModel)] | `string` | The current value               |
| name        | `string` | Element name                    |
| label?      | `string` | Element label                   |
| className?  | `string` | Custom class can be passed here |
| _id?   | `string` | The toggle id property          |
