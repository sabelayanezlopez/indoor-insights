import { Component, OnInit } from '@angular/core';
import { D3Element } from '@lucia/core-d3element';
import { donutGraph } from '@lucia/element-donut';
import { verticalBars } from '@lucia/element-bars';
import { verticalLabels } from '@lucia/element-labels'; 
import { tooltips } from '@lucia/element-tooltips'
import { horizontalBand, renderHorizontal, } from '@lucia/element-axis';
import { onClick } from "@lucia/element-events";
import { selectAll } from "d3"
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-visitors-prediction',
  templateUrl: './visitors-prediction.component.html',
  styleUrls: ['./visitors-prediction.component.css']
})
export class VisitorsPredictionComponent implements OnInit {
 
  constructor(
    private dataService:DataService
  ) { }

  private graphData:any;

  private graphStyles = {
    colorPallete: ['#BCC0CA', '#BCC0CA', '#BCC0CA', '#BCC0CA', '#BCC0CA', '#BCC0CA', '#BCC0CA'],
    padding:   0.3,
    fontSize: '12px',
    fontFamily: 'TeleSans-Regular'
  }
  ngOnInit(): void {
    const graphComponentPerDay = document.getElementsByClassName(
      'visitors--prediction--per--day--graph'
    )[0];
    const d3GraphComponentPerDay = this.generateD3Component(graphComponentPerDay);
    this.dataService.getVisitorsPerDay().subscribe( (data:any) => {
      this.graphData = data;
      this.drawAxis(d3GraphComponentPerDay, this.graphData);
      this.drawBars(d3GraphComponentPerDay, this.graphData);
    })

    this.drawDonut();
  } 

  private drawDonut() {
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
          value: 45,
          label: "Female 45%"
        },
        {
          value: 55,
          label: "Male: 55%"
        },
      ],
      {
        colorPallete: ['#0B55F1', '#87B009'],
        fontSize: '12px',
        fontFamily: 'TeleSans-Regular'
      }
    );
  }

  private reloadStylesgraph(e, el, data) {
    this.graphStyles.colorPallete[e.detail.selectedIndex] = '#eb4034'
    this.drawBars(el,data) 
   
  }
  private drawBars(d3GraphComponent:any, graphData:any): void {
    verticalBars(d3GraphComponent, graphData, this.graphStyles );
    verticalLabels(d3GraphComponent, graphData, this.graphStyles);
    tooltips(d3GraphComponent, graphData, this.graphStyles)
  }

  private generateD3Component(graphComponent:any) {
    return new D3Element(graphComponent, {
      bottom: 25
    });
  }

  private drawAxis(d3GraphComponent:any, graphData:any) {
    const horizontalAxis = horizontalBand(
      d3GraphComponent,
      graphData.map((element) => element.label)
    );
    renderHorizontal(d3GraphComponent, horizontalAxis, {
      showDomain: true,
      ticks: {
        tickLabels: graphData.map((element) => element.label),
        tickSize: 7,
        tickPadding: 12
      },
      styles: {
        'font-family': 'TeleSans-Regular',
        'font-size': '13px'
      }
    });
  }

}
