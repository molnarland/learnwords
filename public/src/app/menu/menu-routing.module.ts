import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PATH_MENU, PATH_SETTINGS } from './menu-paths.const';
import { MenuComponent } from './menu/menu.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: PATH_MENU,
    component: MenuComponent,
  },
  {
    path: PATH_SETTINGS,
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
