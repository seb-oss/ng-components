import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ToggleSelectorComponent } from "./toggle-selector.component";

describe("ToggleSelectorComponent", () => {
    let component: ToggleSelectorComponent;
    let fixture: ComponentFixture<ToggleSelectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToggleSelectorComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToggleSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
