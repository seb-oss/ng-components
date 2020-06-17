import { CheckBoxComponent, CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR } from "./checkBox.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { DebugElement, Component, ViewChild, TemplateRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    template: ` <ng-template #label><div class="custom-label">Custom label</div></ng-template>
        <ng-template #description><div class="custom-description">Custom description</div></ng-template>
        <ng-template #error><div class="custom-error">Custom error</div></ng-template>
        <sebng-checkbox
            [id]="id"
            [label]="label"
            [description]="description"
            [error]="error"
            [disabled]="disabled"
            [(ngModel)]="selectedValue"
            (onChange)="onChange($event)"
        ></sebng-checkbox>`,
})
class CheckboxTestComponent {
    label: string | TemplateRef<HTMLElement>;
    @ViewChild(CheckBoxComponent) checkBoxComponent: CheckBoxComponent;
    selectedValue: boolean;
    disabled?: boolean = false;
    id?: string;

    onChange(): void {}
}

describe("Component: CheckBoxComponent", () => {
    let component: CheckboxTestComponent;
    let fixture: ComponentFixture<CheckboxTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [CheckBoxComponent, CheckboxTestComponent],
            providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(CheckboxTestComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
            });
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("Should have a random id when property is not specified", () => {
        const input: DebugElement = fixture.debugElement.query(By.css("input"));
        expect(input.nativeElement.getAttribute("id")).toBeTruthy();
    });

    it("Should have a custom id when it's specified", () => {
        const id: string = "checkboxId";
        component.id = id;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`#${id}`))).toBeTruthy();
    });

    it("should have the expected custom label", () => {
        const label: DebugElement = fixture.debugElement.query(By.css(".custom-label"));
        expect(label).toBeTruthy();
        expect(label.nativeElement.innerHTML).toContain("Custom label");
    });

    it("should have the expected custom description", () => {
        const label: DebugElement = fixture.debugElement.query(By.css(".custom-description"));
        expect(label).toBeTruthy();
        expect(label.nativeElement.innerHTML).toContain("Custom description");
    });

    it("should have the expected error", () => {
        const label: DebugElement = fixture.debugElement.query(By.css(".custom-error"));
        expect(label).toBeTruthy();
        expect(label.nativeElement.innerHTML).toContain("Custom error");
    });

    it("should have the expected error", () => {
        const label: DebugElement = fixture.debugElement.query(By.css(".custom-error"));
        expect(label).toBeTruthy();
        expect(label.nativeElement.innerHTML).toContain("Custom error");
    });

    it("Should disable the element", async () => {
        component.disabled = true;
        fixture.detectChanges();
        const label: DebugElement = fixture.debugElement.query(By.css(".disabled"));
        expect(label).toBeTruthy();
    });

    it("should call writeValue when ngmodel changes", async () => {
        const ngModelChange = spyOn(component.checkBoxComponent, "writeValue");
        component.selectedValue = true;
        fixture.detectChanges();
        await fixture.whenStable().then(() => expect(ngModelChange).toHaveBeenCalled());
    });

    it("should call onChange when checkbox is clicked", async () => {
        let onChange: jasmine.Spy;
        onChange = spyOn(component, "onChange");
        fixture.detectChanges();
        fixture.debugElement.query(By.css("label")).nativeElement.dispatchEvent(new MouseEvent("click"));
        await fixture.whenStable().then(() => expect(onChange).toHaveBeenCalled());
    });
});
