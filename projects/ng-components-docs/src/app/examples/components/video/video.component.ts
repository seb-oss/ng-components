import { Component, OnInit } from "@angular/core";
import * as path from "path";

@Component({
    selector: "app-video",
    templateUrl: "./video.component.html",
})
export class VideoComponent implements OnInit {
    // public videoSrc: string = path.resolve(path.__dirname, 'projects', 'ng-components-docs', 'src', 'assets', 'videos', 'sample.mp4'); //require("../../../../assets/videos/sample.mp4");
    public vimeoSrc: string = "https://player.vimeo.com/video/259422408";
    public youtubeSrc: string = "https://www.youtube.com/embed/f19fctL72CY";

    ngOnInit() {
        console.log("The paths are ", path);
    }
}
