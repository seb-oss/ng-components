import { Component } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ProgressBarComponent, ProggressTheme } from "./progressBar.component";
import { CommonModule } from "@angular/common";
import { ProgressThemePipe } from "./progressTheme.pipe";

@Component({
    selector: "test-sebng-progressBar",
    template: `
        <sebng-progressBar
            [value]="value"
            [className]="className"
            [height]="height"
            [id]="id"
            [showProgress]="showProgress"
            [striped]="striped"
            [animated]="animated"
            [theme]="theme"
        ></sebng-progressBar>
    `,
})
class ProgressBarTestComponent {
    value: number;
    height?: number;
    className?: string;
    id?: string;
    showProgress?: boolean;
    striped?: boolean;
    animated?: boolean;
    theme?: ProggressTheme;
}

describe("ProgressBarComponent", () => {
    let component: ProgressBarTestComponent;
    let fixture: ComponentFixture<ProgressBarTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [ProgressBarComponent, ProgressBarTestComponent, ProgressThemePipe],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressBarTestComponent);
        component = fixture.componentInstance;
        component.value = 40;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should be able to use different themes ", () => {
        component.theme = "danger";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-warning"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-info"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-success"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-danger"))).toBeTruthy();

        component.theme = "success";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-warning"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-info"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-success"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-danger"))).toBeFalsy();

        component.theme = "info";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-warning"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-info"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-success"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-danger"))).toBeFalsy();

        component.theme = "warning";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-warning"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-info"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-success"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".bg-danger"))).toBeFalsy();
    });

    it("should be able to set custom height ", () => {
        component.height = 26;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".progress")).attributes.style).toEqual("height: 26px;");
    });

    it("should be able to use striped bar and stripe animated", () => {
        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".progress-bar.progress-bar-striped"))).toBeFalsy();

        component.striped = true;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".progress")).query(By.css(".progress-bar.progress-bar-striped"))).toBeTruthy();

        component.striped = true;
        component.animated = true;
        fixture.detectChanges();
        expect(
            fixture.debugElement.query(By.css(".progress")).query(By.css(".progress-bar.progress-bar-striped.progress-bar-animated"))
        ).toBeTruthy();
    });
});
