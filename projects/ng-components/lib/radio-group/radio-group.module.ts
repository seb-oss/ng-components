import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RadioGroupComponent } from "./radio-group.component";
import { RadioGroupSafeHtmlPipe } from "./radio-group-safe.pipe";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [RadioGroupComponent, RadioGroupSafeHtmlPipe],
    exports: [RadioGroupComponent],
})
export class RadioGroupModule {}
