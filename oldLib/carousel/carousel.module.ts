import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarouselComponent } from "./carousel.component";
import { SwiperModule, SWIPER_CONFIG } from "ngx-swiper-wrapper";

@NgModule({
    imports: [CommonModule, SwiperModule],
    declarations: [CarouselComponent],
    exports: [CarouselComponent],
    providers: [
        {
            provide: SWIPER_CONFIG,
            useValue: { direction: "horizontal" }
        }
    ]
})
export class CarouselModule { }
