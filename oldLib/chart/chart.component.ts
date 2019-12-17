import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "ac-chart",
    templateUrl: "./chart.component.html",
    styleUrls: ["./chart.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class ChartComponent {
    @Input() chartType: string;
    @Input() datasets: Array<any> = [];
    @Input() labels: Array<any> = [];
    @Input() options?: any = {};
    @Input() colors?: Array<any>;
    @Input() legend?: boolean;
    @Input() className?: string;
    @Input() clickAction?: (e: any) => void;
    @Input() hoverAction?: (e: any) => void;

    chartClicked(e: any): void {
        if (this.clickAction) { this.clickAction(e); }
    }

    chartHovered(e: any): void {
        if (this.hoverAction) { this.hoverAction(e); }
    }
}
