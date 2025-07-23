import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptor/loading-interceptor.interceptor';

  bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
})
  .catch((err) => console.error(err));