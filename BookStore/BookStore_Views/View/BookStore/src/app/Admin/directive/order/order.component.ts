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
  alert: any;
  orders: any;
  ordersTemp: any;
  filter: number = 0;
  getOrders() {
    this.orderService.getOrder().subscribe(
      rs => {
        this.orders = rs;
        this.ordersTemp = rs;
      }, err => {
        console.log(err)
      }
    )
  }
  filterOrder() {

    if (this.filter == 0) {
      this.orders = this.ordersTemp;
    } else {
      this.orders = this.ordersTemp;
      this.orders = this.orders.filter(order => order.order.statusId == this.filter)
    }
  }
  completeOrder(id: number) {
    this.orderService.completeOrder(id).subscribe(
      rs => {
        switch (rs.Error) {
          case 1: {
            this.alert = alert.error;
            break;
          }
          case 2: {
            this.alert = alert.expire;
            break;
          }
          case 3: {
            this.alert = alert.auth;
            break;
          }
          default: {
            let index: number = this.orders.findIndex(order => order.order.id == id);
            this.orders[index].order.statusId = 2;
            this.alert = alert.update;
            console.log(rs)
            break;
          }
        }
      }, err => {
        console.log(err);
      }
    )

  }
  declineOrder(id: number) {
    console.log(id);
    this.orderService.declineOrder(id).subscribe(
      rs => {
        switch (rs.Error) {
          case 1: {
            this.alert = alert.error;
            break;
          }
          case 2: {
            this.alert = alert.expire;
            break;
          }
          case 3: {
            this.alert = alert.auth;
            break;
          }
          default: {
            let index: number = this.orders.findIndex(order => order.order.id == id);
            this.orders[index].order.statusId = 3;
            this.alert = alert.update;
            console.log(rs)
            break;
          }
        }
      }, err => {
        console.log(err)
      }
    )

  }
  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(
      rs => {
        switch (rs.Error) {
          case 1: {
            this.alert = alert.error;
            break;
          }
          case 2: {
            this.alert = alert.expire;
            break;
          }
          case 3: {
            this.alert = alert.auth;
            break;
          }
          default: {
            let index: number = this.orders.findIndex(order => order.order.id == id);
            this.orders.splice(index, 1);
            this.alert = alert.delete;
            console.log(rs)
            break;
          }
        }
      }, err => {
        console.log(err)
      }
    )

  }
  formatMoney(money: number): string {
    return formatCurrency(money)

  }
  getPayment(payment: number): string {
    switch (payment) {
      case 1:
        return "Online";
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
        return "Chưa xử lý";
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
  getStatusClass(status: number): string {
    switch (status) {
      case 1:
        return "badge badge-info";
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
