import {
    Component,
    OnInit,
    ViewEncapsulation,
    ElementRef,
    Input,
    TemplateRef,
    ViewChild,
    HostListener,
    Output,
    EventEmitter,
} from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";

export type TooltipTrigger = "hover" | "click" | "focus";

@Component({
    selector: "sebng-tooltip",
    templateUrl: "./tooltip.component.html",
    styleUrls: ["./tooltip.component.scss"],
    animations: [
        trigger("tooltip", [
            transition(":enter", [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))]),
            transition(":leave", [animate(300, style({ opacity: 0 }))]),
        ]),
    ],
    encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent implements OnInit {
    @Input() text: string | TemplateRef<any> = "";
    @Input() isTemplateRef: boolean = false;
    @Input() tooltipReference: ElementRef<HTMLDivElement>;
    @Output() defocus: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild("tooltip") tooltip: ElementRef<HTMLDivElement>;

    onBlur(event: FocusEvent) {
        console.log("test");
        if (!this.tooltipReference.nativeElement.contains(event.relatedTarget as any)) {
            this.defocus.emit(true);
        }
    }

    ngOnInit() {
        this.isTemplateRef = this.text instanceof TemplateRef;
    }
}
