import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TextareaComponent } from "./textarea.component";
import { FormsModule } from "@angular/forms";
import { EventEmitter } from "@angular/core";

describe("TextareaComponent", () => {
    let component: TextareaComponent;
    let fixture: ComponentFixture<TextareaComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [TextareaComponent],
            }).compileComponents();
            fixture = TestBed.createComponent(TextareaComponent);
            component = fixture.componentInstance;
            component.onKeyDown = new EventEmitter<KeyboardEvent>();
            component.onKeyPress = new EventEmitter<KeyboardEvent>();
            component.onKeyUp = new EventEmitter<KeyboardEvent>();
            component.onFocus = new EventEmitter<MouseEvent>();
            component.onBlur = new EventEmitter<MouseEvent>();

            component.onKeyDown.subscribe(() => {});
            component.onKeyPress.subscribe(() => {});
            component.onKeyUp.subscribe(() => {});
            component.onFocus.subscribe(() => {});
            component.onBlur.subscribe(() => {});
            fixture.detectChanges();
        })
    );

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

    it("Should emit optinal events", () => {
        const onKeyDown: jasmine.Spy = spyOn(component.onKeyDown, "emit").and.callThrough();
        const onKeyPress: jasmine.Spy = spyOn(component.onKeyUp, "emit").and.callThrough();
        const onFocus: jasmine.Spy = spyOn(component.onKeyPress, "emit").and.callThrough();
        const onBlur: jasmine.Spy = spyOn(component.onFocus, "emit").and.callThrough();
        const onKeyUp: jasmine.Spy = spyOn(component.onBlur, "emit").and.callThrough();

        component.name = "myTextarea";
        fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent(new KeyboardEvent("keydown"));

        fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent(new KeyboardEvent("keyup"));
        fixture.debugElement
            .query(By.css(".form-control"))
            .nativeElement.dispatchEvent(new KeyboardEvent("keypress", { key: "a", code: "65" }));
        fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent(new MouseEvent("focus"));
        fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent(new MouseEvent("blur"));

        fixture.detectChanges();
        expect(onKeyDown).toHaveBeenCalled();
        expect(onKeyUp).toHaveBeenCalled();
        expect(onKeyPress).toHaveBeenCalled();
        expect(onFocus).toHaveBeenCalled();
        expect(onBlur).toHaveBeenCalled();
    });
});
