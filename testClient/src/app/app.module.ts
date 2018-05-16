import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import {LoginComponent} from './login/login.component';
// Routing Module
import { AppRoutingModule } from './app.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FullLayoutComponent } from './layouts/full-layout.component';
import {HttpModule} from '@angular/http';
import {AlertModule } from 'ng2-bootstrap';
import {SimpleLayoutComponent} from './layouts/simple-layout.component';
import {AuthGuard} from './guards/AuthGuard';
import { PopoverModule } from 'ngx-bootstrap/popover';
import {NgxPaginationModule} from 'ngx-pagination';
import {CustomerService} from './_services/customer.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    LoginComponent,
    SimpleLayoutComponent,
  ],
  providers: [
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
    AuthGuard,
    CustomerService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
