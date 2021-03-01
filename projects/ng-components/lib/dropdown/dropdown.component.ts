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
    Provider,
    HostBinding,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { fromEvent, Subscription } from "rxjs";

const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true,
};

export interface DropdownPlaceholders {
    searchText?: string;
    selectAllOptionText?: string;
    selectAllText?: string;
    emptyText?: string;
    noResultText?: string;
}

/**
 * A dropdown allows the user to select an option from a list.
 * Dropdowns enables users to make a quick selection of the available options for a specific entry.
 */
@Component({
    selector: "sebng-dropdown",
    templateUrl: "./dropdown.component.html",
    styleUrls: ["./dropdown.component.scss"],
    providers: [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR],
})
export class DropdownComponent implements ControlValueAccessor, OnChanges, OnDestroy {
    static selectedDisplayLength: number = 2;
    /** Element name */
    @Input() name: string;
    /** List of dropdown items */
    @Input() list: Array<DropdownItem>;
    /** Element ID */
    @Input() id?: string;
    /** Element label */
    @Input() label?: string;
    /** Error message of element */
    @Input() error?: string;
    /** Element placeholder */
    @Input() placeholder?: string;
    /** Element class */
    @Input() className?: string;
    /** Property sets whether dropdown is disabled */
    @Input() disabled?: boolean = false;
    /** Property sets whether native dropdown is rendered */
    @Input() native?: boolean = false;
    /** Property sets whether user can select multiple items in the dropdown */
    @Input() multi?: boolean;
    /** Property sets whether dropdown is clearable */
    @Input() clearable?: boolean = false;
    /** Property sets whether dropdown is searchable */
    @Input() searchable?: boolean = false;
    /** Set custom placeholders for dropdown field */
    @Input() placeholders?: DropdownPlaceholders;
    /** On native change callback */
    @Input() nativeOnChange?: (event: DropdownItem | Array<DropdownItem> | UIEvent) => void;
    /** Property sets whether dropdown is in ellipsis mode */
    @Input() ellipsisMode: boolean;
    @Input() block?: boolean;

    @HostBinding("style") get styles(): string {
        return this.block ? "width: 100%;" : null;
    }

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

    @ViewChild("dropdownToggleRef", { read: ElementRef }) dropdownToggleRef: ElementRef;
    @ViewChild("dropdownMenuRef", { read: ElementRef }) dropdownMenuRef: ElementRef;
    @ViewChild("searchRef", { read: ElementRef }) searchRef: ElementRef;

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

    ngOnChanges(): void {
        this._generateHelperArrays();
    }

    ngOnDestroy(): void {
        this._subscriber.unsubscribe();
    }

