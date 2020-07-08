import { Component, ViewEncapsulation, Input } from "@angular/core";

export type LoaderSize = "xs" | "sm" | "md" | "lg";
export type LoaderType = "spinner" | "square";

@Component({
    selector: "sebng-loader",
    styleUrls: ["./loader.component.scss"],
    templateUrl: "./loader.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class LoaderComponent {
    /** Loader size. Supported sizes: `xs`, `sm`, `md`, `lg` */
    @Input() size?: LoaderSize;
    /** Loader types. Supportes types: `spinner`, `square` */
    @Input() type?: LoaderType;
    /** Have the loader take over it's parent */
    @Input() cover?: boolean;
    /** Have the loader take over the screen */
    @Input() fullscreen?: boolean;
    /** Dims the background the background to indicate UI interactions are blocked */
    @Input() backdrop?: boolean;
    /** Screen reader text. Default is `Loading...` */
    @Input() srText?: string;
    /** Show or hide the loader. Default is `true` */
    @Input() toggle?: boolean;
    /** HTML role value. Default is `status`  */
    @Input() role?: string = "status";
    /** Element class name */
    @Input() className?: string;
}
