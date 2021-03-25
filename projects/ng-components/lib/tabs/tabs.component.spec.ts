import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TabsComponent } from "./tabs.component";
import { CommonModule } from "@angular/common";

describe("TabsComponent", () => {
    let component: TabsComponent;
    let fixture: ComponentFixture<TabsComponent>;
    let onClick: jasmine.Spy;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule],
                declarations: [TabsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TabsComponent);
        component = fixture.componentInstance;
        component.list = [
            { text: "First", disabled: false },
            { text: "Second", disabled: false },
            { text: "Third", disabled: false },
            { text: "Fourth", disabled: true },
        ];
        fixture.detectChanges();
        onClick = spyOn(component, "handleClick").and.callThrough();
    });

    it("Should render", () => {
        expect(component).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        component.className = "MyTabsClass";
        component.id = "MyIDClass";

        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll(".MyTabsClass")).toBeTruthy();
        expect(fixture.nativeElement.querySelectorAll("#MyIDClass").length).toBeGreaterThan(0);
    });

    it("Should fire click event if passed", () => {
        fixture.nativeElement.querySelectorAll(".nav-link")[1].dispatchEvent(new Event("click"));
        fixture.detectChanges();
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Should render a tab as disabled if passed", () => {
        expect(fixture.debugElement.queryAll(By.css(".nav-link"))[3].classes.disabled).toBeTrue();
    });

    it("Should change active tab when a new tab in clicked", () => {
        const activeElementId: number = 2;
        fixture.debugElement.queryAll(By.css(".nav-link"))[activeElementId].nativeElement.dispatchEvent(new Event("click"));
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(".nav-link"))[activeElementId].classes.active).toBeTrue();
    });
});
