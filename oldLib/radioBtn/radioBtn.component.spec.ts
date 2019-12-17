
import { RadioBtnComponent } from "./radioBtn.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement, Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    selector: "tac-radioBtn",
    template: `  <ac-radio-btn
    group="radioBtnGroup"
    label="Single radio first"
    radioValue="first"
    label={{label}}
    className={{className}}
    description={{description}}
    [(ngModel)]="radioNgValue">
</ac-radio-btn>`,
})
class CustomTestClass {
    @ViewChild(RadioBtnComponent) radioBtnComponent: RadioBtnComponent;
    radioNgValue: string;
    className: string;
    description: string;
    label: string;
    constructor() {
        this.radioNgValue = "second";
        this.className = "my-radio-class";
        this.label = "Male";
    }
}

describe("Component: RadioBtnComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [RadioBtnComponent, CustomTestClass],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(CustomTestClass);
            component = fixture.componentInstance;
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeDefined();
        expect(component).not.toBeNull();
    }));

    it("should render and receive the correct css class", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".my-radio-class"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should render the correct description text", async(() => {
        component.description = "My radio";
        fixture.detectChanges();
        const el: DebugElement = fixture.debugElement.query(By.css(".radio-description"));
        expect(el.nativeElement.innerHTML).toEqual("My radio");
    }));

    it("should call handleChange event when selection change", async(() => {
        component.description = "My radio";
        component.radioBtnComponent.handleChange = () => { };
        fixture.detectChanges();
        const onRadioCheckedMock = spyOn(component.radioBtnComponent, "handleChange");

        const radioClick = fixture.debugElement.nativeElement.querySelector("#Male");
        radioClick.click();
        fixture.whenStable().then(() => {
            expect(onRadioCheckedMock).toHaveBeenCalledTimes(1);
        });

    }));

    it("should be able to write and update value using the writevalue method", async(() => {
        fixture.detectChanges();

        expect(component.radioBtnComponent.value).toBeNull();

        component.radioBtnComponent.writeValue("new value");

        fixture.detectChanges();

        expect(component.radioBtnComponent.value).toEqual("new value");
    }));

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.radioBtnComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.radioBtnComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.radioBtnComponent, "writeValue").and.callThrough();

        component.radioBtnComponent.registerOnChange(onChangeEvent);

        component.radioBtnComponent.registerOnTouched(onChangeEvent);

        component.radioNgValue = "Third";

        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.radioNgValue).toEqual(component.radioBtnComponent.value);
        });
    }));

    it("getter and setter values of radioBtn should get be able to get and set value correctly", (done) => {
        fixture.detectChanges();
        let expectedValue;
        component.radioBtnComponent.value = expectedValue = "first";

        // do not call detectChanges here again, doing so will refresh the component

        expect(expectedValue).toEqual(component.radioBtnComponent.value);
        done();
    });

});
