import { Directive } from "@angular/core";

@Directive({
    selector: "[sebng-modal-title]",
    host: {
        "[class]": '"modal-title"',
    },
})
export class SebModalTitleDirective {}

@Directive({
    selector: "sebng-modal-header, [sebng-modal-header]",
    host: {
        "[class]": '"modal-header"',
    },
})
export class SebModalHeaderDirective {}

@Directive({
    selector: "sebng-modal-body, [sebng-modal-body]",
    host: {
        "[class]": '"modal-body"',
        style: "display:block;",
    },
})
export class SebModalBodyDirective {}

@Directive({
    selector: "sebng-modal-footer, [sebng-modal-footer]",
    host: {
        "[class]": '"modal-footer"',
    },
})
export class SebModalFooterDirective {}
