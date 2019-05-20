import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, ReplaySubject} from 'rxjs';
import {MenuItem} from '../../interfaces/menu-item';
import {ExampleQuery} from './example-list/example-template/example.query';
import {share} from 'rxjs/operators';

@Component({
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss']
})
export class ExamplePageComponent implements OnInit {
  public $menuItems: ReplaySubject<Array<MenuItem>> = new ReplaySubject(0);
  public $heading: ReplaySubject<string> = new ReplaySubject(0);
  $isFullscreen: Observable<boolean>;

  constructor(private route: ActivatedRoute, private exampleQuery: ExampleQuery) { }

  ngOnInit() {
    const menuItems = this.route.routeConfig.children.map(route => {
      return {
        text: route.path,
        path: route.path
      };
    });
    this.$isFullscreen = this.exampleQuery.$isFullscreen
      .pipe(
        share()
      );
    this.$heading.next(this.route.parent.routeConfig.path);
    this.$menuItems.next(menuItems);
  }
}
