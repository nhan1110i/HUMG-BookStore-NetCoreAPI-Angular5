import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/Admin/services/product/product.service';
import { formatCurrency, GetPage, GetCustomer } from 'src/app/Admin/config/config';
import { CategoryService } from 'src/app/Admin/services/category/category.service';

@Component({
  selector: 'app-book-store-category',
  templateUrl: './book-store-category.component.html',
  styleUrls: ['./book-store-category.component.css']
})
export class BookStoreCategoryComponent implements OnInit {
  products: any;
  categories: any;
  customer : any;
  page : any;
  id = +this.activeRoute.snapshot.paramMap.get('id')
  getCategories(){
    this.categoryService.getCategorisActive().subscribe(
      rs =>{
        this.categories = rs;
      },err =>{
        console.log(err)
      }
    )
  }
  getProductsByCategory(){
    
    this.productService.getProductsByCategoryId(this.id).subscribe(
      rs => {
        this.products = rs;
        console.log(this.products)
      },err =>{
        console.log(err)
      }
    )
  }
  formatMoney(money: number): string {
    return formatCurrency(money)

  }
  ceil (price : number, discount : number) : string{
    if(price === discount){
      return ""
    }else{
      let v = Math.ceil(discount * 100 / price);
      return (100 - v).toString();
    }
  }
  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private categoryService : CategoryService
  ) { }

  ngOnInit() {
    this.getProductsByCategory(),
    this.getCategories(),
    this.page = GetPage();
    this.customer = GetCustomer();
  }

}
