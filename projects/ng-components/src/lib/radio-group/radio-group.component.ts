import { Component, Input, forwardRef, Provider, ViewChildren, QueryList, ElementRef, AfterViewChecked } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

export interface RadioGroupItem {
    /** The label or text to be displayed in the list */
    label?: string;
    /**
     * A Custom template as html string to be used instead of label and description.
     *
     * Example: "<b>Hello</b>"
     * */
    customTemplate?: string;
    /** optional description to be displayed next to the label */
    description?: string;
    /** any value which should be tied to the item */
    value: any;
    /** optional disabled flag. Will show the item grayed out and disabled */
    disabled?: boolean;
    /** The id or the unique key of the item */
    key: string;
}

interface UniqueItem {
    id: string;
    optionItem: RadioGroupItem;
    selected: boolean;
}

interface DisplayItem extends UniqueItem {
    className: string;
}

const CUSTOM_RADIOGROUP_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent),
    multi: true,
};

@Component({
    selector: "sebng-radio-group",
    templateUrl: "./radio-group.component.html",
    styleUrls: ["./radio-group.component.scss"],
    providers: [CUSTOM_RADIOGROUP_CONTROL_VALUE_ACCESSOR],
})
export class RadioGroupComponent implements ControlValueAccessor, AfterViewChecked {
    // TODO: Add support for custom html as well as string labels?
    @Input("list")
    set list(value: RadioGroupItem[]) {
        this._list = value;
        this._generateHelperArrays();
    }
    get list(): RadioGroupItem[] {
        return this._list;
    }
    private _list: RadioGroupItem[];

    @Input() name?: string;
    @Input() label?: string;
    @Input() className?: string;

    @Input() disabled?: boolean = false;
    @Input() condensed?: boolean = false;
    @Input() inline?: boolean = false;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;

    private _selectedValue: RadioGroupItem = null;

    set selectedValue(state: RadioGroupItem) {
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

    @ViewChildren("radioRefs") radioRefs: QueryList<ElementRef>;

    /** has the currently selected element been focused already */
    private didFocus: boolean = false;

    ngAfterViewChecked(): void {
        this.focusCurrentItem();
    }

    /**
     * FOCUS CURRENT ITEM:
     * Find which of the radio buttons is currently selected (if any) and sets it to focus
     */
    focusCurrentItem(): void {
        if (!this.didFocus && this.list && this.list.length) {
            const currentFocused: number = this.list.findIndex(e => e && this.selectedValue && e.key === this.selectedValue.key);
            if (currentFocused > -1 && this.radioRefs.toArray()[currentFocused] && this.radioRefs.toArray()[currentFocused].nativeElement) {
                this.radioRefs.toArray()[currentFocused].nativeElement.focus();
                this.didFocus = true;
            }
        }
    }

    // HELPER ARRAYS
    /** array of radio-group item elements with a unique id, the original optionItem and calculated selected property */
    public uniqueList: Array<UniqueItem> = [];
    /** Array of radio-group item elements which should be displayed in the current render cycle */
    public displayList: Array<DisplayItem> = [];
    /** Array of all radio-group item which are currently selected */
    public selectedList: Array<RadioGroupItem> = [];

    /** internal generate helper array function. Should be run on every change where the helper arrays need to be regenerated */
    private _generateHelperArrays(): void {
        this.uniqueList =
            this.list &&
            this.list
                .filter((e: RadioGroupItem) => e && e.hasOwnProperty("key") && e.hasOwnProperty("value"))
                .map((e: RadioGroupItem, i: number) => {
                    const id: string = `${e.key}-${i}`;
                    let selected: boolean = false;

                    if ((this.selectedValue as RadioGroupItem) && e.key === (this.selectedValue as RadioGroupItem).key) {
                        selected = true;
                    }

                    return { optionItem: e, id, selected };
                });

        this.displayList =
            this.uniqueList &&
            this.uniqueList.map((e: UniqueItem) => {
                return {
                    ...e,
                    className: `custom-control custom-radio${e.selected ? " selected" : ""}`,
                };
            });

        this.selectedList = this.uniqueList && this.uniqueList.filter((e: UniqueItem) => e.selected).map((e: UniqueItem) => e.optionItem);
    }

    /** Function which handles the logic of setting the non-native onChange prop (and sets the internal selected value as well) */
    handleOnChange(value: RadioGroupItem): void {
        this.didFocus = false;
        this.selectedValue = value;
    }

    /** Function containing the select radio-group item logic */
    optionItemSelected(item: RadioGroupItem): void {
        const newItem: RadioGroupItem = { ...item };
        this.handleOnChange(newItem);
    }

    // HELPERS ================================
    handleItemOnClick(item: DisplayItem): void {
        // event.preventDefault();
        this.optionItemSelected(item.optionItem);
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
