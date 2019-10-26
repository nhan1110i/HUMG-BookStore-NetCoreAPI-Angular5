import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Admin/services/category/category.service';
import { GetPage, GetCustomer, CountCart, formatCurrency } from 'src/app/Admin/config/config';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  customer : any;
  page : any;
  categories: any;
  carts : any;
  totalCart : number = 0;
  formatCurrency(money : number) : string{
    return formatCurrency(money);
  }
  getCategories(){
    this.categoryService.getCategorisActive().subscribe(
      rs=>{
        this.categories = rs
      },err =>{
        console.log(err)
      }
    )
  }
  getCarts(){
    this.carts = JSON.parse(localStorage.getItem("cart"));
    this.carts.shift();
    this.carts.forEach(cart => {
      cart.totalMoney = cart.price * cart.quantity;
      
    });
  }
  getTotal(){
    this.totalCart = 0;
    this.carts.forEach(cart => {
      
      this.totalCart = this.totalCart + cart.price * cart.quantity
    });
  }
  removeProductCart(id : number){
    let index = this.carts.findIndex(cart => cart.Id == id);
    this.carts.splice(index,1);
     this.getTotal();
  }
  constructor(
    private categoryService : CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
    localStorage.setItem("page","B O O K S T O R E - C A R T");
    this.page = GetPage();
    this.customer = GetCustomer();
    this.getCarts();
    this.getTotal();
  }

}
