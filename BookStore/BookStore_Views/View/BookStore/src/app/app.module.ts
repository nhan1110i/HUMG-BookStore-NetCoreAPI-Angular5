import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, CheckboxRequiredValidator } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { AdminComponent } from './Admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './Admin/shared/sidebar/sidebar.component';
import { CategoryComponent } from './Admin/directive/category/category.component';
import { ProductComponent } from './Admin/directive/product/product.component';
import { LoginComponent } from './Admin/login/login.component';
import { CKEditorModule } from 'ng2-ckeditor'
import {NgxPaginationModule} from 'ngx-pagination'
import { AddNewProductComponent } from './Admin/directive/add-new-product/add-new-product.component';
import { UpdateProductComponent } from './Admin/directive/update-product/update-product.component';
import { CustomerComponent } from './Admin/directive/customer/customer.component';
import { EmployeeComponent } from './Admin/directive/employee/employee.component';
import { DashboardComponent } from './Admin/directive/dashboard/dashboard.component';
import { AuthorPublishingComponent } from './Admin/directive/author-publishing/author-publishing.component';
import { OrderComponent } from './Admin/directive/order/order.component';
import { OrderDetailComponent } from './Admin/directive/order-detail/order-detail/order-detail.component';
import { HomeComponent } from './BookStore/page/home/home.component';
import { BookstoreComponent } from './BookStore/bookstore.component';
import { BookStoreCategoryComponent } from './BookStore/page/book-store-category/book-store-category.component';
import { SingleProductComponent } from './BookStore/page/single-product/single-product.component';
import { CartComponent } from './BookStore/page/cart/cart.component';
import { ClientLoginComponent } from './BookStore/page/client-login/client-login.component';
import { SignUpComponent } from './BookStore/page/sign-up/sign-up.component';
import { CheckoutComponent } from './BookStore/page/checkout/checkout.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SidebarComponent,
    CategoryComponent,
    ProductComponent,
    LoginComponent,
    OrderComponent,
    AddNewProductComponent,
    UpdateProductComponent,
    CustomerComponent,
    EmployeeComponent,
    DashboardComponent,
    AuthorPublishingComponent,
    OrderDetailComponent,
    HomeComponent,
    BookstoreComponent,
    BookStoreCategoryComponent,
    SingleProductComponent,
    CartComponent,
    ClientLoginComponent,
    SignUpComponent,
    CheckoutComponent,
    

  ],
  imports: [
    CKEditorModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
