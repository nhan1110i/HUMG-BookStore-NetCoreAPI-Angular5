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
      {path: "orderDetail/:id", component: OrderDetailComponent},
      {path: "author-publishing", component: AuthorPublishingComponent}
    ]
  },
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
