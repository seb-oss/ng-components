import { Component, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BreadcrumbComponent } from "./breadcrumb.component";
import { BreadcrumbSafeHtmlPipe } from "./breadcrumb.pipe";
import { CommonModule } from "@angular/common";

@Component({
    selector: "test-sebng-breadcrumb",
    template: ` <sebng-breadcrumb [id]="id" [className]="className" (onClick)="onClick($event)" [list]="list"></sebng-breadcrumb> `,
})
class BreadcrumbTestComponent {
    className?: string;
    id?: string;
    private userIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170">
            <title>regular_black</title>
            <path d="M149.1,165h-6V132.3c0-18.8-14.2-34.8-32.5-36.8l-24,15.9a3,3,0,0,1-3.3,0L59.2,95.5C41,97.7,26.9,113.6,26.9,132.3V165h-6V132.3c0-22.5,16.7-40.9,38.8-42.9a3,3,0,0,1,1.9.5L85,105.3l23.2-15.4a3,3,0,0,1,1.9-.5c21.9,1.8,39,20.7,39,42.9Z" />
            <path d="M85,86.4A31.7,31.7,0,0,1,53.4,54.8V36.6a31.6,31.6,0,1,1,63.3,0V54.8A31.7,31.7,0,0,1,85,86.4Zm0-75.5A25.7,25.7,0,0,0,59.4,36.6V54.8a25.6,25.6,0,0,0,51.3,0V36.6A25.7,25.7,0,0,0,85,10.9Z" />
        </svg>
    `;

    list: Array<string> = ["First", "Second", "Third", this.userIcon.toString()];

    onClick() {}
}

describe("BreadcrumbComponent", () => {
    let component: BreadcrumbTestComponent;
    let fixture: ComponentFixture<BreadcrumbTestComponent>;
    let onClick: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [BreadcrumbSafeHtmlPipe, BreadcrumbComponent, BreadcrumbTestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadcrumbTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        onClick = spyOn(component, "onClick");
    });

    it("should create snd be defined", () => {
        expect(component).toBeTruthy();
    });

    it("Should render custom className and id", () => {
        const className: string = "myBreadcrumbClass";
        const id: string = "myBreadcrubID";
        component.className = className;
        component.id = id;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(`.${className}`))).toBeTruthy();
        expect(fixture.debugElement.queryAll(By.css(`#${id}`)).length).toBeGreaterThan(0);
    });

    it("Should fire click event when clicked", () => {
        fixture.debugElement.query(By.css(".breadcrumb-item")).nativeElement.dispatchEvent(new MouseEvent("click")); // Simulates scenario where there is no onClick
        expect(onClick).toHaveBeenCalled();
    });
});
