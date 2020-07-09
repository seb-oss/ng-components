import { Component, Input, OnInit } from "@angular/core";
import { APIExtractService } from "../services/api-extract.service";

@Component({
    selector: "app-code-snippet",
    template: `
        <code [lang]="lang">
            <ng-content></ng-content>
        </code>
    `,
    styleUrls: ["./code-snippet.component.scss"]
})
export class CodeSnippetComponent implements OnInit {
    @Input() lang?: string = "";

    constructor(private apiSrv: APIExtractService) {
    }

    ngOnInit() {
      this.apiSrv.initParse("./../footer/footer.component");
    }
}
