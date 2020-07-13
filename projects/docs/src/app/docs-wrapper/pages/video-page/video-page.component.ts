import { Component, OnInit } from "@angular/core";
import { VideoSourceType } from "@sebgroup/ng-components/video";

@Component({
    selector: "app-video-page",
    templateUrl: "./video-page.component.html",
})
export class VideoPageComponent implements OnInit {
    importString: string = require("!raw-loader!@sebgroup/ng-components/video/video.component");

    allowFullScreen?: boolean = true;
    autoplay?: boolean = true;
    className?: string;
    height: number = 300;
    id?: string;
    loop?: boolean = true;
    name: string = "myVideo";
    showControls?: boolean = true;
    showInfo?: boolean = true;
    sourceType: VideoSourceType = "local";
    width: number = 535;

    src: string = require("file-loader!../../../../assets/videos/sample.mp4").default;

    constructor() {
        document.title = "Accordion - SEB Angular Components";
    }

    ngOnInit(): void { }
}
