import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TextLabelComponent } from "./textLabel.component";
import { By } from "@angular/platform-browser";
import { Component, ViewChild } from "@angular/core";

describe("TextLabelComponent", () => {
    let component: TextLabelComponent;
    let fixture: ComponentFixture<TextLabelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TextLabelComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextLabelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should display the correct css className", async(() => {
        component.className = "my-text";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".my-text"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrong-class"))).toBeFalsy();
    }));

    it("should display the correct label text", async(() => {
        expect(fixture.debugElement.query(By.css("label"))).toBeNull();
        component.label = "my text";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("label")).nativeElement.innerHTML).toEqual("my text");
    }));
});

describe("TestTextLabelComponent", () => {
    @Component({
        template: `
            <ng-template #label><label class="custom-label">Current savings</label></ng-template>
            <ng-template #value><div class="custom-value">40000</div></ng-template>
            <sebng-textlabel [label]="label" [value]="value"> </sebng-textlabel>
        `,
    })
    class WrapperComponent {
        @ViewChild(TextLabelComponent) testTextLabelComponent: TextLabelComponent;
    }

    let component: TextLabelComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WrapperComponent, TextLabelComponent],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(WrapperComponent);
        const wrapperComponent = fixture.debugElement.componentInstance;
        component = wrapperComponent.testTextLabelComponent;
        fixture.detectChanges();
    });

    it("should render templateRef ", () => {
        expect(fixture.debugElement.query(By.css(".custom-label")).nativeElement.innerHTML).toEqual("Current savings");
        expect(fixture.debugElement.query(By.css(".custom-value")).nativeElement.innerHTML).toEqual("40000");
    });
});
