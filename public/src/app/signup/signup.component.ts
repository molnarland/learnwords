import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SignupForm } from '../models/SignupForm';
import { SignupService } from './signup.service';


@Component({
  selector: 'app-signup',
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
    this.route.queryParams.subscribe(params => {
      this.model.userName = params.userName;
    });
  }

  onSignupClick(): void {
    this.signupService.signup(this.model).subscribe(response => {
      // save userId globally such as cookie or localeStorage
      if (response.success) {
        this.router.navigate(['app/menu']);
      }
    });
  }
}
