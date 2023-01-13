import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import '@lucia/element-submenu';
import '@lucia/select';

import { ToolsModule } from './modules/tools/tools.module';
import { SharedModule } from './shared/shared.module';
import { VisitorsFunnelModule } from './modules/visitors-funnel/visitors-funnel.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolsModule,
    SharedModule,
    VisitorsFunnelModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
