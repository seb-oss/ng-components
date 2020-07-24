import { Injectable } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { startWith, map, distinctUntilChanged, shareReplay } from "rxjs/operators";

const QUERY: Map<QuerySize, string> = new Map([
    ["xl", "(min-width: 1200px)"],
    ["lg", "(min-width: 992px)"],
    ["md", "(min-width: 768px)"],
    ["sm", "(min-width: 576px)"],
    ["xs", "(min-width: 0px)"],
]);

@Injectable()
export class BreakpointService {
    private _size$: Observable<QuerySize>;

    constructor() {
        this._size$ = fromEvent(window, "resize").pipe(
            startWith(this._getScreenSize()),
            map((_: Event) => {
                return this._getScreenSize();
            }),
            distinctUntilChanged(),
            shareReplay(1)
        );
    }

    get size$(): Observable<QuerySize> {
        return this._size$;
    }

    private _getScreenSize(): QuerySize {
        const [[newSize = "never"]] = Array.from(QUERY.entries()).filter(([_, mediaQuery]) => window.matchMedia(mediaQuery).matches);
        return newSize;
    }
}
