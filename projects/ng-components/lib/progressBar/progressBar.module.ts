import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressBarComponent } from "./progressbar.component";
import { ProgressThemePipe } from "./progress-theme.pipe";
@NgModule({
    imports: [CommonModule],
    declarations: [ProgressBarComponent, ProgressThemePipe],
    exports: [ProgressBarComponent],
})
export class ProgressBarModule {}
