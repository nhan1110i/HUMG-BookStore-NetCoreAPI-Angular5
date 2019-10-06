import { Component, OnInit } from '@angular/core';
import {AccountService} from './../services/account/account.service';
import {alert} from './../config/config';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  admin : any ={
    username: "",
    password: ""
  }
  alert: any;
  
  constructor(private accountService : AccountService) { }
  login(): void{
    this.alert = null;
    this.accountService.loginAdmin(this.admin).subscribe(
      (rs)=>{
        if(rs){
          window.location.href = "http://localhost:4200/Admin";
        }else{
          this.alert = alert.wrongPassword;
        }
      },(err)=>{
        console.log(err)
      }
    )
    
  }
  
  ngOnInit() {
    
  }

}
