## Element name
```javascript
Name: Timer Component
Module: "TimerModule"
Selector: "ac-timer"
Import: "seb-angular-components/timer"
Type: Other Component
```

## Element Information 
The module name of this component is `TimerModule` and the selector is `ac-timer`, it will support count down for hrs, mins and seconds.

## Basic use
```html
<ac-timer
    [duration]="30000"
    [callback]="myCallback.bind(this)"
></ac-timer>
```

## Properties
These are the current available properties:

| Property   | Type                   | Descrition                                                       |
| ---------- | ---------------------- | ---------------------------------------------------------------- |
| duration   | `number`               | duration of timer in `Millisecond`                               |
| callback   | `() => void`           | This method will be triggered when timer reached ended           |
| className? | `string`               | custom class                                                     |
