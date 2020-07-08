import { trigger, animate, transition, style, state } from "@angular/animations";

export const fadeInAnimation = trigger("openClose", [
    state(
        "block",
        style({
            display: "block",
        })
    ),
    state(
        "none",
        style({
            display: "none",
        })
    ),
    transition("none => block", [style({ display: "block" }), animate("{{ time }}")]),
]);
