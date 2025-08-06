import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import {
  catchError,
  filter,
  switchMap,
  take,
} from 'rxjs/operators';
import { AuthService } from '../../pages/auth/services/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private injector: Injector) {}

 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return next.handle(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return this.handle401Error(req, next);
      }

      return throwError(() => error);
    })
  );
}

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return authService.refreshToken().pipe(
        switchMap((response) => {
          const { access_token, refresh_token } = response;

          authService.setTokens({ access: access_token, refresh: refresh_token } );

          this.isRefreshing = false;
          this.refreshTokenSubject.next(access_token);

          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          return next.handle(clonedReq);
        }),
        catchError((err) => {
          this.isRefreshing = false;
          authService.logout();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(clonedReq);
        })
      );
    }
  }
}
