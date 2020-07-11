import { Component } from "@angular/core";
import { urls } from "../../../configs";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
    urls: NavsURLs = urls;
}
