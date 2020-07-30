import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GettingStartedComponent } from "./getting-started.component";
import { CodeSnippetModule } from "../../common/code-snippet/code-snippet.module";
import { TechStackModule } from "../../common/tech-stack/tech-stack.module";
import { GettingStartedRoutingModule } from "./getting-started-routing.module";

@NgModule({
    declarations: [GettingStartedComponent],
    imports: [CommonModule, GettingStartedRoutingModule, CodeSnippetModule, TechStackModule],
    exports: [CodeSnippetModule, TechStackModule],
})
export class GettingStartedModule {}
