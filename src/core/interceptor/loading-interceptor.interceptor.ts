import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { LoadingService } from "../services/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private requests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests++;
    this.loadingService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.requests--;
        if (this.requests === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}