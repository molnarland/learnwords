import { Component, OnInit } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { LoginForm } from '../models/LoginForm';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [LoginService],
})
export class LoginComponent {

  model = new LoginForm('');

  constructor(private loginService: LoginService, private router: Router) { }

  onLoginClick(): void {
    this.loginService.login(this.model).subscribe(response => {
      if (response.user) {
        this.router.navigate(['app/menu']);
      }
      else {
        this.router.navigate(['/app/signup'], {
          queryParams: {
            userName: this.model.userName
          }
        });
      }
    });
  }
}
