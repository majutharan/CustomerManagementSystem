import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FullLayoutComponent} from './layouts/full-layout.component';
import {LoginComponent} from './login/login.component';
import {SimpleLayoutComponent} from './layouts/simple-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
      },
      {
        path: 'customer',
        loadChildren: './customer/customer.module#CustomerModule'
      },
      {
        path: 'profileView',
        loadChildren: './layouts/profile.module#ProfileModule'
      },
      {
        path: 'mail',
        loadChildren: './send_mail/mail.module#MailModule'
      }
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
