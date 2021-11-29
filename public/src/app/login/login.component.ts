import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ParamMap } from '@angular/router';
import { OnsNavigator } from 'ngx-onsenui';
import { completeLogin } from '../helpers/completeLogin';
import { PATH_SIGNUP } from '../paths.const';
import { LoginService } from './login.service';

@Component({
  selector: 'ons-page[login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [LoginService],
})
export class LoginComponent {
  form = new FormGroup({
    userName: new FormControl('', [Validators.required]),
  });

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) { }

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
    //TODO use this.form.controls to access userName etc
    const userName = this.userName?.value;
    if (userName) {
      this.loginService.login(userName).subscribe(response => {
        if (response.user) {
          completeLogin(response.user.name, this.router.navigate.bind(this.router));
        }
        else {
          this.navigateToSignup(userName);
        }
      });
    }
    else {
      this.navigateToSignup();
    }
  }

  onSignupClick(): void {
    this.navigateToSignup();
  }

  navigateToSignup(userName?: string): void {
    const queryParams = userName ? { userName } : {};

    this.router.navigate([PATH_SIGNUP], { queryParams })
  }

  get userName() { return this.form.get('userName'); }
}