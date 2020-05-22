import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, ElementRef } from "@angular/core";
import { toggleBodyOverflow } from "@sebgroup/frontend-tools/dist/toggleBodyOverflow";

@Injectable()
export class ModalService {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef,
        private injector: Injector
    ) {}

    appendComponentToBody(component: any): ComponentRef<any> {
        //create a component reference
        const componentRef: ComponentRef<any> = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

        // attach component to the appRef.
        this.applicationRef.attachView(componentRef.hostView);

        // get DOM element from component
        const domElem: HTMLElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        document.body.appendChild(domElem);
        toggleBodyOverflow(true);

        return componentRef;
    }

    removeComponentFromBody(componentRef: ComponentRef<any>): void {
        this.applicationRef.detachView(componentRef.hostView);
        toggleBodyOverflow(false);
        componentRef.destroy();
    }

    open(ref: ElementRef): void {
        ref.nativeElement.classList.add("show");
    }

    close(ref: ElementRef): void {
        ref.nativeElement.classList.remove("show");
    }
}
