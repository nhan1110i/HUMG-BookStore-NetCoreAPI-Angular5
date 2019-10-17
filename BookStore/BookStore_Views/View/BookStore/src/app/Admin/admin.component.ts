import { Component, OnInit } from '@angular/core';
import {GetAuthorization} from '../Admin/config/config'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(GetAuthorization() == "noAuthorziation"){
      window.location.href="http://localhost:4200/login";
    }
  }

}
