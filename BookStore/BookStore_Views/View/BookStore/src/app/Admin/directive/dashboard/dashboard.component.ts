import { Component, OnInit } from '@angular/core';
import {GetAuthorization} from '../../config/config';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  token : any;
  ngOnInit() {
    if(GetAuthorization() == "noAuthorziation"){
      window.location.href="http://localhost:4200/login";
    }else{
      this.token = GetAuthorization();
      console.log(GetAuthorization());
    }
  }

}
