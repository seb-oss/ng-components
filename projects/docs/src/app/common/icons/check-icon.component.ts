import { Component, Input } from "@angular/core";

@Component({
    selector: "app-check-icon",
    template: `
        <svg
            [attr.width]="size"
            [attr.height]="size"
            [attr.fill]="fill"
            viewBox="0 0 16 16"
            class="bi bi-check2"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
            />
        </svg>
    `,
})
export class CheckIconComponent {
    @Input() size: string = "1em";
    @Input() fill: string = "currentColor";
}
