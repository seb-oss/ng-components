import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SebDropdown, SebDropdownItem} from './dropdown';
import {SebDropdownToggle} from './dropdown.toggle';

@NgModule({
  imports: [CommonModule],
  declarations: [SebDropdown, SebDropdownToggle, SebDropdownItem],
  exports: [SebDropdown, SebDropdownToggle, SebDropdownItem]
})
export class SebDropdownModule { }

