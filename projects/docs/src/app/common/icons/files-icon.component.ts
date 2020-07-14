import { Component, Input } from "@angular/core";

@Component({
    selector: "app-files-icon",
    template: `
        <svg
            [attr.width]="size"
            [attr.height]="size"
            [attr.fill]="fill"
            viewBox="0 0 16 16"
            class="bi bi-files"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                d="M3 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3z"
            />
            <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z" />
        </svg>
    `,
})
export class FilesIconComponent {
    @Input() size: string = "1em";
    @Input() fill: string = "currentColor";
}
