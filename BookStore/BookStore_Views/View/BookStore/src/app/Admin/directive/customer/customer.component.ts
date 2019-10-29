import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { alert, alert2 } from '../../config/config';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  customers: any;
  alert: any;
  getCustomers() {
    this.customerService.getCustomers().subscribe(
      rs => {
        this.customers = rs;
      }, err => {
        console.log(err);
      }
    )
  }
  activeCustomer(id: number) {
    this.customerService.activeCustomer(id).subscribe(
      rs => {
        switch (rs.Error) {
          case 1: {
            alert2('ERROR', 'Đã xảy ra lỗi không xác định','error');
            break;
          }
          case 2: {
            alert2('TOKEN EXPIRED', 'Đã hết phiên đăng nhập','info');
            break;
          }
          case 3: {
            alert2('NO AUTHORITY', 'Tài khoản không đủ quyền','warning');
            break;
          }
          default: {

            if (this.customers[this.customers.findIndex(custom => custom.customer.id == id)].customer.isActive == true) {
              this.customers[this.customers.findIndex(custom => custom.customer.id == id)].customer.isActive = false;
            } else {
              this.customers[this.customers.findIndex(custom => custom.customer.id == id)].customer.isActive = true
            }
            alert2("UPDATED","Đã cập nhật thành công",'success')
            break;
          }
        }
      }
    )

  }
  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(
      rs => {
        switch (rs.Error) {
          case 1: {
            alert2('ERROR', 'Đã xảy ra lỗi không xác định','error');
            break;
          }
          case 2: {
            alert2('TOKEN EXPIRED', 'Đã hết phiên đăng nhập','info');
            break;
          }
          case 3: {
            alert2('NO AUTHORITY', 'Tài khoản không đủ quyền','warning');
            break;
          }
          default: {
            this.customers.splice(this.customers.findIndex(custom => custom.customer.id == id), 1);
            alert2("DELETED","Đã xóa thành công",'success')

            break;
          }
        }
      }
    )
  }
  getIsActive(active: boolean): string {
    if (active) {
      return "Chấp nhận"
    } else {
      return "Từ chối"
    }
  }
  ngOnInit() {
    this.getCustomers();
  }

}
