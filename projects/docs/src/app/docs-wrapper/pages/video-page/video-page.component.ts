import { Component, OnInit } from "@angular/core";
import { VideoSourceType } from "@sebgroup/ng-components/video";
import { DropdownItem } from "@sebgroup/ng-components/dropdown";

@Component({
    selector: "app-video-page",
    templateUrl: "./video-page.component.html",
})
export class VideoPageComponent implements OnInit {
    private defaultSrc: string = require("file-loader!../../../../assets/videos/sample.mp4").default;
    private _src: string = this.defaultSrc;
    importString: string = require("!raw-loader!@sebgroup/ng-components/video/video.component");
    code: string = `<sebng-video [src]="src" [sourceType]="sourceType" [width]="width" [height]="height"></sebng-video>`;

    allowFullScreen: boolean = true;
    autoplay: boolean = true;
    className: string;
    height: number = 300;
    id: string;
    loop: boolean = true;
    name: string = "myVideo";
    showControls: boolean = true;
    showInfo: boolean = true;
    width: number = 535;

    get src(): string {
        return this._src;
    }
    set src(newSrc: string) {
        this._src = newSrc || this.defaultSrc;
    }
    sourceTypeList: Array<DropdownItem> = [
        { value: "local", label: "local", key: "local" },
        { value: "stream", label: "stream", key: "stream" },
    ];
    sourceType: DropdownItem = this.sourceTypeList[0];
    constructor() {
        document.title = "Video - SEB Angular Components";
    }

    ngOnInit(): void {}
}
