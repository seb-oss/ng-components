import { Component, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TextboxGroupComponent } from "./textboxGroup.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "test-sebng-textboxgroup",
    template: `
        <sebng-textboxgroup
            [name]="name"
            [placeholder]="placeholder"
            [leftIcon]="moneyIcon"
            [rightIcon]="userIcon"
            [onLeftClick]="onLeftClick"
            [onChange]="onChange"
            [onRightClick]="onRightClick"
            [leftTitle]="leftTitle"
            [rightTitle]="rightTitle"
            [error]="error"
            [(ngModel)]="textValue"
            [className]="className"
            disabled="disabled"
            [error]="error"
            [id]="id"
            [label]="label"
            [leftIcon]="leftIcon"
            [leftText]="leftText"
            [rightText]="rightText"
            [leftTitle]="leftTitle"
            [maxLength]="maxLength"
            [minLength]="minLength"
            [pattern]="pattern"
            [required]="required"
            [onKeyDown]="onKeyDown"
            [onKeyPress]="onKeyPress"
            [onBlur]="onBlur"
            [onKeyUp]="onKeyUp"
        ></sebng-textboxgroup>
    `,
})
class TextGroupTestComponent {
    autoComplete?: "on" | "off";
    className?: string;
    disabled?: boolean;
    error?: string;
    focus?: boolean;
    id?: string;
    label?: string;
    leftIcon?: string;
    leftText?: string;
    leftTitle?: string;
    maxLength?: number;
    minLength?: number;
    name: string;
    pattern?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    rightIcon?: string;
    rightText?: string;
    rightTitle?: string;
    type?: string;
    success?: boolean;
    showErrorMessage?: boolean;

    textValue: string = "";

    onLeftClick(e: Event) {
        alert("Left icon clicked!");
    }

    onRightClick(e: Event) {
        alert("Right icon clicked");
    }

    onChange(value: string | number) {}

    onBlur(event: FocusEvent) {}
    onFocus(event: FocusEvent) {}
    onKeyDown(event: KeyboardEvent) {}
    onKeyPress(event: KeyboardEvent) {}
    onKeyUp(event: KeyboardEvent) {}
}

