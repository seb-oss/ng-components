import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartComponent } from "./chart.component";
import { ChartDirective } from "./chart.directive";

// to enable chart.js annotation plugin, we need to import this file
import "chartjs-plugin-annotation";

@NgModule({
    imports: [CommonModule, ChartDirective],
    declarations: [ChartComponent],
    exports: [ChartComponent]
})
export class ChartModule { }
