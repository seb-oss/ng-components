import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SebDropdown, SebDropdownItem, SebDropdownToggle} from './dropdown';

@NgModule({
  imports: [CommonModule],
  declarations: [SebDropdown, SebDropdownToggle, SebDropdownItem],
  exports: [SebDropdown, SebDropdownToggle, SebDropdownItem]
})
export class SebDropdownModule { }

