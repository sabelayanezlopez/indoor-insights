import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getVisitorsPerDay() {
    let visitorsPerDay = [{
      label: 'Mon 19',
      value: 29,
      tooltip: '<span style="color:#3787FF"> Monday 19: </span><br><b> 350-450 visitors </b><br>Weather predic. accuracy: 25%',
    },
    {
      label: 'Tue 20',
      value: 12,
      tooltip: '<span style="color:#3787FF"> Tuesday 20: </span><br><b> 350-450 visitors </b><br>Weather predic. accuracy: 25%',
    },
    {
      label: 'Wed 21',
      value: 15,
      tooltip: '<span style="color:#3787FF"> Wednesday 21: </span><br><b> 350-450 visitors </b><br>Weather predic. accuracy: 25%',
    },
    {
      label: 'Thu 22',
      value: 13,
      tooltip: '<span style="color:#3787FF"> Thursday 22: </span><br><b> 350-450 visitors </b><br>Weather predic. accuracy: 25%',
    },
    {
      label: 'Fri 23',
      value: 17,
      tooltip: '<span style="color:#3787FF"> Friday 23: </span><br><b> 350-450 visitors </b><br>Weather predic. accuracy: 25%',
    },
    {
      label: 'Sat 24',
      value: 18,
      tooltip: '<span style="color:#87B009"> Saturday 24: </span><br><b> 350-450 visitors </b><br>Weather predic. accuracy: 25%',
    },
    {
      label: 'Sun 25',
      value: 22,
      tooltip: '<span style="color:#87B009"> Sunday 25: </span><br><b> 350-450 visitors </b><br>Weather predic. accuracy: 25%',
    }];
    return of(visitorsPerDay)
  }
}
