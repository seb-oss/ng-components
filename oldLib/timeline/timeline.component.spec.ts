import { TimelineComponent, TimelineListItem } from "./timeline.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

describe("Component: TimelineComponent", () => {
    let fixture: ComponentFixture<TimelineComponent>;
    let component: TimelineComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [TimelineComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TimelineComponent);
            component = fixture.componentInstance;
            component.list = [
                {
                    title: "Present day",
                    time: "2011 - Present",
                    desc: "From 2011 to date"
                }, {
                    title: "Old times",
                    time: "1990 - 2010",
                    desc: " Old times sake"
                }, {
                    title: "the before times",
                    time: "1900 - 1990",
                    desc: " century times sake"
                }
            ];
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should display the correct css className", async(() => {
        component.className = "my-timeline";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".my-timeline"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrong-class"))).toBeFalsy();
    }));

    it("should handle and display timeline in vertical and horizontal directions", async(() => {
        fixture.detectChanges();

        // direction is vertical by default;
        expect(fixture.debugElement.query(By.css(".timeline.vertical"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".timeline.clickable"))).toBeNull();

        // Horizontal should be null
        expect(fixture.debugElement.query(By.css(".timeline.horizontal"))).toBeNull();

        // list size or length is 3 so there would be one left-direction and 2 right-direction
        expect(fixture.debugElement.queryAll(By.css(".item-holder > .direction-left")).length).toEqual(1);
        expect(fixture.debugElement.queryAll(By.css(".item-holder > .direction-right")).length).toEqual(2);
        expect(component.bottomList.filter((l: TimelineListItem) => l !== null).length).toEqual(2);
        expect(component.topList.filter((l: TimelineListItem) => l !== null).length).toEqual(1);

        // test clicking an item
        component.clickAction = () => true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".timeline.clickable"))).not.toBeNull();
        const clickActionMock = spyOn(component, "clickAction").and.callThrough();
        const oldTimesWrapperItem = fixture.debugElement.queryAll(By.css(".item-holder > .direction-right > .title-wrapper"))[1];
        oldTimesWrapperItem.triggerEventHandler("click", null);

        fixture.whenStable().then(() => {
            expect(clickActionMock).toHaveBeenCalledTimes(1);
            expect(oldTimesWrapperItem.children.find(By.css(".title")).nativeElement.innerHTML).toEqual("the before times");
        });
    }));

});
