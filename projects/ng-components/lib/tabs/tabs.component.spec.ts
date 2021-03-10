import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TabsComponent, TabsListItem } from "./tabs.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "test-sebng-tabs",
    template: `
        <sebng-tabs
            [list]="list"
            [activeTab]="activeTab"
            [label]="label"
            [className]="className"
            [id]="id"
            (onClick)="onClick($event)"
        ></sebng-tabs>
    `,
})
class TabsTestComponent {
    className?: string;
    disabled?: boolean;
    id?: string;
    activeTab: number;
    label?: string;
    name: string;
    list: Array<TabsListItem>;
    onClick(index: number) {
        this.activeTab = index;
    }
}

describe("TabsComponent", () => {
    let component: TabsTestComponent;
    let fixture: ComponentFixture<TabsTestComponent>;
    let onClick: jasmine.Spy;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule],
                declarations: [TabsComponent, TabsTestComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TabsTestComponent);
        component = fixture.componentInstance;
        component.list = [
            { text: "First", disabled: false },
            { text: "Second", disabled: false },
            { text: "Third", disabled: false },
            { text: "Fourth", disabled: true },
        ];
        component.activeTab = 0;
        fixture.detectChanges();
        onClick = spyOn(component, "onClick");
    });

    it("Should render", () => {
        expect(component).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        component.className = "MyTabsClass";
        component.id = "MyIDClass";

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".MyTabsClass"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css("#MyIDClass")).length).toBeGreaterThan(0);
    });

    it("Should fire click event if passed", () => {
        fixture.debugElement.queryAll(By.css(".nav-link"))[1].nativeElement.dispatchEvent(new Event("click"));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Should render a tab as disabled if passed", () => {
        expect(fixture.debugElement.queryAll(By.css(".nav-link"))[3].classes.disabled).toBeTrue();
    });

    it("Should call componentDidUpdate change localActive when active change ", () => {
        component.activeTab = 2;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(".nav-link"))[2].classes.active).toBeTrue();
    });

    it("Should only change tab with keyboard if active tab is correct", () => {
        component.activeTab = 15;
        expect(
            fixture.debugElement
                .queryAll(By.css(".nav-link"))[1]
                .nativeElement.dispatchEvent(new KeyboardEvent("keydown", { key: "enter" }))
        );

        expect(fixture.debugElement.queryAll(By.css(".nav-link"))[1].classes.active).toBeTrue();
    });
});
