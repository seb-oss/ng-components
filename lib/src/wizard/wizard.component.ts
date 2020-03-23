import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    QueryList,
} from "@angular/core";
import { SebWizardTitleDirective } from "./wizard-title.directive";
import { SebWizardStepComponent } from "./wizard-step.component";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export interface ISebWizardChangeEvent {
    selectedIndex: number;
    previousIndex: number;
    selectedStep: SebWizardStepComponent;
    previousStep: SebWizardStepComponent;
}

@Component({
    selector: "div[sebng-wizard], sebng-wizard",
    templateUrl: "wizard.component.html",
    host: {
        class: "d-flex flex-column flex-md-row flex-md-row w-100 h-100 border",
    },
})
export class SebWizardComponent implements AfterContentInit, OnDestroy {
    private _ngOnDestroy$: Subject<void> = new Subject<void>();

    @ContentChild(SebWizardTitleDirective, { static: true })
    wizardTitle: SebWizardTitleDirective;
    @ContentChildren(SebWizardStepComponent) wizardSteps: QueryList<SebWizardStepComponent>;

    @Output() change: EventEmitter<ISebWizardChangeEvent> = new EventEmitter<ISebWizardChangeEvent>();

    @Input() hideNavigation: boolean = false;
    @Input() disableNavigation: boolean = false;

    @Input()
    get selectedIndex(): number {
        return this._selectedIndex;
    }
    set selectedIndex(index: number) {
        if (this.wizardSteps) {
            if (this._validIndex(index) && this._validStepControl(index)) {
                this._emitChanges(index);
                this._selectedIndex = index;
                this._changeDetectorRef.markForCheck();
            }
        } else {
            this._selectedIndex = index;
        }
    }
    private _selectedIndex: number = 0;

    @Input()
    get stepWise(): boolean {
        return this._stepWise;
    }
    set stepWise(value: boolean) {
        this._stepWise = `${value}` !== "false";
    }
    private _stepWise: boolean = false;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    public select(wizardStep: SebWizardStepComponent) {
        if (!this.disableNavigation) {
            this.selectedIndex = this.wizardSteps.toArray().indexOf(wizardStep);
        }
    }

    public reset(): void {
        this.selectedIndex = 0;
        this.wizardSteps.forEach((step: SebWizardStepComponent) => step.reset());
        this._changeDetectorRef.markForCheck();
    }

    public next(): void {
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.wizardSteps.length - 1);
    }

    public previous(): void {
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    }

    private _validIndex(index: number): boolean {
        if (index < 0 || index > this.wizardSteps.length - 1) {
            throw Error("SebWizard: selected index is out of bounds");
        }
        return this._selectedIndex !== index;
    }

    private _validStepControl(index: number): boolean {
        const wizardSteps: SebWizardStepComponent[] = this.wizardSteps.toArray();
        wizardSteps[this.selectedIndex].interacted = true;

        if (this.stepWise) {
            return !wizardSteps.slice(0, index).some((wizardStep: SebWizardStepComponent) => {
                const { stepControl } = wizardStep;
                return stepControl ? !stepControl.valid || stepControl.pending || !wizardStep.interacted : !wizardStep.completed;
            });
        }
        return true;
    }

    public disabledWizardStep(index: number): boolean {
        return !this._validStepControl(index);
    }

    private _emitChanges(index: number): void {
        const wizardSteps: SebWizardStepComponent[] = this.wizardSteps.toArray();
        this.change.emit({
            selectedIndex: index,
            previousIndex: this.selectedIndex,
            selectedStep: wizardSteps[index],
            previousStep: wizardSteps[this.selectedIndex],
        });
    }

    ngAfterContentInit(): void {
        this.wizardSteps.changes.pipe(takeUntil(this._ngOnDestroy$)).subscribe(() => this._changeDetectorRef.markForCheck());
    }

    ngOnDestroy(): void {
        this._ngOnDestroy$.next();
        this._ngOnDestroy$.complete();
    }
}
