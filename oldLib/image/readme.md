
## Element name
```javascript
Name: Image Component
Module: "ImageModule"
Selector: "ac-image"
Import: "seb-angular-components/image"
Type: Other Component
```
## Element information 
This Angular component can switch between a `div` and an `img` tag, Supports customization and configurations. The module name of this component is `ImageModule` and the selector is `ac-image`.

## Basic use
```html
<ac-image 
    [src]="imageSrc"
    height="200px" 
    width="100%">
</ac-image>
```

## Properties
These are the current available properties:

| Property   | Type                       | Descrition                                                                   |
| ---------- | -------------------------- | ---------------------------------------------------------------------------- |
| src        | `string`                   | Your image source, it can be string or required then pass value              |
| width      | `string`                   | This is css width such as 100% or 300px                                      |
| height     | `string`                   | This is css height such as 100% or 300px                                     |
| className? | `string`                   | Custom class                                                                 |
| useImgTag? | `boolean`                  | This will switch between `div` and `img` tags. default is `div`              |
| onLoad?    | `(event: UIEvent) => void` | Callback fired when the image is loaded. **Note**: Only works with image tag |
| _id?        | `string`                   | The id property of the image element                                         |
