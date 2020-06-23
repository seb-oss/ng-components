import { ModalComponent } from "./modal.component";
import { ModalService } from "./modal.service";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { Component, ViewChild, DebugElement } from "@angular/core";
import { ModalSizeType, ModalPositionType } from "./modal.type";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";

@Component({
    template: `<sebng-modal [size]="'modal-lg'" [id]="id" [center]="center" [position]="position" [fullscreen]="fullscreen">
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
    id?: string;
    size?: ModalSizeType;
    center?: boolean;
    position?: ModalPositionType;
    fullscreen?: boolean;
    @ViewChild(ModalComponent) modalChild: ModalComponent;

    closeModal(): void {
        this.modalChild.close();
    }

    openModal(): void {
        this.modalChild.open();
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

    it("should open the modal when openModal function is called and backdrop is appended to the body", () => {
        const modalSpy: jasmine.Spy = spyOn(component.modalChild, "open").and.callThrough();
        const modalServiceSpy: jasmine.Spy = spyOn(modalService, "appendComponentToBody").and.callThrough();
        fixture.componentInstance.openModal();
        fixture.detectChanges();
        expect(modalSpy).toHaveBeenCalled();
        expect(modalServiceSpy).toHaveBeenCalled();
        fixture.whenRenderingDone().then(() => {
            fixture.detectChanges();
            expect(document.querySelector(".modal-backdrop")).toBeTruthy();
        });
    });

    it("should close the modal when closeModal function is called", () => {
        spyOn(component.modalChild, "close");
        fixture.componentInstance.closeModal();
        fixture.detectChanges();
        expect(component.modalChild.close).toHaveBeenCalled();
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        const cssStyle: CSSStyleDeclaration = getComputedStyle(debugEl.querySelector(".modal"));
        expect(cssStyle.display).toEqual("none");
    });

    it("should close the modal when backdrop is clicked", async(() => {
        fixture.componentInstance.openModal();
        spyOn(component.modalChild, "onBackdropClick");
        const modal: DebugElement = fixture.debugElement.query(By.css(".modal"));
        modal.nativeElement.click();
        expect(component.modalChild.onBackdropClick).toHaveBeenCalled();
    }));
});
