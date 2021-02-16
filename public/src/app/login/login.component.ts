import { Component, OnInit } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { completeLogin } from '../helpers/completeLogin';
import { LoginForm } from '../models/LoginForm';
import { PATH_MENU, PATH_SIGNUP } from '../paths.const';
import { LoginService } from './login.service';

@Component({
  selector: 'ons-page[login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [LoginService],
})
export class LoginComponent {

  model = new LoginForm('');

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    // https://stackoverflow.com/questions/54632686/component-constructor-is-getting-called-twice-with-angular-elements
    // TODO run twice
    const userName = localStorage.getItem('userName');
    if (userName) {
      this.loginService.getUser(userName).subscribe(response => {
        if (response.user) {
          completeLogin(response.user.name, this.router.navigate.bind(this.router));
        }
      })
    }
  }

  onLoginClick(): void {
    this.loginService.login(this.model).subscribe(response => {
      if (response.user) {
        console.log(response.user);
        
        completeLogin(response.user.name, this.router.navigate.bind(this.router));
      }
      else {
        this.router.navigate([PATH_SIGNUP], {
          queryParams: {
            userName: this.model.userName
          }
        });
      }
    });
  }


}