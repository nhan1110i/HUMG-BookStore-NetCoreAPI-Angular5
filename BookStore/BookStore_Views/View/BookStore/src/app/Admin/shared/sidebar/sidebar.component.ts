import { Component, OnInit } from '@angular/core';
import { GetUsername} from '../../config/config';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  username : string = GetUsername();
  constructor() { }

  ngOnInit() {
  }

}
