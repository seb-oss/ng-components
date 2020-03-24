import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExampleListComponent } from "./example-list.component";

describe("ExamplePageComponent", () => {
    let component: ExampleListComponent;
    let fixture: ComponentFixture<ExampleListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExampleListComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExampleListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
