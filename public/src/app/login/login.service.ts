import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoginForm } from '../models/LoginForm';

@Injectable()
export class LoginService {
  loginUrl = 'api/v1/login';

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm): void {
    return this.http.post(this.loginUrl, loginForm).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: any): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }

    return throwError('Something bad happened; please try again later.');
  }
}
