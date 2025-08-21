import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptor/loading-interceptor.interceptor';
import { RefreshTokenInterceptor } from './core/interceptor/refresh.interceptor';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { LOCALE_ID } from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeRu);
bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideEnvironmentNgxMask(),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
}).catch((err) => console.error(err));
