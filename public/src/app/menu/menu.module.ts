import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    MenuComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class MenuModule { }
