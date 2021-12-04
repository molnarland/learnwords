import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PATH_LOGIN, PATH_MENU, PATH_SIGNUP } from './app-paths.const';

const routes: Routes = [
  { path: PATH_LOGIN, component: LoginComponent },
  { path: PATH_SIGNUP, component: SignupComponent },
  { 
    path: PATH_MENU, 
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule), 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
