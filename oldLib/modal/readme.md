
## Element name
```javascript
Name: Modal Component
Component: "ModalModule"
Selector: "ac-modal"
Import: "seb-angular-components/modal"
Type: Other Component
```

## Element information 
This Angular component is based on SEB Bootstrap style. Supports customization and configurations. The component name is `ModalModule` and the selector is `ac-modal`.

## Basic use
This component is using content projection to render the different parts of the modal like in the example bellow.
Not passing those attributes will result in rendering an empty modal.
ModalModule have three content projection section:

| Section         | Descrition                                         |
| ---------------- | -------------------------------------------------- |
| header?          | HTML element to be displayed on the header         |
| body?            | HTML element to be displayed on the body           |
| footer?          | HTML element to be displayed on the footer         |

```html
<ac-modal
    [toggle]="modalToggle"
    [disableBackdropDismiss]="true"
    [fullscreen]="true"
    position="right"
    [dismissModal]="closeModal"
>
    <h4 header>Modal Title</h4>
    <p body>Modal body text here</p>
    <button
        footer
        class="btn btn-primary dialogue-button"
        (click)="closeModal()">
        Close
    </button>
</ac-modal>
```

## Properties
These are the current available properties:

| Property            | Type         | Descrition              |
| ------------------- | ------------ | ------------------------|
| toggle              | `boolean`    | Show or hide the modal,  default is false  |
| id?                 | `string`     | the id property of the modal     |
| fullscreen?         | `boolean`    | Toggle fullscreen modal,  default is false |
| position?           | `right or left` | Stick modal to one of the sides, accepted values (right or left) |
| className?          | `string`     | Custom class |
| ariaLabel?          | `string`     | Accessibility for label |
| ariaDescribedby?    | `string`     | Accessibility for description |
| disableBackdropDismiss?  | `boolean`    | User cannot dismiss Dialog by clicking outside of it, default is false |
| dismissModal?        | `() => void`     | Event to close modal on backdrop dismiss |

