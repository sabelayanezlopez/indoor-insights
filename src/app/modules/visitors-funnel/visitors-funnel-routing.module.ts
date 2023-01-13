import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorsFunnelComponent } from './visitors-funnel.component';

const routes: Routes = [
  { path: 'visitors-funnel', component: VisitorsFunnelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class VisitorsFunnelRoutingModule { }