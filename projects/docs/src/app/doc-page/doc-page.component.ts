import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { APIExtractService } from "../common/services/api-extract.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-doc-page",
    templateUrl: "./doc-page.component.html",
    styleUrls: ["./doc-page.component.scss"],
})
export class DocPageComponent implements OnInit, OnDestroy {
    paramSub: Subscription;
    apiSub: Subscription;
    name: string;

    @Input() importString: string;

    description: string;

    constructor(private apiService: APIExtractService) {}

    ngOnInit(): void {
        if (this.importString) {
            try {
                this.apiSub = this.apiService.initParse(this.importString).subscribe((data: Array<ApiSection>) => {
                    if (data.length) {
                        console.log(data[0]);
                        this.name = data[0].name.replace("Component", "");
                        this.description = data[0].description;
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
    }

    ngOnDestroy(): void {
        this.paramSub?.unsubscribe();
        this.apiSub?.unsubscribe();
    }
}
