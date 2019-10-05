import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { AdminComponent } from './Admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './Admin/shared/sidebar/sidebar.component';
import { CategoryComponent } from './Admin/directive/category/category.component';
import { ProductComponent } from './Admin/directive/product/product.component';
import { LoginComponent } from './Admin/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SidebarComponent,
    CategoryComponent,
    ProductComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
