import { Component, Input, forwardRef, Provider, ViewChildren, QueryList, ElementRef, AfterViewChecked } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

export interface CheckboxGroupItem {
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
    optionItem: CheckboxGroupItem;
    selected: boolean;
}

interface DisplayItem extends UniqueItem {
    className: string;
}

const CUSTOM_CHECKBOXGROUP_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxGroupComponent),
    multi: true,
};

@Component({
    selector: "sebng-checkbox-group",
    templateUrl: "./checkbox-group.component.html",
    styleUrls: ["./checkbox-group.component.scss"],
    providers: [CUSTOM_CHECKBOXGROUP_CONTROL_VALUE_ACCESSOR],
})
export class CheckboxGroupComponent implements ControlValueAccessor {
    // TODO: Add support for custom html as well as string labels?
    @Input("list")
    set list(value: CheckboxGroupItem[]) {
        this._list = value;
        this._generateHelperArrays();
    }
    get list(): CheckboxGroupItem[] {
        return this._list;
    }
    private _list: CheckboxGroupItem[];

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

    private _selectedValue: CheckboxGroupItem[] = null;
    public allSelected: boolean = null;

    set selectedValue(state: CheckboxGroupItem[]) {
        if (state !== this._selectedValue) {
            this._selectedValue = state;
            this.onChangeCallback && this.onChangeCallback(state);
            this.onTouchedCallback && this.onTouchedCallback();

            this._generateHelperArrays();
        }
    }

    get selectedValue(): CheckboxGroupItem[] {
        return this._selectedValue;
    }

    @ViewChildren("checkboxRefs") checkboxRefs: QueryList<ElementRef>;

    // HELPER ARRAYS
    /** array of checkbox-group item elements with a unique id, the original optionItem and calculated selected property */
    public uniqueList: Array<UniqueItem> = [];
    /** Array of checkbox-group item elements which should be displayed in the current render cycle */
    public displayList: Array<DisplayItem> = [];
    /** Array of all checkbox-group item which are currently selected */
    public selectedList: Array<CheckboxGroupItem> = [];

    /** internal generate helper array function. Should be run on every change where the helper arrays need to be regenerated */
    private _generateHelperArrays(): void {
        this.uniqueList =
            this.list &&
            this.list
                .filter((e: CheckboxGroupItem) => e && e.hasOwnProperty("key") && e.hasOwnProperty("value"))
                .map((e: CheckboxGroupItem, i: number) => {
                    const id: string = `${e.key}-${i}`;
                    let selected: boolean = false;

                    if (
                        (this.selectedValue as CheckboxGroupItem[]) &&
                        (this.selectedValue as CheckboxGroupItem[]).find((el: CheckboxGroupItem) => el.key === e.key)
                    ) {
                        selected = true;
                    }

                    return { optionItem: e, id, selected };
                });

        this.displayList =
            this.uniqueList &&
            this.uniqueList.map((e: UniqueItem) => {
                return {
                    ...e,
                    className: `custom-control custom-checkbox${e.selected ? " selected" : ""}`,
                };
            });

        this.selectedList = this.uniqueList && this.uniqueList.filter((e: UniqueItem) => e.selected).map((e: UniqueItem) => e.optionItem);
        this.allSelected = this.selectedList && this.uniqueList ? this.selectedList.length === this.uniqueList.length : false;
    }

    /** Function which handles the logic of setting the non-native onChange prop (and sets the internal selected value as well) */
    handleOnChange(value: CheckboxGroupItem[]): void {
        this.selectedValue = value;
    }

    /** Function containing the select checkbox-group item logic */
    optionItemSelected(item: CheckboxGroupItem): void {
        const currentList: CheckboxGroupItem[] = (this.selectedValue as CheckboxGroupItem[])
            ? (this.selectedValue as CheckboxGroupItem[])
            : [];
        const index: number = currentList.findIndex((e: CheckboxGroupItem) => e.key === item.key);
        if (index === -1) {
            const newItem: CheckboxGroupItem = { ...item };
            const newList: CheckboxGroupItem[] = [...currentList, newItem];
            this.handleOnChange(newList);
        } else {
            const newList: CheckboxGroupItem[] = currentList.filter((e: CheckboxGroupItem) => e.key !== item.key);
            this.handleOnChange(newList);
        }
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
