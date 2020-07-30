import { Component, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TextboxGroupComponent } from "./textboxGroup.component";
import { TextboxGroupSafeHtmlPipe } from "./textboxGroup.pipe";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "test-sebng-textboxgroup",
    template: `
        <sebng-textboxgroup
            [name]="name"
            [placeholder]="placeholder"
            [rightIcon]="rightIcon"
            (onLeftClick)="onLeftClick($event)"
            (onChange)="onChange(value)"
            (onRightClick)="onRightClick($event)"
            [leftTitle]="leftTitle"
            [rightTitle]="rightTitle"
            [error]="error"
            [(ngModel)]="textValue"
            [className]="className"
            [disabled]="disabled"
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
            (onKeyDown)="onKeyDown($event)"
            (onKeyPress)="onKeyPress($event)"
            (onBlur)="onBlur($events)"
            (onFocus)="onFocus($events)"
            (onKeyUp)="onKeyUp($events)"
            [showErrorMessage]="showErrorMessage"
            [readOnly]="readOnly"
            [success]="success"
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
            declarations: [TextboxGroupComponent, TextGroupTestComponent, TextboxGroupSafeHtmlPipe],
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

    describe("Testing optional events", () => {
        let onKeyDown: jasmine.Spy;
        let onKeyPress: jasmine.Spy;
        let onFocus: jasmine.Spy;
        let onBlur: jasmine.Spy;
        let onKeyUp: jasmine.Spy;
        beforeAll(() => {
            component.name = "myTextboxgroup";
            component.textValue = "";
            onKeyDown = spyOn(component, "onKeyDown");

            onKeyUp = spyOn(component, "onKeyUp");
            onKeyPress = spyOn(component, "onKeyPress");
            onFocus = spyOn(component, "onFocus");
            onBlur = spyOn(component, "onBlur");

            fixture.detectChanges();

            fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent(new KeyboardEvent("keydown"));

            fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent(new KeyboardEvent("keyup"));
            fixture.debugElement
                .query(By.css(".form-control"))
                .nativeElement.dispatchEvent(new KeyboardEvent("keypress", { key: "a", code: "65" }));
            fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent(new MouseEvent("focus"));
            fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent(new MouseEvent("blur"));
        });

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
        component.showErrorMessage = true;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".input-group.has-error"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(".alert-danger")).length).toBe(1);
        expect(fixture.debugElement.query(By.css(".alert-danger")).nativeElement.textContent.trim()).toEqual(error);

        component.error = error;
        component.showErrorMessage = false;
        component.success = true;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".input-group.has-error")).query(By.css(".alert-danger"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".input-group.success"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(".alert-danger")).length).toBe(0);

        component.error = error;
        component.showErrorMessage = false;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".input-group.has-error"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(".alert-danger")).length).toBe(0);
        component.error = error;
        component.showErrorMessage = true;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".input-group.has-error"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(".alert-danger")).length).toBe(1);

        component.error = error;
        component.showErrorMessage = null;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".input-group.has-error"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(".alert-danger")).length).toBe(0);
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
        expect(fixture.debugElement.query(By.css("input")).attributes.disabled).toEqual("true");
        expect(fixture.debugElement.query(By.css("input")).attributes.readonly).toEqual("true");
    });

    describe("Test left append", () => {
        let onLeftClick: jasmine.Spy;
        beforeEach(() => {
            onLeftClick = spyOn(component, "onLeftClick");
        });
        it("Should render text and title", () => {
            component.leftText = "leftText";
            component.leftTitle = "leftTitle";

            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".input-box-group-wrapper")).query(By.css(".input-group-prepend"))).toBeTruthy();
            expect(fixture.debugElement.queryAll(By.css(".input-group-text")).length).toBe(1);
            expect(fixture.debugElement.query(By.css(".input-group-text")).attributes.title).toEqual("leftTitle");
            expect(fixture.debugElement.query(By.css(".input-group-text")).nativeElement.textContent).toContain("leftText");
        });

        it("Should render icon and trigger onLeftClick callback when clicked", () => {
            const testIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170"></svg>`;
            component.leftIcon = testIcon;
            component.rightText = null;

            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".input-group-prepend.clickable"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".input-group-text")).nativeElement.innerHTML).toEqual(testIcon);
            fixture.debugElement.query(By.css(".input-group-prepend")).nativeElement.dispatchEvent(new Event("click"));

            expect(onLeftClick).toHaveBeenCalled();
        });
    });

    describe("Test right append", () => {
        let onRightClick: jasmine.Spy;
        beforeEach(() => {
            onRightClick = spyOn(component, "onRightClick");
        });
        it("Should render text and title", () => {
            component.rightText = "rightText";
            component.rightTitle = "rightTitle";

            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".input-box-group-wrapper")).query(By.css(".input-group-append"))).toBeTruthy();
            expect(fixture.debugElement.queryAll(By.css(".input-group-text")).length).toBe(1);
            expect(fixture.debugElement.query(By.css(".input-group-text")).nativeElement.attributes.title.textContent).toEqual(
                "rightTitle"
            );
            expect(fixture.debugElement.query(By.css(".input-group-text")).nativeElement.textContent.trim()).toEqual("rightText");
        });

        it("Should render icon and trigger onRightClick callback when clicked", () => {
            const testIcon: string = `<svg></svg>`;
            component.rightIcon = testIcon;
            component.onLeftClick = null;
            component.rightText = null;

            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css(".input-group-append.clickable"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".input-group-text")).nativeElement.innerHTML).toContain(testIcon);
            fixture.debugElement.query(By.css(".input-group-append")).nativeElement.dispatchEvent(new Event("click"));

            expect(onRightClick).toHaveBeenCalled();
        });
    });
});
