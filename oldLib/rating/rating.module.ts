import { NgModule } from "@angular/core";
import { RatingComponent } from "./rating.component";
import { CommonModule } from "@angular/common";
import { SVGStar, SVGStarHollow } from "./svgStar";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [RatingComponent],
    declarations: [RatingComponent, SVGStar, SVGStarHollow]
})
export class RatingModule { }
