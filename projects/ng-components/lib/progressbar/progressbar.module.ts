import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressbarComponent } from "./progressbar.component";
import { ProgressThemePipe } from "./progress-theme.pipe";
@NgModule({
    imports: [CommonModule],
    declarations: [ProgressbarComponent, ProgressThemePipe],
    exports: [ProgressbarComponent],
})
export class ProgressbarModule {}
