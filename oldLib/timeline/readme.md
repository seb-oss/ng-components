
## Element name
```javascript
Name: Timeline Component
Module: "TimelineModule"
Selector: "ac-timeline"
Import: "seb-angular-components/timeline"
Type: UI Component
```

## Element information 
This Angular component supports customization and configurations. The module name of this component is `TimelineModule` and the selector is `ac-timeline`.

## Basic use
```html
<ac-timeline
      [list]="timelineListObj">
</ac-timeline>
```

## Properties
These are the current available properties:

| Property    | Type                                  | Descrition                                                  |
| ----------  | ------------------------------------- | ----------------------------------------------------------- |
| list        | `Array<TimelineListItem>`<sup>1</sup> | Timeline list                                               |
| direction?  | `string`                              | Timeline direction. Accepts `'vertical'` and `'horizontal'` (default: `'vertical'`) |
| clickAction?| `(index: number)=>void`               | Click event returns the index of array item clicked         |
| className?  | `string`                              | custom class                                                |

## Footnote
1. List propery has an exported interface named `TimelineListItem`
```typescript
{
      title: string;
      time: string;
      desc?: string;
}
```