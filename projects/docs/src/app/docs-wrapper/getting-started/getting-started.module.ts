import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GettingStartedComponent } from "./getting-started.component";
import { Routes, RouterModule } from "@angular/router";
import { CodeSnippetModule } from "../../common/code-snippet/code-snippet.module";
import { TechStackModule } from "../../common/tech-stack/tech-stack.module";

const routes: Routes = [{ path: "", component: GettingStartedComponent }];

@NgModule({
    declarations: [GettingStartedComponent],
    imports: [CommonModule, RouterModule.forChild(routes), CodeSnippetModule, TechStackModule],
    exports: [RouterModule, CodeSnippetModule, TechStackModule],
})
export class GettingStartedModule {}
