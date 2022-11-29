import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolsComponent } from './tools.component';
import { VisitorsPredictionComponent } from './visitors-prediction/visitors-prediction.component';

const routes: Routes = [
    { path: 'tools', component: ToolsComponent, children: [
        { path: '', redirectTo: 'visitors-prediction', pathMatch: 'full'},
        { path: 'visitors-prediction', component: VisitorsPredictionComponent }
    ] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }