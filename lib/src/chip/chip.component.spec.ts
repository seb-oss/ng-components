import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChipComponent } from "./chip.component";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";

@Component({
    selector: "test-sebng-chip",
    template: ` <sebng-chip [id]="id" [className]="className" (onClose)="onClose($event)">Test</sebng-chip> `,
})
class ChipTestComponent {
    id?: string;
    className?: string;
    onClose(e: Event): void {}
}

describe("ChipComponent", () => {
    let component: ChipTestComponent;
    let fixture: ComponentFixture<ChipTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChipTestComponent, ChipComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChipTestComponent);
        component = fixture.componentInstance;
        component.id = "chip-id";
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".content")).nativeElement.textContent).toContain("Test");
    });

    it("Should render id and className", () => {
        component.id = "myId";
        component.className = "myClassName";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".custom-chip")).attributes.id).toEqual("myId");
        expect(fixture.debugElement.query(By.css(".custom-chip")).classes.myClassName).toBeTrue();
    });
});
