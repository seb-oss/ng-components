import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { urls } from "@configs";
import { BreakpointService } from "@services/breakpoint.service";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, OnDestroy {
    urls: NavsURLs = urls;
    toggle: boolean = false;
    isMobile: boolean = false;

    private _breakpointSub: Subscription;

    constructor(private breakpoint: BreakpointService) {}

    ngOnInit(): void {
        this._breakpointSub = this.breakpoint.size$.subscribe({
            next: (size: QuerySize) => {
                if (size === "sm" || size === "xs") {
                    // Only change the value if it's `false`, otherwise, no need to trigger re-render
                    if (!this.isMobile) {
                        this.isMobile = true;
                    }
                } else {
                    // Only change the value if it's `true`, otherwise, no need to trigger re-render
                    if (this.isMobile) {
                        this.isMobile = false;
                    }
                }
            },
        });
    }

    ngOnDestroy(): void {
        this._breakpointSub && this._breakpointSub.unsubscribe();
    }
}
