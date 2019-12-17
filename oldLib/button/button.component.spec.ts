import { Component, DebugElement } from "@angular/core";

import { ButtonComponent } from "./button.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By, DomSanitizer } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { SafeHtmlPipe } from "./button.pipe";

@Component({
    template: `
      <ac-button label="submit" className="btn-label" iconPosition="right">
        <div>
            <p>This is a <a href='www.google.com'>link</a></p>
        </div>
      </ac-button>`
})
class TestHtmlComponent { }

describe("Component: Button", () => {
    let fixture: ComponentFixture<ButtonComponent>;
    let component: ButtonComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [ButtonComponent, SafeHtmlPipe, TestHtmlComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ButtonComponent);
            component = fixture.componentInstance;
            component.label = "submit";
            component.clickAction = () => { };
        });
    }));

    it("should receive and render the correct class name", async(() => {
        component.className = "btn-label";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".btn-label"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should render the correct button text", async(() => {
        fixture.detectChanges();
        const el: DebugElement = fixture.debugElement.query(By.css("button"));
        expect(el.nativeElement.innerHTML).toContain("submit");
    }));

    it("should be disabled when disabled parameter is set to true", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("button")).nativeElement.disabled).toBeFalsy();

        component.disabled = true;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("button")).nativeElement.disabled).toBeTruthy();
    }));

    it("should call button clicked event when clicked", async(() => {
        fixture.detectChanges();
        const onClickMock = spyOn(component, "clickAction");
        const button = fixture.debugElement.nativeElement.querySelector("button");
        button.click();
        fixture.whenStable().then(() => {
            expect(onClickMock).toHaveBeenCalled();
        });
    }));

    it("Should allow changing button type", async(() => {
        fixture.detectChanges();
        const el: DebugElement = fixture.debugElement.query(By.css("button"));
        expect(el.nativeElement.type === "button").toBeTruthy();
        component.type = "submit";
        fixture.detectChanges();
        expect(el.nativeElement.type === "submit").toBeTruthy();
    }));

    it("Safe HTML pipe should work as intended", async(() => {
        component.icon = "<svg></svg>";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".svg-holder svg"))).toBeDefined();
    }));

    it("should cater for ng-content when provided", async(() => {
        const htmlFixture = TestBed.createComponent(TestHtmlComponent);
        htmlFixture.detectChanges();
        const messageContainer = htmlFixture.debugElement.query(By.css(".button-content")).nativeElement;

        expect(messageContainer.innerHTML).toContain("www.google.com");
        expect(messageContainer.textContent).toContain("This is a link");
    }));
});
