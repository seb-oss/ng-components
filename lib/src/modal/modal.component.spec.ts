import { ModalComponent } from "./modal.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
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
