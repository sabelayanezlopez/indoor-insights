import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PushNotificationsComponent } from './push-notifications/push-notifications.component';
import { ToolsComponent } from './tools.component';
import { VisitorsPredictionComponent } from './visitors-prediction/visitors-prediction.component';

const routes: Routes = [
  { path: '', redirectTo: 'tools', pathMatch: 'full'},
    { path: 'tools', component: ToolsComponent, children: [
      
        { path: '', redirectTo: 'visitors-prediction', pathMatch: 'full'},
        { path: 'visitors-prediction', component: VisitorsPredictionComponent },
        { path: 'push-notifications', component: PushNotificationsComponent },
    ] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }