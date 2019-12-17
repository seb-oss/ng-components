
import { DialogueComponent } from "./dialogue.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

describe("Component: DialogueComponent", () => {
    let fixture: ComponentFixture<DialogueComponent>;
    let component: DialogueComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [DialogueComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DialogueComponent);
            component = fixture.componentInstance;
            component.toggle = false;
        });
    }));

    it("should render and receive input ", async(() => {
        component.className = "model-popup";
        component.toggle = true;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".model-popup"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".model-popup"))).not.toBeNull();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeNull();
    }));

    it("should render the correct description text", async(() => {
        component.desc = "Comfirm model";
        component.toggle = true;
        fixture.detectChanges();
        const el: DebugElement = fixture.debugElement.query(By.css(".dialogue-desc"));
        expect(el.nativeElement.innerHTML).toEqual("Comfirm model");
    }));

    it("should render close button only when secondaryBtn and primaryBtn are undefined", async(() => {
        component.toggle = true;
        fixture.detectChanges();
        const el: Array<any> = fixture.debugElement.nativeElement.querySelectorAll("button");
        expect(el.length).toEqual(1);
        expect(el[0].innerHTML).toContain("Close");
    }));

    it("should fire button event when clicked", async(() => {
        component.secondaryAction = () => true;
        component.primaryAction = () => true;
        component.desc = "Comfirm model";
        component.toggle = true;
        component.primaryBtn = "confirm";
        component.secondaryBtn = "close";

        fixture.detectChanges();

        const onCancelMock = spyOn(component, "secondaryAction");
        const onConfirmedAction = spyOn(component, "primaryAction");
        const cancelBtn = fixture.debugElement.nativeElement.querySelector(".btn-secondary");
        const confirmBtn = fixture.debugElement.nativeElement.querySelector(".btn-primary");

        cancelBtn.click();

        fixture.whenStable().then(() => {
            expect(onCancelMock).toHaveBeenCalledTimes(1);
            expect(onConfirmedAction).toHaveBeenCalledTimes(0);
            confirmBtn.click();
            expect(onConfirmedAction).toHaveBeenCalledTimes(1);
        });

    }));

    it("should open or close dialogue when toggle is changed", fakeAsync(() => {

        component.ngOnChanges({
            toggle: new SimpleChange(false, true, false)
        });

        fixture.detectChanges();

        tick();
        fixture.whenStable().then(() => {
            expect(component.open).toEqual(component.toggle);
            expect(component.close).not.toEqual(component.toggle);
        });
    }));

});
