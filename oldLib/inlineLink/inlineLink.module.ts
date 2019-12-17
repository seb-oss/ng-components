import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InlineLinkComponent } from "./inlineLink.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        InlineLinkComponent
    ],
    exports: [
        InlineLinkComponent
    ]
})
export class InlineLinkModule { }
