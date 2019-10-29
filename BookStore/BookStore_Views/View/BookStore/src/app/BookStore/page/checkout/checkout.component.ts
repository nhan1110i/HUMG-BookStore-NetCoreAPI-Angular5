import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Admin/services/category/category.service';
import { GetCustomer, GetPage, CountQuantityInCart, formatCurrency, alert2 } from 'src/app/Admin/config/config';
import { CustomerService } from 'src/app/Admin/services/customer/customer.service';
import { OrderService } from 'src/app/Admin/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  customerTemp : any;
  customer : any;
  page : any;
  categories: any;
  cities : any;
  towns : any;
  towns2 : any;
  sameAddress : boolean = true;
  customerTemp2 : any ={
    id : 0,
    customerName : "",
    customerPhone : "",
    customerMail : "",
    cityId : 0,
    townId : 0,
    customerAddress : "",
    totalOrder : 0,
    totalOrderComplete : 0,
    totalOrderCancel : 0,
    isActive : true,
  }
  order : any;
  CheckoutOrder(){
    let listOrderDetail  = [{
      id : 0,
      orderId : 10,
      productId : 0,
      productQuantity : 0
    }]
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach(c => {
      let od = {
        id : 0,
        orderId : 0,
        productId : c.Id,
        productQuantity: c.quantity
      }
      listOrderDetail.push(od);
    });
    listOrderDetail.shift();
    listOrderDetail.shift();
    
    if(this.sameAddress){
      let customer = GetCustomer();
      let order = this.order;
      order.id = 0;
      let Checkout = {
        customer : customer,
        order : order,
        orderDetail : listOrderDetail
      }
      console.log(Checkout);
      this.orderService.checkOutSameAddress(Checkout).subscribe(
        rs => {
          alert2("ĐẶT THÀNG THÀNH CÔNG","Thông tin đơn hàng đã được gửi về Mail : " + customer.customerMail,"success")
        },err=>{ console.log(err)}
      )
    }else{
      let customer = this.customerTemp2;
      let order = this.order;
      order.id = 0;
      let Checkout = {
        customer : customer,
        order : order,
        orderDetail : listOrderDetail
      }
      this.orderService.checkOutDifferentAddress(Checkout).subscribe(
        rs=>{
          alert2("ĐẶT THÀNG THÀNH CÔNG","Thông tin đơn hàng đã được gửi về Mail : " + customer.customerMail,"success");
        }, err=>{
          console.log(err)
        }
      )
    }
    
  }
  formatCurrency(money : number) : string{
    return formatCurrency(money);
  }
  getOrder(){
    this.order = JSON.parse(localStorage.getItem("order"));
    this.order.totalQuantity = CountQuantityInCart();
    this.order.customerId = GetCustomer().id;
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
  getCities() {
    this.customerService.getCities().subscribe(
      rs => {
        console.log(rs);
        this.cities = rs;
      }, err => {

      }
    )
  }
  getTowns(id: number) {
    this.customerService.getTownsById(id).subscribe(
      rs => {
        this.towns = rs;
        console.log(rs);

      }, err => {

      }
    )
  }
  getTown2(id : number){
    this.customerService.getTownsById(id).subscribe(
      rs => {
        this.towns2 = rs;
        console.log(rs);

      }, err => {

      }
    )
  }
  constructor(
    private categoryService : CategoryService,
    private customerService : CustomerService,
    private orderService : OrderService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.page = GetPage();
    this.customer = GetCustomer();
    this.customerTemp = GetCustomer();
    this.getCities();
    this.getOrder();
    console.log(this.order);
    this.getTown2(this.customerTemp.cityId)
  }

}
