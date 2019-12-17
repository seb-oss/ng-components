## Element name
```javascript
Name: Radio Group Component
Module: "RadioGroupModule"
Selector: "ac-radio-group"
Import: "seb-angular-components/radioGroup"
Type: Form Component
```

## Element Information 
This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The module name of this component is `RadioGroupModule` and the selector is `ac-radio-group`.

## Basic use
```html
<ac-radio-group
      name="myRadioGroup"
      [list]="itemListObj"
      label="Select one">
</ac-radio-group>      
```

## Properties
These are the current available properties:

| Property    | Type                                | Descrition                      |
| ----------- | ----------------------------------- | ------------------------------- |
| [(ngModel)] | `any`                               | string or number                |
| name        | `boolean`                           | Element name                    |
| list        | `Array<RadioGroupItem>`<sup>1</sup> | The list of radio items         |
| label?      | `string`                            | The label for the whole group   |
| error?      | `string`                            | Error message (if any)          |
| className?  | `string`                            | Custom class can be passed here |
| disableAll? | `boolean`                           | Disable all radio items         |
| inline?     | `boolean`                           | Display radio items inline      |

## Footnote
1. `list` array has an exported interface named `RadioGroupItem`:
```typescript
{
      group: string;
      value: any;
      label: string;
      description?: string;
      disabled?: boolean;
}
```