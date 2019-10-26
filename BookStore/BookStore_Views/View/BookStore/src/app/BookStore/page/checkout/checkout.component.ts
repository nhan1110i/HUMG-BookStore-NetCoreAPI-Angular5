import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Admin/services/category/category.service';
import { GetCustomer, GetPage } from 'src/app/Admin/config/config';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  customer : any;
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
  constructor(
    private categoryService : CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.page = GetPage();
    this.customer = GetCustomer();
  }

}
