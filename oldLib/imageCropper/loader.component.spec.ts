
import { LoaderComponent } from "./loader.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

describe("Component: LoaderComponent", () => {
    let fixture: ComponentFixture<LoaderComponent>;
    let component: LoaderComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [LoaderComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LoaderComponent);
            component = fixture.componentInstance;
            component.toggle = false;
        });
    }));

    it("should render and be defined", async(() => {
        component.className = "loader";
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it("should not render loader when toggle is false", async(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".loader"))).toBeFalsy();
        component.toggle = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".loader"))).toBeTruthy();
    }));

});
