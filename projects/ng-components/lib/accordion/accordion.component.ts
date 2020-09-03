import {
    Component,
    Input,
    ElementRef,
    ViewChildren,
    QueryList,
    OnInit,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation,
    AfterViewInit,
    ChangeDetectorRef,
    AfterViewChecked,
    OnDestroy,
} from "@angular/core";
import { randomId } from "@sebgroup/frontend-tools";
import { Subscription } from "rxjs";

export type AccordionIconRotation = "deg-180" | "deg-180-counter" | "deg-90" | "deg-90-counter";
export type AccordionContentType = AccordionContent | Array<AccordionContent> | string;
export type AccordionContent = { title?: string; desc?: string };

export interface AccrodionListItem {
    header: string;
    subHeaderText?: string;
    content?: AccordionContentType;
}

export interface AccordionProps {
    className?: string;
    customIcon?: string;
    customIconExpanded?: string;
    iconPosition?: "left" | "right";
    iconRotation?: AccordionIconRotation;
    id?: string;
    list: Array<AccrodionListItem>;
    alternative?: boolean;
    activeIndex?: number;
}
/** Accordions show and hide information that is not necessary at all time with one click. */
@Component({
    selector: "sebng-accordion",
    templateUrl: "./accordion.component.html",
    styleUrls: ["./accordion.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class AccordionComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked, OnDestroy {
    /** Element class name */
    @Input() className?: string;
    /** Custom accordion toggle icon */
    @Input() customIcon?: string;
    /** Custom accordion toggle icon when expanded */
    @Input() customIconExpanded?: string;
    /** Accordion toggle icon position */
    @Input() iconPosition?: "left" | "right";
    /** Accordion toggle icon rotation angle */
    @Input() iconRotation?: AccordionIconRotation;
    /** Element ID */
    @Input() id?: string;
    /** List of accordion items to render */
    @Input() list: Array<AccrodionListItem>;
    /** Alternative accordion design, rendered headers as links */
    @Input() alternative?: boolean;
    /** The index of the default expanded accordion */
    @Input() activeIndex?: number;

    @ViewChildren("accordionItemRefs") accordionItemRefs: QueryList<ElementRef>;

    public idList: Array<string>;
    public accordionClassName: string = "custom-accordion";
    public itemClassName: string = "custom-accordion";
    public active: number = null;

    private aacordionRefSubscription: Subscription;

    public heightList: Array<number>;

    constructor(private changeDetector: ChangeDetectorRef) {}

    /** helper functions */
    constructIds(): void {
        this.idList = this.list.map(() => randomId("accordion-"));
    }

    /** Constructs the `className` to be used in accordion wrapper */
    constructClassName(): void {
        let cn: string = "custom-accordion";
        cn += this.className ? ` ${this.className}` : "";
        cn += this.alternative ? " alternative-accordion" : "";
        this.accordionClassName = cn;
    }

    /** Constructs the `className` to be used in accordion items */
    constructItemClassName(): void {
        let cn: string = "accordion-item";
        cn += " " + (this.iconPosition ? this.iconPosition : "left");
        cn += " " + (this.iconRotation ? this.iconRotation : "deg-180");
        cn += this.customIconExpanded ? " transform" : "";
        this.itemClassName = cn;
    }

    expandOrCollapseSection(itemIndex: number): void {
        const updatedHeightList: Array<number> = Array(this.list?.length).fill(0);
        updatedHeightList[itemIndex] = this.heightList[itemIndex]
            ? 0
            : this.accordionItemRefs?.toArray()[itemIndex]?.nativeElement?.scrollHeight;
        this.heightList = updatedHeightList;
    }

    toggle(index: number): void {
        if (this.active === index) {
            // Section already expanded
            this.expandOrCollapseSection(index);
        } else {
            if (this.active !== null) {
                // Another section is already expanded
                this.expandOrCollapseSection(this.active);
            }
            this.expandOrCollapseSection(index);
        }
        this.active = this.active === index ? null : index;
    }

    contentIsOfTypeArray(content: AccordionContentType): boolean {
        return (Array.isArray && Array.isArray(content)) || content instanceof Array;
    }

    contentTypeElementRef(content: AccordionContentType): boolean {
        return typeof content === "string";
    }

    // events ----------------------------------------------
    /**
     * Handles accordion item click event
     * @param e MouseEvent
     * @param index list index
     */
    onToggle(e: KeyboardEvent | MouseEvent): void {
        const index: number = Number((e.currentTarget as HTMLElement).getAttribute("data-id"));
        if (e.type === "keydown") {
            const key: string = (e as KeyboardEvent).key;
            if ([" ", "space", "enter"].indexOf(key.toLowerCase()) !== -1) {
                this.toggle(index);
                e.preventDefault();
            }
        } else {
            this.toggle(index);
        }
    }

    ngOnInit(): void {
        this.constructIds();
        this.constructClassName();
        this.constructItemClassName();
        this.heightList = Array(this.list?.length).fill(0);
    }

    ngAfterViewInit(): void {
        this.toggle(this.activeIndex);
        this.aacordionRefSubscription = this.accordionItemRefs.changes.subscribe(() => {
            this.toggle(this.activeIndex);
        });
    }

    ngAfterViewChecked(): void {
        this.changeDetector.detectChanges();
    }

    ngOnDestroy(): void {
        this.aacordionRefSubscription.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.list) {
            this.constructIds();
        }

        if (changes.alternative || changes.className) {
            this.constructClassName();
        }

        if (changes.iconRotation || changes.iconPosition || changes.customIconExpanded) {
            this.constructItemClassName();
        }

        if (changes.activeIndex && this.accordionItemRefs) {
            this.toggle(this.activeIndex);
        }
    }
}
