import { TextBoxGroupComponent } from "./textBoxGroup.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, ViewChild, DebugElement } from "@angular/core";
import { SafeHtmlPipe } from "./textBoxGroup.pipe";

@Component({
    selector: "tac-textBox",
    template: `<ac-textbox-group name={{name}} type="text" className={{className}} label={{label}} placeHolder="placeholder label"
                   rightText={{rightText}} [(ngModel)]="textValue"></ac-textbox-group>`,
})
class CustomTestClass {
    @ViewChild(TextBoxGroupComponent) textBoxGroupComponent: TextBoxGroupComponent;
    className: string;
    textValue: string;
    name: string;
    label: string;
    rightText: string;
    onRightClick?: (e: any) => void;
    onLeftClick?: (e: any) => void;

    constructor() {
        this.className = "text-box";
        this.textValue = "";
        this.name = "textBoxGroup";
        this.label = "First Name";
        this.rightText = "$";
    }
}

describe("Component: TextBoxGroupComponent", () => {
    let fixture: ComponentFixture<CustomTestClass>;
    let component: CustomTestClass;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [TextBoxGroupComponent, CustomTestClass, SafeHtmlPipe],
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

    it("should not display rightText and left texts unless one is provided", async(() => {
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css("input-group-text")).length).toEqual(0);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(fixture.debugElement.query(By.css(".input-group-text"))).toBeDefined();
            expect(fixture.debugElement.query(By.css(".input-group-text")).nativeElement.innerHTML).toEqual("$");
        });
    }));

    it("should be able to write and update value using the writevalue method", async(() => {
        fixture.detectChanges();

        expect(component.textBoxGroupComponent.value).toBeNull();

        component.textBoxGroupComponent.writeValue("Male");

        fixture.detectChanges();

        expect(component.textBoxGroupComponent.value).toEqual("Male");
    }));

    it("should call touch and change events when the value is set", fakeAsync(() => {
        fixture.detectChanges();
        const onChangeEvent = (change: any) => true;
        const registerOnChangeMock = spyOn(component.textBoxGroupComponent, "registerOnChange").and.callThrough();
        const registerOnTouchedMock = spyOn(component.textBoxGroupComponent, "registerOnTouched").and.callThrough();
        const onMockWriteValue = spyOn(component.textBoxGroupComponent, "writeValue").and.callThrough();

        component.textBoxGroupComponent.registerOnChange(onChangeEvent);
        component.textBoxGroupComponent.registerOnTouched(onChangeEvent);
        component.textValue = "my textbox group";

        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
            expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
            expect(onMockWriteValue).toHaveBeenCalled();
            expect(component.textValue).toEqual(component.textBoxGroupComponent.value);
        });
    }));

    it("getter and setter values of textBoxGroup should get be able to get and set value correctly", (done) => {
        fixture.detectChanges();
        let expectedValue;
        component.textBoxGroupComponent.value = expectedValue = "first";

        // do not call detectChanges here again, doing so will refresh the component

        expect(expectedValue).toEqual(component.textBoxGroupComponent.value);
        done();
    });

});
