import { TimelineComponent, TimelineListItem } from "./timeline.component";
import { TestBed, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: "test-sebng-toggle",
    template: `
        <sebng-timeline (onClick)="onClick($event)" [className]="className" [list]="list" [direction]="direction"></sebng-timeline>
    `,
})
class TimeTestComponent {
    list: Array<TimelineListItem>;
    direction?: string = "vertical";
    className: string;
    onClick(index: number) {}
}

describe("Component: TimelineComponent", () => {
    let fixture: ComponentFixture<TimeTestComponent>;
    let component: TimeTestComponent;
    let onClick: jasmine.Spy;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, CommonModule],
                declarations: [TimeTestComponent, TimelineComponent],
                providers: [],
            })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(TimeTestComponent);
                    component = fixture.componentInstance;
                    component.list = [
                        {
                            title: "Present day",
                            time: "2011 - Present",
                            desc: "From 2011 to date",
                        },
                        {
                            title: "Old times",
                            time: "1990 - 2010",
                            desc: " Old times sake",
                        },
                        {
                            title: "the before times",
                            time: "1900 - 1990",
                            desc: " century times sake",
                        },
                    ];
                    onClick = spyOn(component, "onClick");
                    fixture.detectChanges();
                });
        })
    );

    it(
        "should render and be defined",
        waitForAsync(() => {
            expect(component).toBeTruthy();
        })
    );

    it(
        "should display the correct css className",
        waitForAsync(() => {
            component.className = "my-timeline";
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".my-timeline"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".wrong-class"))).toBeFalsy();
        })
    );

    it(
        "should handle and display timeline in vertical and horizontal directions",
        waitForAsync(() => {
            fixture.detectChanges();

            // direction is vertical by default;
            expect(fixture.debugElement.query(By.css(".timeline.vertical"))).toBeTruthy();

            // Horizontal should be null
            expect(fixture.debugElement.query(By.css(".timeline.horizontal"))).toBeNull();

            // list size or length is 3 so there would be one left-direction and 2 right-direction
            expect(fixture.debugElement.queryAll(By.css(".item-holder > .direction-left")).length).toEqual(1);
            expect(fixture.debugElement.queryAll(By.css(".item-holder > .direction-right")).length).toEqual(2);

            // test clicking an item
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".timeline.clickable"))).not.toBeNull();
            const oldTimesWrapperItem = fixture.debugElement.queryAll(By.css(".item-holder > .direction-right > .title-wrapper"))[1];
            oldTimesWrapperItem.nativeElement.dispatchEvent(new Event("click"), 1);
            expect(onClick).toHaveBeenCalledTimes(1);
            expect(oldTimesWrapperItem.children.find(By.css(".title")).nativeElement.innerHTML).toEqual("the before times");
        })
    );
});
