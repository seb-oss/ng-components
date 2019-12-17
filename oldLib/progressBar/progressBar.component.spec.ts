
import { ProgressBarComponent } from "./progressBar.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { CommonModule } from "@angular/common";

describe("Component: ProgressBarComponent", () => {
    let fixture: ComponentFixture<ProgressBarComponent>;
    let component: ProgressBarComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [ProgressBarComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ProgressBarComponent);
            component = fixture.componentInstance;
            component.value = 45;
        });
    }));

    it("should render and be defined", async(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should render and receive the correct css class parameter", async(() => {
        component.className = "progress-bar";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".progress-bar"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should render the correct progress text", async(() => {
        component.showProgress = true;
        fixture.detectChanges();
        const el: DebugElement = fixture.debugElement.query(By.css(".custom-progress-text"));
        expect(el.nativeElement.innerHTML).toContain(45);
    }));

});
