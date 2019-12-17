import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "ac-loader",
    styleUrls: ["./loader.component.scss"],
    templateUrl: "loader.component.html",
    encapsulation: ViewEncapsulation.None
})
export class LoaderComponent {
    @Input() toggle: boolean = false;
    @Input() fullscreen?: boolean = true;
    @Input() className?: string;
}
