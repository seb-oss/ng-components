## Element name
```javascript
Name: TextBoxGroup Component
Module: "TextBoxGroupModule"
Selector: "ac-textbox-group"
Import: "seb-angular-components/textBoxGroup"
Type: Form Component
```

## Element information 
This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `TextBoxGroup` and the selector is `ac-textbox-group`.

## Basic use
```html
<ac-textbox-group
    name="textInput"
    placeholder="Text Box placeholder"
    [(ngModel)]="elementValue">
</ac-textbox-group>
```

## Properties
These are the current available properties:

| Property      | Type                          | Descrition                                      |
| ------------- | ----------------------------- | ----------------------------------------------- |
| value         | `string`                      | Value string                                    |
| name          | `string`                      | Name string                                     |
| type?         | `string`                      | Default set to text                             |
| className?    | `string`                      | Custom class                                    |
| placeHolder?  | `string`                      | Placeholder text                                |
| label?        | `string`                      | The small label on top of the textbox           |
| error?        | `string`                      | Error text                                      |
| disabled?     | `boolean`                     | Disable input element. (default: `false`)       |
| focus?        | `boolean`                     | Enable autofocus. (default: `false`)            |
| readonly?     | `boolean`                     | Make input element readonly. (default: `false`) |
| autoComplete? | `boolean`                     | Enable autocomplete. (default: `false`)         |
| max?          | `number`                      | Input max length                                |
| leftText?     | `string`                      | Left side text                                  |
| rightText?    | `string`                      | Right side text                                 |
| leftIcon?     | `string`                      | Left icon as SVG string                         |
| rightIcon?    | `string`                      | Right icon as SVG string                        |
| onLeftClick?  | `(event: MouseEvent) => void` | Click event on Left icon                        |
| onRightClick? | `(event: MouseEvent) => void` | Click event on Right icon                       |
| _id?     | `string`                      | The id property of the textbox                  |

## Inner Element Reference
The inner element can be selected using Angular's [Template reference variable (#var)](https://angular.io/guide/template-syntax#ref-vars), [@ViewChild](https://angular.io/api/core/ViewChild) and [AfterViewInit](https://angular.io/api/core/AfterViewInit). Example:
```html
<ac-textbox-group
      #myTextbox
      [(ngModel)]="elementValue"
      name="textInput">
</ac-textbox-group>
```
```javascript
@ViewChild("myTextbox") myTextbox: TextBoxComponent;

ngAfterViewInit() {
      myTextbox.innerElement.nativeElement.focus();
}
```
<sup>**Important**: Using inner element reference should be avoided unless it is necessary and should not be used to manipulate the DOM element. An example usage is to programmatically trigger a focus on the inner element.</sup>