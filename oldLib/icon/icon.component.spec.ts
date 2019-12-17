
import { IconComponent } from "./icon.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { SafeHtmlPipe } from "./icon.pipe";
import { By } from "@angular/platform-browser";

describe("Component: Icon", () => {
    let fixture: ComponentFixture<IconComponent>;
    let component: IconComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [IconComponent, SafeHtmlPipe],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(IconComponent);
            component = fixture.componentInstance;
            component.src = "abc";
        });
    }));

    it("should render and be defined", async(() => {
        component.className = "fa-icon";
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should render and receive the correct css class name", async(() => {
        component.className = "fa-icon";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".fa-icon"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should add clickable pointer when clickAction is provided", async(() => {
        component.className = "fa-icon";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".fa-icon.clickable"))).toBeFalsy();

        component.clickAction = () => true;
        const clickSpy = spyOn(component, "clickAction").and.callThrough();

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".fa-icon.clickable"))).toBeTruthy();
        fixture.debugElement.query(By.css(".fa-icon.clickable")).triggerEventHandler("click", { e: event });
        expect(clickSpy).toHaveBeenCalled();
    }));

});
