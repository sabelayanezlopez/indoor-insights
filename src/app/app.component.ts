import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'indoor-insights';
  public MENU_OPTIONS = {
    defaultSelectedOption : 3,
    options:[
    'Overview',
    'Visitors funnel',
    'Spaces use',
    'Tools'
  ]}

  constructor(private router:Router) { }
  public navToPage(ev:any) {
    switch(ev.detail) {
      case 1:
        this.router.navigate(['/visitors-funnel']);
        break;
      case 3:
          this.router.navigate(['/tools']);
          break;
    }
  }
}
