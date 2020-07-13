import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { TabsListItem } from "@sebgroup/ng-components/tabs";
import { APIExtractService } from "../../common/services/api-extract.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: "app-doc-page",
    templateUrl: "./doc-page.component.html",
    styleUrls: ["./doc-page.component.scss"],
})
export class DocPageComponent implements OnInit, OnDestroy {
    paramSub: Subscription;
    apiSub: Subscription;
    section: number = 0;
    name: string;
    description: string;
    inputs: Array<APIInputs>;
    outputs: Array<APIOutputs>;
    tabList: Array<TabsListItem> = [{ text: "Playground" }, { text: "APIs" }];
    tabListWithNotes: Array<TabsListItem> = [{ text: "Playground" }, { text: "APIs" }, { text: "Notes" }];

    @Input() importString: string;

    constructor(private apiService: APIExtractService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        if (this.importString) {
            try {
                this.apiSub = this.apiService.initParse(this.importString).subscribe((data: Array<ApiSection>) => {
                    if (data.length) {
                        console.log(data[0]);
                        this.name = data[0].name.replace("Component", "");
                        this.description = data[0].description;
                        this.inputs = data[0].properties;
                        this.outputs = data[0].outputs;
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
        this.paramSub = this.route.queryParams.subscribe((params: Params) => {
            switch (params?.section) {
                case "playground":
                    this.section = 0;
                    break;
                case "apis":
                    this.section = 1;
                    break;
                case "notes":
                    this.section = 2;
                    break;
                default:
                    this.section = 0;
            }
        });
    }

    afterTabChange(e: number): void {
        if (!isNaN(e)) {
            this.section = e;
            switch (this.section) {
                case 0:
                    this.removeSectionFromQueryParams();
                    break;
                case 1:
                    this.addSectionToQueryParams("apis");
                    break;
                case 2:
                    this.addSectionToQueryParams("notes");
                    break;
            }
        }
    }

    addSectionToQueryParams(section: string): void {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { section },
            queryParamsHandling: "merge",
        });
    }

    removeSectionFromQueryParams(): void {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: null,
        });
    }

    ngOnDestroy(): void {
        this.paramSub?.unsubscribe();
        this.apiSub?.unsubscribe();
    }
}
