import {ComponentFactoryResolver, ComponentRef, Directive, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appCodeExample]',
})
export class CodeExampleDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-example-template',
  templateUrl: './example-template.component.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translate3d(-1rem,0,0)', opacity: 0}),
          animate('300ms ease-out', style({transform: 'translate3d(0,0,0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translate3d(0,0,0)', opacity: 1}),
          animate('300ms ease-out', style({transform: 'translate3d(-1rem,0,0)', opacity: 0}))
        ])
      ]
    )
  ],
  styles: [`
    svg, fa-icon::ng-deep svg {
      height: 1rem;
      width: auto !important;
      vertical-align: middle;
    }
  `]
})
export class ExampleTemplateComponent implements OnInit, OnDestroy {
  get example(): any {
    return this._example;
  }

  @Input() set example(value: any) {
    this._example = value;
  }

  componentRef: ComponentRef<any>;
  @ViewChild(CodeExampleDirective, { static: true }) exampleHost: CodeExampleDirective;

  private _example: any;
  public showCodeExample = false;

  constructor(private resolver: ComponentFactoryResolver) { }

  toggleCodeExample() {
    this.showCodeExample = !this.showCodeExample;
  }
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(this._example.component);
    const viewContainerRef = this.exampleHost.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(factory);
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }
}
