import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalComponent } from "../../../../../../../../../lib/src/modal/modal.component";
import { WizardFormsComponent } from "../wizard-forms/wizard-forms.component";

@Component({
    templateUrl: "wizard.component.html",
})
export class WizardComponent {
    @ViewChild(ModalComponent) modalChild: ModalComponent;

    public launchWizardForms() {
        this.modalChild.open();
        // this.modal.open();
    }
}
