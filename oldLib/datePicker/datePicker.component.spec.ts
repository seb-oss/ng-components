
import { DatePickerComponent } from "./datePicker.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DebugElement, Component, ViewChild } from "@angular/core";
import { NgbModule, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { SafeHtmlPipe } from "./datePicker.pipe";

@Component({
    selector: "tac-datePicker",
    template: ` <ac-date-picker
        name="datepickerName"
        placeHolder="yyyy-mm-dd"
        [minDate]="startDate"
        [maxDate]="endDate"
        className="{{className}}"
        label="{{label}}"
        [(ngModel)]="dateValue">
    </ac-date-picker>`,
})
class CustomTestClass {
    @ViewChild(DatePickerComponent) datePickerComponent: DatePickerComponent;
    dateValue: NgbDateStruct;
    startDate: NgbDateStruct;
    endDate: NgbDateStruct;
    name: string;
    label: string;
    className: string;

    constructor() {
        this.dateValue = {
            year: moment().year(),
            month: moment().month(),
            day: moment().date()
        };
        this.startDate = { year: 1960, month: 1, day: 1 };
        this.endDate = { year: 2019, month: 1, day: 1 };

        this.name = "my-datepicker";
        this.label = "My datepicker";
        this.className = "my-datePicker";
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
        }).compileComponents().then(() => {
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
        expect(fixture.debugElement.query(By.css(".my-datePicker"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should render the correct label text", async(() => {
        fixture.detectChanges();
        const el: DebugElement = fixture.debugElement.query(By.css("label"));
        expect(el.nativeElement.innerHTML).toEqual("My datepicker");
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

        component.dateValue = {
            year: moment().subtract(1, "years").year(),
            month: moment().subtract(1, "months").month(),
            day: moment().subtract(1, "days").date()
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

    it("getter and setter values of datePicker should get be able to get and set value correctly", (done) => {
        fixture.detectChanges();
        let expectedValue;
        component.datePickerComponent.value = expectedValue = {
            year: moment().subtract(1, "years").year(),
            month: moment().subtract(1, "months").month(),
            day: moment().subtract(1, "days").date()
        };

        // do not call detectChanges here again, doing so will refresh the component

        expect(expectedValue).toEqual(component.datePickerComponent.value);
        done();
    });

});
