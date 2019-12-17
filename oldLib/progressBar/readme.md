## Element name
```javascript
Name: Progress Bar Component
Module: "ProgressBarModule"
Selector: "ac-progress"
Import: "seb-angular-components/progressBar"
Type: UI Component
```

## Element Information 
This Angular component supports customization and configurations. The module name of this component is `ProgressBarModule` and the selector is `ac-progress`.

## Basic use
```html
<ac-progress
      name="myProgressBar"
      [value]="progressObj">
</ac-progress>
```

## Properties
These are the current available properties:

| Property      | Type      | Descrition                             |
| ------------- | --------- | -------------------------------------- |
| value         | `number`  | the value of the progress bar          |
| showProgress? | `boolean` | Show progress percentage value in text |
| className?    | `string`  | custom class                           |
