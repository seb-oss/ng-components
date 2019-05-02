import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReplaySubject} from 'rxjs';
import {MenuItem} from '../../interfaces/menu-item';

@Component({
  selector: 'app-example-wrapper',
  templateUrl: './example-wrapper.component.html',
  styleUrls: ['./example-wrapper.component.sass']
})
export class ExampleWrapperComponent implements OnInit {
  public $menuItems: ReplaySubject<Array<MenuItem>> = new ReplaySubject(0);
  public $heading: ReplaySubject<string> = new ReplaySubject(0);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const menuItems = this.route.routeConfig.children.map(route => {
      return {
        text: route.path,
        path: route.path
      };
    });
    this.$heading.next(this.route.parent.routeConfig.path);
    this.$menuItems.next(menuItems);
  }

}
