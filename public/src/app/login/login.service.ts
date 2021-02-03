import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { LoginForm } from '../models/LoginForm';

type LoginReturn = Observable<{user: any|null}>; //TODO change any

@Injectable()
export class LoginService extends HttpService {
  loginUrl = 'api/v1/auth/login';

  constructor(http: HttpClient) {
    super(http);
  }

  login(loginForm: LoginForm): LoginReturn {
    return super.post<LoginForm>(this.loginUrl, loginForm) as LoginReturn;
  }
}
