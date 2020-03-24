import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExampleTemplateComponent } from "./example-template.component";

describe("ExampleComponentComponent", () => {
    let component: ExampleTemplateComponent;
    let fixture: ComponentFixture<ExampleTemplateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExampleTemplateComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExampleTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
