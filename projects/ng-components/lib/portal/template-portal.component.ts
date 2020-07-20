import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter,
    ViewEncapsulation,
    EmbeddedViewRef,
    TemplateRef,
    ViewContainerRef,
    AfterViewInit,
    OnDestroy,
} from "@angular/core";
import { BasePortal } from "./base-portal.component";

/** Template portal is a component where allow */
@Component({
    selector: "sebng-template-portal",
    encapsulation: ViewEncapsulation.None,
})
export class TemplatePortalComponent<T> extends BasePortal<EmbeddedViewRef<T>> implements AfterViewInit, OnDestroy {
    @Input() templateRef: TemplateRef<T>;
    private viewRef: EmbeddedViewRef<T>;

    constructor(private viewContainerRef: ViewContainerRef) {
        super();
    }

    ngAfterViewInit(): void {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.viewRef.detectChanges();
    }

    ngOnDestroy(): void {
        const index = this.viewContainerRef.indexOf(this.viewRef);
        if (index !== -1) {
            this.viewContainerRef.remove(index);
        }
    }
}
