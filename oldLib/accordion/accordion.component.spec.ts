
import { AccordionComponent, AccrodionListItem } from "./accordion.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { SafeHtmlPipe } from "./accordion.pipe";

describe("Component: AccordionComponent", () => {
    let fixture: ComponentFixture<AccordionComponent>;
    let component: AccordionComponent;
    const list: Array<AccrodionListItem> = [
        {
            category: "news",
            text: {
                title: "News category",
                desc: "Breaking News "
            }
        },

        {
            category: "gossips",
            text: {
                title: "Gossips category",
                desc: "gossips News "
            }
        }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [AccordionComponent, SafeHtmlPipe],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AccordionComponent);
            component = fixture.componentInstance;
            component.list = list;
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".custom-accordion"))).toBeTruthy();
    }));

    it("should receive the correct css class name", async(() => {
        component.className = "my-accordion";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".my-accordion"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrong-class"))).toBeFalsy();
    }));

    it("function isArray should return true when parameter is array , false otherwise", async(() => {
        fixture.detectChanges();
        expect(component.isArray({ a: 1, b: 3 })).toBeFalsy();
        expect(component.isArray([1, 2, 3])).toBeTruthy();
    }));

    it("should call click event and set active category on category click", async(() => {
        const onClickMock = spyOn(component, "toggle").and.callThrough();
        fixture.detectChanges();

        const clickedCategory: DebugElement = fixture.debugElement.queryAll(By.css(".header-wrapper"))[1];

        clickedCategory.triggerEventHandler("click", null);

        fixture.whenStable().then(() => {
            expect(onClickMock).toHaveBeenCalledTimes(1);
            expect(clickedCategory.nativeElement.innerHTML).toContain("gossips");
            expect(component.active).toEqual(1);
        });
    }));

    it("the function toggle should be able to set the correct active index", async(() => {
        component.toggle(1);
        fixture.detectChanges();
        expect(component.active).toEqual(1);

        // active should be null when active equals toggle index
        component.active = 0;
        component.toggle(0);
        fixture.detectChanges();
        expect(component.active).toBeNull();
    }));

});
