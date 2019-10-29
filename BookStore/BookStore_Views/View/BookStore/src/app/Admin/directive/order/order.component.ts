import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { formatCurrency } from '../../config/config';
import { OrderService } from '../../services/order/order.service';
import { alert, alert2 } from '../../config/config';
import Swal from 'sweetalert2';
var moment = require('moment');
declare var require: any
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
  formatTime(time : string) :string{
    return moment(time).format("MMM Do YY");
  }
  getOrders() {
    this.orderService.getOrder().subscribe(
      rs => {
        this.orders = rs;
        this.ordersTemp = rs;
        console.log(this.orders);
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
            alert2("ERROR","Lỗi không xác định",'error')
            break;
          }
          case 2: {
            alert2("TOKEN EXPIRED","Hết phiên đăng nhập",'info');
            break;
          }
          case 3: {
            alert2("NO AUTHORITY","Tài khoản không đủ quyền",'warning')
            break;
          }
          default: {
            let index: number = this.orders.findIndex(order => order.order.id == id);
            this.orders[index].order.statusId = 2;
            alert2('UPDATED', 'Duyệt đơn hàng thành công','success');
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
            alert2("ERROR","Lỗi không xác định",'error')
            break;
          }
          case 2: {
            alert2("TOKEN EXPIRED","Hết phiên đăng nhập",'info');
            break;
          }
          case 3: {
            alert2("NO AUTHORITY","Tài khoản không đủ quyền",'warning')
            break;
          }
          default: {
            let index: number = this.orders.findIndex(order => order.order.id == id);
            this.orders[index].order.statusId = 3;
            alert2('UPDATED', 'Từ chối đơn hàng thành công','success');
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
            alert2('ERROR','Lỗi không xác định','error')
            break;
          }
          case 2: {
            alert2("TOKEN EXPIRED","Hết phiên đăng nhập",'info');
            break;
          }
          case 3: {
            alert2("NO AUTHORITY","Tài khoản không đủ quyền",'warning')
            break;
          }
          default: {
            let index: number = this.orders.findIndex(order => order.order.id == id);
            this.orders.splice(index, 1);
            alert2("DELETE","Xóa đơn hàng thành công",'success')
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
