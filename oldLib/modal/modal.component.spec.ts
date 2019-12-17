
import { ModalComponent } from "./modal.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: "modal-test",
    template: `<ac-modal
            [toggle]="modalToggle"
            [disableBackdropDismiss]="disableBackdropDismiss"
            [fullscreen]="modalFullScreen"
            [position]="modalPosition"
            [dismissModal]="closeModal">
            <h4 header>Modal Title</h4>
            <p body>Modal body text here</p>
            <button
                footer
                class="btn btn-primary dialogue-button"
                (click)="closeModal()">
                Close
            </button>
        </ac-modal>`
})

class TestComponent {
    modalToggle: boolean;
    disableBackdropDismiss: boolean;
    modalFullScreen: boolean;
    modalPosition: string;
    closeModal = (): void  => {
        this.modalToggle = false;
        this.resetModalProperties();
    }
    /**
     * Reset modal properties
     */
    resetModalProperties() {
        this.modalFullScreen = false;
        this.modalPosition = "";
        this.disableBackdropDismiss = false;
    }
}

describe("Component: ModalComponent", () => {
    let fixture: ComponentFixture<ModalComponent>;
    let component: ModalComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [ModalComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ModalComponent);
            component = fixture.componentInstance;
            component.toggle = false;
        });
    }));

    it("should render and receive input", async(() => {
        component.toggle = true;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".show"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".show"))).not.toBeNull();
        expect(fixture.debugElement.query(By.css(".fade"))).toBeNull();
        expect(fixture.debugElement.query(By.css(".modal-fullscreen"))).toBeNull();
        expect(fixture.debugElement.query(By.css(".modal-aside"))).toBeNull();
    }));

    it("should receive the correct id parameter", async(() => {
        component.id = "my-id";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("#my-id"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#wrong-id"))).toBeFalsy();
    }));

    it("it should open in full screen", async(() => {
        component.toggle = true;
        component.fullscreen = true;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".show"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".show"))).not.toBeNull();
        expect(fixture.debugElement.query(By.css(".modal-fullscreen"))).toBeDefined();
    }));

    it("should open with position left", async(() => {
        component.toggle = true;
        component.position = "left";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".show"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".show"))).not.toBeNull();
        expect(fixture.debugElement.query(By.css(".modal-aside"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".modal-aside-left"))).toBeDefined();
    }));

    it("should open with position right", async(() => {
        component.toggle = true;
        component.position = "right";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".show"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".show"))).not.toBeNull();
        expect(fixture.debugElement.query(By.css(".modal-aside"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".modal-aside-right"))).toBeDefined();
    }));

});

describe("Component: ModalComponent", () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalComponent, TestComponent]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have a header",  async(() => {
        component.modalToggle = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".show"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".show"))).not.toBeNull();
        const innerHTML = fixture.debugElement.query(By.css("h4")).nativeElement.innerHTML;
        expect(innerHTML).toContain("Modal Title");
    }));

    it("should have a body", () => {
        component.modalToggle = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".show"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".show"))).not.toBeNull();
        const innerHTML = fixture.debugElement.query(By.css("p")).nativeElement.innerHTML;
        expect(innerHTML).toContain("Modal body text here");
    });

    it("should have a footer", () => {
        component.modalToggle = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".show"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".show"))).not.toBeNull();
        const innerHTML = fixture.debugElement.query(By.css("button")).nativeElement.innerHTML;
        expect(innerHTML).toContain("Close");
    });

    it("should close if clicked on button Close", () => {
        component.modalToggle = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(".show"))).toBeDefined();
        expect(fixture.debugElement.query(By.css(".show"))).not.toBeNull();
        const closeBtn = fixture.debugElement.nativeElement.querySelector(".dialogue-button");
        closeBtn.click();
        fixture.whenStable().then(() => {
            expect(component.modalToggle).toBe(false);
        });
    });

    it("should close if clicked on backdrop", () => {
        component.modalToggle = true;
        fixture.detectChanges();
        const backdrop = fixture.debugElement.nativeElement.querySelector(".modal");
        expect(backdrop).toBeDefined();
        expect(backdrop).not.toBeNull();
        backdrop.click();
        fixture.whenStable().then(() => {
            expect(component.modalToggle).toBe(false);
        });
    });

    it("backdrop click shouldnt dismiss modal", () => {
        component.modalToggle = true;
        component.disableBackdropDismiss = true;
        fixture.detectChanges();
        const backdrop = fixture.debugElement.nativeElement.querySelector(".modal");
        expect(backdrop).toBeDefined();
        expect(backdrop).not.toBeNull();
        backdrop.click();
        fixture.whenStable().then(() => {
            expect(component.modalToggle).toBe(true);
            expect(fixture.debugElement.query(By.css(".show"))).toBeDefined();
            expect(fixture.debugElement.query(By.css(".show"))).not.toBeNull();
        });
    });
});
