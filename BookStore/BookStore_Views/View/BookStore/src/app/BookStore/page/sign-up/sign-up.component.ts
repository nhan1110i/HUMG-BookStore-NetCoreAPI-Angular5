import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Admin/services/customer/customer.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  accountInCustomer: any = {
    customer: {
      id: 0,
      customerName: "",
      customerPhone: "",
      customerMail: "",
      cityId: 0,
      townId: 0,
      customerAddress: "",
      totalOrder: 0,
      totalOrderComplete: 0,
      totalOrderCancel: 0,
      isActive: true
    },
    account: {
      id: 0,
      username: "",
      password: "",
      customerId: 0,
    }
  }
  cities: any;
  towns: any;
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
  insert(){
    this.customerService.insertAccountInCustomer(this.accountInCustomer).subscribe(
      rs =>{
        if(rs.error == 0){
          console.log("ok")
        }
      },err =>{
        console.log(err);
      }
    )
  }
  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCities();

  }

}
