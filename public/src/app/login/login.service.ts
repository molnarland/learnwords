import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { LoginForm } from '../models/LoginForm';

type User = {
  _id: string;
  name: string;
  native: string;
  learnable: string;
}

type LoginReturn = Observable<{ user: User | null }>;
type GetUserReturn = Observable<{user: User | null }>;

@Injectable()
export class LoginService extends HttpService {
  loginUrl = 'auth/login';
  getUserUrl = 'auth/user';

  constructor(http: HttpClient) {
    super(http);
  }

  login(loginForm: LoginForm): LoginReturn {
    return super.post<LoginForm>(this.loginUrl, loginForm) as LoginReturn;
  }

  getUser(userName: string): GetUserReturn {
    return super.get<{userName: string}>(this.getUserUrl, {userName}) as GetUserReturn;
  }
}
