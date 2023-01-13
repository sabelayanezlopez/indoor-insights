import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorsFunnelComponent } from './visitors-funnel.component';
import { VisitorsFunnelRoutingModule } from './visitors-funnel-routing.module';



@NgModule({
  declarations: [
    VisitorsFunnelComponent
  ],
  imports: [
    CommonModule,
    VisitorsFunnelRoutingModule
  ]
})
export class VisitorsFunnelModule { }
