import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

const FOCUSABLE_ELEMENTS_SELECTOR = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
  'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
].join(', ');


export class FocusTrap {

  constructor(
    private body: HTMLElement,
    private previousFocusedElement: HTMLElement) {
  }

  public restoreFocus() {
      if (
        this.previousFocusedElement &&
        this.previousFocusedElement['focus'] &&
        this.body.contains(this.previousFocusedElement)) {
        this.previousFocusedElement.focus();
      } else {
        this.body.focus()
      }
  }
}


@Injectable({providedIn: 'root'})
export class FocusTrapFactory {

  constructor(@Inject(DOCUMENT) private document) {
  }

  trapFocus(element: HTMLElement, enableAutoFocus: boolean = true): FocusTrap {

    const previousFocusedEl: HTMLElement = this.document.activeElement;

    if (element.contains(previousFocusedEl)) {
      return null;
    }

    let focusedEl: HTMLElement;

    if (enableAutoFocus) {
      const autoFocusEl: HTMLElement = element.querySelector('[sebAutoFocus]');
      if (autoFocusEl) { focusedEl = autoFocusEl; }
    }

    focusedEl = focusedEl || this._getFirstFocusableElement(element) || element;
    focusedEl.focus();
    return new FocusTrap(this.document.body, previousFocusedEl);
  }


  private _getFirstFocusableElement(element: HTMLElement): HTMLElement {
    const elements: HTMLElement[] =
      Array.from(element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR) as NodeListOf<HTMLElement>)
        .filter((el: HTMLElement) => el.tabIndex !== -1);
    return elements[0];
  }
}
