import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, ElementRef } from "@angular/core";
import { toggleBodyOverflow } from "@sebgroup/frontend-tools/dist/toggleBodyOverflow";

@Injectable()
export class ModalService {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef,
        private injector: Injector
    ) {}

    /**
     * Append a DOM element to the document body, and add overflow-hidden class to the body tag
     * @param component component of type any that will be appended
     * @returns reference of the toggled component, this is important in case you want to removed the component that was appended
     */
    appendComponentToBody(component: any, className?: string): ComponentRef<any> {
        //create a component reference
        const componentRef: ComponentRef<any> = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

        //Add custom className to component instance
        componentRef.instance.customClass = className;

        // attach component to the appRef.
        this.applicationRef.attachView(componentRef.hostView);

        // get DOM element from component
        const domElem: HTMLElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        document.body.appendChild(domElem);

        toggleBodyOverflow(true);

        return componentRef;
    }

    /**
     * remove a DOM element from the document, remove class overflow-hidden from body tag and destory the ref
     * @param componentRef reference of the component that needs to be removed
     */
    removeComponentFromBody(componentRef: ComponentRef<any>): void {
        this.applicationRef.detachView(componentRef.hostView);

        toggleBodyOverflow(false);

        componentRef.destroy();
    }

    /**
     * add show class to the DOM element using its reference
     * @param ref reference to the component
     */
    open(ref: ElementRef): void {
        ref?.nativeElement?.classList.add("show");
    }

    /**
     * remove show class from the DOM element using its reference
     * @param ref reference to the component
     */
    close(ref: ElementRef): void {
        ref?.nativeElement?.classList.remove("show");
    }
}
