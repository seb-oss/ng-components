## Element name
```javascript
Name: Radio Btn Component
Module: "RadioBtnModule"
Selector: "ac-radio-btn"
Import: "seb-angular-components/radioBtn"
Type: Form Component
```

## Element Information 
This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The module name of this component is `RadioBtnModule` and the selector is `ac-radio-btn`.

## Basic use
```html
<ac-radio-btn
      group="radioBtnGroup"
      label="Single radio first"
      radioValue="first"
      [(ngModel)]="radioNgValue">
</ac-radio-btn>  
```

## Properties
These are the current available properties:

| Property     | Type      | Descrition                                            |
| ------------ | --------- | ----------------------------------------------------- |
| [(ngModel)]  | `any`     | string or number                                      |
| radioValue   | `any`     | the value of the radiobtn, it can be string or number |
| group        | `string`  | the name of the group to group the radios together    |
| description? | `string`  | optional extra description                            |
| error?       | `string`  | error message (if any)                                |
| className?   | `string`  | Custom class can be passed here                       |
| disabled?    | `boolean` | Disable the radio button                              |
| inline?      | `boolean` | Display radio items inline                            |
