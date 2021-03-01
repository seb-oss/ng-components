import { Component } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ProgressbarComponent, ProggressTheme, BarItem } from "./progressbar.component";
import { CommonModule } from "@angular/common";
import { ProgressThemePipe } from "./progress-theme.pipe";

@Component({
    selector: "test-sebng-progress-bar",
    template: `
        <sebng-progress-bar
            [value]="value"
            [className]="className"
            [height]="height"
            [id]="id"
            [showProgress]="showProgress"
            [striped]="striped"
            [animated]="animated"
            [theme]="theme"
            [multiBars]="multiBars"
        ></sebng-progress-bar>
    `,
})
class ProgressbarTestComponent {
    value: number;
    height?: number;
    className?: string;
    id?: string;
    showProgress?: boolean;
    striped?: boolean;
    animated?: boolean;
    theme?: ProggressTheme;
    multiBars?: Array<BarItem>;
}

describe("ProgressbarComponent", () => {
    let component: ProgressbarTestComponent;
    let fixture: ComponentFixture<ProgressbarTestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule],
                declarations: [ProgressbarComponent, ProgressbarTestComponent, ProgressThemePipe],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressbarTestComponent);
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

    it("should support multiBars", () => {
        component.multiBars = [
            { value: 20, theme: "success" },
            { value: 30, theme: "danger", striped: true },
            { value: 30, theme: "info", striped: true, animated: true },
            { value: 20, theme: "warning", showProgress: true },
        ];
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css(".progress-bar")).length).toEqual(4);
        expect(fixture.debugElement.queryAll(By.css(".progress-bar"))[0].classes["bg-success"]).toBeTrue();
        expect(fixture.debugElement.queryAll(By.css(".progress-bar"))[1].classes["bg-danger"]).toBeTrue();
        expect(fixture.debugElement.queryAll(By.css(".progress-bar"))[2].classes["bg-info"]).toBeTrue();
        expect(fixture.debugElement.queryAll(By.css(".progress-bar"))[3].classes["bg-warning"]).toBeTrue();
    });
});
