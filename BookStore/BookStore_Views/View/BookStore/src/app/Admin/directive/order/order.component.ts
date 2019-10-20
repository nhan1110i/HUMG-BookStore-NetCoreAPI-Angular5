import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { formatCurrency } from '../../config/config';
import { OrderService } from '../../services/order/order.service';
import { alert } from '../../config/config'
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any;
  getOrders() {
    this.orderService.getOrder().subscribe(
      rs => {
        this.orders = rs;
      }, err => {
        console.log(err)
      }
    )
  }
  completeOrder(id : number){
    let index : number = this.orders.findIndex(order => order.order.id == id);
    this.orders[index].order.statusId = 2;
  }
  declineOrder(id : number){
    let index : number = this.orders.findIndex(order => order.order.id == id);
    this.orders[index].order.statusId = 3;
  }
  deleteOrder(id : number){
    let index : number = this.orders.findIndex(order => order.order.id == id);
    this.orders.splice(index,1);
  }
  formatMoney(money: number): string {
    return formatCurrency(money)

  }
  getPayment(payment : number) : string{
    switch (payment) {
      case 1:
        return  "Online";
        break;
      case 2:
        return "Ship COD";
        break;
      default:
        return "không rõ"
        break;
    }
  }
  getStatus(status: number): string {
    switch (status) {
      case 1:
        return  "Chưa xử lý";
        break;
      case 2:
        return "Đã xử lý";
        break;
      case 3:
        return "Đã từ chối";
        break;
      default:
        return "không rõ"
        break;
    }
  }
  getStatusClass(status : number) : string{
    switch (status) {
      case 1:
        return  "badge badge-info";
        break;
      case 2:
        return "badge badge-primary";
        break;
      case 3:
        return "badge badge-warning";
        break;
      default:
        return "không rõ"
        break;
    }
  }
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(
  ) {
    this.getOrders()
  }

}
