import { TextAreaComponent } from "./textArea.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, ViewChild, DebugElement } from "@angular/core";

@Component({
    selector: "tac-radioBtnGroup",
    template: ` <ac-textarea
    name="textareaName"
    label={{label}}
    className={{className}}
    name={{name}}
    placeHolder="placeholder label"
    [(ngModel)]="textValue">
</ac-textarea>`,
})
class CustomTestClass {
    @ViewChild(TextAreaComponent) textAreaComponent: TextAreaComponent;
    className: string;
    textValue: string;
    name: string;
    label: string;

    constructor() {
        this.className = "text-area";
        this.textValue = "";
        this.name = "myTextArea";
        this.label = "Address";
    }
}

describe("Component: TextAreaComponent", () => {
    let component: CustomTestClass;
    let fixture: ComponentFixture<CustomTestClass>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [TextAreaComponent, CustomTestClass],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(CustomTestClass);
            component = fixture.componentInstance;
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("render and have the expected class name", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".text-area"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should render and set the correct label text", async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const el: DebugElement = fixture.debugElement.query(By.css("label"));
            expect(el.nativeElement.innerHTML).toEqual("Address");
        });
    }));

    it("should be able to write and update value using the writevalue method", async(() => {
        fixture.detectChanges();
        expect(component.textAreaComponent.value).toBeNull();
        component.textAreaComponent.writeValue(1);
        fixture.detectChanges();
        expect(component.textAreaComponent.value).toEqual(1);
    }));

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.textAreaComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.textAreaComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.textAreaComponent, "writeValue").and.callThrough();

        component.textAreaComponent.registerOnChange(onChangeEvent);
        component.textAreaComponent.registerOnTouched(onChangeEvent);
        component.textValue = "my text area";

        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.textValue).toEqual(component.textAreaComponent.value);
        });
    }));

    it("getter and setter values of textArea should get be able to get and set value correctly", (done) => {
        fixture.detectChanges();
        let expectedValue;
        component.textAreaComponent.value = expectedValue = "first";

        // do not call detectChanges here again, doing so will refresh the component

        expect(expectedValue).toEqual(component.textAreaComponent.value);
        done();
    });

});
