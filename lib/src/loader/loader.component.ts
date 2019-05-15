import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SebLoaderBorder } from './loader.config';

@Component({
    selector: 'lib-loader',
    styleUrls: ['./loader.component.scss'],
    templateUrl: 'loader.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LoaderComponent {
    @Input() toggle: boolean = false;
    @Input() fullscreen?: boolean = true;
    @Input() className?: string;
    @Input() border?: SebLoaderBorder;
    @Input() width?: string;
    @Input() height?: string;
    @Input() padding?: string;

    setStyle(): any {
      return {
          'border-color': this.border.color,
          'border-style': this.border.style,
          'border-radius': this.border.radius,
          'border-width': this.border.width,
          width: this.width,
          height: this.height,
          padding: this.padding
      };
    }
}
