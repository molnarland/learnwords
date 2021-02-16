import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(protected http: HttpClient) { }

  post<T>(url: string, body: T): Observable<{}> {
    return this.http.post(url, body).pipe(
      catchError(this.handleError),
    );
  }

  get<T>(url: string, params: T & {}): Observable<{}> {
    const fullUrl = `${url}/${new URLSearchParams(params).toString()}`;

    return this.http.get(fullUrl).pipe(catchError(this.handleError),);
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
