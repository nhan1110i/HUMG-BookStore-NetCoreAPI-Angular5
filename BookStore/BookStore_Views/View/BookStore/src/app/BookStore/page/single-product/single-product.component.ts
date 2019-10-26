import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/Admin/services/product/product.service';
import { formatCurrency, GetPage, GetCustomer } from 'src/app/Admin/config/config';
import { CategoryService } from 'src/app/Admin/services/category/category.service';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  page : any;
  customer : any;
  product : any;
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
  getProduct(){
    let id = +this.activeRoute.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe(
      rs =>{
        this.product = rs;
      },err =>{
        console.log(err);
      }
    )
  }
  formatMoney(money: number): string {
    return formatCurrency(money)

  }
  constructor(
    private productService : ProductService,
    private activeRoute : ActivatedRoute,
    private categoryService : CategoryService,
  ) { }

  ngOnInit() {
    this.getProduct();
    this.getCategories();
    this.page = GetPage();
    this.customer = GetCustomer();
  }

}
