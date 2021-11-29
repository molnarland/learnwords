import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

type User = {
  _id: string;
  name: string;
  native: string;
  learnable: string;
}

type LoginReturn = Observable<{ user: User | null }>;
type GetUserReturn = Observable<{ user: User | null }>;
type UserNameObject = {userName: string};

@Injectable({ providedIn: 'root' })
export class LoginService extends HttpService {
  loginUrl = 'auth/login';
  getUserUrl = 'auth/user/:userName';

  constructor(http: HttpClient) {
    super(http);
  }

  login(userName: string): LoginReturn {
    return super.post<UserNameObject>(this.loginUrl, {userName}) as LoginReturn;
  }

  getUser(userName: string): GetUserReturn {
    return super.get<UserNameObject>(this.getUserUrl, {userName}) as GetUserReturn;
  }
}
