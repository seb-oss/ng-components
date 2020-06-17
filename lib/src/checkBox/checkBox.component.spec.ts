import { CheckBoxComponent, CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR } from "./checkBox.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { DebugElement, Component, ViewChild, TemplateRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    template: `<sebng-checkbox [label]="label">
        <ng-template #label><div class="custom-label">Custom Checkbox label</div></ng-template>
    </sebng-checkbox>`,
})
class TestComponent {
    label: string | TemplateRef<HTMLElement>;
}

describe("Component: CheckBoxComponent", () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [CheckBoxComponent, TestComponent],
            providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(TestComponent);
                component = fixture.componentInstance;
            });
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have the expected strimg label", () => {
        fixture.detectChanges();
        const label: DebugElement = fixture.debugElement.query(By.css("label"));
        expect(label).toBeTruthy();
        expect(label.nativeElement.innerHTML).toContain("Custom Checkbox label");
    });

    it("should have the expected custom label", () => {
        component.label = "checkbox string label" as string;
        fixture.detectChanges();
        fixture.whenStable();
        const label: DebugElement = fixture.debugElement.query(By.css("label"));
        expect(label).toBeTruthy();
        console.log(label.nativeElement);
        expect(label.nativeElement.innerHTML).toContain("checkbox string label");
    });

    // it("should render and set the correct label text", async(() => {
    //     fixture.detectChanges();
    //     const el: DebugElement = fixture.debugElement.query(By.css("label"));
    //     expect(el.nativeElement.innerHTML).toEqual("Checkbox Label");
    // }));

    // it("should render and fire change event when checkbox is clicked", async(() => {
    //     component.checkBoxComponent.changeAction = () => {};
    //     fixture.detectChanges();
    //     const onChangeMock = spyOn(component.checkBoxComponent, "changeAction");
    //     const chkBox = fixture.debugElement.nativeElement.querySelector("input#checkboxId1");
    //     chkBox.click();
    //     fixture.whenStable().then(() => {
    //         expect(onChangeMock).toHaveBeenCalled();
    //     });
    // }));

    // it("should be able to write and update value using the writevalue method", async(() => {
    //     fixture.detectChanges();
    //     expect(component.checkBoxComponent.value).toBeNull();
    //     component.checkBoxComponent.writeValue("new value");
    //     fixture.detectChanges();
    //     expect(component.checkBoxComponent.value).toEqual("new value");
    // }));

    // it("should call touch and change events when the value is set", fakeAsync(() => {
    //     fixture.detectChanges();
    //     const onChangeEvent = (change: any) => true;
    //     const registerOnChangeMock = spyOn(component.checkBoxComponent, "registerOnChange").and.callThrough();
    //     const registerOnTouchedMock = spyOn(component.checkBoxComponent, "registerOnTouched").and.callThrough();
    //     const onMockWriteValue = spyOn(component.checkBoxComponent, "writeValue").and.callThrough();

    //     component.checkBoxComponent.registerOnChange(onChangeEvent);

    //     component.checkBoxComponent.registerOnTouched(onChangeEvent);

    //     component.checkValue = !component.checkValue;
    //     fixture.detectChanges();
    //     tick();
    //     fixture.whenStable().then(() => {
    //         expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
    //         expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
    //         expect(onMockWriteValue).toHaveBeenCalled();
    //         expect(component.checkValue).toEqual(component.checkBoxComponent.value);
    //     });
    // }));
});
