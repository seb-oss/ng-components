import { Component, ViewEncapsulation, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";

export type VideoSourceType = "stream" | "local";

@Component({
    selector: "sebng-video",
    templateUrl: "./video.component.html",
    styleUrls: ["./video.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit, OnChanges {
    @Input() allowFullScreen?: boolean;
    @Input() autoplay?: boolean;
    @Input() className?: string;
    @Input() height: string;
    @Input() id?: string;
    @Input() loop?: boolean;
    @Input() name: string;
    @Input() showControls?: boolean;
    @Input() showInfo?: boolean;
    @Input() sourceType: VideoSourceType;
    @Input() width: string;

    @Input() src: string;

    public videoSrc: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {}

    generateVideoSrc(): void {
        let src = this.src + "?html5=1&amp;rel=0";
        src += this.showControls ? "&amp;controls=1" : "&amp;controls=0";
        src += this.showInfo
            ? "&amp;showinfo=1&amp;title=1&amp;byline=1&amp;portrait=1"
            : "&amp;showinfo=0&amp;title=0&amp;byline=0&amp;portrait=0";
        src += this.loop ? "&amp;loop=1" : "&amp;loop=0";
        src += this.autoplay ? "&amp;autoplay=1" : "&amp;autoplay=0";
        this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    }

    ngOnInit() {
        this.generateVideoSrc();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.src || changes.showControls || changes.loop || changes.autoplay || changes.showInfo) {
            this.generateVideoSrc();
        }
    }
}
