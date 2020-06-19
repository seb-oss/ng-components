import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonModule } from "./button.module";
import { ButtonTheme, ButtonSize, ButtonTags, ButtonComponent } from "./button.component";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";
import { ButtonClassesPipe } from "./button.pipes";
import { CommonModule } from "@angular/common";

type ButtonTestItem<T, K> = { value: T; expected: K };

@Component({
    selector: "test-sebng-chip",
    template: `
        <sebng-button
            tag="button"
            [disabled]="disabled"
            [block]="block"
            [label]="label"
            [tag]="tag"
            [size]="size"
            [className]="className"
            [theme]="theme"
            (onClick)="onClick($event)"
        >
            Button

            <span class="ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="my-svg">
                    <path
                        d="M12.8 371.2L.2 485.3c-1.7 15.3 11.2 28.2 26.5 26.5l114.2-12.7 352.4-352.4c25-25 25-65.5 0-90.5l-37.5-37.5c-25-25-65.5-25-90.5 0L12.8 371.2zm113.3 97.4L33 478.9l10.3-93.1 271.9-271.9 82.7 82.7-271.8 272zm344.5-344.5L420.7 174 338 91.3l49.9-49.9c12.5-12.5 32.7-12.5 45.3 0l37.5 37.5c12.4 12.4 12.4 32.7-.1 45.2z"
                    />
                </svg>
            </span>
        </sebng-button>
    `,
})
class ButtonTestComponent {
    id?: string;
    className?: string;
    name?: string;
    theme?: ButtonTheme;
    size: ButtonSize;
    tag: ButtonTags;
    block: boolean;
    disabled: boolean;
    label: string;
    onClick(e: Event): void {}
}
describe("ButtonComponent", () => {
    let component: ButtonTestComponent;
    let fixture: ComponentFixture<ButtonTestComponent>;
    let onClick: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [ButtonComponent, ButtonClassesPipe, ButtonTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonTestComponent);
        component = fixture.componentInstance;
        component.id = "button-id";
        onClick = spyOn(component, "onClick");
        fixture.detectChanges();
    });

    it("Should render", () => {
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("button")).nativeElement.textContent).toBeDefined();
        expect(fixture.debugElement.query(By.css("button")).nativeElement.textContent?.trim()).toEqual("Button");
    });

    it("Should render custom className", () => {
        const className: string = "myButtonClass";
        component.className = className;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("button")).classes.myButtonClass).toBeTrue();
    });

    describe("Should render supported themes", () => {
        const list: Array<ButtonTestItem<ButtonTheme, string>> = [
            { value: "primary", expected: "btn-primary" },
            { value: "outline-primary", expected: "btn-outline-primary" },
            { value: "secondary", expected: "btn-secondary" },
            { value: "dark", expected: "btn-dark" },
            { value: "light", expected: "btn-light" },
            { value: "link", expected: "btn-link" },
            { value: "danger", expected: "btn-danger" },
            { value: "outline-danger", expected: "btn-outline-danger" },
        ];
        list.map((item: ButtonTestItem<ButtonTheme, string>) => {
            it(`Size: ${item.value} - Expected to render (${item.expected})`, () => {
                component.theme = item.value;
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css("button")).classes[item.expected]).toBeTrue();
            });
        });
    });

    describe("Should render supported sizes", () => {
        const list: Array<ButtonTestItem<ButtonSize, string>> = [
            { value: "lg", expected: "btn-lg" },
            { value: "md", expected: "btn-md" },
            { value: "sm", expected: "btn-sm" },
        ];
        list.map((item: ButtonTestItem<ButtonSize, string>) => {
            it(`Size: ${item.value} - Expected to render (btn-${item.expected})`, () => {
                component.size = item.value;
                fixture.detectChanges();

                console.log("Feed the fire ", fixture.debugElement.query(By.css("button")).classes);

                expect(fixture.debugElement.query(By.css("button")).classes[item.expected]).toBeTrue();
            });
        });
    });

    it("Should render icon inside button", () => {
        expect(fixture.debugElement.query(By.css("button svg")).attributes.id).toEqual("my-svg");
    });

    it("should handle click event", () => {
        fixture.debugElement.query(By.css("button")).nativeElement.dispatchEvent(new Event("click"));

        expect(onClick).toHaveBeenCalled();
    });

    it("should handle button of different tags ", () => {
        component.tag = "input";

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("button"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css("input"))).toBeTruthy();

        component.tag = "anchor";

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("button"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css("input"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css("a"))).toBeTruthy();

        component.tag = "button";

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("button"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("input"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css("a"))).toBeFalsy();
    });
});
