import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { SafeHtmlPipe } from './tooltip.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [TooltipComponent],
  declarations: [TooltipComponent, SafeHtmlPipe],
})
export class TooltipModule {}
