import { trigger, animate, transition, style, state } from "@angular/animations";

export const fadeInAnimation = trigger("openClose", [
    state(
        "open",
        style({
            display: "block",
        })
    ),
    state(
        "close",
        style({
            display: "none",
        })
    ),
    transition("close => open", [style({ display: "block" }), animate("{{ time }}")]),
]);
