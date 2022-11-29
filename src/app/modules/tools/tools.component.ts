import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  public toolsMenuOptions = {
    options: ['Visitors prediction', 'Push notifications', 'Emloyee management']
  }
  constructor() { }

  ngOnInit(): void {
  }

}
