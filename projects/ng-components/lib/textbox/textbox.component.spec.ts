import { EventEmitter } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TextboxComponent } from "./textbox.component";
import { TextboxSafeHtmlPipe } from "./textboxSafeHtml.pipe";
import { FormsModule } from "@angular/forms";

describe("TextboxComponent", () => {
    let component: TextboxComponent;
    let fixture: ComponentFixture<TextboxComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [TextboxComponent, TextboxSafeHtmlPipe],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TextboxComponent);
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
    });

    it("should create", () => {
        expect(component).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".input-box-group"))).toBeTruthy();
    });

    it("Should pass down the id or random id to the Textbox component", () => {
        const id: string = "my-Textbox-id";
        component.id = id;
        component.ngOnInit();
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
        expect(componentProps.required).toEqual("");
    });

    describe("Testing optional events", () => {
        let onKeyDown: jasmine.Spy;
        let onKeyPress: jasmine.Spy;
        let onFocus: jasmine.Spy;
        let onBlur: jasmine.Spy;
        let onKeyUp: jasmine.Spy;
        beforeAll(() => {
            component.name = "myTextbox";
            component.value = "";

            onKeyDown = spyOn(component.onKeyDown, "emit").and.callThrough();
            onKeyUp = spyOn(component.onKeyUp, "emit").and.callThrough();
            onKeyPress = spyOn(component.onKeyPress, "emit").and.callThrough();
            onFocus = spyOn(component.onFocus, "emit").and.callThrough();
            onBlur = spyOn(component.onBlur, "emit").and.callThrough();

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
        const className: string = "myTextbox";
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

        component.showErrorMessage = false;
        component.success = true;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".input-group.has-error")).query(By.css(".alert-danger"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".input-group.success"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(".alert-danger")).length).toBe(0);

        component.showErrorMessage = null;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".input-group.has-error"))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(".alert-danger")).length).toBe(0);
    });

    it("Testing optional properties", async () => {
        component.name = "my-textbox-name";
        component.pattern = "my-pattern";
        component.minLength = 2;
        component.maxLength = 4;
        component.required = true;
        component.autocomplete = "on";
        component.type = "number";
        component.disabled = true;
        component.readonly = true;
        component.placeholder = "my placeholder";

        fixture.detectChanges();
        await fixture.whenRenderingDone();
        expect(fixture.debugElement.query(By.css("input")).attributes.name.trim()).toEqual("my-textbox-name");
        expect(fixture.debugElement.query(By.css("input")).attributes.pattern.trim()).toEqual("my-pattern");
        expect(fixture.debugElement.query(By.css("input")).attributes.minlength.trim()).toEqual("2");
        expect(fixture.debugElement.query(By.css("input")).attributes.maxlength.trim()).toEqual("4");
        expect(fixture.debugElement.query(By.css("input")).attributes.required.trim()).toEqual("");
        expect(fixture.debugElement.query(By.css("input")).attributes.placeholder.trim()).toEqual("my placeholder");
        expect(fixture.debugElement.query(By.css("input")).attributes.disabled).toEqual("");
        expect(fixture.debugElement.query(By.css("input")).attributes.readonly).toEqual("");
    });

    describe("Test left append", () => {
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
            component.onLeftClick = new EventEmitter<MouseEvent>();
            component.onLeftClick.subscribe(() => {});
            const leftClickSpy: jasmine.Spy = spyOn(component.onLeftClick, "emit").and.callThrough();

            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".input-group-prepend.clickable"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".input-group-text")).nativeElement.innerHTML).toEqual(testIcon);
            fixture.debugElement.query(By.css(".input-group-prepend")).nativeElement.dispatchEvent(new Event("click"));

            expect(leftClickSpy).toHaveBeenCalled();
        });
    });

    describe("Test right append", () => {
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
            component.onRightClick = new EventEmitter<MouseEvent>();
            component.onRightClick.subscribe(() => {});
            component.rightText = null;
            const rightClickSpy: jasmine.Spy = spyOn(component.onRightClick, "emit").and.callThrough();

            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css(".input-group-append.clickable"))).toBeTruthy();
            expect(fixture.debugElement.query(By.css(".input-group-text")).nativeElement.innerHTML).toContain(testIcon);
            fixture.debugElement.query(By.css(".input-group-append")).nativeElement.dispatchEvent(new Event("click"));

            expect(rightClickSpy).toHaveBeenCalled();
        });
    });
});
