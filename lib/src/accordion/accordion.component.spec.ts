import { Component, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AccordionComponent, AccordionIconRotation, AccrodionListItem } from "./accordion.component";
import { SafeHtmlPipe } from "./accordion.pipe";
import { DynamicStylePipe } from "./accordion-style.pipe";
import { CommonModule } from "@angular/common";

@Component({
    selector: "test-sebng-textboxgroup",
    template: `
        <sebng-accordion
            [className]="className"
            [customIcon]="customIcon"
            [customIconExpanded]="customIconExpanded"
            [iconPosition]="iconPosition"
            [iconRotation]="iconRotation"
            [id]="id"
            [list]="list"
            [alternative]="alternative"
            [activeIndex]="activeIndex"
        ></sebng-accordion>
    `,
})
class AccordionTestComponent {
    className?: string;
    customIcon?: string;
    customIconExpanded?: string;
    iconPosition?: "left" | "right";
    iconRotation?: AccordionIconRotation;
    id?: string;
    list: Array<AccrodionListItem>;
    alternative?: boolean;
    activeIndex?: number;
}

describe("AccordionComponent", () => {
    let component: AccordionTestComponent;
    let fixture: ComponentFixture<AccordionTestComponent>;

    const accordionList: Array<AccrodionListItem> = [
        { header: "Item 1", content: { title: "title", desc: "desc" } },
        {
            header: "Item 2",
            content: [
                { title: "title", desc: "desc" },
                { title: "title", desc: "desc" },
            ],
        },
        { header: "Item 3", content: [{ desc: "desc" }, { desc: "desc" }] },
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [AccordionComponent, AccordionTestComponent, SafeHtmlPipe, DynamicStylePipe],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccordionTestComponent);
        component = fixture.componentInstance;
        component.list = accordionList;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".text-wrapper"))).toBeTruthy();
    });

    it("Should render custom className and id", () => {
        const className: string = "myAccordionClass";
        const id: string = "myAccordionId";

        component.id = id;
        component.className = className;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.${className}`))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(`#${id}`))).toBeTruthy();
    });

    it("Should render subheader is included in props", () => {
        const newAccordionList = JSON.parse(JSON.stringify(accordionList));

        newAccordionList[0].subHeaderText = "Test subheader";

        component.list = newAccordionList;

        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(`.with-sub-header`)).length).toEqual(1);
    });

    // Todo: fix and update in next commit
    it("Should toggle accordion when clicked, and toggled off when another item is clicked", async () => {
        fixture.debugElement.queryAll(By.css(".accordion-item .header-wrapper"))[0].nativeElement.dispatchEvent(new MouseEvent("click"));

        fixture.detectChanges();

        await fixture.whenStable();
        expect(fixture.debugElement.query(By.css(".accordion-item")).classes.active).toBeTrue();

        fixture.debugElement.queryAll(By.css(".accordion-item .header-wrapper"))[1].nativeElement.dispatchEvent(new MouseEvent("click"));
        fixture.detectChanges();
        await fixture.whenStable();

        expect(fixture.debugElement.queryAll(By.css(".accordion-item"))[0].classes.active).toBeFalsy();

        expect(fixture.debugElement.queryAll(By.css(".accordion-item"))[1].classes.active).toBeTrue();
    });

    it("Should untoggle accordion when clicked again", async () => {
        fixture.debugElement.queryAll(By.css(".accordion-item .header-wrapper"))[0].nativeElement.dispatchEvent(new MouseEvent("click"));
        await fixture.whenStable();

        fixture.debugElement.queryAll(By.css(".accordion-item .header-wrapper"))[0].nativeElement.dispatchEvent(new MouseEvent("click"));

        await fixture.whenStable();
        expect(fixture.debugElement.queryAll(By.css(".active")).length).toEqual(0);
    });

    it("Should untoggle accordion item when clicked on another accordion item", async () => {
        fixture.debugElement.queryAll(By.css(".accordion-item .header-wrapper"))[0].nativeElement.dispatchEvent(new MouseEvent("click"));
        await fixture.whenStable();

        expect(fixture.debugElement.queryAll(By.css(".accordion-item"))[0].classes.active).toBeFalsy();

        component.activeIndex = 1;

        fixture.detectChanges();
        fixture.debugElement.queryAll(By.css(".accordion-item .header-wrapper"))[1].nativeElement.dispatchEvent(new MouseEvent("click"));
        await fixture.whenStable();

        expect(fixture.debugElement.queryAll(By.css(".accordion-item"))[1].classes.active).toBeTrue();

        expect(fixture.debugElement.queryAll(By.css(".active")).length).toEqual(1);
    });

    it("Should render with a custom icon", async () => {
        component.customIcon = "<svg id='testIcon' />";
        fixture.detectChanges();

        await fixture.whenStable();

        expect(fixture.debugElement.query(By.css(".header-wrapper #testIcon"))).toBeTruthy();
    });

    it("Should render with a custom icon when expanded", async () => {
        component.customIcon = null;
        component.customIconExpanded = "<svg id='testIcon' />";

        fixture.detectChanges();

        await fixture.whenStable();

        expect(fixture.debugElement.query(By.css(".header-wrapper #testIcon"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".accordion-item")).classes.transform).toBeTrue();
    });
});
