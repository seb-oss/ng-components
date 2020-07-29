import { NgModule } from "@angular/core";
import { NotFoundComponent } from "./not-found.component";
import { CommonModule } from "@angular/common";
import { NotFoundRoutingModule } from "./not-found-routing.module";

@NgModule({
    declarations: [NotFoundComponent],
    imports: [CommonModule, NotFoundRoutingModule],
    exports: [NotFoundComponent],
})
export class NotFoundModule {}
