import {Component, OnInit} from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {Observable, of} from 'rxjs';
import {ExampleService} from './example-template/example.service';
import {ExampleQuery} from './example-template/example.query';
import {share} from 'rxjs/operators';

@Component({
  selector: 'app-example-list',
  templateUrl: './example-list.component.html',
  styleUrls: ['./example-list.component.scss']
})
export class ExampleListComponent implements OnInit {

  $content: Observable<any>;
  constructor(private route: ActivatedRoute,
              private exampleService: ExampleService,
              private exampleQuery: ExampleQuery

  ) { }
  $showOutlet: Observable<boolean>;

  onActivate(event: any) {
    setTimeout(() => this.exampleService.setFullscreen(true));
  }

  onDeactivate(event: any) {
    setTimeout(() => this.exampleService.setFullscreen(false));
  }
  ngOnInit() {
    /*this.$content = this.route.data.pipe(
      map(data => Object.keys(data).map( key => data[key]))
    );*/
    this.$showOutlet = this.exampleQuery.$isFullscreen
      .pipe(
        share()
      );
    this.$content = of(this.route.routeConfig.children);
  }
}
