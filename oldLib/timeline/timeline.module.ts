import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimelineComponent } from "./timeline.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [TimelineComponent],
    declarations: [TimelineComponent]
})
export class TimelineModule { }
