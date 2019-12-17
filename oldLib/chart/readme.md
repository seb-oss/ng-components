
## Element name
```javascript
Name: Chart Component
Module: "ChartModule"
Selector: "ac-chart"
Import: "seb-angular-components/chart"
Type: Other Component
```
## Element information 
This Angular component is based on `Chart.js` with customization and configurations that comes with it. The module name of this component is `ChartModule` and the selector is `ac-chart`. Please refer to their documantation regarding how to pass datasets, options, labels and so on.

## Basic use
```html
<ac-chart 
      chartType="line"
      [datasets]="datasets"
      [labels]="labels"
      [options]="options">
</ac-chart>
```

## Properties
These are the current available properties:

| Property    | Type                   | Descrition                                  |
| ----------- | ---------------------- | ------------------------------------------- |
| chartType   | `string`               | type of charts based on chat.js<sup>1</sup> |
| datasets?   | `Array<any>`           | chart.js datasets arrays                    |
| labels?     | `Array<any>`           | chart.js lables                             |
| colors?     | `Array<any>`           | chart.js colors                             |
| options?    | `any`                  | chart.js options object                     |
| legend?     | `boolean`              | enable or disable legends                   |
| clickAction | `(event: any) => void` | Click action                                |
| hoverAction | `(event: any) => void` | hover action                                |
| className?  | `string`               | custom class                                |

## Reference
This component is based on a modified directive coming from [ng2-charts](https://www.npmjs.com/package/ng2-charts) source code, which itself is based on [chart.js](http://www.chartjs.org), and as chartjs configuration is extandable via plugins, we have implemented the annotations via [chartjs-plugin-annotation](https://www.npmjs.com/package/chartjs-plugin-annotation). Further you should be able to add more plugin and pass new configrations via `options` property

## footnote
1. Supported charts: `line`, `bar`, `horizontalBar`, `pie`, `doughnut`, `polarArea`, `radar`