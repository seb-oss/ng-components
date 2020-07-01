import { DatePickerComponent } from "./date-picker.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { NgbModule, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SafeHtmlPipe } from "./safe-html.pipe";

@Component({
    selector: "tac-datePicker",
    template: ` <sebng-date-picker
        [id]="id"
        [placeholder]="placeholder"
        [min]="startDate"
        [max]="endDate"
        [className]="className"
        [(ngModel)]="dateValue"
    >
    </sebng-date-picker>`,
})
class CustomTestClass {
    @ViewChild(DatePickerComponent) datePickerComponent: DatePickerComponent;
    dateValue: NgbDateStruct | string;
    startDate: NgbDateStruct;
    endDate: NgbDateStruct;
    id: string;
    placeholder: string;
    className: string;

    constructor() {
        const today: Date = new Date();
        this.dateValue = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate(),
        };
        this.startDate = { ...this.dateValue, month: 1, day: 1 };
        this.endDate = { ...this.dateValue, month: 12, day: 31 };

        this.id = "my-datepicker";
        this.className = "my-class";
        this.placeholder = "my-placeholder";
    }
}

describe("Component: DatePickerComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgbModule, FormsModule, CommonModule],
            declarations: [DatePickerComponent, CustomTestClass, SafeHtmlPipe],
            providers: [],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(CustomTestClass);
                component = fixture.componentInstance;
            });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should render and receive the correct class parameter", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".my-class"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should be able to write and update value using the writevalue method", async(() => {
        fixture.detectChanges();

        expect(component.datePickerComponent.value).toBeNull();

        component.datePickerComponent.writeValue("new value");

        fixture.detectChanges();

        expect(component.datePickerComponent.value).toEqual("new value");
    }));

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.datePickerComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.datePickerComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.datePickerComponent, "writeValue").and.callThrough();

        component.datePickerComponent.registerOnChange(onChangeEvent);

        component.datePickerComponent.registerOnTouched(onChangeEvent);

        const date: NgbDateStruct = { ...(component.dateValue as NgbDateStruct) };
        component.dateValue = {
            year: date.year - 1,
            month: date.month - 1,
            day: date.day - 1,
        };

        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.dateValue).toEqual(component.datePickerComponent.value);
        });
    }));

    it("getter and setter values of datePicker should get be able to get and set value correctly", done => {
        fixture.detectChanges();
        const date: NgbDateStruct = { ...(component.dateValue as NgbDateStruct) };
        let expectedValue: NgbDateStruct;
        component.datePickerComponent.value = expectedValue = {
            year: date.year - 1,
            month: date.month - 1,
            day: date.day - 1,
        };

        // do not call detectChanges here again, doing so will refresh the component

        expect(expectedValue).toEqual(component.datePickerComponent.value);
        done();
    });
});
