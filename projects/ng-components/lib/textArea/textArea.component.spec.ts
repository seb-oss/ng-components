import { Component, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TextAreaComponent } from "./textarea.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "test-sebng-textarea",
    template: `
        <sebng-textarea
            [className]="className"
            [cols]="cols"
            [disabled]="disabled"
            [error]="error"
            [focus]="focus"
            [id]="id"
            [label]="label"
            [max]="max"
            [name]="name"
            [placeholder]="placeholder"
            [readonly]="readonly"
            [resizable]="resizable"
            [rows]="rows"
            (onBlur)="onBlur($event)"
            (onChange)="onChange($event)"
            (onFocus)="onFocus($event)"
            (onKeyDown)="onKeyDown($event)"
            (onKeyPress)="onKeyPress($event)"
            (onKeyUp)="onKeyUp($event)"
        ></sebng-textarea>
    `,
})
class TextAreaTestComponent {
    className?: string;
    cols?: number;
    disabled?: boolean;
    error?: string;
    focus?: boolean;
    id?: string;
    label?: string;
    max?: number;
    name: string;
    placeholder?: string;
    readonly?: boolean;
    resizable?: boolean;
    rows?: number;
    value: string;

    onBlur() {}
    onChange() {}
    onFocus() {}
    onKeyDown() {}
    onKeyPress() {}
    onKeyUp() {}
}

describe("TextAreaComponent", () => {
    let component: TextAreaTestComponent;
    let fixture: ComponentFixture<TextAreaTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [TextAreaTestComponent, TextAreaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextAreaTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("Should pass custom class", () => {
        const className: string = "myTextareaClass";
        component.className = className;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.${className}`))).toBeTruthy();
    });

    it("Should pass id", () => {
        const id: string = "myTextareaId";
        component.id = id;

        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(`#${id}`)).length).toBeTruthy();
        component.label = "test label";

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("textarea")).nativeElement.attributes.id).toBeTruthy();
    });

    it("Should render label and error", () => {
        const error: string = "some error";
        const label: string = "some label";
        component.error = error;
        component.label = label;

        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css("label")).length).toBe(1);
        expect(fixture.debugElement.query(By.css("label")).nativeElement.textContent).toContain(label);
        expect(fixture.debugElement.queryAll(By.css(".alert")).length).toBe(1);
        expect(fixture.debugElement.query(By.css(".input-field.has-error"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".alert-danger")).nativeElement.textContent).toContain(error);
    });

    it("Should render textarea with resizable option", () => {
        expect(fixture.debugElement.query(By.css("textarea.resizable"))).toBeTruthy();
        component.resizable = true;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("textarea.resizable"))).toBeTruthy();
        component.resizable = false;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("textarea.resiable"))).toBeFalsy();
    });
    describe("Testing optional events", () => {
        let onKeyDown: jasmine.Spy;
        let onKeyPress: jasmine.Spy;
        let onFocus: jasmine.Spy;
        let onBlur: jasmine.Spy;
        let onKeyUp: jasmine.Spy;
        beforeAll(() => {
            component.name = "myTextarea";
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
});
