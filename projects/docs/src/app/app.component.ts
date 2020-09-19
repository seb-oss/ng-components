import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from "@angular/router";
import { MetaService } from "@services/meta.service";
import components from "@assets/components-list.json";

@Component({
    selector: "app-root",
    template: `
        <sebng-loader [toggle]="loading" [fullscreen]="true">Loading...</sebng-loader>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent implements OnInit {
    loading: boolean = false;
    components: Array<string> = components.map((item: ComponentsListItem) => item.name);

    constructor(private router: Router, private metaSrv: MetaService) {}

    ngOnInit(): void {
        this.metaSrv.initMetaConfiguration();
        this.router.events.subscribe(event => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.loading = true;
                    break;
                }
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this.loading = false;
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }
}
