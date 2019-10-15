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
        if(rs.error){
          this.alert = alert.wrongPassword;
        }else{
          this.alert = alert.add;
        }
      },(err)=>{
        console.log(err)
      }
    )
    
  }
  
  ngOnInit() {
    
  }

}
