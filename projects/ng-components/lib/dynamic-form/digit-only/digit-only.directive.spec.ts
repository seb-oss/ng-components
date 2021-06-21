import { Component, DebugElement, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { TextboxModule } from "@sebgroup/ng-components";
import { DigitOnlyDirective } from "./digit-only.directive";
import { registerLocaleData } from "@angular/common";
import localeSe from "@angular/common/locales/se";
import { LOCALE_ID } from "@angular/core";

registerLocaleData(localeSe);

@Component({
    template: `<form [formGroup]="formGroup">
        <sebng-textbox [formControlName]="formControlName" [form]="formGroup" type="text" digitsOnly></sebng-textbox>
    </form>`,
})
class TestComponent {
    @Input() formControlName: string = "textbox";
    @Input() form: FormGroup;
    formGroup: FormGroup;
}

describe("DigitOnlyDirective", () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TextboxModule, FormsModule, ReactiveFormsModule],
            declarations: [TestComponent, DigitOnlyDirective],
            providers: [{ provide: LOCALE_ID, useValue: "se" }],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        component.form = new FormGroup({});
        component.formGroup = new FormGroup({});
        component.formGroup.addControl("textbox", new FormControl());
        fixture.detectChanges();
    });

    it("should create an instance", () => {
        expect(component).toBeTruthy();
    });

    it("should remove non numeric characters from value", () => {
        const textbox: DebugElement = fixture.debugElement.query(By.directive(DigitOnlyDirective));
        const input: HTMLInputElement = textbox.nativeElement.querySelector("input");
        const event = new Event("input", { bubbles: true });

        const testValues: Array<Array<string>> = [
            ["", "", ""],
            ["1", "1", "1"],
            ["1aa", "1", "1"],
            ["10 000", "10 000", "10000"],
            ["1000.1", "1 000", "1000"],
            ["1000,1", "1 000", "1000"],
            ["1000,1.1", "1 000", "1000"],
            ["hello", "", ""],
            ["100 000", "100 000", "100000"],
            ["1000 kr", "1 000", "1000"],
            ["0", "0", "0"],
            ["0000", "0", "0"],
            ["00123", "123", "123"],
        ];

        testValues.forEach((values: Array<string>) => {
            input.value = values[0];
            input.dispatchEvent(event);
            fixture.detectChanges();
            expect(input.value).toBe(values[1]);
            expect(component.formGroup.get(component.formControlName).value).toBe(values[2]);
        });
    });
});
