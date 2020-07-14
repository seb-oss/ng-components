import { trigger, animate, transition, style, state } from "@angular/animations";
import { keyframes } from "@angular/animations";

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
    transition("open <=> close", [animate("{{ time }}")]),
]);
