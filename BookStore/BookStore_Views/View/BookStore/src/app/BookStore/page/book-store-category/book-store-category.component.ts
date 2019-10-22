import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/Admin/services/product/product.service';
import { formatCurrency } from 'src/app/Admin/config/config';

@Component({
  selector: 'app-book-store-category',
  templateUrl: './book-store-category.component.html',
  styleUrls: ['./book-store-category.component.css']
})
export class BookStoreCategoryComponent implements OnInit {
  products: any;
  getProductsByCategory(){
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.productService.getProductsByCategoryId(id).subscribe(
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
  ) { }

  ngOnInit() {
    this.getProductsByCategory()
  }

}
