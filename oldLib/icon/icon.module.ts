import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "./icon.component";
import { SafeHtmlPipe } from "./icon.pipe";

@NgModule({
    imports: [CommonModule],
    declarations: [IconComponent, SafeHtmlPipe],
    exports: [IconComponent]
})
export class IconModule { }
