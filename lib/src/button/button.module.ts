import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SebButtonDirective} from './button';

@NgModule({
  imports: [CommonModule],
  declarations: [SebButtonDirective],
  exports: [SebButtonDirective]
})
export class SebButtonModule { }
