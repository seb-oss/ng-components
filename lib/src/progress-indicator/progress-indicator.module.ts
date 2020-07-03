import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressIndicatorComponent } from "./progress-indicator.component";
@NgModule({
    imports: [CommonModule],
    declarations: [ProgressIndicatorComponent],
    exports: [ProgressIndicatorComponent],
})
export class ProgressIndicatorModule {}
