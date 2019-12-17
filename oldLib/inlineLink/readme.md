
## Element name
```javascript
Name: Inline Link Component
Component: "InlineLinkModule"
Selector: "ac-inline-link"
Import: "seb-angular-components/inlineLink"
Type: Other Component
```

## Element information 
This Angular component replaces anchor tags. The component name is `InlineLinkModule` and the selector is `ac-inline-link`. Use it as a normal anchor tag except that you don't pass `href`, instead, you should pass an `clickAction` handler to do any desired action.

## Basic use
```html
<ac-inline-link [clickAction]="clickHandler">Some text</ac-inline-link>
```

## Properties
These are the current available properties:

| Property   | Type       | Descrition    |
| ---------- | ---------- | ------------- |
| onClick?   | `()=>void` | Click handler |
| className? | `string`   | Custom class  |
