import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { SebModalRef } from './modal.ref';
import { DOCUMENT } from '@angular/common';
import { FocusTrap, FocusTrapFactory } from '../core/focus/focus.trap';


@Component({
  templateUrl: 'modal.html',
  host: {
    '[class]': '"modal fade show d-block " + _setConfigType()',
    'tabindex': '-1',
    'role': 'dialog'
  }
})
export class SebModal implements OnInit, OnDestroy {

  private focusTrap: FocusTrap;
  public modalRef: SebModalRef;

  positionClass = {
    fullscreen: 'modal-fullscreen',
    'aside-right': 'modal-aside modal-aside-right',
    'aside-left': 'modal-aside modal-aside-left'
  };

  constructor(
    private elementRef: ElementRef,
    private focusTrapFactory: FocusTrapFactory,
    @Inject(DOCUMENT) private document) { }

  @HostListener('keyup.esc') onEscKey() { this._close(); };
  @HostListener('click', ['$event.target']) onBackdropClick(target) {
    if (this.elementRef.nativeElement !== target) { return; }
    this._close();
  }

  ngOnInit(): void {
    this.focusTrap
      = this.focusTrapFactory.trapFocus(this.elementRef.nativeElement);

  }

  private _setConfigType(): string {
    return this.modalRef.config.type ? `${this.positionClass[this.modalRef.config.type]}` : '';
  }

  private _close() {
    if (
      this.modalRef &&
      this.modalRef.config &&
      this.modalRef.config.closable) {
      this.modalRef.close();
    }
  }

  ngOnDestroy(): void {
    if (this.focusTrap) {
      this.focusTrap.restoreFocus();
    }
  }
}
