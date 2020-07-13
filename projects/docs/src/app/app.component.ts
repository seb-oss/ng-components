import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, OnDestroy {
    title = "docs";

    ngOnInit(): void {
        document.addEventListener("keyup", this.toggleSideMenu);
    }

    toggleSideMenu = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "`") {
            // TODO: implement this console.log("NOW");
        }
    };

    ngOnDestroy(): void {
        document.removeEventListener("keyup", this.toggleSideMenu);
    }
}
