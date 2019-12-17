import { TextBoxComponent } from "./textBox.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { Component, ViewChild, DebugElement } from "@angular/core";

@Component({
    selector: "tac-textBox",
    template: `  <ac-textbox name={{name}} label={{label}} className={{className}} type="text" placeHolder="placeholder label" [(ngModel)]="textValue"></ac-textbox>`,
})
class CustomTestClass {
    @ViewChild(TextBoxComponent) textBoxComponent: TextBoxComponent;
    className: string;
    textValue: string;
    name: string;
    label: string;

    constructor() {
        this.className = "text-box";
        this.textValue = "";
        this.name = "myTextBox";
        this.label = "First Name";
    }
}

describe("Component: TextBoxComponent", () => {
    let component: CustomTestClass;
    let fixture: ComponentFixture<CustomTestClass>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [TextBoxComponent, CustomTestClass],
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
        expect(fixture.debugElement.query(By.css(".text-box"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should render and set the correct label text", async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const el: DebugElement = fixture.debugElement.query(By.css("label"));
            expect(el.nativeElement.innerHTML).toEqual("First Name");
        });
    }));

    it("should be able to write and update value using the writevalue method", async(() => {
        fixture.detectChanges();

        expect(component.textBoxComponent.value).toBeNull();

        component.textBoxComponent.writeValue(1);

        fixture.detectChanges();

        expect(component.textBoxComponent.value).toEqual(1);
    }));

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.textBoxComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.textBoxComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.textBoxComponent, "writeValue").and.callThrough();

        component.textBoxComponent.registerOnChange(onChangeEvent);
        component.textBoxComponent.registerOnTouched(onChangeEvent);
        component.textValue = "my text box";

        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.textValue).toEqual(component.textBoxComponent.value);
        });
    }));

    it("getter and setter values of textBox should get be able to get and set value correctly", (done) => {
        fixture.detectChanges();
        let expectedValue;
        component.textBoxComponent.value = expectedValue = "first";

        // do not call detectChanges here again, doing so will refresh the component

        expect(expectedValue).toEqual(component.textBoxComponent.value);
        done();
    });

});
