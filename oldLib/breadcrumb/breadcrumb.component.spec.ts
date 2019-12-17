
import { BreadcrumbComponent } from "./breadcrumb.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

describe("Component: BreadcrumbComponent", () => {
    let fixture: ComponentFixture<BreadcrumbComponent>;
    let component: BreadcrumbComponent;
    const list: Array<string> = ["home", "about", "contact"];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [BreadcrumbComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(BreadcrumbComponent);
            component = fixture.componentInstance;
            component.list = list;
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".custom-breadcrumb"))).toBeTruthy();
    }));

    it("should receive the correct css class name parameter", async(() => {
        component.className = "my-breadcrumb";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".my-breadcrumb"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrong-class"))).toBeFalsy();
    }));

    it("should receive the correct id parameter", async(() => {
        component.id = "my-id";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("#my-id"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#wrong-id"))).toBeFalsy();
    }));

    it("should call a click event when an item from the list is clicked ", async(() => {
        component.clickAction = () => true;
        const onClickMock = spyOn(component, "clickAction");

        fixture.detectChanges();

        const LIElement = (fixture.debugElement.nativeElement.querySelectorAll(".breadcrumb-item")[1] as HTMLLIElement);

        LIElement.click();

        fixture.whenStable().then(() => {
            expect(onClickMock).toHaveBeenCalledTimes(1);
            expect(LIElement.innerHTML).toContain("about");
            expect(LIElement.value).toEqual(1);
        });
    }));

});
