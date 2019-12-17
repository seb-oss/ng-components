import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";

export interface CarouselItem {
    image: string;
    title?: string;
    desc?: string;
}

@Component({
    selector: "ac-carousel",
    styleUrls: ["./carousel.component.scss", "../../node_modules/swiper/dist/css/swiper.min.css"],
    templateUrl: "./carousel.component.html",
    encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {
    @Input() list: Array<CarouselItem>;
    @Input() height?: number;
    @Input() autoplay?: boolean;
    @Input() backgroundPlacement?: string = "cover";
    @Input() carouselChanged?: (index: number) => void;
    @Input() className?: string;

    currentIndex: number;
    config: SwiperConfigInterface = {
        direction: "horizontal",
        observer: true,
        slidesPerView: 1,
        keyboard: true,
        mousewheel: true,
        navigation: true,
        spaceBetween: 1,
        autoplay: false,
        grabCursor: true,
        height: 300
    };

    ngOnInit() {
        if (this.height) { this.config.height = this.height; }
        if (this.autoplay) { this.config.autoplay = this.autoplay; }
    }
}
