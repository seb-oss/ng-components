import { ModalComponent } from "./modal.component";
import { TestBed, async, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

describe("Component: ModalComponent", () => {
    let fixture: ComponentFixture<ModalComponent>;
    let component: ModalComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [ModalComponent],
            providers: [],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ModalComponent);
                component = fixture.componentInstance;
            });
    }));
});
