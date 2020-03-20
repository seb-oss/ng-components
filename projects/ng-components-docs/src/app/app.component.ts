import { Component, OnInit } from '@angular/core';
// import { FaIconService } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment';
import { Route, Router } from '@angular/router';
import { MenuService } from './components/menu/menu.service';
import { share } from 'rxjs/operators';
import { ExampleQuery } from './components/example-page/example-list/example-template/example.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  scrollPosition: number;
  $isFullscreen: Observable<boolean>;
  travis_build_number: string = environment.travis_build_number;
  version: string =
    environment.version === '0.0.0-semantically-released' ||
    environment.version === 'n/a'
      ? 'unreleased dev version'
      : environment.version;
  versionLink: string =
    environment.version === '0.0.0-semantically-released' ||
    environment.version === 'n/a'
      ? 'latest'
      : 'tag/v' + environment.version;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private exampleQuery: ExampleQuery
  ) {
    // this.faIconService.defaultPrefix = 'fal';
  }

  ngOnInit(): void {
    const menuItems: any = this.router.config.reduce(
      (prev: any, current: Route) => {
        const menuGroup = {
          text: current.path,
          icon: current.data.icon,
          children: current.children
            .filter(child => child.path.length > 1)
            .map(child => {
              return {
                text: child.path,
                path: current.path + '/' + child.path,
              };
            }),
        };
        return [...prev, { ...menuGroup }];
      },
      []
    );
    this.menuService.updateMenuItems(menuItems);
    this.$isFullscreen = this.exampleQuery.$isFullscreen.pipe(share());
  }

  scroll($event) {
    this.scrollPosition = $event.target.scrollingElement.scrollTop;
  }
}
