import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Admin/admin.component';
import { ProductComponent } from './Admin/directive/product/product.component';
import { CategoryComponent } from './Admin/directive/category/category.component';
import { LoginComponent } from './Admin/login/login.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "Admin", component: AdminComponent,children:[
    {path: "product", component: ProductComponent},
    {path: "category", component: CategoryComponent}
  ]},
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
