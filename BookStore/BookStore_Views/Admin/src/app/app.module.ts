import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { CategoryService } from './services/category/category.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './directive/dashboard/dashboard.component';
import { OrderComponent } from './directive/order/order.component';
import { CustomerComponent } from './directive/customer/customer.component';
import { EmployeesComponent } from './directive/employees/employees.component';
import { ProductComponent } from './directive/product/product.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoryComponent } from './directive/category/category.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OrderComponent,
    CustomerComponent,
    EmployeesComponent,
    ProductComponent,
    CategoryComponent,
    LoginComponent,
    SidebarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
