import { ModalComponent } from "./modal.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { Subscription } from "rxjs";

describe("Component: ModalComponent", () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;
    let modalElement: HTMLDivElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({ declarations: [ModalComponent] }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        modalElement = fixture.debugElement.nativeElement.firstElementChild;
    });

    it("Should render correctly", () => {
        const dialogElement: HTMLDivElement = modalElement.firstElementChild as any;

        expect(modalElement).not.toBeNull();
        expect(dialogElement).not.toBeNull();

        expect(modalElement.classList.contains("ac")).toBeTrue();
        expect(modalElement.classList.contains("modal")).toBeTrue();
        expect(modalElement.getAttribute("role")).toEqual("dialog");
        expect(modalElement.getAttribute("aria-modal")).toEqual("true");

        expect(dialogElement.classList.contains("modal-dialog")).toBeTrue();
        expect(dialogElement.getAttribute("role")).toEqual("document");

        expect(dialogElement.firstElementChild).not.toBeNull();
        expect(dialogElement.firstElementChild.classList.contains("modal-content")).toBeTrue();
    });

    it("Should pass optional parameters correctly", () => {
        const id: string = "myID";
        const className: string = "myClassName";
        const ariaLabel: string = "myAriaLabel";
        const ariaLabelledby: string = "myAriaLabelledby";
        const ariaDescribedby: string = "myAriaDescribedby";

        component.id = id;
        component.className = className;
        component.ariaLabel = ariaLabel;
        component.ariaLabelledby = ariaLabelledby;
        component.ariaDescribedby = ariaDescribedby;

        fixture.detectChanges();

        expect(modalElement.id).toEqual(id);
        expect(modalElement.classList.contains(className)).toBeTrue();
        expect(modalElement.getAttribute("aria-label")).toEqual(ariaLabel);
        expect(modalElement.getAttribute("aria-labelledby")).toEqual(ariaLabelledby);
        expect(modalElement.getAttribute("aria-describedby")).toEqual(ariaDescribedby);
    });

    it("Should emit dismiss when close button or backdrop is clicked", () => {
        const onDismiss: jasmine.Spy = jasmine.createSpy();

        const sub: Subscription = component.dismiss.subscribe(onDismiss);

        // Backdrop click
        modalElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        // Close button click
        modalElement.querySelector(".close").dispatchEvent(new MouseEvent("click", { bubbles: true }));

        expect(onDismiss).toHaveBeenCalledTimes(2);

        component.toggle = true;
        fixture.detectChanges();

        window.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape", bubbles: true }));

        expect(onDismiss).toHaveBeenCalledTimes(3);

        component.disableBackdropDismiss = true;
        component.escapeToDismiss = false;
        fixture.detectChanges();

        // Should not emit since the backdrop dismiss is disabled
        modalElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        window.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape", bubbles: true }));

        expect(onDismiss).toHaveBeenCalledTimes(3);
        sub.unsubscribe();
    });

    it("Should handle window keyup event correctly as the toggle changes", () => {
        const addListenerSpy: jasmine.Spy = spyOn(window, "addEventListener");
        const removeListenerSpy: jasmine.Spy = spyOn(window, "removeEventListener");

        // If the modal is hidden, no listener is added
        component.toggle = false;
        component.escapeToDismiss = false;
        fixture.detectChanges();

        expect(addListenerSpy).not.toHaveBeenCalled();
        expect(removeListenerSpy).not.toHaveBeenCalled();

        // It should not add a listener when escapeToDismiss is disabled
        component.toggle = true;
        component.escapeToDismiss = false;
        fixture.detectChanges();

        expect(addListenerSpy).not.toHaveBeenCalled();

        // It should try to remove the listner when the modal is hidden
        component.toggle = false;
        component.escapeToDismiss = true;
        fixture.detectChanges();

        // expect(removeListenerSpy).toHaveBeenCalled();
        // console.log("TEST");
    });
});
