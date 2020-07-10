import { NgModule } from "@angular/core";
import { AppCommonModule } from "../app-common.module";
import { NotFoundComponent } from "./not-found.component";

@NgModule({
    declarations: [NotFoundComponent],
    imports: [AppCommonModule],
    exports: [NotFoundComponent],
})
export class NotFoundModule {}
