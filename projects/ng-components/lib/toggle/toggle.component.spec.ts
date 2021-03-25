import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ToggleComponent } from "./toggle.component";
import { FormsModule } from "@angular/forms";

describe("ToggleComponent", () => {
    let component: ToggleComponent;
    let fixture: ComponentFixture<ToggleComponent>;
    let onChange: jasmine.Spy;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [ToggleComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ToggleComponent);
        component = fixture.componentInstance;
        component.name = "myToggle";
        fixture.detectChanges();

        onChange = spyOn(component.valueChange, "emit");
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
