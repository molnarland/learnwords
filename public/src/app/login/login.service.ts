import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoginForm } from '../models/LoginForm';

@Injectable()
export class LoginService {
  loginUrl = 'api/v1/login';

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm) {
  	return this.http.post(this.loginUrl, loginForm).pipe(
  		catchError(this.handleError),
  	);
  }

  private handleError(error: any): Observable<never> {
	  if (error.error instanceof ErrorEvent) {
	    // A client-side or network error occurred. Handle it accordingly.
	    console.error('An error occurred:', error.error.message);
	  } else {
	    // The backend returned an unsuccessful response code.
	    // The response body may contain clues as to what went wrong.
	    console.error(
	      `Backend returned code ${error.status}, ` +
	      `body was: ${error.error}`);
	  }

	  // Return an observable with a user-facing error message.
	  return throwError('Something bad happened; please try again later.');
	}
}
