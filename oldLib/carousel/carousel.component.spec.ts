import { CarouselComponent } from "./carousel.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { SwiperModule, SWIPER_CONFIG } from "ngx-swiper-wrapper";

describe("Component: CarouselComponent", () => {
    let component: CarouselComponent;
    let fixture: ComponentFixture<CarouselComponent>;

    const list = [
        {
            title: "Ipsum consequat nisl",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: require("file-loader\/!../../develop/assets/images/cat-pet-animal-1.jpg")
        },
        {
            title: "Interdum velit euismod",
            desc: "Lectus quam id leo in",
            image: require("file-loader\/!../../develop/assets/images/cat-pet-animal-2.jpg")
        },
        {
            title: "Interdum velit euismod",
            desc: "Lectus quam id leo in",
            image: require("file-loader\/!../../develop/assets/images/cat-pet-animal-2.jpg")
        },
        {
            title: "Interdum velit euismod",
            desc: "Lectus quam id leo in",
            image: require("file-loader\/!../../develop/assets/images/cat-pet-animal-2.jpg")
        }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, SwiperModule],
            declarations: [CarouselComponent],
            providers: [{
                provide: SWIPER_CONFIG,
                useValue: { direction: "horizontal" }
            }],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(CarouselComponent);
            component = fixture.componentInstance;
            component.list = list;
        });
    }));

    it("render and not be undefined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(component).toBeDefined();
        expect(component).not.toBeNull();
    }));

    it("should render the correct css class ", async(() => {
        component.className = "carousel";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".carousel"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".carousel"))).not.toBeNull();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeNull();
    }));

    it("should render and set the correct description text", async(() => {
        fixture.detectChanges();
        const el: DebugElement = fixture.debugElement.query(By.css(".desc"));
        expect(el.nativeElement.innerHTML).toEqual(component.list[0].desc);
    }));

    it("should render and call carouselChanged event when next button is clicked", async(() => {
        component.className = "carousel";
        component.carouselChanged = (index: number) => { };
        fixture.detectChanges();
        const onChangeMock = spyOn(component, "carouselChanged");
        const btnNext = fixture.debugElement.nativeElement.querySelector(".swiper-button-next");
        fixture.whenStable().then(() => {
            btnNext.click();
            expect(onChangeMock).toHaveBeenCalled();
            expect(component.currentIndex).toEqual(1);
        });
    }));

    it("ngOnInit function should set height and autoPlay when provided", async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component.height = 20;
            component.autoplay = true;

            component.ngOnInit();

            expect(component.height).toEqual(20);
            expect(component.autoplay).toEqual(true);
        });
    }));

});
