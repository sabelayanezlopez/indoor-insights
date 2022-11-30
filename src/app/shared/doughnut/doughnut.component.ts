import { Component, Input, AfterViewInit, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';

export interface DoughnutData {
  id: string;
  radius: number;
  values: Array<number>;
  colors: Array<string>;
  labels: Array<string>;
  drawLines: boolean;
  sideLabels: boolean;
  fontSize: string;
  fontFamily: string;
  fontColor: string;
}

export interface Doughnut {
  arcWidth?: number;
  arcs?: Array<number>;
  labels?: Array<string>;
  measures?: object;
}

@Component({
  selector: 'luca-doughnut',
  template: `
    <div class="d3Wrapper" id="{{doughnutData.id}}"></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoughnutComponent implements AfterViewInit, OnChanges {

  @Input() doughnutData: DoughnutData;

  private _wrapperGrpah;
  private _doughnut: Doughnut = {};
  private idDoughnut: string;
  private _idxArc: number;

  constructor() { }

  private checkInputData(): boolean {
    // Default values.
    this.doughnutData.drawLines = this.doughnutData.drawLines ? this.doughnutData.drawLines : false;
    this.doughnutData.sideLabels = this.doughnutData.sideLabels ? this.doughnutData.sideLabels : false;
    this.doughnutData.fontColor = this.doughnutData.fontColor ? this.doughnutData.fontColor : '#8c8c8c';
    this.doughnutData.fontSize = this.doughnutData.fontSize ? this.doughnutData.fontSize : '12px';
    this.doughnutData.fontFamily = this.doughnutData.fontFamily ? this.doughnutData.fontFamily : 'Tahoma';

    return true;
  }

  ngOnChanges(changes: SimpleChanges) {

    // Remove previous graphs
    if (changes.doughnutData.previousValue) {
      d3.select(`#wrapperPieGraph`).remove();
    }

    if (changes.doughnutData.currentValue) {
        if (!this.checkInputData()) {
            throw new Error('Faltan datos inicializacion objecto');
        }
        this._drawDoughnut();
    }

  }

  ngAfterViewInit() {
    this._drawDoughnut();
  }

  /**
   * _drawDoughnut
   *
   * Draw doughnut
   */
  private _drawDoughnut(): void {
    if ( !this.checkInputData() ) {
      throw new Error('Faltan datos inicializacion objecto');
    }
    this.idDoughnut = this.doughnutData.id;
    this._doughnut.measures = this._calcGraphMeasure();
    this._doughnut.arcs = this._interpolateValues(this.doughnutData.values);
    this._doughnut.labels = this._createLabels(this._doughnut.arcs, this.doughnutData.labels);
    this._createD3Wrapper();

    const drawArc = this._drawArc.call(this);
    this._doughnut.arcs?.forEach((arcValue, idx) => {
      drawArc(arcValue, this.doughnutData.colors[idx], this._doughnut.labels[idx], idx);
    });
   }

  /**
   * _createD3Wrapper
   *
   * Create D3 Grap Wrapper
   */
  private _createD3Wrapper() {

    function calcCenterOfDoughnut(){
      const x = this.doughnutData.sideLabels 
        ? this.doughnutData.radius + 10
        : this.doughnutData.radius + 100;
      const y = this.doughnutData.radius + 50;
      return `translate(${x}, ${y})`
    }

    this._wrapperGrpah = d3.select(`#${this.idDoughnut}`)
      .append('svg')
      .attr('id', 'wrapperPieGraph')
      .attr('height', (this.doughnutData.radius * 2)  + 120)
      .attr('width', (this.doughnutData.radius * 2) + 200)
      .append('g')
      // Center of wrapper
        .attr('transform', `${calcCenterOfDoughnut.call(this)}`)
        .attr('id', 'centerPieGraph');

  }


  /**
  *_calcGraphMeasure
  *
  * Calculate the width of the circle
  */
  private _calcGraphMeasure() {
    this._doughnut.arcWidth = this.doughnutData.radius * 0.5;
    return {
      innerRadius: this.doughnutData.radius,
      outerRadius: this.doughnutData.radius - this._doughnut.arcWidth
    };
  }


  /**
   * _inteerpolateValues
   *
   * return array with interpolate values between 0 and 360 to obtain the equivalence to draw the doughnut
   * @param  values  // Array with the values to draw
   */
  private _interpolateValues(values) {

    const totalValues = values.reduce( (total, currentValue) => total + currentValue );

    const interValue = d3.scaleLinear()
      .domain([0, totalValues])
      .range([0, 360]);

    return values.map(value => interValue(value));
  }


  private _createLabels(values, labels) {

    const totalValues = values.reduce( (total, currentValue) => total + currentValue );

    const interValue = d3.scaleLinear()
      .domain([0, 360])
      .range([0, 100]);

    return values.map( (value, idx) => `${labels[idx]} ${Number(interValue(value)).toFixed(1)}%`);
  }

  private _drawArc(endArc, fillColor, label, idx) {

    const that = this;
    let initArc = 0;

    return function(endArc, fillColor, label, idx) {

      function drawSideLabels(that, idx){

        const fontSize = Number(that.doughnutData.fontSize.replace('px', '')) * 1.3 ; // Remove px from fontSize to get text size;
        const adjustHeight = fontSize * ( that.doughnutData.labels.length / 2 );
        const x = ( that.doughnutData.radius + that._doughnut.arcWidth ) ; 
        const y = fontSize * idx - adjustHeight + ( Number(that.doughnutData.fontSize.replace('px', '')) / 2);  

        // Write text
        that._wrapperGrpah
          .append('text')
          .attr('font-size', that.doughnutData.fontSize)
          .attr('font-family', that.doughnutData.fontFamily)
          .attr('fill', that.doughnutData.colors[idx])
          .attr('text-anchor', 'start')
          .attr('transform', `translate(${x}, ${y})`)
          .text(label);

      }

      function drawLabelsWithLines(that){
        that._wrapperGrpah
          .append('line')
          .style('stroke', 'black')
          .style('opacity', .7)
          .attr('x1', initPoint[0])
          .attr('y1', initPoint[1])
          .attr('x2', endPoint[0])
          .attr('y2', endPoint[1]);

        if (endPoint[0] < 0  ) {
          // Draw line
          that._wrapperGrpah
          .append('line')
          .style('stroke', 'black')
          .style('opacity', .7)
          .attr('x1', endPoint[0])
          .attr('y1', endPoint[1])
          .attr('x2', - that.doughnutData.radius - 20)
          .attr('y2', endPoint[1]);

          // Write text
          that._wrapperGrpah
          .append('text')
          .attr('font-size', that.doughnutData.fontSize)
          .attr('font-family', that.doughnutData.fontFamily)
          .attr('fill', that.doughnutData.fontColor)
          .attr('text-anchor', 'end')
          .attr('transform', `translate(${-that.doughnutData.radius - 24 }, ${endPoint[1] + 4})`)
          .text(label);

        } else {
          // Draw line
          that._wrapperGrpah
          .append('line')
          .style('stroke', 'black')
          .style('opacity', .7)
          .attr('x1', endPoint[0])
          .attr('y1', endPoint[1])
          .attr('x2', that.doughnutData.radius + 20)
          .attr('y2', endPoint[1]);

          // Write text
          that._wrapperGrpah
          .append('text')
          .attr('font-size', that.doughnutData.fontSize)
          .attr('font-family', that.doughnutData.fontFamily)
          .attr('fill', that.doughnutData.fontColor)
          .attr('transform', `translate(${that.doughnutData.radius + 24}, ${endPoint[1] + 4 })`)
          .text(label);
        }        
      }

      function drawLabelsWithOutLines(that){

        if (endPoint[0] < 0  ) {
  
          // Write text
          that._wrapperGrpah
          .append('text')
          .attr('font-size', that.doughnutData.fontSize)
          .attr('font-family', that.doughnutData.fontFamily)
          .attr('fill', that.doughnutData.fontColor)
          .attr('text-anchor', 'end')
          .attr('transform', `translate(${endPoint[0] }, ${endPoint[1]})`)
          .text(label);

        } else {
          // Write text
          that._wrapperGrpah
            .append('text')
            .attr('font-size', that.doughnutData.fontSize)
            .attr('font-family', that.doughnutData.fontFamily)
            .attr('fill', that.doughnutData.fontColor)
            .attr('transform', `translate(${endPoint[0] }, ${endPoint[1]})`)
            .text(label);
        }        
        
      }

      const arc = d3.arc()
        .innerRadius(that._doughnut.measures['innerRadius'])
        .outerRadius(that._doughnut.measures['outerRadius'])
        .padAngle((0 * Math.PI) / 180)
        .startAngle((initArc * Math.PI) / 180) // converting from degs to radians
        .endAngle(((initArc + endArc) * Math.PI) / 180); // just radians


      const centerSegment = d3.arc()
        .innerRadius(that._doughnut.measures['innerRadius'] - that._doughnut.arcWidth / 2)
        .outerRadius(that._doughnut.measures['innerRadius'] - that._doughnut.arcWidth / 2)
        .padAngle((0 * Math.PI) / 180)
        .startAngle((initArc * Math.PI) / 180) // converting from degs to radians
        .endAngle(((initArc + endArc) * Math.PI) / 180); // just radians

      const outerSegment = d3.arc()
        .innerRadius(that._doughnut.measures['innerRadius'] + 15)
        .outerRadius(that._doughnut.measures['innerRadius'] + 15)
        .padAngle((0 * Math.PI) / 180)
        .startAngle((initArc * Math.PI) / 180) // converting from degs to radians
        .endAngle(((initArc + endArc) * Math.PI) / 180); // just radians

      that._wrapperGrpah
        .append('path')
        .style('fill', fillColor)
        .attr('d', arc);

      const initPoint = centerSegment.centroid({ startAngle: (initArc * Math.PI) / 180, endAngle: ((initArc + endArc) * Math.PI) / 180 });
      const endPoint = outerSegment.centroid({ startAngle: (initArc * Math.PI) / 180, endAngle: ((initArc + endArc) * Math.PI) / 180 });

      if ( !that.doughnutData.sideLabels ) {
        if ( that.doughnutData.drawLines && label ) {
          drawLabelsWithLines(that);
        }
  
        // Draw only labels
        if ( !that.doughnutData.drawLines && label ) {
          drawLabelsWithOutLines(that);
        }
      } else {
        drawSideLabels(that, idx);
      }


      initArc += endArc;
    };
  }
}

