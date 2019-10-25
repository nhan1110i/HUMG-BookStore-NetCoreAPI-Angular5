import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Admin/services/category/category.service';
@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css']
})
export class BookstoreComponent implements OnInit {
  orderDetail : any [] = [
    {
      productId : 0,
      quantity :0 ,
    }
  ]
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
    localStorage.setItem("orderDetail",JSON.stringify(this.orderDetail));
    this.getCategories();
  }

}
