import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
    httpSub: Subscription;
    contributors: any;
    constructor(private http: HttpClient) {
        document.title = "SEB Angular Components";
    }

    ngOnInit(): void {
        this.httpSub = this.http.get("https://api.github.com/repos/sebgroup/ng-components/contributors").subscribe({
            next: data => {
                this.contributors = data;
            },
        });
    }

    ngOnDestroy(): void {
        this.httpSub?.unsubscribe();
    }
}
