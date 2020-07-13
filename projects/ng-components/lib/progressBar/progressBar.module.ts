import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressBarComponent } from "./progressBar.component";
import { ProgressThemePipe } from "./progressTheme.pipe";
@NgModule({
    imports: [CommonModule],
    declarations: [ProgressBarComponent, ProgressThemePipe],
    exports: [ProgressBarComponent],
})
export class ProgressBarsModule {}
