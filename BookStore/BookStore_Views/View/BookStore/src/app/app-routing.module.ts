import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Admin/admin.component';
import { ProductComponent } from './Admin/directive/product/product.component';
import { CategoryComponent } from './Admin/directive/category/category.component';
import { LoginComponent } from './Admin/login/login.component';
import { AddNewProductComponent } from './Admin/directive/add-new-product/add-new-product.component';
import { UpdateProductComponent } from './Admin/directive/update-product/update-product.component';
import { CustomerComponent } from './Admin/directive/customer/customer.component';
import { DashboardComponent } from './Admin/directive/dashboard/dashboard.component';
import { EmployeeComponent } from './Admin/directive/employee/employee.component';
import { OrderComponent } from './Admin/directive/order/order.component';
import { AuthorPublishingComponent } from './Admin/directive/author-publishing/author-publishing.component';
import { OrderDetailComponent } from './Admin/directive/order-detail/order-detail/order-detail.component';
import { BookstoreComponent } from './BookStore/bookstore.component';
import { HomeComponent } from './BookStore/page/home/home.component';
import { BookStoreCategoryComponent } from './BookStore/page/book-store-category/book-store-category.component';
import { SingleProductComponent } from './BookStore/page/single-product/single-product.component';
import { SignUpComponent } from './BookStore/page/sign-up/sign-up.component';
import { ClientLoginComponent } from './BookStore/page/client-login/client-login.component';
import { CheckoutComponent } from './BookStore/page/checkout/checkout.component';
import { CartComponent } from './BookStore/page/cart/cart.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "Admin", component: AdminComponent, children: [
      { path: "addnewproduct", component: AddNewProductComponent },
      { path: "product", component: ProductComponent },
      { path: "category", component: CategoryComponent },
      { path: "updateProduct/:id", component: UpdateProductComponent },
      { path: "customer", component: CustomerComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "employee", component: EmployeeComponent },
      { path: "order", component: OrderComponent },
      { path: "orderDetail/:id", component: OrderDetailComponent },
      { path: "author-publishing", component: AuthorPublishingComponent }
    ]
  },
  {
    path: "BookStore", component: BookstoreComponent, children: [
      { path: "Home", component: HomeComponent },
      {path : "Category/:id", component : BookStoreCategoryComponent},
      {path : "Single-Product/:id", component : SingleProductComponent},
      {path : "Sign-up", component : SignUpComponent},
      {path : "Login", component: ClientLoginComponent},
      {path : "CheckOut", component : CheckoutComponent},
      {path : "Cart", component : CartComponent}

    ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
