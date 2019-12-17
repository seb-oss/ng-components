
import { RadioGroupComponent, RadioGroupItem } from "./radioGroup.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement, ViewChild, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    selector: "tac-radioBtnGroup",
    template: `   <ac-radio-group
    name="radioGroupName"
    [list]="radioList"
    label={{label}}
    className={{className}}
    [(ngModel)]="radioListSelected"
></ac-radio-group>`,
})
class CustomTestClass {
    @ViewChild(RadioGroupComponent) radioGroupComponent: RadioGroupComponent;
    radioList: Array<RadioGroupItem>;
    className: string;
    label: string;
    radioListSelected: number;

    constructor() {
        this.className = "my-radio-class";
        this.label = "Male";

        this.radioList = [
            {
                value: "male",
                group: "Male",
                label: "Male",
                disabled: false,
                description: "Male gender"
            },
            {
                value: "female",
                group: "Female",
                label: "Female",
                disabled: true,
                description: "Female gender"
            }
        ];
    }
}

describe("Component: RadioGroupComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [RadioGroupComponent, CustomTestClass],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(CustomTestClass);
            component = fixture.componentInstance;
        });
    }));

    it("should render and be defined", async(() => {
        component.label = "Gender";
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should render and receive the correct css class", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".my-radio-class"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should render the correct description text", async(() => {
        component.label = "Gender";
        fixture.detectChanges();
        const el: DebugElement = fixture.debugElement.queryAll(By.css(".radio-item > input"))[1];
        expect(el.nativeElement.value).toEqual("female");
    }));

    it("should call handleChange event on radio button clicked", async(() => {
        component.label = "Gender";
        component.className = "my-radio-class";
        component.radioGroupComponent.handleChange = () => { };
        fixture.detectChanges();
        const onRadioCheckedMock = spyOn(component.radioGroupComponent, "handleChange");
        const radioClick = fixture.debugElement.query(By.css(".input-field .radio-item > input")).nativeElement;
        radioClick.click();
        fixture.whenStable().then(() => {
            expect(onRadioCheckedMock).toHaveBeenCalledTimes(1);
        });

    }));

    it("should be able to write and update value using the writevalue method", async(() => {
        fixture.detectChanges();
        expect(component.radioGroupComponent.value).toBeNull();
        component.radioGroupComponent.writeValue(1);
        fixture.detectChanges();
        expect(component.radioGroupComponent.value).toEqual(1);
    }));

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.radioGroupComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.radioGroupComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.radioGroupComponent, "writeValue").and.callThrough();

        component.radioGroupComponent.registerOnChange(onChangeEvent);
        component.radioGroupComponent.registerOnTouched(onChangeEvent);
        component.radioListSelected = 0;

        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.radioListSelected).toEqual(component.radioGroupComponent.value);
        });
    }));

    it("getter and setter values of radioBtnGroup should get be able to get and set value correctly", () => {
        fixture.detectChanges();
        let expectedValue;
        component.radioGroupComponent.value = expectedValue = 1;

        // do not call detectChanges here again, doing so will refresh the component
        expect(expectedValue).toEqual(component.radioGroupComponent.value);
    });

    it("handleChange function should be able to set its parameter as the new value", async(() => {
        fixture.detectChanges();
        expect(component.radioGroupComponent.value).toBeFalsy();
        component.radioGroupComponent.handleChange(1);
        expect(component.radioGroupComponent.value).toEqual(1);
    }));

});
