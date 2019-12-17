## Element name
```javascript
Name: Tooltip Component
Module: "TooltipModule"
Selector: "ac-tooltip"
Import: "seb-angular-components/tooltip"
Type: UI Component
```

## Element Information 
This Angular component supports customization and configurations. The module name of this component is `TooltipModule` and the selector is `ac-tooltip`.

## Basic use
```html
<ac-tooltip
      title="Tooltip Title"
      message="The desired description is here"
      position="top">
</ac-tooltip>      
```

## Properties
These are the current available properties:

| Property        | Type                                         | Descrition                                                         |
| --------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| title?          | `string`                                     | The title of the tooltip                                           |
| message?        | `string`                                     | The message of the tooltip                                         |
| messageGroup?   | `Array<TooltipMessageGroupItem>`<sup>1</sup> | A list of messages                                                 |
| position?       | `string`                                     | The position of the tooltip (default: `bottom`)                    |
| customSvg?      | `string`                                     | Custom Svg string to render as icon                                |
| width?          | `number`                                     | The width of the tooltip in pixels (default: `120`)                |
| theme?          | `string`                                     | Based on SEB predefined colors. (default: `'default'`)<sup>2</sup> |
| className?      | `string`                                     | Custom class can be passed here                                    |
| triggerOnHover? | `boolean`                                    | An option to toggle only on Hover                                  |
| clickAction?    | `(e?: any) => void`                          | Click action                                                       |

## Public Methods
These are the public methods accessible via Angular's [Template reference variables](https://angular.io/guide/template-syntax#ref-vars)

| Name         | Parameters | type                     | Description                        |
| ------------ | ---------- | ------------------------ | ---------------------------------- |
| forceDismiss | event?     | `MouseEvent`<sup>3</sup> | Forces the tooltip to dismiss once |
| forceShow    |            |                          | Forces the tooltip to show once    |

##### Example usage of forceDismiss and reference variable. This example shows how to allow the tooltip to be dismissed when clicked outside
```html
<div class="example-container" (click)="MyTooltip.forceDismiss($event)">
      <ac-tooltip
            \#MyTooltip
            message="Tooltip message">
      </ac-tooltip>
</div>
```
##### Example usage of html inside the tooltip.
```html
<div class="example-container">
      <ac-tooltip>
            <p>This is a link to w3schools : <a href="https://www.w3schools.com"> link </a></p>
      </ac-tooltip>
</div>
```

## Footnote
1. `messsageGroup` items has an exported interface named `TooltipMessageGroupItem`
```typescript
{
      title?: string;
      message: string;
}
```
2. Supported themes: `default`, `inverted`, `primary`, `warning`, `success`, `danger`, `purple`
3. Mouse event is used to determine if the clicked happened outside the tooltip to dismiss it. If you wanted to force it to dismiss regardless, you should not pass the event.