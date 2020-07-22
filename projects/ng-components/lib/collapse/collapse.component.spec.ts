import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CollapseComponent } from "./collapse.component";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";

@Component({
    selector: "test-sebng-collapse",
    template: ` <sebng-collapse [id]="id" [class]="className" (transitionEnd)="afterTransition($event)">Test</sebng-collapse> `,
})
class CollapseTestComponent {
    id?: string;
    className?: string;
    afterTransition(e: TransitionEvent): void {}
}

describe("CollapseComponent", () => {
    let component: CollapseTestComponent;
    let fixture: ComponentFixture<CollapseTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CollapseTestComponent, CollapseComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CollapseTestComponent);
        component = fixture.componentInstance;
        component.id = "collapse-id";
        fixture.detectChanges();
    });

    it("Should create", () => {
        expect(component).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".custom-collapse")).nativeElement.textContent).toContain("Test");
    });

    it("Should render id and className", () => {
        component.id = "myId";
        component.className = "myClassName";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".custom-collapse")).attributes.id).toEqual("myId");
        expect(fixture.debugElement.query(By.css(".custom-collapse")).classes.myClassName).toBeTrue();
    });
});
