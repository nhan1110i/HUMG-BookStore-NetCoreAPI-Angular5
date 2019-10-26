import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Admin/services/category/category.service';
import { GetCustomer , GetPage } from '../Admin/config/config';
@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css']
})
export class BookstoreComponent implements OnInit {
  orderDetail : any [] = [
    {
      Id : 0,
      quantity :0 ,
      price : 0,
    }
  ]
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
    private categoryService: CategoryService,

  ) { }

  ngOnInit(
    
  ) {
    this.page = GetPage();
    this.customer = GetCustomer();
    this.getCategories();
  }

}
