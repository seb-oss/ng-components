import {ComponentFactoryResolver, ComponentRef, Directive, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[example-host]',
})
export class ExampleDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-example-component',
  template: `
    <div class="row no-gutters pb-2 align-items-center">
      <div class="col-12 col-sm">
        <h3 class="mb-sm-0">{{component.title}}</h3>
      </div>
      <div class="col-6 col-sm-auto pr-1">
        <button class="btn btn-outline-primary btn-sm w-100">
          Code
          <fa-icon icon="code" class="ml-1"></fa-icon>
        </button>
      </div>
      <div class="col-6 col-sm-auto pl-1">
        <button class="btn btn-outline-primary btn-sm w-100">
          Stackblitz
          <svg class="ml-1" width="23" height="34" viewBox="0 0 23 34"
               xmlns="http://www.w3.org/2000/svg">
            <g class="icon" fill="currentColor"
               fill-rule="nonzero" id="Symbols">
              <polygon
                id="Path"
                points="0 19.9187087 9.87007874 19.9187087 4.12007874 34 23 13.9612393 13.0846457 13.9612393 18.7893701 0">
              </polygon>
            </g>
          </svg>
        </button>
      </div>
    </div>
    <div class="bg-light p-3">
      <!--<exemplify [sources]="component.sources"></exemplify>-->
      <ng-template example-host></ng-template>
    </div>
  `,
  styles: [`
    svg, fa-icon::ng-deep svg {
      height: 1rem;
      width: auto !important;
      vertical-align: middle;
    }
  `]
})
export class ExampleComponentComponent implements OnInit, OnDestroy {

  componentRef: ComponentRef<any>;
  @ViewChild(ExampleDirective) exampleHost: ExampleDirective;
  @Input() component: any;
  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(this.component.component);
    const viewContainerRef = this.exampleHost.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(factory);
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }

}