describe("TextboxGroupComponent", () => {
    let component: TextGroupTestComponent;
    let fixture: ComponentFixture<TextGroupTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
            declarations: [TextboxGroupComponent, TextGroupTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextGroupTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".input-box-group"))).toBeTruthy();
    });

    it("Should pass down the id or random id to the TextBoxGroup component", () => {
        const id: string = "my-TextBoxGroup-id";
        component.id = id;

        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(`#${id}`)).length).toBeTruthy();
        component.label = "test label";

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("input")).attributes.id).toBeTruthy();
    });

    it("Should pass down extra optional attributes to the component", () => {
        component.pattern = "my-pattern";
        component.minLength = 2;
        component.maxLength = 4;
        component.required = true;

        fixture.detectChanges();
        const componentProps = fixture.debugElement.query(By.css("input")).attributes;

        expect(componentProps.pattern).toEqual("my-pattern");
        expect(componentProps.minlength).toEqual("2");
        expect(componentProps.maxlength).toEqual("4");
        expect(componentProps.required).toEqual("true");
    });

    it("Should trigger onChange callback when change to input element is detected", () => {
        const onChange: jasmine.Spy = spyOn(component, "onChange");

        const event = new MouseEvent("change", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        fixture.debugElement.query(By.css("input")).nativeElement.dispatchEvent(event);
        expect(onChange).toHaveBeenCalled();
    });

    describe("Testing optional events", () => {
        beforeAll(() => {
            component.name = "myTextboxgroup";
            component.textValue = "";
            component.onKeyDown = () => {};
            component.onKeyUp = () => {};
            component.onKeyPress = () => {};
            component.onFocus = () => {};
            component.onBlur = () => {};

            fixture.detectChanges();

            fixture.debugElement
                .query(By.css(".form-control"))
                .nativeElement.dispatchEvent(new KeyboardEvent("keyDown", { key: "a", code: "65" }));
            fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent("keyPress", { key: "a", code: "65" });
            fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent("focus", { key: "a", code: "65" });
            fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent("blur", { key: "a", code: "65" });
        });

        const onKeyDown: jasmine.Spy = spyOn(component, "onKeyDown").and.callThrough();
        const onKeyUp: jasmine.Spy = spyOn(component, "onKeyUp");
        const onKeyPress: jasmine.Spy = spyOn(component, "onKeyPress").and.callThrough();
        const onBlur: jasmine.Spy = spyOn(component, "onBlur").and.callThrough();
        const onFocus: jasmine.Spy = spyOn(component, "onFocus").and.callThrough();

        it("KeyDown", () => expect(onKeyDown).toHaveBeenCalled());
        it("KeyUp", () => expect(onKeyUp).toHaveBeenCalled());
        it("KeyPress", () => expect(onKeyPress).toHaveBeenCalled());
        it("Focus", () => expect(onFocus).toHaveBeenCalled());
        it("Blur", () => expect(onBlur).toHaveBeenCalled());
    });

    it("Should pass custom class", () => {
        const className: string = "myTextboxGroup";
        component.className = className;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.${className}`))).toBeTruthy();
    });

    it("Should render label", () => {
        const label: string = "my label";
        component.label = label;

        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css("label")).length).toBe(1);
        expect(fixture.debugElement.query(By.css("label")).nativeElement.textContent.trim()).toEqual(label);
    });

    it("Should show error and success indicators, hide error message when `showErrorMessage` props is set to `false`", () => {
        const error: string = "some error";
        component.error = error;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".input-group")).query(By.css("has-error"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(".alert-danger")).length).toBe(1);
        expect(fixture.debugElement.query(By.css(".alert-danger")).nativeElement.textContent.trim()).toEqual(error);

        component.error = error;
        component.showErrorMessage = false;
        component.success = true;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".input-group")).query(By.css(".has-error"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".input-group")).query(By.css(".success"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(".alert-danger")).length).toBe(0);

        component.error = error;
        component.showErrorMessage = false;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".input-group")).query(By.css(".has-error"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(".alert-danger")).length).toBe(0);
        component.error = error;
        component.showErrorMessage = true;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".input-group")).query(By.css(".has-error"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(".alert-danger")).length).toBe(1);

        component.error = error;
        component.showErrorMessage = null;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".input-group")).query(By.css(".has-error"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(".alert-danger")).length).toBe(1);
    });

    it("Testing optional properties", () => {
        component.name = "my-textbox-name";
        component.pattern = "my-pattern";
        component.minLength = 2;
        component.maxLength = 4;
        component.required = true;
        component.autoComplete = "on";
        component.type = "number";
        component.disabled = true;
        component.readOnly = true;
        component.placeholder = "my placeholder";

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("input")).attributes.name.trim()).toEqual("my-textbox-name");
        expect(fixture.debugElement.query(By.css("input")).attributes.pattern.trim()).toEqual("my-pattern");
        expect(fixture.debugElement.query(By.css("input")).attributes.minlength.trim()).toEqual("2");
        expect(fixture.debugElement.query(By.css("input")).attributes.maxlength.trim()).toEqual("4");
        expect(fixture.debugElement.query(By.css("input")).attributes.required.trim()).toEqual("true");
        expect(fixture.debugElement.query(By.css("input")).attributes.placeholder.trim()).toEqual("my placeholder");
        expect(fixture.debugElement.query(By.css("input")).attributes.disbaled.trim()).toEqual("true");
        expect(fixture.debugElement.query(By.css("input")).attributes.readOnly.trim()).toEqual("true");
    });

    describe("Test left append", () => {
        it("Should render text and title", () => {
            component.leftText = "leftText";
            component.leftTitle = "leftTitle";

            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".input-box-group-wrapper")).query(By.css(".input-group-prepend"))).toBeTruthy();
            expect(fixture.debugElement.queryAll(By.css(".input-group-text")).length).toBe(1);
            expect(fixture.debugElement.query(By.css(".input-group-text")).attributes.title).toEqual("leftTitle");
            expect(fixture.debugElement.query(By.css(".input-group-text")).nativeElement.textContent).toEqual("leftText");
        });

        it("Should render icon and trigger onLeftClick callback when clicked", () => {
            const onLeftClick: jasmine.Spy = spyOn(component, "onLeftClick");

            const testIcon: string = `<svg />`;
            component.leftIcon = testIcon;
            component.onRightClick = () => {};

            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".input-group-prepend")).query(By.css(".clickable"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".input-group-text")).query(By.css("svg")).nativeElement.innerHTML).toEqual(testIcon);
            fixture.debugElement.query(By.css(".input-group-prepend")).nativeElement.dispatchEvent(new Event("click"));

            fixture.whenStable().then(() => {
                expect(onLeftClick).toHaveBeenCalled();
            });
        });
    });

    describe("Test right append", () => {
        it("Should render text and title", () => {
            component.rightText = "rightText";
            component.rightTitle = "rightTitle";

            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".input-box-group-wrapper")).query(By.css(".input-group-append"))).toBeTruthy();
            expect(fixture.debugElement.queryAll(By.css(".input-group-text")).length).toBe(1);
            expect(fixture.debugElement.query(By.css(".input-group-text")).nativeElement.attributes.title).toEqual("rightTitle");
            expect(fixture.debugElement.query(By.css(".input-group-text")).nativeElement.textContent.trim()).toEqual("rightText");
        });

        it("Should render icon and trigger onRightClick callback when clicked", () => {
            const onRightClick = () => {};
            const testIcon: string = `<svg />`;
            component.rightIcon = testIcon;
            component.onRightClick = onRightClick;

            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".input-group-append")).query(By.css(".clickable"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".input-group-text")).query(By.css("svg")).nativeElement.innerHTML).toContain(
                testIcon
            );
            fixture.debugElement.query(By.css(".input-group-append")).nativeElement.dispatchEvent(new Event("click"));

            fixture.whenStable().then(() => {
                expect(onRightClick).toHaveBeenCalled();
            });
        });
    });
});
