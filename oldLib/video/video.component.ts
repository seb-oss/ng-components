import { Component, Input, ViewEncapsulation, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

interface VideoStyle {
    width?: string;
    height?: string;
}

@Component({
    selector: "ac-video",
    templateUrl: "./video.component.html",
    encapsulation: ViewEncapsulation.None
})
export class VideoComponent implements OnInit {
    @Input() src: string;
    @Input() width: string;
    @Input() height: string;
    @Input() name: string;
    @Input() sourceType: string;
    @Input() className?: string;
    @Input() autoplay?: boolean;
    @Input() loop?: boolean;
    @Input() showControls?: boolean;
    @Input() showInfo?: boolean;
    @Input() allowFullScreen?: boolean;
    @Input() id?: string;

    safeSource: SafeResourceUrl;

    videoStyle: VideoStyle;

    constructor(public sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.initSource();
        this.initDimentions();
    }

    /**
     * Initializes the stream source by applying the appropriate customizations
     */
    initSource(): void {
        if (this.sourceType === "stream") {
            // rel=0 is for YouTube only, to disabled suggestions after video is finished
            let source = this.src + "?html5=1&rel=0";
            // Disabling controls only works on YouTube
            source += this.showControls ? "&controls=1" : "&controls=0";
            source += this.showInfo ? "&showinfo=1&title=1&byline=1&portrait=1" : "&showinfo=0&title=0&byline=0&portrait=0";
            source += this.loop ? "&loop=1" : "&loop=0";
            source += this.autoplay ? "&autoplay=1" : "&autoplay=0";

            this.safeSource = this.sanitizer.bypassSecurityTrustResourceUrl(source);
        }
    }

    /**
     * Initializes the dimentions since `100%` is allowed as an input and video tags only accepts numbers
     * This allows the use of any CSS unit (e.g. pt, px, em, %)
     */
    initDimentions(): void {
        if (isNaN(Number(this.width))) {
            if (!this.videoStyle) {
                this.videoStyle = {};
            }
            this.videoStyle.width = this.width;
        }

        if (isNaN(Number(this.height))) {
            if (!this.videoStyle) {
                this.videoStyle = {};
            }
            this.videoStyle.height = this.height;
        }
    }

    /**
     * Retrieves the style object if available
     * @returns {VideoStyle} The video style object
     */
    getStyle(): VideoStyle {
        return this.videoStyle;
    }
}
