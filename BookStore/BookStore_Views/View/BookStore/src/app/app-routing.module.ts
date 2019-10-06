import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Admin/admin.component';
import { ProductComponent } from './Admin/directive/product/product.component';
import { CategoryComponent } from './Admin/directive/category/category.component';
import { LoginComponent } from './Admin/login/login.component';
import { AddNewProductComponent } from './Admin/directive/add-new-product/add-new-product.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "Admin", component: AdminComponent, children: [
      {path : "addnewproduct", component: AddNewProductComponent},
      { path: "product", component: ProductComponent },
      { path: "category", component: CategoryComponent }
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
