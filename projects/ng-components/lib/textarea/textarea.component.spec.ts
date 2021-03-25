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
    describe("Testing optional events", () => {
        let onKeyDown: jasmine.Spy;
        let onKeyPress: jasmine.Spy;
        let onFocus: jasmine.Spy;
        let onBlur: jasmine.Spy;
        let onKeyUp: jasmine.Spy;
        beforeAll(() => {
            component.name = "myTextarea";
            onKeyDown = spyOn(component.onKeyDown, "emit");

            onKeyUp = spyOn(component.onKeyUp, "emit");
            onKeyPress = spyOn(component.onKeyPress, "emit");
            onFocus = spyOn(component.onFocus, "emit");
            onBlur = spyOn(component.onBlur, "emit");

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
