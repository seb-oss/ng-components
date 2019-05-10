import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChildren,
  ElementRef,
  EventEmitter, forwardRef,
  Host,
  HostListener,
  Inject,
  Input,
  OnInit, Optional,
  Output, QueryList, Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {fromEvent, Observable, race, Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {filter, map, startWith, take, takeUntil} from 'rxjs/operators';


@Component({
  selector: 'seb-dropdown-item',
  templateUrl: 'dropdown-item.html',
  host: {
    'class': 'dropdown-item',
    '[class.active]': 'selected'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SebDropdownItem {

  @Output() readonly onSelectionChange = new EventEmitter<SebDropdownItem>();

  set selected(value) { this._selected = value; }
  get selected(): boolean { return this._selected; }
  private _selected: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) { this._disabled = value != null && `${value}` !== 'false'; }
  private _disabled: boolean = false;

  get multiple(): boolean { return this.dropdown && this.dropdown.multiple; }

  constructor(@Host() private dropdown: SebDropdown, private changeDetectorRef: ChangeDetectorRef) { }

  @HostListener('click', ['$event'])
  handleClick(event) {

    event.stopPropagation();
    event.preventDefault();

    if (!this.disabled) {
      this.selected = !this.selected;
      this.onSelectionChange.emit(this);
    }
  }

}

export const SEB_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SebDropdown),
  multi: true
};


@Component({
  selector: 'seb-dropdown',
  templateUrl: 'dropdown.html',
  styleUrls: ['dropdown.scss'],
  host: {
    'class': 'dropdown'
  },
  providers: [SEB_DROPDOWN_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SebDropdown implements ControlValueAccessor, OnInit, AfterContentInit {

  /*private selection: Array<T>*/
  private _ngOnDestroy$ = new Subject<void>();
  private _onMenuClosed$ = new Subject<void>();

  @ViewChild('dropdownMenu') dropdownMenu: ElementRef;
  @ContentChildren(SebDropdownItem, { descendants: true }) items: QueryList<SebDropdownItem>;

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
  set disabled(value: boolean) { this._disabled = value != null && `${value}` !== 'false'; }
  private _disabled: boolean = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() private ngControl: NgControl,
    @Inject(DOCUMENT) private _document) {

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public toggle(): void {
    if (!this.disabled) {
      this.open = !this.open;

      if (this.open) {
        this._attachCloseHandlers();
      } else {
        this._onMenuClosed$.next();
      }
      this._changeDetectorRef.markForCheck();
    }
  }


  private _attachCloseHandlers(): void {
    race([
      this._createEscapeKeyCloseHandler(),
      this._createMouseClickCloseHandler()
    ]).pipe(
      filter(value => !!value),
      take(1)).subscribe(() => this.toggle())
  }


  private _createEscapeKeyCloseHandler(): Observable<boolean> {
    return fromEvent<KeyboardEvent>(this._document, 'keydown').pipe(
      takeUntil(this._onMenuClosed$),
      map((event: KeyboardEvent) =>  (event.which || event.keyCode) === 27));
  }


  private _createMouseClickCloseHandler(): Observable<boolean> {
    return fromEvent<MouseEvent>(this._document, 'mouseup').pipe(
      takeUntil(this._onMenuClosed$),
      map((event: MouseEvent) => {
        if (event.button === 2) { return false; }
        return !this.dropdownMenu.nativeElement.contains(event.target);
      }));
  }


  ngAfterContentInit(): void {

    this.items.changes.pipe(
      startWith(null),
      takeUntil(this._ngOnDestroy$)
    ).subscribe(() => {

      const value = this.ngControl ? this.ngControl.value : null;

      if (this.multiple && value) {
        if (!Array.isArray(value)) {
          throw new Error('SebDropdown has attribute multiple but initial form control value is not an array');
        }
      }



    });

  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    console.log(obj);
  }

}
