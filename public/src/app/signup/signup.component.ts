import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { completeLogin } from '../helpers/completeLogin';
import { PATH_MENU } from '../paths.const';
import { SignupService } from './signup.service';


@Component({
  selector: 'ons-page[signup]',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
  providers: [SignupService],
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    nativeLanguage: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-z0-9\ ]+/)]),
    learnLanguage: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-z0-9\ ]+/)]),
  });
  hideUserNameField: boolean = false;

  constructor(
    private signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.userName) {
        this.userName?.setValue(params.userName)
        this.hideUserNameField = true;
      }
    });
  }

  onSignupClick(): void {
    this.signupService.signup(this.form.value).subscribe(response => {
      if (response.success) {
        completeLogin(this.userName?.value, this.router.navigate.bind(this.router));
      }
    });
  }

  get userName() { return this.form.get('userName'); }
  get nativeLanguage() { return this.form.get('nativeLanguage'); }
  get learnLanguage() { return this.form.get('learnLanguage'); }
}
