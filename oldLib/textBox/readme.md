## Element name
```javascript
Name: Text Box Component
Module: "TextBoxModule"
Selector: "ac-textbox"
Import: "seb-angular-components/textBox"
Type: Form Component
```

## Element Information 
This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The module name of this component is `TextBoxModule` and the selector is `ac-textbox`.

## Basic use
```html
<ac-textbox
      [(ngModel)]="textboxObj"
      name="myTextBox">
</ac-textbox>
```

## Properties
These are the current available properties:

| Property      | Type      | Descrition                                      |
| ------------- | --------- | ----------------------------------------------- |
| [(ngModel)]?  | `string`  | The current value                               |
| name          | `string`  | Element name                                    |
| type?         | `string`  | Input type (default: `'text'`)                  |
| label?        | `string`  | Element label                                   |
| error?        | `string`  | Error message (if any)                          |
| placeHolder?  | `string`  | Element placeholder                             |
| className?    | `string`  | Custom class can be passed here                 |
| disabled?     | `boolean` | Disable input element. (default: `false`)       |
| focus?        | `boolean` | Enable autofocus. (default: `false`)            |
| readonly?     | `boolean` | Make input element readonly. (default: `false`) |
| autoComplete? | `boolean` | Enable autocomplete. (default: `false`)         |
| max?          | `number`  | The maximum number of characters                |
| _id?     | `string`  | The id property of the textbox                  |

## Inner Element Reference
The inner element can be selected using Angular's [Template reference variable (#var)](https://angular.io/guide/template-syntax#ref-vars), [@ViewChild](https://angular.io/api/core/ViewChild) and [AfterViewInit](https://angular.io/api/core/AfterViewInit). Example:
```html
<ac-textbox
      #myTextbox
      [(ngModel)]="textboxObj"
      name="myTextBox">
</ac-textbox>
```
```javascript
@ViewChild("myTextbox") myTextbox: TextBoxComponent;

ngAfterViewInit() {
      myTextbox.innerElement.nativeElement.focus();
}
```
<sup>**Important**: Using inner element reference should be avoided unless it is necessary and should not be used to manipulate the DOM element. An example usage is to programmatically trigger a focus on the inner element.</sup>