    /** internal generate helper array function. Should be run on every change where the helper arrays need to be regenerated */
    private _generateHelperArrays(): void {
        this.uniqueList =
            this.list &&
            this.list
                .filter((e: DropdownItem) => e && e.hasOwnProperty("value") && e.hasOwnProperty("label"))
                .map((e: DropdownItem, i: number) => {
                    const id: string = `${e.value}-${i}`;
                    let selected: boolean = false;

                    if (!this.multi) {
                        if ((this.selectedValue as DropdownItem) && e.value === (this.selectedValue as DropdownItem).value) {
                            selected = true;
                        }
                    } else {
                        if (
                            (this.selectedValue as Array<DropdownItem>) &&
                            (this.selectedValue as Array<DropdownItem>).find((el: DropdownItem) => el.value === e.value)
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
                        e.optionItem?.label &&
                        e.optionItem?.label?.length &&
                        e.optionItem.label.toString().toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
                );

        this.selectedList = this.uniqueList && this.uniqueList.filter((e: UniqueItem) => e.selected).map((e: UniqueItem) => e.optionItem);
        this.allSelected =
            this.selectedList &&
            this.list &&
            this.selectedList.filter(e => !e.disabled).length === this.list.filter(e => !e.disabled).length;

        if (this.multi && this.searchText.length === 0) {
            this.displayList = [
                {
                    id: "select-all",
                    optionItem: {
                        value: "Select All",
                        label: this.placeholders?.selectAllOptionText || "Select All",
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
        const key: string = event.key.toLowerCase();

        if (this.open) {
            switch (key) {
                case " ":
                    event.preventDefault();
                    break;
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
                    if (this.displayList[this.currentFocused] && this.displayList[this.currentFocused].optionItem.disabled) {
                        this.handleKeyDownMenu(event);
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
                    if (this.displayList[this.currentFocused] && this.displayList[this.currentFocused].optionItem.disabled) {
                        this.handleKeyDownMenu(event);
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
            const item: DropdownItem = this.list.filter((e: DropdownItem) => e.value === (event.target as HTMLSelectElement).value)[0];
            this.nativeOnChange && this.nativeOnChange(event);
            this.selectedValue = item;
        } else {
            const items: Array<DropdownItem> = Array.from((event.target as HTMLSelectElement).options as HTMLOptionsCollection)
                .filter(e => e.selected)
                .map(e => {
                    const item: DropdownItem = this.list.filter((el: DropdownItem) => el.value === e.value)[0];
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
        this.onChangeCallback && this.onChangeCallback(this.selectedValue);
        this.onTouchedCallback && this.onTouchedCallback();
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
        if (item.disabled) {
            return;
        }
        if (!this.multi) {
            const newItem: DropdownItem = { ...item };
            this.handleOnChange(newItem);
            this.open = false;
        } else {
            const currentList: Array<DropdownItem> = (this.selectedValue as Array<DropdownItem>)
                ? (this.selectedValue as Array<DropdownItem>)
                : [];
            const index: number = currentList.findIndex((e: DropdownItem) => e.value === item.value);
            if (index === -1) {
                const newItem: DropdownItem = { ...item };
                const newList: Array<DropdownItem> = [...currentList, newItem];
                this.handleOnChange(newList);
            } else {
                const newList: Array<DropdownItem> = currentList.filter((e: DropdownItem) => e.value !== item.value);
                this.handleOnChange(newList);
            }
        }
        this.handleFocus();
    }

    /** The native event function that runs when the dropdown button is clicked */
    handleClickToggle(): void {
        if (!this.disabled) {
            this.open = !this.open;
        }
    }

    /** Function containing the select all button logic */
    handleSelectAll(): void {
        if (this.allSelected) {
            this.handleOnChange([...this.selectedList.filter(e => e.disabled)]);
        } else {
            this.handleOnChange([...this.selectedList.filter(e => e.disabled), ...this.list.filter(e => !e.disabled)]);
        }
        this.handleFocus();
    }

    // HELPERS ================================
    /** Returns the appropriate title for different situations and component types */
    getTitleLabel(): string {
        if (this.uniqueList && this.uniqueList.length === 0) {
            return this.placeholders?.emptyText || "Empty";
        } else if (this.selectedList && this.selectedList.length > 0) {
            if (this.multi) {
                if (this.selectedList.length === 1) {
                    return this.selectedList[0].label;
                }
                if (this.allSelected) {
                    return this.placeholders?.selectAllText || `All selected (${this.selectedList.length})`;
                }
                const displayText: string = this.selectedList
                    .slice(0, DropdownComponent.selectedDisplayLength)
                    .map((item: DropdownItem) => item.shorthand || item.label)
                    .join(", ");
                return `${displayText}${
                    this.selectedList.length > DropdownComponent.selectedDisplayLength
                        ? `... (+${this.selectedList.slice(DropdownComponent.selectedDisplayLength).length})`
                        : ""
                }`;
            }
            return (this.selectedValue as DropdownItem).shorthand || (this.selectedValue as DropdownItem).label;
        }

        return this.placeholder && this.placeholder.length ? this.placeholder : "Select ...";
    }

    handleItemOnMouseMove(index: number): void {
        this.currentFocused = index;
        // this.shouldFocus = false;
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

export interface DropdownItem<T = any> {
    /** The label or text to be displayed in the list */
    label: string;
    /** A text to be displayed when the item is selected, ideally, a shorthand of the label */
    shorthand?: string;
    /** Any value which should be tied to the item */
    value: T;
    /** Sets this items as view only or disabled */
    disabled?: boolean;
}

interface UniqueItem {
    id: string;
    optionItem: DropdownItem;
    selected: boolean;
}

interface DisplayItem extends UniqueItem {
    className: string;
}
