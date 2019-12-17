## Element name
```javascript
Name: Carousel Component
Module: "CarouselModule"
Selector: "ac-carousel"
Import: "seb-angular-components/carousel"
Type: UI Component
```

## Element Information 
This Angular component is based on `ngx-swiper-wrapper`. Supports customization and configurations. The module name of this component is `CarouselModule` and the selector is `ac-carousel`. For this component to work properly, you should place it within a parent div which set a proper width, so the max width of the carousel relays on where it has been placed.

## Basic use
```html
<ac-carousel
      [list]="list"
      [autoplay]="true"
      [height]="400">
</ac-carousel>     
```

## Properties
These are the current available properties:

| Property             | Type                              | Descrition                                                                            |
| -------------------- | --------------------------------- | ------------------------------------------------------------------------------------- |
| list                 | `Array<CarouselItem>`<sup>1</sup> | List of images with                                                                   |
| height               | `number`                          | Carousel height in pixels (default: `300`)                                            |
| autoplay?            | `boolean`                         | Auto play the carousel (default: `false`)                                             |
| backgroundPlacement? | `string`                          | Background placement type. It follows CSS background-size property (default: `cover`) |
| carouselChanged?     | `(index: number) => void`         | Carousel Change event, passes the index of the current displayed image                |
| className?           | `string`                          | Custom class to be passed here                                                        |

## Reference
This component is a wrapper around [ngx-swiper-wrapper](https://github.com/zefoy/ngx-swiper-wrapper#readme)

## Footnote
1. This element uses an exported interface named `CarouselItem`
```typescript
{
      image: string;
      title?: string;
      desc?: string;
}
```