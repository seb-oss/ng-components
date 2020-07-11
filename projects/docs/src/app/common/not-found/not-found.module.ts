import { NgModule } from "@angular/core";
import { NotFoundComponent } from "./not-found.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "", component: NotFoundComponent }];

@NgModule({
    declarations: [NotFoundComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [NotFoundComponent, RouterModule],
})
export class NotFoundModule {}
