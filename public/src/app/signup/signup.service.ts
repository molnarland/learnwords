import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { SignupForm } from '../models/SignupForm';

type SignupReturn = Observable<{success: boolean, userId: string}>;

@Injectable()
export class SignupService extends HttpService {
  signupUrl = 'auth/signup';

  constructor(http: HttpClient) {
    super(http);
  }

  signup(signupForm: SignupForm): SignupReturn {
    return super.post<SignupForm>(this.signupUrl, signupForm) as SignupReturn;
  }
}

