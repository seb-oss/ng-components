import { Component, Input } from "@angular/core";

@Component({
    selector: "svg-star",
    templateUrl: "./svgStar.svg.html",
})
export class SVGStar {
    @Input() width: number = 25;
    @Input() height: number = 25;
    @Input() fill: string = "#000";
    @Input() title?: string;
}

@Component({
    selector: "svg-star-hollow",
    templateUrl: "./svgStarHollow.svg.html",
})
export class SVGStarHollow {
    @Input() width: number;
    @Input() height: number;
    @Input() fill: string;
    @Input() title?: string;
}
