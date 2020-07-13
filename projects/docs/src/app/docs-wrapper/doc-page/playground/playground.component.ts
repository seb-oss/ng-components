import { Component } from "@angular/core";

@Component({
    selector: "app-doc-playground",
    templateUrl: "./playground.component.html",
    styleUrls: ["./playground.component.scss"],
})
export class PlaygroundComponent {
    navs: string[] = ["Component", "Code"];
    activeTab: number = 0;

    switchTab(e: MouseEvent): void {
        e.preventDefault();
        const index: number = parseFloat((e.target as HTMLAnchorElement).dataset.value);
        if (!isNaN(index)) {
            this.activeTab = index;
        }
    }
}
