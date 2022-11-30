import { Component, OnInit } from '@angular/core';
import { D3Element } from '@lucia/core-d3element';
import { donutGraph } from '@lucia/element-donut';
import { verticalBars } from '@lucia/element-bars';
@Component({
  selector: 'app-visitors-prediction',
  templateUrl: './visitors-prediction.component.html',
  styleUrls: ['./visitors-prediction.component.css']
})
export class VisitorsPredictionComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
    const graphComponentPerDay = document.getElementsByClassName(
      'visitors--prediction--per--day'
    )[0];
  
    const d3GraphComponentPerDay = this.generateD3Component(graphComponentPerDay);
    // Generate graphComponent
    const graphComponent = document.getElementsByClassName(
      'visitors--prediction--data--donut'
    )[0];
    const d3GraphComponent = new D3Element(graphComponent, {});
    // Draw Donut
    donutGraph(
      d3GraphComponent,
      [
        {
          value: 9,
        },
        {
          value: 3,
        },
      ],
      {
        colorPallete: ['#0B55F1', '#87B009'],
      }
    );

    this.drawBars(d3GraphComponentPerDay, [
      {
        label: 'Hall',
        value: 28,
        tooltip: '23.6 º',
      },
      {
        label: 'Planta 1',
        value: -12,
        tooltip: '22.7 º',
      },
      {
        label: 'Planta 2',
        value: -10,
        tooltip: '22.7 º',
      },
      {
        label: 'Planta 3',
        value: 13,
        tooltip: '23.3 º',
      },
      {
        label: 'Planta 4',
        value: -17,
        tooltip: '22.6 º',
      },
      {
        label: 'Planta 5',
        value: 8,
        tooltip: '23.2 º',
      },
      {
        label: 'Parking',
        value: -42,
        tooltip: '22.0 º',
      },
      {
        label: 'Accesos',
        value: 32,
        tooltip: '23.7 º',
      },
      {
        label: 'Cafeteria',
        value: 35,
        tooltip: '23.8 º',
      },
      {
        label: 'Agora',
        value: -12,
        tooltip: '22.7 º',
      },
    ])
  }


  private drawBars(d3GraphComponent:any, graphData:any): void {
    verticalBars(d3GraphComponent, graphData, {});
  }

  private generateD3Component(graphComponent:any) {
    return new D3Element(graphComponent, {
      bottom: 25,
      left: 35,
    });
  }


}
