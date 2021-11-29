import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

type SignupParams = {
    userName: string,
    nativeLanguage: string,
    learnLanguage: string,
};
type SignupReturn = Observable<{success: boolean, userId: string}>;

@Injectable()
export class SignupService extends HttpService {
  signupUrl = 'auth/signup';

  constructor(http: HttpClient) {
    super(http);
  }

  signup(signupParams: SignupParams): SignupReturn {
    return super.post<SignupParams>(this.signupUrl, signupParams) as SignupReturn;
  }
}

