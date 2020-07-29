import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ScullyLibModule } from "@scullyio/ng-lib";
import { LoaderModule } from "@sebgroup/ng-components/loader";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    declarations: [AppComponent],
    imports: [CommonModule, BrowserModule, BrowserAnimationsModule, AppRoutingModule, ScullyLibModule, LoaderModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
