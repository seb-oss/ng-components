
## Element name
```javascript
Name: Icon Component
Module: "IconModule"
Selector: "ac-icon"
Import: "seb-angular-components/icon"
Type: Other Component
```
## Element information 
This is a SVG code base component. The module name of this component is `IconModule` and the selector is `ac-icon`. This component support custom svg icon, which can be fully style via css classes. We use SVG code directly as we can change its color or size at any moment, like when you are hover over. Rememer to change the color of SVG, you should target svg and use `fill` property instead of `color`.

## Basic use
```html
mySVG = `ur svg file here as string`;
<ac-icon [src]="mySvg"></ac-icon>
```

## Properties
These are the current available properties:

| Property     | Type                | Descrition                                               |
| ------------ | ------------------- | -------------------------------------------------------- |
| src          | `string`            | `svg` as a string which will be rendered safely in html. |
| className?   | `number`            | Custom class can be passed here                          |
| title?       | `string`            | HTML element title shown on hover and wait               |
| clickAction? | `(e?: any) => void` | Click action                                             |