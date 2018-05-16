import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../guards/AuthGuard';
import {UserComponent} from './user.component';
import {UserViewComponent} from './user-view.component';
import {User} from '../_models';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User'
    },
    component: UserComponent,
   canActivate: [AuthGuard]
  },
  {
    data: {
      title: 'user / view'
    },
    path: 'view/:id',
    component: UserViewComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {
}
