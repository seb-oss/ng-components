
import { StepTrackerComponent } from "./stepTracker.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { SafeHtmlPipe } from "./stepTracker.pipe";

describe("Component: StepTrackerComponent", () => {
    let fixture: ComponentFixture<StepTrackerComponent>;
    let component: StepTrackerComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [StepTrackerComponent, SafeHtmlPipe],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(StepTrackerComponent);
            component = fixture.componentInstance;
            component.list = ["first", "two"];
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should use the correct css className", async(() => {
        component.className = "my-step-tracker";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".my-step-tracker"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrong-class"))).toBeFalsy();
    }));

    it("should render and handles horizontal orientation", async(() => {
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".active > .number"))).toBeNull();

        component.orientation = "horizontal";
        component.step = 1;
        component.clickAction = () => true;

        const mockGetProgressFunc = spyOn(component, "getProgress");
        const mockClickActionClick = spyOn(component, "clickAction");
        fixture.detectChanges();
        const stepBtn = fixture.debugElement.query(By.css(".step"));

        stepBtn.triggerEventHandler("click", null);
        fixture.whenStable().then(() => {
            expect(mockGetProgressFunc).toHaveBeenCalled();
            expect(mockClickActionClick).toHaveBeenCalled();
            expect(fixture.debugElement.query(By.css(".active > .number")).nativeElement.innerHTML).toEqual("2");
        });

    }));

    it("should render and handles vertical orientation", async(() => {
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".active > .number"))).toBeNull();

        component.orientation = "vertical";
        component.step = 0;
        component.clickAction = () => true;
        const mockGetProgressFunc = spyOn(component, "getProgress");
        const mockClickActionClick = spyOn(component, "clickAction");
        fixture.detectChanges();
        const stepBtn = fixture.debugElement.query(By.css(".step"));

        stepBtn.triggerEventHandler("click", null);
        fixture.whenStable().then(() => {
            expect(mockGetProgressFunc).toHaveBeenCalled();
            expect(mockClickActionClick).toHaveBeenCalled();
            expect(fixture.debugElement.query(By.css(".active > .number")).nativeElement.innerHTML).toEqual("1");
        });

    }));

    it("setupTextAlignment function should control and set the right tracker alignments", async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {

            /**
             * When Orientation is vertical
             */
            component.orientation = "horizontal";
            component.labelPosition = "top";
            component.setupTextAlignment();

            fixture.detectChanges();

            expect(component.topLabel).toEqual(true);
            expect(component.bottomLabel).toEqual(false);
            expect(component.rightLabel).toEqual(false);
            expect(component.leftLabel).toEqual(false);

            component.labelPosition = "bottom";
            component.setupTextAlignment();
            fixture.detectChanges();

            expect(component.topLabel).toEqual(false);
            expect(component.bottomLabel).toEqual(true);
            expect(component.rightLabel).toEqual(false);
            expect(component.leftLabel).toEqual(false);

            /**
             * When Orientation is vertical
             */

            component.orientation = "vertical";
            component.labelPosition = "left";
            component.setupTextAlignment();

            fixture.detectChanges();

            expect(component.topLabel).toEqual(false);
            expect(component.bottomLabel).toEqual(false);
            expect(component.rightLabel).toEqual(false);
            expect(component.leftLabel).toEqual(true);

            component.labelPosition = "right";
            component.setupTextAlignment();
            fixture.detectChanges();

            expect(component.topLabel).toEqual(false);
            expect(component.bottomLabel).toEqual(false);
            expect(component.rightLabel).toEqual(true);
            expect(component.leftLabel).toEqual(false);

            /**
             * When Orientation is vertical and labelPosition is not provided
             */
            component.labelPosition = "wrong";
            component.setupTextAlignment();

            fixture.detectChanges();

            expect(component.labelPosition).toEqual("right");
        });
    }));

});
