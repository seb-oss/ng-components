import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { AkitaNgRouterStoreModule } from "@datorama/akita-ng-router-store";
import { environment } from "../environments/environment";
import { SebButtonModule, SebModalModule, SebDropdownModule, SebWizardModule } from "@sebgroup/ng-components";
import { ExampleModalComponent } from "./components/example-modal";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [AppComponent, ExampleModalComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        environment.production ? [] : [AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot()],
        SebButtonModule,
        SebModalModule,
        SebDropdownModule,
        SebWizardModule,
        ReactiveFormsModule,
    ],
    entryComponents: [ExampleModalComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
