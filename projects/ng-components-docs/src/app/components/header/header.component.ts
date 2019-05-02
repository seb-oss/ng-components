import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuService} from '../menu/menu.service';
import {MenuQuery} from '../menu/menu.query';
import {MenuItem} from '../../interfaces/menu-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide',   style({
        opacity: 0,
        transform: 'translateY(-100px)'
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  activeTab = 'components';
  private _scrollPosition = 0;
  stickyHeader = 'hide';
  $isActive: Observable<boolean>;
  $menuItems: Observable<Array<MenuItem>>;

  get scrollPosition(): number {
    return this._scrollPosition;
  }

  @Input() set scrollPosition(value: number) {
    this._scrollPosition = value;

    if (this.scrollPosition >= 100) {
      this.stickyHeader = 'show';
    } else {
      this.stickyHeader = 'hide';
    }
  }
  constructor(private menuService: MenuService, private menuQuery: MenuQuery) { }

  ngOnInit() {
    this.$isActive = this.menuQuery.$isMenuActive;
    this.$menuItems = this.menuQuery.$menuItems;
  }

  showMenu(tab: any) {
    // this.menuService.switchTab(tab);
    this.activeTab = tab;
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }
}
