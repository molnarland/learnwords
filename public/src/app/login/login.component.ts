import { Component, OnInit } from '@angular/core';
import { LoginForm } from '../models/LoginForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  model = new LoginForm('kukucs');

  constructor() { }

  onLoginClick() {
  	console.log(this.model);
  }


}
