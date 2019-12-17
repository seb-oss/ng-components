import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StepTrackerComponent } from "./stepTracker.component";
import { SafeHtmlPipe } from "./stepTracker.pipe";

@NgModule({
    imports: [CommonModule],
    exports: [StepTrackerComponent],
    declarations: [StepTrackerComponent, SafeHtmlPipe]
})
export class StepTrackerModule { }
