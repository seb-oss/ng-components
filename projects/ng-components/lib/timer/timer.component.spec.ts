import { async, ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";

import { TimerComponent } from "./timer.component";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";

@Component({
    selector: "test-sebng-timer",
    template: `<sebng-timer [className]="className" [id]="id" [duration]="duration" (onTimerEnd)="onTimerEnd($event)"></sebng-timer> `,
})
class TimerTestComponent {
    id?: string;
    duration: number;
    className?: string;
    onTimerEnd(e: Event): void {}
}

describe("TimerComponent", () => {
    let component: TimerTestComponent;
    let fixture: ComponentFixture<TimerTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimerTestComponent, TimerComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerTestComponent);
        component = fixture.componentInstance;
        component.id = "timer-id";
        component.duration = 90000;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".seb-custom-timer"))).toBeTruthy();
    });

    it("Should render id and className", () => {
        component.id = "myId";
        component.className = "myClassName";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("#myId"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".myClassName"))).toBeTruthy();
    });
});
