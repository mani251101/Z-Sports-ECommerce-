import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _auth: AuthService, private _route: Router, private _logger:NGXLogger) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this._auth.getToken();

    if (myToken)
    {
      request = request.clone({ setHeaders: { Authorization: `bearer${myToken}` } })
    }
    return next.handle(request).pipe(

      catchError((error: any) =>
      {
        if (error instanceof HttpErrorResponse)
        {
          if (error.status === 401)
          {
            alert("Token is Expired, Login again");
            this._route.navigate(['/login']);
          }
        }
        return throwError(() => new Error("Something Went Wrong"))
      })
    );
  }
}
