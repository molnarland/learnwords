import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'app', component: LoginComponent },
  { path: 'app/signup', component: SignupComponent },
  { path: 'app/menu', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, { useHash: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
