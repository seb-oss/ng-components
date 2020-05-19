import { Component } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ToggleComponent } from "./toggle.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "test-sebng-toggle",
    template: `
        <sebng-toggle
            [name]="name"
            [placeholder]="placeholder"
            [rightIcon]="rightIcon"
            (onLeftClick)="onLeftClick($event)"
            (onChange)="onChange(value)"
            [(ngModel)]="value"
            [className]="className"
            [disabled]="disabled"
            [id]="id"
            [label]="label"
        ></sebng-toggle>
    `,
})
class ToggleTestComponent {
    className?: string;
    disabled?: boolean;
    id?: string;
    label?: string;
    name: string;
    value: boolean = false;

    onChange(value: boolean) {}
}

describe("ToggleComponent", () => {
    let component: ToggleTestComponent;
    let fixture: ComponentFixture<ToggleTestComponent>;
    let onChange: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
            declarations: [ToggleComponent, ToggleTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToggleTestComponent);
        component = fixture.componentInstance;
        component.name = "myToggle";
        fixture.detectChanges();

        onChange = spyOn(component, "onChange");
    });

    it("render and be defined", () => {
        expect(component).toBeTruthy();
    });

    it("Should pass custom class", () => {
        component.className = "myToggleClass";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".myToggleClass"))).toBeTruthy();
    });

    it("Should pass custom id", () => {
        component.id = "my-toggle-id";
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(`#my-toggle-id`)).length).toBeTruthy();
        expect(fixture.debugElement.query(By.css(`#my-toggle-id`)).nativeElement.attributes.id).toBeTruthy();
    });

    it("Should render label and name", () => {
        const label: string = "my toggle label";
        const name: string = "my-toggle-name";
        component.label = label;
        component.name = name;

        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css(".custom-control-label")).length).toBe(1);
        expect(fixture.debugElement.query(By.css(".custom-control-label")).nativeElement.textContent).toContain(label);
        expect(fixture.debugElement.query(By.css(`input`)).nativeElement.attributes.name.textContent).toContain(name);
    });
});
