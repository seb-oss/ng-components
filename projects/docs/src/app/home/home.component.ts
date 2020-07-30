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
    designer: GithubContributor = {
        login: "boonying",
        type: "User",
        html_url: "https://www.behance.net/boonying",
        avatar_url: "assets/images/boonying-profile.png",
    };

    constructor(private http: HttpClient) {
        document.title = "SEB Angular Components";
    }

    ngOnInit(): void {
        this.httpSub = this.http.get("https://api.github.com/repos/sebgroup/ng-components/contributors").subscribe({
            next: (data: Array<GithubContributor>) => {
                this.contributors = data.filter(
                    (contributor: GithubContributor) => contributor.type === "User" && contributor.login !== "sebopensource"
                );
            },
        });
    }

    ngOnDestroy(): void {
        this.httpSub?.unsubscribe();
    }
}
