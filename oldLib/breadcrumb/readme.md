
## Element name
```javascript
Name: Breadcrumb Component
Component: "BreadcrumbModule"
Selector: "ac-breadcrumb"
Import: "seb-angular-components/breadcrumb"
Type: UI Component
```

## Element information 
This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The module name of this component is `BreadcrumbModule` and the selector is `ac-breadcrumb`.

## Basic use
```html
<ac-breadcrumb
      [list]="breadcrumbListObj"
      [clickAction]="clickHandler">
</ac-breadcrumb>
```

## Properties
These are the current available properties:

| Property   | Type                  | Descrition                                   |
| ---------- | --------------------- | -------------------------------------------- |
| list       | `Array<string>`       | List of paths                                |
| onClick    | `(event: MouseEvent) => void` | the click event for the item clicked |
| className? | `string`              | custom class                                 |
| id?        | `string`              | the id property                              |