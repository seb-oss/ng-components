
import { InlineLinkComponent } from "./inlineLink.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

describe("Component: InlineLinkComponent", () => {
    let fixture: ComponentFixture<InlineLinkComponent>;
    let component: InlineLinkComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [InlineLinkComponent],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(InlineLinkComponent);
            component = fixture.componentInstance;
        });
    }));

    it("should render and receive input ", async(() => {
        component.className = "inline-link";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".inline-link"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".wrongClass"))).toBeFalsy();
    }));

    it("should fire button click event when clicked", async(() => {
        component.clickAction = () => { };

        fixture.detectChanges();

        const onLinkClickedMock = spyOn(component, "clickAction");

        const linkClicked: DebugElement = fixture.debugElement.query(By.css(".custom-inline-link"));

        linkClicked.triggerEventHandler("click", null);

        fixture.whenStable().then(() => {
            expect(onLinkClickedMock).toHaveBeenCalledTimes(1);
        });

    }));

});
