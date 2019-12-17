import { Component, Input, forwardRef, ViewEncapsulation, OnChanges, ViewChild, ElementRef, ViewChildren, QueryList, OnDestroy, NgZone, SimpleChanges } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { fromEvent, Subscription } from "rxjs";

const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropDownComponent),
    multi: true
};

@Component({
    selector: "ac-dropdown",
    templateUrl: "./dropDown.component.html",
    styleUrls: ["./dropDown.component.scss"],
    providers: [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
})
export class DropDownComponent implements ControlValueAccessor, OnChanges, OnDestroy {
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
    @Input() handleChange?: (event: DropdownItem | Array<DropdownItem> | UIEvent) => void;
    @Input() ellipsisMode: boolean;
    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    private _subscriber: Subscription = null;

    private _open = false;
    private _searchText = "";
    private _shouldFocus = true;
    private _currentFocused = -1;

    private _selectedValue: DropdownItem | Array<DropdownItem> = null;
    public allSelected = null;

    set searchText(state: string) {
        if (this._searchText !== state) {
            this._searchText = state;

            this._generateHelperArrays();
        }
    }

    get searchText() {
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

    get open() {
        return this._open;
    }

    set shouldFocus(state: boolean) {
        if (this._shouldFocus !== state) {
            this._shouldFocus = state;
        }
    }

    get shouldFocus() {
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

    get currentFocused() {
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

    get selectedValue() {
        return this._selectedValue;
    }

    // HELPER ARRAYS
    /** array of dropdown item elements with a unique id, the original dropdownItem and calculated selected property */
    public uniqueList: Array<UniqueDropDownItem> = [];
    /** Array of dropdown item elements which should be displayed in the current render cycle */
    public displayList: Array<DisplayDropDownItem> = [];
    /** Array of all dropdown item which are currently selected */
    public selectedList: Array<DropdownItem> = [];

    public toggleButtonId: string = this.getRandomId();

    @ViewChild("dropdownToggleRef", { read: ElementRef }) dropdownToggleRef: ElementRef;
    @ViewChild("dropdownMenuRef", { read: ElementRef }) dropdownMenuRef: ElementRef;
    @ViewChild("searchRef", { read: ElementRef }) searchRef: ElementRef;

    @ViewChildren("listRefs") listRefs: QueryList<ElementRef>;

    getRandomId(): string {
        return (Math.floor(Math.random() * 100) + (new Date()).getTime()).toString();
    }

    handleFocus(): void {
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                const focusSuccess = this.focusCurrentItem();
                if (!focusSuccess) {
                    this.setInitialFocus();
                }
            }, 0);
        });
    }

    focusCurrentItem(): boolean {
        if (this.shouldFocus && this.listRefs.toArray()[this.currentFocused] && this.listRefs.toArray()[this.currentFocused].nativeElement) {
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
        this._subscriber = fromEvent(document, "mousedown").subscribe((event) => {
            if (
                (this.dropdownToggleRef && this.dropdownToggleRef.nativeElement && !this.dropdownToggleRef.nativeElement.contains(event.target))
                &&
                (this.dropdownMenuRef && this.dropdownMenuRef.nativeElement && !this.dropdownMenuRef.nativeElement.contains(event.target))
                &&
                this.open
            ) {
                this.open = false;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.list && changes.list.previousValue !== changes.list.currentValue) {
            this._generateHelperArrays();
        }
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }

    private _generateHelperArrays(caller?: string) {
        // console.log("_generateHelperArrays called from: ", caller);
        this.uniqueList = this.list && this.list.filter((e) => (e && e.hasOwnProperty("value") && e.hasOwnProperty("text"))).map((e, i) => {
            const id = `${e.value}-${i}`;
            let selected = false;

            if (!this.multi) {
                if ((this.selectedValue as DropdownItem) && e.value === (this.selectedValue as DropdownItem).value) {
                    selected = true;
                }
            } else {
                if ((this.selectedValue as Array<DropdownItem>) && (this.selectedValue as Array<DropdownItem>).find((el) => el.value === e.value)) {
                    selected = true;
                }
            }
            return { dropdownItem: e, id, selected };
        });

        this.displayList = this.uniqueList && this.uniqueList.map((e, i) => {
            return {
                ...e,
                className: `dropdown-item custom-dropdown-item${this.multi ? " multi" : ""}${e.selected ? " selected" : ""}`,
            };
        }).filter((e) => e && e.dropdownItem && e.dropdownItem.value && e.dropdownItem.value.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1); // filtering based on current search term

        this.selectedList = this.uniqueList && this.uniqueList.filter((e) => e.selected).map((e) => e.dropdownItem);
        this.allSelected = (this.selectedList && this.uniqueList) ? this.selectedList.length === this.uniqueList.length : false;

        if (this.multi && this.searchText.length === 0) {
            this.displayList = [
                {
                    id: "select-all",
                    dropdownItem: {
                        value: "select-all",
                        text: "Select All",
                    },
                    selected: this.allSelected,
                    className: `dropdown-item select-all custom-dropdown-item multi${(this.allSelected) ? " selected" : ""}`,
                },
                ...this.displayList
            ];
        }
    }

    /** The native event function that runs when a keyboard button is pressed on dropdown toggle */
    handleKeyDownToggle(event: any): void {
        if (this.disabled) {
            return;
        }

        const key = event.key.toLowerCase();

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
    handleKeyDownMenu(event: any): void {
        this.shouldFocus = true;
        const key = event.key.toLowerCase();
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
                        this.dropdownItemSelected(this.displayList[this.currentFocused].dropdownItem);
                    }
                    break;
                case "arrowdown":
                case "down":
                    event.preventDefault();
                    if (this.currentFocused < (this.displayList.length - 1)) {
                        this.currentFocused = this.currentFocused + 1;
                    } else if (this.currentFocused === (this.displayList.length - 1)) {
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
    handleClickClear(event: any): void {
        if (this.disabled) {
            return;
        }

        event.stopPropagation();
        event.preventDefault();

        this.handleClear();
    }

    /** Function which handles the logic of setting the native onChange prop (and sets the internal selected value as well) */
    handleNativeOnChange(event: any): void {
        // console.log("handleNativeOnChange: ", event.target.options);
        if (!this.multi) {
            const item = this.list.filter((e) => e.value === event.target.value)[0];
            this.handleChange && this.handleChange(event);
            this.selectedValue = item;
        } else {
            const items = Array.from(event.target.options as HTMLOptionsCollection).filter((e) => e.selected).map((e) => {
                const item = this.list.filter((el) => el.value === e.value)[0];
                return item;
            });
            this.handleChange && this.handleChange(event);
            this.selectedValue = items;
        }
    }

    /** Function which handles the logic of setting the non-native onChange prop (and sets the internal selected value as well) */
    handleOnChange(value: DropdownItem | Array<DropdownItem>): void {
        this.handleChange && this.handleChange(value);
        this.selectedValue = value;
    }

    /** Function containing the clear button logic */
    handleClear(): void {
        this.handleOnChange(null);
        this.open = false;
    }

    /** The native onchange event function that runs when the search input value changes */
    handleOnChangeSearch(event: any): void {
        if (this.currentFocused !== -1) {
            this.currentFocused = -1;
        }
        this.searchText = event.target.value;
    }

    /** Function containing the select dropdown item logic */
    dropdownItemSelected(item: DropdownItem): void {
        if (!this.multi) {
            const newItem = { ...item };
            this.handleOnChange(newItem);
            this.open = false;
        } else {
            const currentList = (this.selectedValue as Array<DropdownItem>) ? this.selectedValue as Array<DropdownItem> : [];
            const index = currentList.findIndex((e) => e.value === item.value);
            if (index === -1) {
                const newItem = { ...item };
                const newList = [...currentList, newItem];
                this.handleOnChange(newList);
            } else {
                const newList = currentList.filter((e) => e.value !== item.value);
                this.handleOnChange(newList);
            }
        }
        this.handleFocus();
    }

    /** The native event function that runs when the dropdown button is clicked */
    handleClickToggle(event: any): void {
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
        }
        if (this.selectedList && this.selectedList.length > 0) {
            if (this.allSelected) {
                return `All selected (${this.selectedList.length})`;
            }
            if (this.multi) {
                if (this.selectedList.length === 1) {
                    return this.selectedList[0].text;
                }
                return this.selectedList.length + " Selected"; // TODO should be like this example: 1st Item, 2nd Item... (+2)
            }
            return (this.selectedValue as DropdownItem).text;
        }

        return (this.placeHolder && this.placeHolder.length) ? this.placeHolder : "Select ...";
    }

    handleDropdownItemOnMouseMove(event: any, index: number): void {
        this.currentFocused = index;
        this.shouldFocus = false;
    }

    handleDropdownItemOnClick(event: any, index: number, item: DisplayDropDownItem): void {
        event.preventDefault();
        this.shouldFocus = true;

        if (this.multi && this.searchText.length === 0 && index === 0) {
            this.handleSelectAll();
        } else {
            this.dropdownItemSelected(item.dropdownItem);
        }
    }

    writeValue(value: any): void {
        this.selectedValue = value;
    }
    registerOnChange(fn: any): void { this.onChangeCallback = fn; }
    registerOnTouched(fn: any): void { this.onTouchedCallback = fn; }
}

/**
 * Dropdown item interface
 * @member {string} text The text to be displayed in the list
 * @member {any} value The value of the dropdown item
 */
export interface DropdownItem {
    /** The text to be displayed in the list */
    text: string;
    /** The value of the dropdown item */
    value: any;
}

interface UniqueDropDownItem {
    id: string;
    dropdownItem: DropdownItem;
    selected: boolean;
}

interface DisplayDropDownItem extends UniqueDropDownItem {
    className: string;
}
