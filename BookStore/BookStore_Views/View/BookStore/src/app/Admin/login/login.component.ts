import { Component, OnInit } from '@angular/core';
import { AccountService } from './../services/account/account.service';
import { alert } from './../config/config';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  admin: any = {
    username: "",
    password: ""
  }
  alert: any;

  constructor(private accountService: AccountService) { }
  login(): void {
    this.alert = null;
    console.log(this.admin)
    this.accountService.loginAdmin(this.admin).subscribe(
      (rs) => {
        if(rs.error == 1){
          this.alert = alert.wrongPassword;
        }else{
          localStorage.setItem("Authorization",rs.tokenValue);
          localStorage.setItem("Username",this.admin.username);
          console.log(rs);
           window.location.href="http://localhost:4200/Admin"
        }
      },err =>{

      }
    )

  }

  ngOnInit() {
    if(localStorage.getItem("Authorization")){
      localStorage.removeItem("Authorization")
    }
    if(localStorage.getItem("Username")){
      localStorage.removeItem("Username")
    }
  }

}
