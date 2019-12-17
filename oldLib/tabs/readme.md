## Element name
```javascript
Name: Tabs Component
Module: "TabsModule"
Selector: "ac-tabs"
Import: "seb-angular-components/tabs"
Type: Form Component
```

## Element Information 
This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The module name of this component is `TabsModule` and the selector is `ac-tabs`.

## Basic use
```html
<ac-tabs
      [list]="tabsList"
      [activeTab]="index"
      [clickAction]="clickHandler">
</ac-tabs>      
```

## Properties
These are the current available properties:

| Property     | Type                              | Descrition                                             |
| ------------ | --------------------------------- | ------------------------------------------------------ |
| list         | `Array<TabsListItem>`<sup>1</sup> | List of tabs                                           |
| activeTab    | `number`                          | The index of the current active tab                    |
| clickAction? | `(index: number)=>void`           | Tab click handler, passes the index of the clicked tab |
| className?   | `string`                          | Custom class can be passed here                        |

## Footnote
1. `list` has an exported interface named `TabsListItem`
```javascript
{
    text: string;
    disabled?: boolean;
}
```