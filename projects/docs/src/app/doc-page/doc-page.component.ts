import { Component, OnInit } from "@angular/core";
import { APIExtractService, ApiSection } from "../common/services/api-extract.service";

@Component({
  selector: "app-doc-page",
  templateUrl: "./doc-page.component.html",
  styleUrls: ["./doc-page.component.scss"]
})
export class DocPageComponent implements OnInit {

  constructor(private apiService: APIExtractService) { }

  ngOnInit(): void {
    this.apiService.initParse(require(`!raw-loader!./../../../../ng-components/src/lib/tooltip/tooltip.directive`))
      .subscribe((et: Array<ApiSection>) => {
          console.log(et);
      });
  }

}
