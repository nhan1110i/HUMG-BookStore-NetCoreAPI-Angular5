import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Admin/services/category/category.service';
import { formatCurrency, GetPage, GetCustomer, AddProductCart, CountCart } from '../../../Admin/config/config';
import { ProductService } from 'src/app/Admin/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: any;
  products: any;
  page : any;
  customer : any;
  countCart : number;
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
  AddProduct(Id : number, quantity : number, price : number, name : string, image : string){
    AddProductCart(Id,quantity,price,name,image);
    this.countCart = CountCart();
  }
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    // this.getProductShow();
    this.getCategoriesActive();
    localStorage.setItem("page","B O O K S T O R E - H O M E")
    // console.log(this.products)
    this.page = GetPage();
    this.customer = GetCustomer();
    this.countCart = CountCart();
    if(this.countCart > 0){
      this.countCart--;
    }
  }

}
