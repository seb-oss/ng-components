import {Directive, Host, HostBinding, HostListener} from '@angular/core';
import {SebDropdown} from './dropdown';

@Directive({
  selector: 'button[sebDropdownToggle], a[sebDropdownToggle]'
})
export class SebDropdownToggle {

  @HostBinding('class.dropdown-toggle') toggleClass: boolean = true;
  @HostListener('click', ['$event'])
  handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.dropdown.toggle()
  }

  constructor(@Host() private dropdown: SebDropdown) { }

}
