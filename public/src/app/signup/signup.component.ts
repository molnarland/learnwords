import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { completeLogin } from '../helpers/completeLogin';
import { SignupForm } from '../models/SignupForm';
import { PATH_MENU } from '../paths.const';
import { SignupService } from './signup.service';


@Component({
  selector: 'ons-page[signup]',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
  providers: [SignupService],
})
export class SignupComponent implements OnInit {

  model = new SignupForm('', '', '');

  constructor(
    private signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('brrrrrrrrrrrrrrrrrr');
    this.route.queryParams.subscribe(params => {
      this.model.userName = params.userName;
    });
  }

  onSignupClick(): void {
    this.signupService.signup(this.model).subscribe(response => {
      if (response.success) {
        completeLogin(this.model.userName, this.router.navigate.bind(this.router));
      }
    });
  }
}
