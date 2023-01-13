import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabTitleComponent } from './tab-title/tab-title.component';
import { MainFilterComponent } from './main-filter/main-filter.component';

// import "@lucia/select"

@NgModule({
  declarations: [
    TabTitleComponent,
    MainFilterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabTitleComponent,
    MainFilterComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
