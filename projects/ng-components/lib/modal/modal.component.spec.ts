import { ModalComponent, ModalSize, ModalPosition } from "./modal.component";
import { TestBed, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { Subscription } from "rxjs";
import { Component } from "@angular/core";

describe("Component: ModalComponent", () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;
    let modalElement: HTMLDivElement;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({ declarations: [ModalComponent] }).compileComponents();
        })
    );

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

    it("Should render the component fullscreen or centered when passed", () => {
        component.centered = true;
        fixture.detectChanges();

        expect(modalElement.classList.contains("modal-centered")).toBeTrue();

        component.centered = false;
        component.fullscreen = true;
        fixture.detectChanges();

        expect(modalElement.classList.contains("modal-fullscreen")).toBeTrue();
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

        component.backdropDismiss = false;
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
        component.escapeToDismiss = false;
        component.toggle = false;
        fixture.detectChanges();

        expect(addListenerSpy).not.toHaveBeenCalled();
        expect(removeListenerSpy).not.toHaveBeenCalled();

        // It should not add a listener when escapeToDismiss is disabled
        component.escapeToDismiss = false;
        component.toggle = true;
        fixture.detectChanges();

        expect(addListenerSpy).not.toHaveBeenCalled();

        // It should try to remove the listner when the modal is hidden
        component.escapeToDismiss = true;
        component.toggle = false;
        fixture.detectChanges();

        expect(removeListenerSpy).toHaveBeenCalled();
    });

    describe("Should render with all supported sizes", () => {
        const sizes: Array<ModalSize> = ["lg", "sm"];

        sizes.forEach((size: ModalSize) => {
            it(`- ${size}`, () => {
                component.size = size;
                fixture.detectChanges();

                expect(modalElement.firstElementChild.classList.contains(`modal-${size}`)).toBeTrue();
            });
        });
    });

    describe("Should render with all supported positions", () => {
        const positions: Array<ModalPosition> = ["left", "right"];

        positions.forEach((position: ModalPosition) => {
            it(`- ${position}`, () => {
                component.position = position;
                fixture.detectChanges();

                expect(modalElement.classList.contains("modal-aside")).toBeTrue();
                expect(modalElement.classList.contains(`modal-aside-${position}`)).toBeTrue();
            });
        });
    });

    it("Should not render fullscreen when aside is enable and centered when fullscreen is enabled", () => {
        component.fullscreen = true;
        component.position = "left";
        fixture.detectChanges();

        expect(modalElement.classList.contains("modal-fullscreen")).toBeFalse();

        component.position = undefined;
        component.centered = true;
        fixture.detectChanges();

        expect(modalElement.classList.contains("modal-fullscreen")).toBeTrue();
        expect(modalElement.classList.contains("modal-centered")).toBeFalse();
    });

    it("Should remove the hide class after the modal becomes hidden", () => {
        component.toggle = true;
        modalElement.firstElementChild.dispatchEvent(new Event("animationend", { bubbles: true }));
        fixture.detectChanges();

        expect(modalElement.classList.contains("show")).toBeTrue();
        expect(modalElement.classList.contains("hide")).toBeFalse();

        component.toggle = false;
        fixture.detectChanges();
        expect(modalElement.classList.contains("show")).toBeFalse();
        expect(modalElement.classList.contains("hide")).toBeTrue();

        modalElement.firstElementChild.dispatchEvent(new Event("animationend", { bubbles: true }));
        fixture.detectChanges();

        expect(modalElement.classList.contains("show")).toBeFalse();
        expect(modalElement.classList.contains("hide")).toBeFalse();
    });

    it("Should append `overflow-hidden` to the body", () => {
        component.toggle = true;
        fixture.detectChanges();

        expect(document.body.classList.contains("overflow-hidden")).toBeTruthy();

        component.toggle = false;
        fixture.detectChanges();

        expect(document.body.classList.contains("overflow-hidden")).toBeFalsy();
    });

    it("Should render header, body, and footer", async () => {
        await TestBed.resetTestingModule()
            .configureTestingModule({
                declarations: [TestComponent, ModalComponent],
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(TestComponent) as any;
                component = fixture.componentInstance;
                fixture.detectChanges();
            });

        // Verifies if `closeButton` is also working, otherwise, textContent will be `my headerx`
        expect(fixture.debugElement.nativeElement.querySelector(".modal-header").textContent).toEqual("my header");
        expect(fixture.debugElement.nativeElement.querySelector(".modal-body").textContent).toEqual("my body");
        expect(fixture.debugElement.nativeElement.querySelector(".modal-footer").textContent).toEqual("my footer");
    });

    it("should remove overflow-hidden from body when modal is destroyed", () => {
        component.toggle = true;
        fixture.detectChanges();

        expect(document.body.classList.contains("overflow-hidden")).toBeTruthy();
        component.ngOnDestroy();
        expect(document.body.classList.contains("overflow-hidden")).toBeFalsy();
    });
});

@Component({
    selector: "testbed",
    template: `
        <sebng-modal [closeButton]="false">
            <div header>my header</div>
            <div body>my body</div>
            <div footer>my footer</div>
        </sebng-modal>
    `,
})
class TestComponent {}
