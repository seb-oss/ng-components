
import { ToggleComponent } from "./toggle.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";

@Component({
    selector: "tac-textBox",
    template: `<ac-toggle name="myToggle" [(ngModel)]="toggleValue" label={{label}} className={{className}}></ac-toggle>`,
})
class CustomTestClass {
    @ViewChild(ToggleComponent) toggleComponent: ToggleComponent;
    className: string;
    toggleValue: boolean;
    name: string;
    label: string;

    constructor() {
        this.className = "toggle-bar";
        this.toggleValue = false;
        this.label = "toggle-label";
        this.name = "my-toggle";
    }
}

describe("Component: ToggleComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [ToggleComponent, CustomTestClass],
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

    it("should display the correct label text", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".toggle-label")).nativeElement.innerHTML).toEqual("toggle-label");
    }));

    it("should render and receive the correct css class parameter", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".toggle-bar"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should be able to write and update value using the writevalue method", async(() => {
        fixture.detectChanges();

        expect(component.toggleComponent.value).toBeNull();

        component.toggleComponent.writeValue(true);

        fixture.detectChanges();

        expect(component.toggleComponent.value).toEqual(true);
    }));

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.toggleComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.toggleComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.toggleComponent, "writeValue").and.callThrough();

        component.toggleComponent.registerOnChange(onChangeEvent);

        component.toggleComponent.registerOnTouched(onChangeEvent);

        component.toggleValue = true;

        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.toggleValue).toEqual(component.toggleComponent.value);
        });
    }));

    it("getter and setter values of toggle should get be able to get and set value correctly", (done) => {
        fixture.detectChanges();
        let expectedValue;
        component.toggleComponent.value = expectedValue = true;

        // do not call detectChanges here again, doing so will refresh the component

        expect(expectedValue).toEqual(component.toggleComponent.value);
        done();
    });

});
