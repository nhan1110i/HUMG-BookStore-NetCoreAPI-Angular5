import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/Admin/services/product/product.service';
import { formatCurrency } from 'src/app/Admin/config/config';
import { CategoryService } from 'src/app/Admin/services/category/category.service';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  product : any;
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
    private activeRoute : ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProduct();
    console.log(JSON.parse(localStorage.getItem("orderDetail")));
  }

}
