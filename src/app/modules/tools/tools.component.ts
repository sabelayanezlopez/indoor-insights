import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  public toolsMenuOptions = {
    options: ['Visitors prediction', 'Push notifications', 'Employee management']
  }
  constructor( private router:Router) { }

  ngOnInit(): void {
  }

  public navToSubpage(ev:any) {
    switch(ev.detail) {
      case 0: 
        this.router.navigate(['/tools/visitors-prediction']);
        break;
      case 1:
        this.router.navigate(['/tools/push-notifications']);
        break;
      case 2:
        this.router.navigate(['/tools/icon-map']);
        break;
    }
  }

}
