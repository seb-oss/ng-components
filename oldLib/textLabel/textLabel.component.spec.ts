import { TextLabelComponent } from "./textLabel.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

describe("Component: TextLabelComponent", () => {
    let fixture: ComponentFixture<TextLabelComponent>;
    let component: TextLabelComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            declarations: [TextLabelComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TextLabelComponent);
            component = fixture.componentInstance;
            component.value = "text value";
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should display the correct css className", async(() => {
        component.className = "my-text";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".my-text"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrong-class"))).toBeFalsy();
    }));

    it("should display the correct label text", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("label"))).toBeNull();
        component.label = "my text";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("label")).nativeElement.innerHTML).toEqual("my text");
    }));

});
