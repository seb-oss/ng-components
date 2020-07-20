import { ModalComponent } from "./modal.component";
import { ModalService } from "./modal.service";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { Component, ViewChild, DebugElement } from "@angular/core";
import { ModalSizeType, ModalPositionType } from "./modal.type";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { SebModalBackdropComponent } from "./modal.backdrop";

@Component({
    template: `<sebng-modal
        [toggle]="toggle"
        [size]="'modal-lg'"
        [id]="id"
        [center]="center"
        [position]="position"
        [fullscreen]="fullscreen"
        [backdropClassName]="backdropClassName"
    >
        <div class="custom-body" body>
            Body
        </div>

        <div class="custom-footer" footer>
            <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="closeModal()">
                Close
            </button>
        </div>
    </sebng-modal>`,
})
class TestComponent {
    toggle?: boolean;
    id?: string;
    size?: ModalSizeType;
    center?: boolean;
    position?: ModalPositionType;
    fullscreen?: boolean;
    backdropClassName?: string;
    @ViewChild(ModalComponent) modalChild: ModalComponent;

    closeModal(): void {
        this.toggle = false;
    }

    openModal(): void {
        this.toggle = true;
    }
}

describe("Component: ModalComponent", () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let modalService: ModalService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule],
            declarations: [TestComponent, ModalComponent],
            providers: [ModalService],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(TestComponent);
                component = fixture.componentInstance;
                modalService = TestBed.get(ModalService);
                component.id = "test-id";
                fixture.detectChanges();
            });
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have an id", () => {
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        expect(debugEl.querySelector("#test-id")).toBeTruthy();
    });

    it("should be large", () => {
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        component.size = "modal-lg";
        fixture.detectChanges();
        expect(debugEl.querySelector(".modal-lg")).toBeTruthy();
    });

    it("should be centered", () => {
        component.center = true;
        fixture.detectChanges();
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        expect(debugEl.querySelector(".modal-dialog-centered")).toBeTruthy();
    });

    it("footer should not be displayed if no select is passed", () => {
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        const cssStyle: CSSStyleDeclaration = getComputedStyle(debugEl.querySelector(".modal-header"));
        expect(cssStyle.display).toEqual("none");
    });

    it("should render according to the position", () => {
        component.position = "left";
        fixture.detectChanges();
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        expect(debugEl.querySelector(".modal-aside-left")).toBeTruthy();
    });

    it("should open in fullscreen", () => {
        component.fullscreen = true;
        fixture.detectChanges();
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        expect(debugEl.querySelector(".modal-fullscreen")).toBeTruthy();
    });

    it("should open custom backdrop className", async () => {
        component.backdropClassName = "custom-class";
        fixture.detectChanges();
        const modalServiceSpy: jasmine.Spy = spyOn(modalService, "appendComponentToBody").and.callThrough();
        fixture.componentInstance.openModal();
        fixture.detectChanges();
        expect(modalServiceSpy).toHaveBeenCalledWith(SebModalBackdropComponent, "custom-class");
    });

    it("should open the modal when openModal function is called and backdrop is appended to the body", async () => {
        const modalServiceSpy: jasmine.Spy = spyOn(modalService, "appendComponentToBody").and.callThrough();
        fixture.componentInstance.openModal();
        fixture.detectChanges();
        expect(document.querySelector(".modal-backdrop")).toBeTruthy();
        expect(modalServiceSpy).toHaveBeenCalled();
    });

    it("should close the modal when closeModal function is called", async () => {
        const modalServiceSpy: jasmine.Spy = spyOn(modalService, "removeComponentFromBody").and.callThrough();
        fixture.componentInstance.openModal();
        fixture.detectChanges();
        fixture.componentInstance.closeModal();
        fixture.detectChanges();
        expect(modalServiceSpy).toHaveBeenCalled();
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        const cssStyle: CSSStyleDeclaration = getComputedStyle(debugEl.querySelector(".modal"));
        expect(cssStyle.display).toEqual("none");
    });

    it("should close the modal when backdrop is clicked", async () => {
        fixture.componentInstance.openModal();
        fixture.detectChanges();
        spyOn(component.modalChild, "onBackdropClick");
        const modal: DebugElement = fixture.debugElement.query(By.css(".modal"));
        modal.nativeElement.click();
        expect(component.modalChild.onBackdropClick).toHaveBeenCalled();
    });
});
