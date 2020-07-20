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
    ViewChild,
} from "@angular/core";
import { BasePortal } from "./base-portal.component";

/** Template portal is a component where allow */
@Component({
    selector: "sebng-template-portal",
    template: `<ng-template #portalTemplate><ng-content></ng-content></ng-template>`,
    encapsulation: ViewEncapsulation.None,
})
export class TemplatePortalComponent<T> extends BasePortal<EmbeddedViewRef<T>> implements AfterViewInit, OnDestroy {
    @Input() hostId: string;
    @Input() templateRef: TemplateRef<T>;
    @ViewChild("portalTemplate") portalTemplateRef: TemplateRef<any>;
    private viewRef: EmbeddedViewRef<T>;

    constructor(private viewContainerRef: ViewContainerRef) {
        super();
    }

    ngAfterViewInit(): void {
        if (!this.templateRef) {
            this.templateRef = this.portalTemplateRef;
        }
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.viewRef.detectChanges();

        this.attachToHost();
    }

    ngOnDestroy(): void {
        const index = this.viewContainerRef.indexOf(this.viewRef);
        if (index !== -1) {
            this.viewContainerRef.remove(index);
        }
    }

    attachToHost(): void {
        // attach the view to the DOM element that matches our selector
        this.viewRef.rootNodes.forEach(rootNode => this.getHost(this.hostId).appendChild(rootNode));
    }
}
