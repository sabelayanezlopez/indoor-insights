import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-filter',
  templateUrl: './main-filter.component.html',
  styleUrls: ['./main-filter.component.css']
})
export class MainFilterComponent implements OnInit {
  public SELECT_OPTIONS = {
    title: 'Location',
    defaultSelectOption: 0,
    options: ['Gran Via 47', 'Opcion 2', 'Opcion 3', 'Option 4']
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
