import { RatingComponent } from "./rating.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SVGStar, SVGStarHollow } from "./svgStar";
import { Component, ViewChild, DebugElement } from "@angular/core";

@Component({
    selector: "tac-radioBtnGroup",
    template: `     <ac-rating
    [iconWidth]="30"
    [iconHeight]="30"
    [(ngModel)]="startValue"
    [readOnly]="false"
    className={{className}}
    [max]="5"
    [showTextValue]="true"
    [tooltipList]="tooltipList"
></ac-rating>`,
})
class CustomTestClass {
    @ViewChild(RatingComponent) ratingComponent: RatingComponent;
    className: string;
    startValue: number = 3.5;
    tooltipList: Array<string>;

    constructor() {
        this.className = "my-radio-class";
        this.tooltipList = [
            "first tip", "second tip", "third tip", "fourth tip", "fifth tip"
        ];
        this.className = "my-rating";
    }
}

describe("Component: RatingComponent", () => {
    let component: CustomTestClass;
    let fixture: ComponentFixture<CustomTestClass>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [RatingComponent, SVGStar, SVGStarHollow, CustomTestClass],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(CustomTestClass);
            component = fixture.componentInstance;
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("render and have the expected class name", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".my-rating"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should render and fire MouseEnter event onMouseEnter", async(() => {
        fixture.detectChanges();
        const onMouseEnterMock = spyOn(component.ratingComponent, "onMouseEnter").and.callThrough();
        const ratingComponent = fixture.debugElement.nativeElement.querySelector(".star-holder");
        component.ratingComponent.readOnly = false;
        // activeLIst should be empty initially
        expect(component.ratingComponent.activeList.length).toEqual(0);

        fixture.detectChanges();
        const event = new Event("mouseenter");
        ratingComponent.dispatchEvent(event);
        fixture.whenStable().then(() => {
            expect(onMouseEnterMock).toHaveBeenCalled();
            expect(component.ratingComponent.activeList.length).toEqual(5);
        });
    }));

    it("should render and fire click event onclick", async(() => {
        fixture.detectChanges();
        const onClickMock = spyOn(component.ratingComponent, "onClick");
        const ratingComponent = fixture.debugElement.nativeElement.querySelector(".star-holder");
        const event = new Event("click");
        ratingComponent.dispatchEvent(event);
        fixture.whenStable().then(() => {
            expect(onClickMock).toHaveBeenCalled();
        });
    }));

    it("should render and fire mouseleave event onMouseLeave", async(() => {
        fixture.detectChanges();
        const onMouseLeaveMock = spyOn(component.ratingComponent, "onMouseLeave").and.callThrough();
        const ratingComponent: Array<DebugElement> = fixture.debugElement.queryAll(By.css(".star-holder"));
        const event = new Event("mouseleave");
        fixture.whenStable().then(() => {
            ratingComponent[0].nativeElement.dispatchEvent(event);
            expect(onMouseLeaveMock).toHaveBeenCalled();
        });
    }));

    it("onClick event should set the key as the value", async(() => {
        fixture.detectChanges();
        const onClickMock = spyOn(component.ratingComponent, "onClick").and.callThrough();
        const ratingComponent: Array<DebugElement> = fixture.debugElement.queryAll(By.css(".star-holder"));

        expect(component.ratingComponent.value).toBeFalsy();
        ratingComponent[0].nativeElement.click();
        expect(onClickMock).toHaveBeenCalled();
        expect(component.ratingComponent.value).toEqual(1);
    }));

    it("should render and fire mouseEnter event onMouseEnter", async(() => {
        fixture.detectChanges();
        const onMouseEnterMock = spyOn(component.ratingComponent, "onMouseEnter").and.callThrough();
        const ratingComponent = fixture.debugElement.nativeElement.querySelector(".star-holder");
        const event = new Event("mouseenter");
        ratingComponent.dispatchEvent(event);
        fixture.whenStable().then(() => {
            expect(onMouseEnterMock).toHaveBeenCalled();
        });
    }));

    it("should be able to write and update value using the writevalue method", async(() => {
        fixture.detectChanges();
        expect(component.ratingComponent.value).toBeNull();
        component.ratingComponent.writeValue(5);
        fixture.detectChanges();
        expect(component.ratingComponent.value).toEqual(5);
    }));

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.ratingComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.ratingComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.ratingComponent, "writeValue").and.callThrough();

        component.ratingComponent.registerOnChange(onChangeEvent);
        component.ratingComponent.registerOnTouched(onChangeEvent);
        component.startValue = 4;

        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.startValue).toEqual(component.ratingComponent.value);
        });
    }));

    it("getter and setter values of ratingComponent should get be able to get and set value correctly", () => {
        fixture.detectChanges();
        let expectedValue;
        component.ratingComponent.value = expectedValue = 1;

        // do not call detectChanges here again, doing so will refresh the component
        expect(expectedValue).toEqual(component.ratingComponent.value);
    });

    it("should call the onKeydown and onKeyup events when a key is clicked ", async(() => {
        fixture.detectChanges();

        const onKeydownSpy = spyOn(component.ratingComponent, "onKeydown").and.callThrough();
        const onKeyupSpy = spyOn(component.ratingComponent, "onKeyup").and.callThrough();

        // select the first element child
        const el = fixture.debugElement.queryAll(By.css(".star-holder"))[0];

        el.triggerEventHandler("keydown", new KeyboardEvent("keydown", { key: "arrowright" }));
        fixture.whenStable().then(() => {
            expect(onKeydownSpy).toHaveBeenCalled();

            const secondElement: DebugElement = fixture.debugElement.queryAll(By.css(".star-holder"))[1];
            secondElement.triggerEventHandler("keydown", new KeyboardEvent("keydown", { key: "arrowleft" }));

            // when user reeact the end of ratings, reset rating to 0
            component.ratingComponent.tabCounter = -1;
            secondElement.triggerEventHandler("keydown", new KeyboardEvent("keydown", { key: "arrowleft" }));

            secondElement.triggerEventHandler("keyup", new KeyboardEvent("keyup", { key: "tab" }));

            expect(onKeydownSpy).toHaveBeenCalledTimes(3);
            expect(onKeyupSpy).toHaveBeenCalledTimes(1);
        });
    }));

});
