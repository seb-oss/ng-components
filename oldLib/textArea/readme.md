## Element name
```javascript
Name: Text Area Component
Module: "TextAreaModule"
Selector: "ac-textarea"
Import: "seb-angular-components/textArea"
Type: Form Component
```

## Element Information 
This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The module name of this component is `TextAreaModule` and the selector is `ac-textarea`.

## Basic use
```html
<ac-textarea
      [(ngModel)]="textareaObj"
      name="myTextArea"
      [cols]="5"
      [rows]="10">
</ac-textarea>      
```

## Properties
These are the current available properties:

| Property     | Type      | Descrition                       |
| ------------ | --------- | -------------------------------- |
| [(ngModel)]? | `string`  | The current value                |
| name         | `string`  | Element name                     |
| label?       | `string`  | Element label                    |
| error?       | `string`  | Error message (if any)           |
| placeHolder? | `string`  | Element placeholder              |
| className?   | `string`  | Custom class can be passed here  |
| focus?       | `boolean` | Focus status                     |
| readonly?    | `boolean` | readonly status                  |
| disabled?    | `boolean` | disabled status                  |
| cols?        | `number`  | Number of columns                |
| rows?        | `number`  | Number of rows                   |
| resizable?   | `boolean` | resizable status                 |
| max?         | `number`  | The maximum number of characters |
| id?          | `string`  | the id property of the textarea  |
