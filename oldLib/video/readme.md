
## Element name
```javascript
Name: Video Holder Component
Module: "VideoModule"
Selector: "ac-video"
Import: "seb-angular-components/video"
Type: Other Component
```

## Element information 
This Angular component supports customization and configurations. The component name is `VideoModule` and the selector is `ac-video`.

## Basic use
```html
<ac-video
    name="myYoutubeVideo"
    [src]="youtubeVideoSrc"
    width="535px"
    height="300px"
    sourceType="stream"
    [showControls]="true"
></ac-video>
```

## Properties
These are the current available properties:

| Property         | Type      | Descrition                                                    |
| ---------------- | --------- | ------------------------------------------------------------- |
| src              | `string`  | your image source, it can be string<sup>1</sup>               |
| width            | `string`  | this is css width such as 100% or 300px                       |
| height           | `string`  | this is css height such as 100% or 300px                      |
| name             | `string`  | element name                                                  |
| sourceType       | `string`  | `local` for locally stored video, `stream` for streamed video |
| className?       | `string`  | custom class                                                  |
| autoplay?        | `boolean` | enable autoplay (some browser don't support this feature)     |
| loop?            | `boolean` | enable loop after video is finished                           |
| showControls?    | `boolean` | show controls (default: `false`)                              |
| showInfo?        | `boolean` | show video information (`stream` only) (default: `false`)     |
| allowFullScreen? | `boolean` | allow toggling full screen (default: `false`)                 |
| _id?        | `string`  | The id property of the video                                  |

## Footnote
1. Video source is obtained either:
      * `Local`: use `require()` method to require the video into your source code and use the returned string as `src`.
      * `Stream`: grab only the url from the **embed** sharing option and use it as `src`.

## References
1. YouTube&trade; embedded video [APIs](https://developers.google.com/youtube/player_parameters)
2. Vimeo&trade; embedded video [APIs](https://help.vimeo.com/hc/en-us/articles/224972808-Customizing-the-embedded-player)