import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-rating",
    templateUrl: "./rating.component.html",
})
export class RatingComponent {
    docMD: string;
    startValue: number = 3.5;
    tooltipList: Array<string> = ["Worst", "Bad", "Ok", "Good", "Great"];
}
