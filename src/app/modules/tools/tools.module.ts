import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import '@lucia/select';
// import '@lucia/submenu';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToolsComponent } from './tools.component';
import { ToolsRoutingModule } from './tools-routing.module';
import { VisitorsPredictionComponent } from './visitors-prediction/visitors-prediction.component';
import { PushNotificationsComponent } from './push-notifications/push-notifications.component';

@NgModule({
  declarations: [
    ToolsComponent,
    VisitorsPredictionComponent,
    PushNotificationsComponent  ],
  imports: [
    CommonModule,
    SharedModule,
    ToolsRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ToolsModule { }
