
import { TabsComponent } from "./tabs.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DebugElement } from "@angular/core";

describe("Component: TabsComponent", () => {
    let fixture: ComponentFixture<TabsComponent>;
    let component: TabsComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [TabsComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TabsComponent);
            component = fixture.componentInstance;
            component.list = [{
                text: "Home",
                disabled: false,
            }, {
                text: "About",
                disabled: false,
            }];
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should render and receive the correct css class parameter", async(() => {
        component.className = "my-tabs";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".my-tabs"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should set home tab as active tab", async(() => {
        component.activeTab = 0;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("a.active")).nativeElement.innerHTML).toContain("Home");
    }));

    it("Disable a tab when necessary", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("a.disabled"))).toBeNull();
        component.list[1].disabled = true;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("a.disabled"))).toBeTruthy();
    }));

    it("should call clickAction when tab is clicked", async(() => {

        component.clickAction = (index) => true;
        fixture.detectChanges();
        const aboutTabBtn = fixture.debugElement.queryAll(By.css("a"))[1];
        const onAboutTabClickMock = spyOn(component, "clickAction").and.callThrough();
        aboutTabBtn.triggerEventHandler("click", null);

        fixture.whenStable().then(() => {
            expect(onAboutTabClickMock).toHaveBeenCalledTimes(1);
            expect(aboutTabBtn.nativeElement.innerHTML).toContain("About");
        });
    }));

    it("should call the onKeydown event as required ", async(() => {
        component.activeTab = 0;
        component.list = [{
            text: "Home",
            disabled: false,
        }, {
            text: "About",
            disabled: false,
        },
        {
            text: "Contact",
            disabled: false,
        }, {
            text: "Rules",
            disabled: false,
        }];
        component.clickAction = (index) => true;
        const keydownSpy = spyOn(fixture.componentInstance, "onKeyDown").and.callThrough();

        fixture.detectChanges();
        const el: DebugElement = fixture.debugElement.query(By.css("a.nav-link.active"));
        el.triggerEventHandler("keydown", new KeyboardEvent("keydown", { key: "arrowright" }));
        expect(keydownSpy).toHaveBeenCalled();
        component.activeTab = 1;
        fixture.detectChanges();
        el.triggerEventHandler("keydown", new KeyboardEvent("keydown", { key: "arrowleft" }));
        expect(keydownSpy).toHaveBeenCalledTimes(2);
    }));

});
