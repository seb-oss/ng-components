import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimerComponent } from "./timer.component";

@NgModule({
    imports: [CommonModule],
    exports: [TimerComponent],
    declarations: [TimerComponent]
})
export class TimerModule { }
