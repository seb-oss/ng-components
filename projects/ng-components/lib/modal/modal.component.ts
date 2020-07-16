import {
    Component,
    Input,
    ViewEncapsulation,
    ComponentRef,
    HostListener,
    ElementRef,
    ViewChild,
    NgZone,
    Output,
    EventEmitter,
    AfterViewInit,
} from "@angular/core";
import { SebModalBackdropComponent } from "./modal.backdrop";
import { ModalService } from "./modal.service";
import { ModalSizeType, ModalPositionType } from "./modal.type";
import { AnimationEvent } from "@angular/animations";
import { fadeInAnimation } from "./animation";

/** The modal component provides a solid foundation for creating dialogs or slideout modals  */
@Component({
    selector: "sebng-modal",
    styleUrls: ["./modal.component.scss"],
    templateUrl: "./modal.component.html",
    encapsulation: ViewEncapsulation.None,
    animations: [fadeInAnimation],
})
export class ModalComponent implements AfterViewInit {
    /** toggle to show or hide the modal */
    @Input()
    set toggle(param: boolean) {
        param ? this.modalRef && this.open() : this.close();
        this._toggle = param;
    }

    get toggle(): boolean {
        return this._toggle;
    }
    /** Optional id for the modal. */
    @Input() id?: string;
    /** Optional size of the modal window. Types: "modal-lg" | "modal-sm" */
    @Input() size?: ModalSizeType;
    /** Optional Input, toggles a vertically centered Modal. */
    @Input() center?: boolean;
    /** Optional position, toggles the modal from the left or right. Types: "right" | "left" */
    @Input() position: ModalPositionType;
    /** Optional Input, toggles the modal in fullscreen */
    @Input() fullscreen?: boolean;
    /** Optional Input, html class for the modal backdrop */
    @Input() backdropClassName?: string;
    /** Optional Input, if false it disables backdrop click dismiss */
    @Input() backdropDismiss?: boolean = true;
    /** Optional Input, if false it disables escape key dismiss */
    @Input() escapeKeyDismiss?: boolean = true;
    /** Optional custom class to append to the modal. */
    @Input() className?: string;
    /** Optional aria-label attribute value to set on the modal window. */
    @Input() ariaLabel?: string;
    /** Optional aria-labelledby attribute value to set on the modal window. */
    @Input() ariaLabelledby?: string;
    /** Optional aria-describedby attribute value to set on the modal window. */
    @Input() ariaDescribedby?: string;
    /** Optional Input, change the annimation duration, accepts values in second and millisecond ex: "3s" or "3000" */
    @Input() animationDuration?: string = ".15s";
    /** Dismiss modal method Output, use this to set the toggle property to false */
    @Output() onDismiss: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild("modalRef") modalRef: ElementRef;
    backDropRef: ComponentRef<SebModalBackdropComponent>;
    _toggle: boolean = false; // toggle is required to enable the open or close animation

    constructor(private modalService: ModalService, private _ngZone: NgZone) {}

    // Required in case the parent wants to toggle the modal component before the modal view init
    ngAfterViewInit(): void {
        this.toggle && this.open();
    }

    /**
     * construct the class names that needs to be appended to the modal depending on the inputs requested
     * @returns { [key: string]: boolean } key value pair for the positions of the modal
     */
    get modalPosition(): { [key: string]: boolean } {
        return {
            "modal-aside": !!this.position && !this.fullscreen,
            "modal-aside-left": this.position === "left",
            "modal-aside-right": this.position === "right",
            "modal-fullscreen": this.fullscreen,
        };
    }

    /**
     * emit close event when backdrop is clicked
     */
    @HostListener("click", ["$event"])
    onBackdropClick(event: MouseEvent): void {
        if (this.backdropDismiss) {
            if (event && event.target && event.target["classList"] && event.target["classList"].length) {
                const classList: DOMTokenList = event.target["classList"];
                if (classList.contains("modal")) {
                    this.close();
                }
            }
        }
    }

    /**
     * emit close when escape key is clicked
     */
    @HostListener("keyup", ["$event"])
    onEscKey(event: KeyboardEvent): void {
        if (this.escapeKeyDismiss && event.key.toLowerCase() === "escape") {
            this.close();
        }
    }

    /** toggles open and close state for the modal animation */
    get toggleAnimationState(): string {
        return this._toggle ? "open" : "close";
    }

    /**
     * append backrop to the body, open the modal and trigger the animation
     */
    open(): void {
        this.backDropRef = this.modalService.appendComponentToBody(SebModalBackdropComponent, this.backdropClassName);
        this.modalService.open(this.modalRef);
    }

    /**
     * close the modal, trigger the anumation and remove the backdrop from the body using its reference
     */
    close(): void {
        if (this.modalRef) {
            this.toggle && this.onDismiss && this.onDismiss.emit();
            this.modalService.close(this.modalRef);
            this.modalService.removeComponentFromBody(this.backDropRef);
        }
    }

    /**
     * callback when the animation is done
     * @param event
     */
    onAnimationDone(event: AnimationEvent): void {
        if (event.toState === "open") {
            this._ngZone.runOutsideAngular(() => {
                setTimeout(() => this.modalRef.nativeElement.focus(), 0);
            });
        }
    }
}
