import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Admin/services/category/category.service';
import { formatCurrency } from '../../../Admin/config/config';
import { ProductService } from 'src/app/Admin/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: any;
  products: any;

  getCategoriesActive() {
    this.categoryService.getCategorisActive().subscribe(
      rs => {
        this.categories = rs;
        this.productService.getProductsInCategory(this.categories).subscribe(
          srs =>{
            this.products = srs;
            console.log(this.categories);
            console.log(this.products);
          }, serr =>{
            console.log(serr);
          }
        )
      }, err => {
        console.log(err);
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
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    // this.getProductShow();
    this.getCategoriesActive();
    // console.log(this.products)
  }

}
