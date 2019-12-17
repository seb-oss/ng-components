
## Element name
```javascript
Name: Accordion Component
Component: "AccordionModule"
Selector: "ac-accordion"
Import: "seb-angular-components/accordion"
Type: Form Component
```

## Element information 
This Angular component is based on SEB style. Supports customization and configurations. The module name of this component is `AccordionModule` and the selector is `ac-accordion`.

## Basic use
```html
<ac-accordion
      list="accordionListObj">
</ac-accordion>
```

## Properties
These are the current available properties:

| Property   | Type                                   | Descrition              |
| ---------- | -------------------------------------- | ----------------------- |
| list?      | `Array<AccrodionListItem>`<sup>1</sup> | List of accordion items |
| className? | `string`                               | custom class            |

## Footnote
1. `list` has an exported interface named `AccordionListItem`:
```javascript
interface AccordionListItem {
      category: string;
      text?: AccordionText | Array<AccordionText>;
}
```
`AccordionListItem`'s memeber `text` has an exported interface name `AccordionText` and accepts a single `AccordionText` object or an array of `AccordionText` objects
```javascript
interface AccordionText {
      title?: string;
      desc?: string;
}
```