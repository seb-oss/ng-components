import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ROUTES as BUTTONS_ROUTES} from './docs/components/buttons/buttons.module';
import {ROUTES as MODAL_ROUTES} from './docs/components/modal/modal.module';


const routes: Routes = [
  { path: 'get-started',
    data: {
      icon: 'home'
    },
    children: [{
      path: '',
      redirectTo: 'install',
      pathMatch: 'full'
    }, {
      path: 'installation',
      children: BUTTONS_ROUTES
    }]
  }, { path: 'components',
    data: {
      icon: 'cubes'
    },
    children: [{
      path: '',
      redirectTo: 'buttons',
      pathMatch: 'full'
    }, {
      path: 'buttons',
      children: BUTTONS_ROUTES
    }, {
      path: 'modal',
      children: MODAL_ROUTES
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
