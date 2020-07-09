import { Component } from "@angular/core";
import pkg from "@pkg";

function clean(version: string): string {
  return version.replace(/^[~^]/g, "");
}

@Component({
  selector: "app-tech-stack",
  templateUrl: "./tech-stack.component.html",
  styleUrls: ["./tech-stack.component.scss"]
})
export class TechStackComponent {
  angularVersion: string = clean(pkg.dependencies["@angular/core"]);
  bootstrapVersion: string = clean(pkg.dependencies["@sebgroup/bootstrap"]);
  typescriptVersion: string = clean(pkg.devDependencies.typescript);
}
