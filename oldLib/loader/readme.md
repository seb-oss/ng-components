## Element name
```javascript
Name: Loader Component
Module: "LoaderModule"
Selector: "ac-loader"
Import: "seb-angular-components/loader"
Type: UI Component
```

## Element Information 
This Angular component supports customization and configurations. The module name of this component is `LoaderModule` and the selector is `ac-loader`.

## Basic use
```html
<ac-loader
      [toggle]="true">
</ac-loader>      
```

## Usage with button
```html
 <ac-button label="Test Label">
      <ac-loader [toggle]="true" [fullScreen]="false"></ac-loader>
</ac-button>
```

## Properties
These are the current available properties:

| Property       | Type      | Descrition                                                                                                        |
| -------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| toggle         | `boolean` | Toggles the popup                                                                                                 |
| fullScreen?    | `boolean` | Cover fullscreen (default: `false`)                                                                               |
| className?     | `string`  | Custom class can be passed here                                                                                   |
| sizeClassName? | `string`  | sizeClassName such as `loader-lg`, `loader-sm`, `loader-md`, `loader-xs`, `loader-xl` can be alternatively passed |
| size?          | `Size`    | can be `large` , `small`, `medium`, `extraLarge` and `tiny`                                                       |
