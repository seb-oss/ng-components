import { Injectable } from '@angular/core';
import { MenuStore } from './menu.store';

@Injectable({ providedIn: 'root' })
export class MenuService {

  constructor(private menuStore: MenuStore) {
  }

  updateMenuItems(menuItems: any) {
    this.menuStore.update(currentState => ({menuItems}));
  }

  toggleMenu(state?: boolean) {
    this.menuStore.update(currentState => ({
      isMenuActive: typeof state !== 'undefined' ? state : !currentState.isMenuActive
    }));
  }
}
