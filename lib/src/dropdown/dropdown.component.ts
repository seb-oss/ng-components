import {
    Component,
    Input,
    forwardRef,
    OnChanges,
    ViewChild,
    ElementRef,
    ViewChildren,
    QueryList,
    OnDestroy,
    NgZone,
    SimpleChanges,
    Provider,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { fromEvent, Subscription } from "rxjs";

export interface DropdownItem {
    /** The label or text to be displayed in the list */
    label: string;
    /** any value which should be tied to the item */
    value: any;
    /** The id or the unique key of the item */
    key: string;
}

interface UniqueItem {
    id: string;
    optionItem: DropdownItem;
    selected: boolean;
}

interface DisplayItem extends UniqueItem {
    className: string;
}

const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true,
};

@Component({
    selector: "sebng-dropdown",
    templateUrl: "./dropdown.component.html",
    styleUrls: ["./dropdown.component.scss"],
    providers: [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR],
})
export class DropdownComponent implements ControlValueAccessor, OnChanges, OnDestroy {
    @Input() name: string;
    @Input() list: Array<DropdownItem>;
    @Input() id?: string;
    @Input() label?: string;
    @Input() error?: string;
    @Input() placeHolder?: string;
    @Input() className?: string;
    @Input() disabled?: boolean = false;
    @Input() native?: boolean = false;
    @Input() multi?: boolean;
    @Input() clearable?: boolean = false;
    @Input() searchable?: boolean = false;
    @Input() searchPlaceholder?: string = "";
    @Input() nativeOnChange?: (event: DropdownItem | Array<DropdownItem> | UIEvent) => void;
    @Input() ellipsisMode: boolean;
    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    private _subscriber: Subscription = null;

    private _open: boolean = false;
    private _searchText: string = "";
    private _shouldFocus: boolean = true;
    private _currentFocused: number = -1;

    private _selectedValue: DropdownItem | Array<DropdownItem> = null;
    public allSelected: boolean = null;

    set searchText(state: string) {
        if (this._searchText !== state) {
            this._searchText = state;

            this._generateHelperArrays();
        }
    }

    get searchText(): string {
        return this._searchText || "";
    }

    set open(state: boolean) {
        if (this._open !== state) {
            this._open = state;
        }

        if (state) {
            this.handleFocus();
        } else {
            this.searchText = "";
            if (this.currentFocused > -1) {
                this.currentFocused = -1;
            }
        }
    }

    get open(): boolean {
        return this._open;
    }

    set shouldFocus(state: boolean) {
        if (this._shouldFocus !== state) {
            this._shouldFocus = state;
        }
    }

    get shouldFocus(): boolean {
        return this._shouldFocus || false;
    }

    set currentFocused(state: number) {
        if (this._currentFocused !== state) {
            this._currentFocused = state;
        }

        if (this.open) {
            this.handleFocus();
        }
    }

    get currentFocused(): number {
        return this._currentFocused;
    }

    set selectedValue(state: DropdownItem | Array<DropdownItem>) {
        if (state !== this._selectedValue) {
            this._selectedValue = state;
            this.onChangeCallback && this.onChangeCallback(state);
            this.onTouchedCallback && this.onTouchedCallback();

            this._generateHelperArrays();
        }
    }

    get selectedValue(): DropdownItem | Array<DropdownItem> {
        return this._selectedValue;
    }

    // HELPER ARRAYS
    /** array of dropdown item elements with a unique id, the original optionItem and calculated selected property */
    public uniqueList: Array<UniqueItem> = [];
    /** Array of dropdown item elements which should be displayed in the current render cycle */
    public displayList: Array<DisplayItem> = [];
    /** Array of all dropdown item which are currently selected */
    public selectedList: Array<DropdownItem> = [];

    public toggleButtonId: string = this.getRandomId();

    @ViewChild("dropdownToggleRef", { read: ElementRef, static: false }) dropdownToggleRef: ElementRef;
    @ViewChild("dropdownMenuRef", { read: ElementRef, static: false }) dropdownMenuRef: ElementRef;
    @ViewChild("searchRef", { read: ElementRef, static: false }) searchRef: ElementRef;

    @ViewChildren("listRefs") listRefs: QueryList<ElementRef>;

    getRandomId(): string {
        return (Math.floor(Math.random() * 100) + new Date().getTime()).toString();
    }

