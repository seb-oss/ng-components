import { Component, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { PaginationComponent } from "./pagination.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "test-sebng-pagination",
    template: `
        <sebng-pagination
            [value]="value"
            [className]="className"
            (change)="setPagination($event)"
            [size]="size"
            [offset]="offset"
            [useDotNav]="useDotNav"
            [pagingLength]="pagingLength"
            [useTextNav]="useTextNav"
            [firstText]="firstText"
            [lastText]="lastText"
            [nextText]="nextText"
            [useFirstAndLast]="useFirstAndLast"
            [nextText]="nextText"
            [previousText]="previousText"
        ></sebng-pagination>
    `,
})
class PaginationTestComponent {
    size: number = 60;
    value: number;

    className?: string;
    firstText?: string;
    id?: string;
    lastText?: string;
    nextText?: string;
    offset?: number = 6;
    pagingLength?: number = 7;
    previousText?: string;

    useDotNav?: boolean;
    useFirstAndLast?: boolean;
    useTextNav?: boolean;

    setPagination(value: number): void {
        this.value = value;
    }
}

describe("PaginationComponent", () => {
    let component: PaginationTestComponent;
    let fixture: ComponentFixture<PaginationTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [PaginationComponent, PaginationTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationTestComponent);
        component = fixture.componentInstance;
        component.value = 5;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("Should render in both numbered and dotnav modes", () => {
        expect(component).toBeDefined();
        expect(fixture.debugElement.queryAll(By.css(".pagination")).length).toEqual(1);
        expect(fixture.debugElement.queryAll(By.css(".dotnav")).length).toEqual(0);
        component.useDotNav = true;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(".pagination")).length).toEqual(1);
        expect(fixture.debugElement.queryAll(By.css(".dotnav")).length).toEqual(1);
    });

    it("Should pass custom class and id", () => {
        const className: string = "myPaginationClass";
        const id: string = "myPaginationId";
        component.className = className;
        component.id = id;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.${className}`))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(`#${id}`))).toBeTruthy();
    });

    it("Should render with custom pageLength", () => {
        component.pagingLength = 3;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(".page-item")).length).toBe(5); // plus next and previous
    });

    describe("Showing first and last when `useFirstAndLast` is enabled", () => {
        beforeEach(() => {
            component.useFirstAndLast = true;
            component.value = 4;
            fixture.detectChanges();
        });

        it("Should render with default svg and sr-only", () => {
            expect(fixture.debugElement.query(By.css(".nav-action")).queryAll(By.css("svg")).length).toBe(1);
            expect(fixture.debugElement.queryAll(By.css(".nav-action+.sr-only"))[0].nativeElement.textContent).toEqual("First");
            expect(fixture.debugElement.queryAll(By.css(".nav-action"))[1].queryAll(By.css("svg")).length).toBe(1);
            expect(fixture.debugElement.queryAll(By.css(".nav-action+.sr-only"))[3].nativeElement.textContent).toEqual("Last");
        });

        it("Should render with default text if not passed while `useTextNav` is enabled", () => {
            component.useTextNav = true;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".nav-action")).nativeElement.textContent.trim()).toEqual("First");
            expect(fixture.debugElement.queryAll(By.css(".nav-action"))[3].nativeElement.textContent.trim()).toEqual("Last");
        });

        it("Should render with passed text while `useTextNav` is enabled", () => {
            component.useTextNav = true;
            component.firstText = "firstItem";
            component.lastText = "lastItem";
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".nav-action")).nativeElement.textContent.trim()).toEqual("firstItem");
            expect(fixture.debugElement.queryAll(By.css(".nav-action"))[3].nativeElement.textContent.trim()).toEqual("lastItem");
        });
    });

    describe("Should render with text navigation", () => {
        beforeEach(() => {
            component.useTextNav = true;
            component.useFirstAndLast = false;
            component.value = 4;
            fixture.detectChanges();
        });

        it("Should render default texts if not passed", () => {
            expect(fixture.debugElement.query(By.css(".nav-action")).nativeElement.textContent.trim()).toEqual("Previous");
            expect(fixture.debugElement.query(By.css(".nav-action+.sr-only")).nativeElement.textContent.trim()).toEqual("Previous");
            expect(fixture.debugElement.queryAll(By.css(".nav-action"))[1].nativeElement.textContent.trim()).toEqual("Next");
            expect(fixture.debugElement.queryAll(By.css(".nav-action+.sr-only"))[1].nativeElement.textContent.trim()).toEqual("Next");
        });

        it("Should render passed text", () => {
            component.previousText = "previousItem";
            component.nextText = "nextItem";
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".nav-action")).nativeElement.textContent.trim()).toEqual("previousItem");
            expect(fixture.debugElement.query(By.css(".nav-action+.sr-only")).nativeElement.textContent.trim()).toEqual("previousItem");
            expect(fixture.debugElement.queryAll(By.css(".nav-action"))[1].nativeElement.textContent.trim()).toEqual("nextItem");
            expect(fixture.debugElement.queryAll(By.css(".nav-action+.sr-only"))[1].nativeElement.textContent.trim()).toEqual("nextItem");
        });
    });

    describe("Should trigger onChange callback when page navigation occured", () => {
        let onChange: jasmine.Spy;

        beforeEach(() => {
            onChange = spyOn(component, "setPagination");
        });

        it("Number pagination", () => {
            component.useFirstAndLast = true;
            component.offset = 5;
            component.offset = 6;
            component.value = 3; // To cover all navigation options
            fixture.detectChanges();
            fixture.debugElement.query(By.css(".page-item")).nativeElement.dispatchEvent(new Event("click")); // First Button
            fixture.debugElement.queryAll(By.css(".page-item"))[1].nativeElement.dispatchEvent(new Event("click")); // Previous Button
            fixture.debugElement.queryAll(By.css(".page-item"))[6].nativeElement.dispatchEvent(new Event("click")); // Next Button
            fixture.debugElement.queryAll(By.css(".page-item"))[10].nativeElement.dispatchEvent(new Event("click")); // Last Button
            fixture.debugElement.queryAll(By.css(".page-item"))[3].nativeElement.dispatchEvent(new Event("click")); // Number button

            expect(onChange).toHaveBeenCalledTimes(5);
        });

        it("Dotnav pagination", () => {
            component.useDotNav = true;
            fixture.detectChanges();
            fixture.debugElement.queryAll(By.css(".page-item"))[4].nativeElement.dispatchEvent(new Event("click")); // Navigate to any dot
            expect(onChange).toHaveBeenCalled();
        });
    });

    describe("Testing pagination behavior when page number changes", () => {
        beforeEach(() => {
            component.size = 10;
            component.value = 1;
            component.offset = 2;
            component.pagingLength = 5;
            component.useFirstAndLast = true;
            fixture.detectChanges();
        });

        it("Should not render First and previous at page 1", () => {
            component.value = 1;
            // Only next and last is rendered
            expect(fixture.debugElement.queryAll(By.css(".nav-action")).length).toBe(2);
            // 2 Navigations + 5 numbers (size /  offset)
            expect(fixture.debugElement.queryAll(By.css(".page-item")).length).toBe(7);
            // First item is 1 and it is active
            expect(fixture.debugElement.query(By.css(".page-item")).query(By.css(".nav-num")).nativeElement.textContent.trim()).toEqual(
                "1"
            );
            expect(fixture.debugElement.query(By.css(".page-item.active"))).toBeTruthy();
            // Next button is rendered with `angle-right` svg
            expect(fixture.debugElement.query(By.css(".nav-action")).queryAll(By.css("svg")).length).toBe(1);
            expect(fixture.debugElement.query(By.css(".nav-action")).query(By.css("svg")).attributes.name).toEqual("angle-right");
            // Last button is rendered with `angle-double-right` svg
            expect(fixture.debugElement.queryAll(By.css(".nav-action"))[1].queryAll(By.css("svg")).length).toBe(1);
            expect(fixture.debugElement.queryAll(By.css(".nav-action"))[1].query(By.css("svg")).attributes.name).toEqual(
                "angle-double-right"
            );
        });
        it("Should render First and Previous when current page is not 1", () => {
            component.value = 2;
            fixture.detectChanges();
            // Only next and last is rendered
            expect(fixture.debugElement.queryAll(By.css(".nav-action")).length).toBe(4);
            // 4 Navigations + 5 numbers (offset)
            expect(fixture.debugElement.queryAll(By.css(".page-item")).length).toBe(9);
        });
        it("Should not render Next and Last when current page is the last page", () => {
            component.value = 5;
            fixture.detectChanges();
            // Only previous and first is rendered
            expect(fixture.debugElement.queryAll(By.css(".nav-action")).length).toBe(2);
            // 2 Navigations + 5 numbers (offset)
            expect(fixture.debugElement.queryAll(By.css(".page-item")).length).toBe(7);
            // Last item is 10 and it is active
            expect(fixture.debugElement.queryAll(By.css(".page-item"))[6].query(By.css(".nav-num")).nativeElement.textContent).toEqual("5");
            expect(fixture.debugElement.queryAll(By.css(".page-item"))[6].classes.active).toBeTruthy();
            // First button is rendered with `angle-double-left` svg
            expect(fixture.debugElement.query(By.css(".nav-action")).queryAll(By.css("svg")).length).toBe(1);
            expect(fixture.debugElement.queryAll(By.css(".nav-action"))[0].query(By.css("svg")).attributes.name).toEqual(
                "angle-double-left"
            );
            // Previous button is rendered with `angle-left` svg
            expect(fixture.debugElement.queryAll(By.css(".nav-action"))[1].queryAll(By.css("svg")).length).toBe(1);
            expect(fixture.debugElement.queryAll(By.css(".nav-action"))[1].query(By.css("svg")).attributes.name).toEqual("angle-left");
        });
    });
});
