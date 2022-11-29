import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.css']
})
export class TabTitleComponent implements OnInit {
  @Input() title:string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
