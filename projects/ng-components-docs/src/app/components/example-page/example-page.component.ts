import {Component, ComponentFactoryResolver, Inject, Injector, OnInit, TemplateRef, Type, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss']
})
export class ExamplePageComponent implements OnInit {

  $content: Observable<any>;
  constructor(private route: ActivatedRoute,
              private resolver: ComponentFactoryResolver,
              private injector: Injector,
              @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.$content = this.route.data.pipe(
      map(data => Object.keys(data).map( key => data[key]))
    );
  }
}
