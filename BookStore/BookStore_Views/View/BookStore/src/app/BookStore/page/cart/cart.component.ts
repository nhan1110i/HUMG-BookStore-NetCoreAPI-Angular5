import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Admin/services/category/category.service';
import { GetPage, GetCustomer, CountQuantityInCart, formatCurrency } from 'src/app/Admin/config/config';
var moment = require('moment');
declare var require: any
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  customer: any;
  categories: any;
  carts: any;
  totalCart: number = 0;
  totalQuantity: number;
  order : any = {
    orderCode : 1200,
    customerId : 0,
    totalQuantity : 0,
    totalMoney : 0,
    paymentId : 1,
    statusId : 1,
    orderAt : moment().format()
  }
  formatCurrency(money: number): string {
    return formatCurrency(money);
  }
  getCategories() {
    this.categoryService.getCategorisActive().subscribe(
      rs => {
        this.categories = rs
      }, err => {
        console.log(err)
      }
    )
  }
  getCarts() {
    this.carts = JSON.parse(localStorage.getItem("cart"));
    this.carts.shift();
    this.carts.forEach(cart => {
      cart.totalMoney = cart.price * cart.quantity;
    });
  }
  getTotal() {
    this.totalCart = 0;
    this.carts.forEach(cart => {
      this.totalCart = this.totalCart + cart.price * cart.quantity
    });
    this.order.totalMoney = this.totalCart;
    localStorage.setItem("order",JSON.stringify(this.order));
  }
  removeProductCart(id: number) {
    let index = this.carts.findIndex(cart => cart.Id === id);
    this.carts.splice(index, 1);
    let arr = this.carts;
    arr.unshift({
      Id: 0,
      quantity: 0,
      price: 0,
      name: "",
      image: "",
    })
    localStorage.setItem("cart",JSON.stringify(arr));
    this.totalQuantity = CountQuantityInCart();
    this.getCarts();
    this.getTotal();
  }
  changeQuantity(){
    
    let arr = this.carts;
    arr.unshift({
      Id: 0,
      quantity: 0,
      price: 0,
      name: "",
      image: "",
    })
    localStorage.setItem("cart",JSON.stringify(arr));
    this.totalQuantity = CountQuantityInCart();
    this.getCarts();
    this.getTotal();
  }
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
    localStorage.setItem("page", "B O O K S T O R E - C A R T");
    this.customer = GetCustomer();
    this.totalQuantity = CountQuantityInCart();
    this.getCarts();
    this.getTotal();
  }

}
