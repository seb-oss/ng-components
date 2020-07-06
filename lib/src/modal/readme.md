## Element name

```javascript
Name: Confirm Popup Component
Component: "DialogueModule"
Selector: "ac-dialogue"
Import: "seb-angular-components/dialogue"
Type: Other Component
```

## Element information

This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `DialogueModule` and the selector is `ac-dialogue`.

## Basic use

```html
<ac-dialogue
    header="Are you sure?"
    desc="Lorem ipsum dolor sit amet."
    [toggle]="dialogueToggler"
    [secondaryAction]="secondaryAction"
    [primaryAction]="primaryAction"
></ac-dialogue>
```

## Properties

These are the current available properties:

| Property         | Type         | Descrition                                         |
| ---------------- | ------------ | -------------------------------------------------- |
| toggle           | `boolean`    | show or hide the popup                             |
| header?          | `string`     | header text                                        |
| desc?            | `string`     | description text                                   |
| primaryBtn?      | `string`     | primary btn text                                   |
| secondaryBtn?    | `string`     | secondary btn text                                 |
| primaryAction?   | `() => void` | click event fired when primary button is clicked   |
| secondaryAction? | `() => void` | click event fired when secondary button is clicked |
| className?       | `string`     | custom class                                       |
