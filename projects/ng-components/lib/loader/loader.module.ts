import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "./loader.component";
import { LoaderClassesPipe } from "./loader.pipe";

@NgModule({
    declarations: [LoaderComponent, LoaderClassesPipe],
    imports: [CommonModule],
    exports: [LoaderComponent],
})
export class LoaderModule {}
