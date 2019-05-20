import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SebButtonDirective} from './button';
import { ParseSourceExampleComponent } from './parse-source-example/parse-source-example.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SebButtonDirective, ParseSourceExampleComponent],
  exports: [SebButtonDirective]
})
export class SebButtonModule { }
