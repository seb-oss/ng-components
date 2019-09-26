import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChild, ContentChildren, Directive,
  ElementRef,
  EventEmitter,
  Host, HostBinding,
  HostListener,
  Inject,
  Input, OnDestroy,
  OnInit, Optional,
  Output, QueryList, Self,
  ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {merge, Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {startWith, takeUntil} from 'rxjs/operators';
import {Selection, SelectionChange} from '../core/selection/selection';


@Directive({
  selector: 'button[sebDropdownToggle], a[sebDropdownToggle]'
})
export class SebDropdownToggle {

  @HostBinding('disabled') disabled: boolean = false;
  @HostBinding('class.dropdown-toggle') toggleClass: boolean = true;

  @HostListener('click')
  handleClick() { this.dropdown.toggle(); }

  constructor(@Host() private dropdown: SebDropdown, public elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {

    this.dropdown.stateChanges
      .subscribe(() => {
        this.disabled = this._disabled();
        this._changeDetectorRef.markForCheck();
      });

  }

  private _disabled() {
    return (this.dropdown.items && !this.dropdown.items.length) || this.dropdown.disabled;
  }
}


@Component({
  selector: 'seb-dropdown-item',
  templateUrl: 'dropdown-item.html',
  host: {
    'class': 'dropdown-item',
    '[class.active]': 'selected',
    '[class.disabled]': 'disabled'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SebDropdownItem {

  @Output() readonly changes = new EventEmitter<SebDropdownItem>();

  @HostListener('click', ['$event'])
  handleClick(event) {

    event.stopPropagation();
    event.preventDefault();

    if (!this.disabled) {
      this.selected = !this.selected;
      this.changes.emit(this);

      if (!this.multiple) {
        this.dropdown.closeMenu();
      }
    }
  }

  @Input()
  set selected(value) { this._selected = value; }
  get selected(): boolean { return this._selected; }
  private _selected: boolean = false;

  @Input()
  get value() { return this._value; }
  set value(value) { this._value = value; }
  private _value = null;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) { this._disabled = value != null && `${value}` !== 'false'; }
  private _disabled: boolean = false;

  get multiple(): boolean { return this.dropdown && this.dropdown.multiple; }

  public select() {
    if (!this.selected) {
      this.selected = true;
    }
  }

  public deselect(): void {
    if (this.selected) {
      this.selected = false;
    }
  }

  constructor(@Host() private dropdown: SebDropdown) { }

}



@Component({
  selector: 'seb-dropdown',
  templateUrl: 'dropdown.html',
  styleUrls: ['dropdown.scss'],
  host: {
    'class': 'dropdown'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SebDropdown implements ControlValueAccessor, OnInit, AfterContentInit, OnDestroy {

  private _selection: Selection<SebDropdownItem>;
  private _ngOnDestroy$ = new Subject<void>();
  private _onTouched: () => any = () => {};
  private _controlValueAccessorChangeFn: (value: any) => void = () => {};

  public readonly stateChanges: Subject<void> = new Subject<void>();

  @ViewChild('dropdownMenu', { static: true }) dropdownMenu: ElementRef;
  @ContentChild(SebDropdownToggle, {static: true }) dropdownToggle: SebDropdownToggle;
  @ContentChildren(SebDropdownItem, { descendants: true }) items: QueryList<SebDropdownItem>;

  @HostListener('document:click', ['$event'])
  handleMouseClick(event: MouseEvent) {
    if (event.button === 2) { return false; }
    if (!this.dropdownMenu.nativeElement.contains(event.target)) {

      if(!this.dropdownToggle.elementRef.nativeElement.contains(event.target)){
        this.closeMenu();
      }
    }
  }

  @HostListener('document:keydown.escape')
  handleKeyboardEscKey() { this.closeMenu(); }

  @Input()
  get multiple(): boolean { return this._multiple; }
  set multiple(value: boolean) { this._multiple = value != null && `${value}` !== 'false'; }
  private _multiple: boolean = false;


  @Input()
  set open(value) { this._open = `${value}` === 'true' }
  get open() { return this._open }
  private _open: boolean = false;


  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = value != null && `${value}` !== 'false';
    this.stateChanges.next();
  }
  private _disabled: boolean = false;

  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() private ngControl: NgControl,
    @Inject(DOCUMENT) private _document) {

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public toggle(): void {
    if (!this.disabled && this.items && this.items.length) {
      this.open ? this.closeMenu() : this.openMenu();
    }
  }

  public closeMenu(): void {
    if (this.open) {
      this.open = false;
      this._changeDetectorRef.markForCheck();
    }
  }

  public openMenu(): void {
    if (!this.open) {
      this.open = true;
      this._changeDetectorRef.markForCheck();
    }
  }

  ngOnInit(): void {
    this._selection = new Selection<SebDropdownItem>(this.multiple);
  }

  ngAfterContentInit(): void {

    this._selection.changed.pipe(
      takeUntil(this._ngOnDestroy$)
    ).subscribe((event: SelectionChange<SebDropdownItem>) => {
      event.added.forEach((item: SebDropdownItem) => item.select());
      event.removed.forEach((item: SebDropdownItem) => item.deselect());
    });

    this.items.changes.pipe(
      startWith(null),
      takeUntil(this._ngOnDestroy$)
    ).subscribe(() => {

      merge(...this.items.map(item => item.changes)).pipe(
        takeUntil(merge(this.items.changes, this._ngOnDestroy$))
      ).subscribe((item: SebDropdownItem) => {
        item.selected ? this._selection.select(item) : this._selection.deselect(item);
        const value = this.multiple ? this._getSelected() : item.value;
        this._controlValueAccessorChangeFn(value);
        this.onSelectionChange.emit(value);
      });

      Promise.resolve().then(() => {
        this._setSelection(this.ngControl ? this.ngControl.value : null);
        this.stateChanges.next();
      });
    });
  }


  private _getSelected() {
    return this._selection.selected.map((item: SebDropdownItem) => item.value);
  }

  private _setSelection(value) {
    if (this.multiple && value) {
      this._assertArray(value);
      this._selection.clear();
      value.forEach(v => this._select(v));
    } else {
      this._select(value);
    }
  }

  private _select(value) {
    const item: SebDropdownItem = this.items.find(item => item.value !== null && item.value === value);
    if (item) { this._selection.select(item) }
  }

  private _assertArray(value) {
    if (!Array.isArray(value)) {
      throw new Error('SebDropdown has attribute multiple but initial form control value is not an array');
    }
  }

  registerOnChange(fn: any): void { this._controlValueAccessorChangeFn = fn; }
  registerOnTouched(fn: any): void { this._onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
  writeValue(obj: any): void {
    if (this.items) {this._setSelection(obj); }
  }

  ngOnDestroy(): void {
    this._ngOnDestroy$.next();
    this._ngOnDestroy$.complete();
    this.stateChanges.complete();
  }
}

