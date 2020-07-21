import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HttpClientModule } from "@angular/common/http";
import { NavbarModule } from "../common/navbar/navbar.module";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FooterModule } from "../common/footer/footer.module";
import { TechStackModule } from "../common/tech-stack/tech-stack.module";
import { DisabilityIllustrationComponent } from "../common/illustrations/accessibility/accessibility-illustration.component";
import { DesignTeamIllustrationComponent } from "../common/illustrations/design-team/design-team-illustration.component";
import { AdjustmentsIllustrationComponent } from "../common/illustrations/adjustments/adjustments-illustration.component";

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
    declarations: [HomeComponent, DisabilityIllustrationComponent, DesignTeamIllustrationComponent, AdjustmentsIllustrationComponent],
    imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule, NavbarModule, FooterModule, TechStackModule],
    exports: [RouterModule, DisabilityIllustrationComponent],
})
export class HomeModule {}
