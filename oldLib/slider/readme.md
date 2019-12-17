## Element name
```javascript
Name: Slider Component
Module: "SliderModule"
Selector: "ac-slider"
Import: "seb-angular-components/slider"
Type: Form Component
```

## Element Information 
This Angular component supports customization and configurations. The module name of this component is `SliderModule` and the selector is `ac-slider`.

## Basic use
```html
<ac-slider
      [(ngModel)]="sliderObj"
      [min]="0"
      [max]="100"
      [step]="5">
</ac-slider>      
```

## Properties
These are the current available properties:

| Property           | Type                                  | Descrition                                                          |
| ------------------ | ------------------------------------- | ------------------------------------------------------------------- |
| [(ngModel)]        | `number`                              | The current value                                                   |
| min?               | `number`                              | Minimum value (default: `0`)                                        |
| max?               | `number`                              | Maximum value (default: `10`)                                       |
| step?              | `number`                              | Step value (default: `1`)                                           |
| className?         | `string`                              | Custom class can be passed here                                     |
| labels?            | `Array<RangeSliderLabel>`<sup>1</sup> | Labels to be displayed below the slider                             |
| label?             | `string`                              | The component label                                                 |
| error?             | `string`                              | The component error message                                         |
| showTicks?         | `boolean`                             | Show ticks with labels (default: `false`)                           |
| alwaysShowTooltip? | `boolean`                             | Always Show tooltip (default: `false`)                              |
| theme?             | `string`                              | Based on SEB predefined colors. (default: `'primary'`)<sup>2</sup>  |
| tooltipTheme?      | `string`                              | Based on SEB predefined colors. (default: `'inverted'`)<sup>2</sup> |
| alternative?       | `boolean`                             | Use an alternative version of the slider                            |
| _id?          | `string`                              | id property of the rang object or slider                            |

## footnote
1. `labels` has an imported interface named `RangeSliderLabel`:
```typescript
{
      position: number;
      text: string;
}
```
2. Supported themes: `primary`, `inverted`, `success`, `danger`, `warning`, `purple`