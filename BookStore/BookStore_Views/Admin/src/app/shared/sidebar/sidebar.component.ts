import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() {   }
  showSiderBar : boolean;
  showSidebar() : boolean{
    if(window.location.href == "http://localhost:4200/login"){
      return false;
    }else{
      return true;
    }
  }
  ngOnInit() {
    this.showSidebar();
  }

}
