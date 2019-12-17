import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "ac-image",
    templateUrl: "./image.component.html",
    styleUrls: ["./image.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class ImageComponent {
    @Input() src: string;
    @Input() width: string;
    @Input() height: string;
    @Input() className?: string;
    @Input() useImgTag?: boolean;
    @Input() alt?: string = "";
    @Input() onLoad?: (event: UIEvent) => void;
    @Input() _id?: string;
}
