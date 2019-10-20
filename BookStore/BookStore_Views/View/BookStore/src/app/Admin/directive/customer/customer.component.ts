import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { alert } from '../../config/config';
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

            if (this.customers[this.customers.findIndex(custom => custom.customer.id == id)].customer.isActive == true) {
              this.customers[this.customers.findIndex(custom => custom.customer.id == id)].customer.isActive = false;
            } else {
              this.customers[this.customers.findIndex(custom => custom.customer.id == id)].customer.isActive = true
            }
            this.alert = alert.update;
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
            this.customers.splice(this.customers.findIndex(custom => custom.customer.id == id), 1);
            this.alert = alert.delete;

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
