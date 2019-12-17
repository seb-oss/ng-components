
import { PaginationComponent } from "./pagination.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { SafeHtmlPipe } from "./pagination.pipe";

describe("Component: PaginationComponent", () => {
    let fixture: ComponentFixture<PaginationComponent>;
    let component: PaginationComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [PaginationComponent, SafeHtmlPipe],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(PaginationComponent);
            component = fixture.componentInstance;
            component.value = 2;
            component.size = 50;
            component.className = "my-pagination";
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should render and receive the correct css class parameter", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".my-pagination"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should render and display firstText, lastText when specified and when value is not one in dotNav view", async(() => {
        component.useDotNav = false;
        component.useTextNav = true;
        component.useFirstAndLast = true;
        component.firstText = "<<";
        component.previousText = ">>";
        fixture.detectChanges();

        const allBtn = fixture.debugElement.queryAll(By.css("button"));

        expect(allBtn[0].nativeElement.title).toEqual("<<");
        expect(allBtn[1].nativeElement.title).toEqual(">>");
        expect(fixture.debugElement.query(By.css(".dotnav"))).toBeNull();

        component.useDotNav = true;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".dotnav"))).not.toBeNull();
    }));

    it("should render and fire click event list item clicked", async(() => {
        fixture.detectChanges();
        const onClickMock = spyOn(component, "handleChange");
        const btn = fixture.debugElement.nativeElement.querySelector("li");
        const event = new Event("click");
        btn.dispatchEvent(event);
        fixture.whenStable().then(() => {
            expect(onClickMock).toHaveBeenCalled();
        });
    }));

    it("getList function should validate and return the correct lists", async(() => {
        fixture.detectChanges();

        /**
         * Schenario, when value is lessthan than offset/ 2
         */
        const offset = 5;
        const size = 40;
        let value = 2;

        let list = component.getList(value, size, offset);

        // first number in the list to be 1
        // and last to be offset
        expect(list[0]).toEqual(1);
        expect(list[offset - 1]).toEqual(offset);

        /**
         * Schenario, when value is among the last subset of off numbers
         */
        value = 38;
        list = component.getList(value, size, offset);
        // expect the last page to be on the last
        // and the first size - offset
        expect(list[0]).toEqual(size - (offset - 1));
        expect(list[offset - 1]).toEqual(size);

        /**
         * Schenario, when value is not among the last page and not greater than offset
         */

        value = 24;
        list = component.getList(value, size, offset);

        // expect the value to be in the middle
        // so first number should be value - offset / 2
        // and last number is value + offset / 2

        expect(list[0]).toEqual(value - Math.floor(offset / 2));
        expect(list[offset - 1]).toEqual(value + Math.floor(offset / 2));

    }));

    it("handleChange function should call changeAction when the condiiton is met", async(() => {
        component.changeAction = (value: any) => true;
        const onChangeActionMock = spyOn(component, "changeAction").and.callThrough();
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            // value is greater than equals 1 and number is lessthan equals size, call changeAction
            component.handleChange(5);
            expect(onChangeActionMock).toHaveBeenCalled();
        });
    }));

});
