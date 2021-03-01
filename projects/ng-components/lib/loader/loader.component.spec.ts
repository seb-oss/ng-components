import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { LoaderComponent, LoaderSize, LoaderType } from "./loader.component";
import { LoaderClassesPipe } from "./loader.pipe";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";

@Component({
    selector: "test-sebng-loader",
    template: `<sebng-loader
        [className]="className"
        [size]="size"
        [type]="type"
        [cover]="cover"
        [backdrop]="backdrop"
        [toggle]="toggle"
        [role]="role"
        [fullscreen]="fullscreen"
    >
        <p *ngIf="showText">Loading, please wait...</p>
    </sebng-loader>`,
})
class LoaderTestComponent {
    size?: LoaderSize;
    type?: LoaderType;
    cover?: boolean;
    fullscreen?: boolean;
    backdrop?: boolean;
    srText?: string;
    toggle?: boolean;
    role?: string = "status";
    className?: string;

    showText?: boolean;
}

describe("LoaderComponent", () => {
    let component: LoaderTestComponent;
    let fixture: ComponentFixture<LoaderTestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [LoaderTestComponent, LoaderComponent, LoaderClassesPipe],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(LoaderTestComponent);
        component = fixture.componentInstance;
        component.size = "md";
        component.type = "spinner";
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".loader"))).toBeTruthy();
    });

    it("Should render id and className", () => {
        component.className = "myClassName";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".myClassName")).classes.myClassName).toBeTrue();
    });

    it("Should display backdrop and either cover or fullscreen when passed and cover only when both are passed", () => {
        component.cover = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".loader-cover"))).toBeTruthy();

        component.fullscreen = true;
        component.backdrop = true;
        component.cover = false;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".loader-backdrop"))).toBeTruthy();
    });

    describe("Should render with all supported sizes", () => {
        const sizeList: Array<LoaderSize> = ["xs", "sm", "md", "lg"];
        sizeList.map((size: LoaderSize) => {
            it(`- size (${size})`, () => {
                component.size = size;
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css(`.loader-${size}`))).toBeTruthy();
            });
        });
    });

    describe("Should render with all supported types", () => {
        const typeList: Array<LoaderType> = ["spinner", "square"];
        typeList.map((type: LoaderType) => {
            it(`- type (${type})`, () => {
                component.type = type;
                fixture.detectChanges();

                expect(fixture.debugElement.query(By.css(`.loader-${type}`))).toBeTruthy();
            });
        });
    });

    it("Should render custom classname", () => {
        const className: string = "custom-classname";
        component.className = className;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.${className}`))).toBeTruthy();
    });

    it("Should render children under the loader and sr-only at the end with option to pass custom text to it", () => {
        component.showText = true;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("p")).nativeElement.textContent).toEqual("Loading, please wait...");
    });
});
