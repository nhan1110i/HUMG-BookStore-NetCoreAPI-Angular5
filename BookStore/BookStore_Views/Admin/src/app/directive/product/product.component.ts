import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product/product.service';
import {formatCurrency} from './../../helper/helper';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any;
  formatMoney(money:number): string{
    return formatCurrency(money)
    
  }
  getProducts(): any {
    this.productService.getProducts().subscribe(
      rs=>{
        this.products = rs;
      },err=>{
        console.log(err);
      }
    )
  }
  // notice
  getIsActive(isActive : boolean): string{
    if(isActive){
      return "Đang bán"
    }else{
      return "Không bán"
    }
  }
  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.getProducts()
  }

}
