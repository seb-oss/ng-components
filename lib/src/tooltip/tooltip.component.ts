import {
    Component,
    ViewEncapsulation,
    ElementRef,
    Input,
    TemplateRef,
    ViewChild,
    Output,
    EventEmitter,
    AfterViewInit,
    ChangeDetectorRef,
} from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { TooltipTheme, TooltipTrigger, TooltipPosition } from "./tooltip-content/tooltip-content.component";

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
export class TooltipComponent implements AfterViewInit {
    @Input() content: string | TemplateRef<any> = "";
    @Input() textReference: string = "";
    @Input() tooltipReference: ElementRef<HTMLDivElement>;
    @Input() trigger: TooltipTrigger = "hover";
    @Input() position: TooltipPosition = "top";
    @Input() theme: TooltipTheme = "default";
    @Input() className?: string = "";

    @ViewChild("ngContent") contentref: ElementRef<HTMLDivElement>;

    stringContent: string = "";
    hasContent: boolean = true;

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.hasContent = this.contentref && this.contentref.nativeElement.childNodes.length > 0;
        this.cdr.detectChanges();
    }
}