    handleFocus(): void {
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                if (!this.focusCurrentItem()) {
                    this.setInitialFocus();
                }
            }, 0);
        });
    }

    focusCurrentItem(): boolean {
        if (
            this.shouldFocus &&
            this.listRefs.toArray()[this.currentFocused] &&
            this.listRefs.toArray()[this.currentFocused].nativeElement
        ) {
            this.listRefs.toArray()[this.currentFocused].nativeElement.focus();
            return true;
        }
        return null;
    }

    setInitialFocus(): void {
        if (this.searchRef && this.searchRef.nativeElement) {
            this.searchRef.nativeElement.focus();
        } else if (this.dropdownMenuRef && this.dropdownMenuRef.nativeElement) {
            this.dropdownMenuRef.nativeElement.focus();
        }
    }

    constructor(private _ngZone: NgZone) {
        this._subscriber = fromEvent(document, "mousedown").subscribe(event => {
            if (
                this.dropdownToggleRef &&
                this.dropdownToggleRef.nativeElement &&
                !this.dropdownToggleRef.nativeElement.contains(event.target) &&
                this.dropdownMenuRef &&
                this.dropdownMenuRef.nativeElement &&
                !this.dropdownMenuRef.nativeElement.contains(event.target) &&
                this.open
            ) {
                this.open = false;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.list && changes.list.previousValue !== changes.list.currentValue) {
            this._generateHelperArrays();
        }
    }

    ngOnDestroy(): void {
        this._subscriber.unsubscribe();
    }

    /** internal generate helper array function. Should be run on every change where the helper arrays need to be regenerated */
    private _generateHelperArrays(): void {
        this.uniqueList =
            this.list &&
            this.list
                .filter((e: DropdownItem) => e && e.hasOwnProperty("key") && e.hasOwnProperty("value") && e.hasOwnProperty("label"))
                .map((e: DropdownItem, i: number) => {
                    const id = `${e.key}-${i}`;
                    let selected = false;

                    if (!this.multi) {
                        if ((this.selectedValue as DropdownItem) && e.key === (this.selectedValue as DropdownItem).key) {
                            selected = true;
                        }
                    } else {
                        if (
                            (this.selectedValue as Array<DropdownItem>) &&
                            (this.selectedValue as Array<DropdownItem>).find((el: DropdownItem) => el.key === e.key)
                        ) {
                            selected = true;
                        }
                    }
                    return { optionItem: e, id, selected };
                });

        this.displayList =
            this.uniqueList &&
            this.uniqueList
                .map((e: UniqueItem) => {
                    return {
                        ...e,
                        className: `dropdown-item custom-dropdown-item${this.multi ? " multi" : ""}${e.selected ? " selected" : ""}`,
                    };
                })
                .filter(
                    (e: UniqueItem) =>
                        e &&
                        e.optionItem &&
                        e.optionItem.label &&
                        e.optionItem.label
                            .toString()
                            .toLowerCase()
                            .indexOf(this.searchText.toLowerCase()) !== -1
                );

        this.selectedList = this.uniqueList && this.uniqueList.filter((e: UniqueItem) => e.selected).map((e: UniqueItem) => e.optionItem);
        this.allSelected = this.selectedList && this.uniqueList ? this.selectedList.length === this.uniqueList.length : false;

        if (this.multi && this.searchText.length === 0) {
            this.displayList = [
                {
                    id: "select-all",
                    optionItem: {
                        key: "select-all",
                        value: "Select All",
                        label: "Select All",
                    },
                    selected: this.allSelected,
                    className: `dropdown-item select-all custom-dropdown-item multi${this.allSelected ? " selected" : ""}`,
                },
                ...this.displayList,
            ];
        }
    }

    /** The native event function that runs when a keyboard button is pressed on dropdown toggle */
    handleKeyDownToggle(event: KeyboardEvent): void {
        if (this.disabled) {
            return;
        }

        const key: string = event.key.toLowerCase();

        switch (key) {
            case "tab":
                this.open = false;
                break;
            case " ":
            case "enter":
                event.preventDefault();
                this.open = true;
                break;
            default:
                break;
        }
    }

    /** The native event function that runs when a keyboard button is pressed on dropdown menu */
    handleKeyDownMenu(event: KeyboardEvent): void {
        this.shouldFocus = true;
        const key: string = event.key.toLowerCase();
        if (this.open) {
            switch (key) {
                case "tab":
                case "escape":
                    this.open = false;
                    break;
                case "enter":
                    event.preventDefault();
                    if (this.multi && this.searchText.length === 0 && this.currentFocused === 0) {
                        this.handleSelectAll();
                    } else if ((this.searchText.length === 0 && this.currentFocused > 0) || this.searchText.length > 0) {
                        this.optionItemSelected(this.displayList[this.currentFocused].optionItem);
                    }
                    break;
                case "arrowdown":
                case "down":
                    event.preventDefault();
                    if (this.currentFocused < this.displayList.length - 1) {
                        this.currentFocused = this.currentFocused + 1;
                    } else if (this.currentFocused === this.displayList.length - 1) {
                        this.currentFocused = -1;
                    }
                    break;
                case "arrowup":
                case "up":
                    event.preventDefault();
                    if (this.currentFocused === -1) {
                        this.currentFocused = this.displayList.length - 1;
                    } else if (this.currentFocused > 0) {
                        this.currentFocused = this.currentFocused - 1;
                    } else if (this.currentFocused === 0) {
                        this.currentFocused = -1;
                    }
                    break;

                default:
                    break;
            }
        }
    }

    /** The native event function that runs when the clean icon is clicked */
    handleClickClear(event: MouseEvent): void {
        if (this.disabled) {
            return;
        }

        event.stopPropagation();
        event.preventDefault();

        this.handleClear();
    }

    /** Function which handles the logic of setting the native onChange prop (and sets the internal selected value as well) */
    handleNativeOnChange(event: UIEvent): void {
        if (!this.multi) {
            const item: DropdownItem = this.list.filter((e: DropdownItem) => e.key === (event.target as HTMLSelectElement).value)[0];
            this.nativeOnChange && this.nativeOnChange(event);
            this.selectedValue = item;
        } else {
            const items: Array<DropdownItem> = Array.from((event.target as HTMLSelectElement).options as HTMLOptionsCollection)
                .filter(e => e.selected)
                .map(e => {
                    const item = this.list.filter((el: DropdownItem) => el.key === e.value)[0];
                    return item;
                });
            this.nativeOnChange && this.nativeOnChange(event);
            this.selectedValue = items;
        }
    }

    /** Function which handles the logic of setting the non-native onChange prop (and sets the internal selected value as well) */
    handleOnChange(value: DropdownItem | Array<DropdownItem>): void {
        this.nativeOnChange && this.nativeOnChange(value);
        this.selectedValue = value;
    }

    /** Function containing the clear button logic */
    handleClear(): void {
        this.handleOnChange(null);
        this.open = false;
    }

    /** The native onchange event function that runs when the search input value changes */
    handleOnChangeSearch(event: KeyboardEvent): void {
        if (this.currentFocused !== -1) {
            this.currentFocused = -1;
        }
        this.searchText = (event.target as HTMLInputElement).value;
    }

    /** Function containing the select dropdown item logic */
    optionItemSelected(item: DropdownItem): void {
        if (!this.multi) {
            const newItem: DropdownItem = { ...item };
            this.handleOnChange(newItem);
            this.open = false;
        } else {
            const currentList: Array<DropdownItem> = (this.selectedValue as Array<DropdownItem>)
                ? (this.selectedValue as Array<DropdownItem>)
                : [];
            const index: number = currentList.findIndex((e: DropdownItem) => e.key === item.key);
            if (index === -1) {
                const newItem: DropdownItem = { ...item };
                const newList: Array<DropdownItem> = [...currentList, newItem];
                this.handleOnChange(newList);
            } else {
                const newList: Array<DropdownItem> = currentList.filter((e: DropdownItem) => e.key !== item.key);
                this.handleOnChange(newList);
            }
        }
        this.handleFocus();
    }

    /** The native event function that runs when the dropdown button is clicked */
    handleClickToggle(event: MouseEvent): void {
        if (!this.disabled) {
            this.open = !this.open;
        }
    }

    /** Function containing the select all button logic */
    handleSelectAll(): void {
        if (this.allSelected) {
            this.handleOnChange([]);
        } else {
            this.handleOnChange(this.list);
        }
        this.handleFocus();
    }

    // HELPERS ================================
    /** Returns the appropriate title for different situations and component types */
    getTitleLabel() {
        if (this.uniqueList && this.uniqueList.length === 0) {
            return "Empty";
        } else if (this.selectedList && this.selectedList.length > 0) {
            if (this.allSelected) {
                return `All selected (${this.selectedList.length})`;
            } else if (this.multi) {
                if (this.selectedList.length === 1) {
                    return this.selectedList[0].label;
                }
                return this.selectedList
                    .map((item: DropdownItem, index: number) => {
                        if (index > 0) {
                            return ` ${item.label}`;
                        } else {
                            return item.label;
                        }
                    })
                    .toString();
            }
            return (this.selectedValue as DropdownItem).label;
        }

        return this.placeHolder && this.placeHolder.length ? this.placeHolder : "Select ...";
    }

    handleItemOnMouseMove(event: MouseEvent, index: number): void {
        this.currentFocused = index;
        this.shouldFocus = false;
    }

    handleItemOnClick(event: MouseEvent, index: number, item: DisplayItem): void {
        event.preventDefault();
        this.shouldFocus = true;

        if (this.multi && this.searchText.length === 0 && index === 0) {
            this.handleSelectAll();
        } else {
            this.optionItemSelected(item.optionItem);
        }
    }

    writeValue(value: any): void {
        this.selectedValue = value;
    }
    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }
}
