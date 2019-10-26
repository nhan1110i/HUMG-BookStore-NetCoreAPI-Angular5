import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Admin/services/customer/customer.service';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/Admin/services/category/category.service';
import { GetCustomer, GetPage } from 'src/app/Admin/config/config';
@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit {
  account: any = {
    id: 0,
    username: "",
    password: "",
    customerId: 0
  }
  wrong: boolean = false;
  customer: any;
  page : any;
  categories: any;
  getCategories(){
    this.categoryService.getCategorisActive().subscribe(
      rs=>{
        this.categories = rs
      },err =>{
        console.log(err)
      }
    )
  }
  customerLogin() {
    this.customerService.customerLogin(this.account).subscribe(
      rs => {
        if (rs.error == 1) {
          this.wrong = true;
        }else{

          localStorage.setItem("customer",JSON.stringify(rs));
          this.location.back();
        }
      }, error => console.log(error)
    )
  }
  constructor(
    private categoryService : CategoryService,
    private location : Location,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.page = GetPage();
    this.customer = GetCustomer();
  }

}
