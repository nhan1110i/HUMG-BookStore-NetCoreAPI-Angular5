import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Admin/services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { formatCurrency } from '../../../config/config'
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderDetail: any;
  getOrderDetail() {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.orderService.getDetailOrder(id).subscribe(
      rs => {
        this.orderDetail = rs;
        console.log(this.orderDetail);
      },
      err => {

      }
    )
  }
  back(){
    this.location.back();
  }
  getStatus(id: number): string {
    switch (id) {
      case 1:
        return "chưa xử lý";

      case 2:
        return "Đã xử lý";
      case 3:
        return "Từ chối"
    }
  }
  format(money : number) : string{
    return formatCurrency(money);
  }
  constructor(
    private orderService: OrderService,
    private activeRoute: ActivatedRoute,
    private location: Location,
  ) {
    this.getOrderDetail()
  }

  ngOnInit() {

  }

}
