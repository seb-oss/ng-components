import { NgModule } from "@angular/core";
import { TabsComponent } from "./tabs.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [TabsComponent],
    declarations: [TabsComponent]
})
export class TabsModule { }
