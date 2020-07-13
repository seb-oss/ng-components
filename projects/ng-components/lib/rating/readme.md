## Element name

```javascript
Name: Rating Component
Module: "RatingModule"
Selector: "ac-rating"
Import: "seb-angular-components/rating"
Type: Form Component
```

## Element Information

This Angular component supports customization and configurations. The module name of this component is `RatingModule` and the selector is `ac-rating`. Fractions are supported for display purposes only.

## Basic use

```html
<ac-rating [(ngModel)]="ratingObj"> </ac-rating>
```

## Properties

These are the current available properties:

| Property       | Type            | Descrition                                                              |
| -------------- | --------------- | ----------------------------------------------------------------------- |
| [(ngModel)]    | `number`        | The current value                                                       |
| iconWidth?     | `number`        | Star icon width in pixels (default: `25`)                               |
| iconHeight?    | `number`        | Star icon height in pixels (default: `25`)                              |
| max?           | `number`        | Number of stars                                                         |
| colors?        | `Array<string>` | List of colors                                                          |
| tooltipList?   | `Array<string>` | List of tooltip text for each star                                      |
| useHollow?     | `boolean`       | Use hollow stars for unselected stars                                   |
| showValue?     | `boolean`       | Shows the selected value of the star in numbers                         |
| showTextValue? | `boolean`       | Shows the selected value of the star in text if tooltipList is provided |
| className?     | `string`        | Custom class can be passed here                                         |
| readOnly?      | `boolean`       | Read only status                                                        |
