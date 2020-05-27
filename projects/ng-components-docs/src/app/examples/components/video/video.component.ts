import { Component } from "@angular/core";

@Component({
    selector: "app-video",
    templateUrl: "./video.component.html",
})
export class VideoComponent {
    // public videoSrc: string = require("../../../../assets/videos/sample.mp4");
    public vimeoSrc: string = "https://player.vimeo.com/video/259422408";
    public youtubeSrc: string = "https://www.youtube.com/embed/f19fctL72CY";
}
