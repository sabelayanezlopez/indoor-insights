import { Component, OnInit } from '@angular/core';
import { verticalFunnel } from "@lucia/element-funnel";
import { D3Element } from '@lucia/core-d3element';
import { verticalLabels } from '@lucia/element-labels'; 
import { horizontalBand, renderHorizontal, } from '@lucia/element-axis';
import { tooltips } from '@lucia/element-tooltips';

@Component({
  selector: 'app-visitors-funnel',
  templateUrl: './visitors-funnel.component.html',
  styleUrls: ['./visitors-funnel.component.css']
})
export class VisitorsFunnelComponent implements OnInit {

  private graphData =  [
    {
        label: 'A group',
        value: 450,
        tooltip: '<b>hola</b>'
        
    },
    {
        label: 'B group',
        value: 95
        
    },
    {
        label: 'C group',
        value: 58          
    },
    {
        label: 'D group',
        value: 266,
    },
  ];
  private graphStyles = {
    colorPallete: ['#0B55F1', '#0B55F1', '#0B55F1', '#0B55F1', '#0B55F1', '#0B55F1', '#0B55F1'],
    padding: 10,
    fontSize: '12px',
    fontFamily: 'TeleSans-Regular'
  }
  ngOnInit(): void {
    const funnel = document.getElementsByClassName('funnel')[0];
    const funnelComponent = new D3Element(funnel, {});
    // draw funnel
    verticalFunnel(funnelComponent, this.graphData ,{
        separatorWidth: 30,
        colorSeparator: '#a1c9c3',
        colorPallete: ['#a1c9c3','#a1c9c3','#a1c9c3','#a1c9c3']
    }, {  });
    tooltips(funnelComponent, this.graphData);
    // labels
    verticalLabels(funnelComponent, this.graphData, this.graphStyles);
    // axis
    const horizontalAxis = horizontalBand(
      funnelComponent,
      this.graphData.map((element) => element.label)
    );
    renderHorizontal(funnelComponent, horizontalAxis, {
      showDomain: true,
      ticks: {
        tickLabels: this.graphData.map((element) => element.label),
        tickSize: 7,
        tickPadding: 2,
      },
      styles: {
        'font-family': 'TeleSans-Regular',
        'font-size': '13px'
      }
    });
  }

  
  
}
