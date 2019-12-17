## Element name
```javascript
Name: Step Tracker Component
Module: "StepTrackerModule"
Selector: "ac-step-tracker"
Import: "seb-angular-components/stepTracker"
Type: UI Component
```

## Element Information 
This Angular component supports customization and configurations. The module name of this component is `StepTrackerModule` and the selector is `ac-step-tracker`.

## Basic use
```html
<ac-step-tracker
      [step]="valueObj"
      [list]="stepTrackerListObj">
</ac-step-tracker>
```

## Properties
These are the current available properties:

| Property       | Type                      | Descrition                                                                             |
| -------------- | ------------------------- | -------------------------------------------------------------------------------------- |
| step           | `number`                  | Current step (value)                                                                   |
| list?          | `Array<string>`           | List of steps (titles)                                                                 |
| clickAction?   | `(index: number) => void` | onClick event, passes the array index of the clicked step                              |
| labelPosition? | `string`                  | Label position<sup>1</sup> (defaut: `bottom` for `horizontal`, `right` for `vertical`) |
| useNumbers?    | `boolean`                 | Use numbers for each step                                                              |
| orientation?   | `string`                  | Tracker orientation (default: `horizontal`)                                            |
| className?     | `string`                  | Custom class can be passed here                                                        |

## Footnote
1. Label positions supported `top` and `bottom` for `horizontal` orientation, `left` and `right` for `vertical` orientation.