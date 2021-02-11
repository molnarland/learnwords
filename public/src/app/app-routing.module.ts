import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { PATH_LOGIN, PATH_MENU, PATH_SIGNUP } from './paths.const';

const routes: Routes = [
  { path: PATH_LOGIN, component: LoginComponent },
  { path: PATH_SIGNUP, component: SignupComponent },
  { path: PATH_MENU, component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
