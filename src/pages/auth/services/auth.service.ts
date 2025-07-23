import { computed, effect, Injectable, signal } from '@angular/core';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface RegisterDto {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  private access_token = signal<string | null>(localStorage.getItem('access_token'));
  private refresh_token = signal<string | null>(localStorage.getItem('refresh_token'));

  readonly isAuthenticated = computed(() => !!this.access_token());

  constructor(http: HttpClient) {
    super(http);

    effect(() => {
      const token = this.access_token();
      if (token) {
        localStorage.setItem('access_token', token);
      } else {
        localStorage.removeItem('access_token');
      }
    });

       effect(() => {
      const token = this.refresh_token();
      if (token) {
        localStorage.setItem('refresh_token', token);
      } else {
        localStorage.removeItem('refresh_token');
      }
    });
  }
getTokens() {
    return {
      access_token: this.access_token(),
      refresh_token: this.refresh_token(),
    };
  }

  setTokens(tokens: { access: string | null; refresh: string | null }) {
    this.access_token.set(tokens.access);
    this.refresh_token.set(tokens.refresh);
  }
  
  register(data: RegisterDto): Observable<any> {
    return this.post('/auth/local/signup', data);
  }

  login(data: RegisterDto): Observable<any> {
    return this.post('/auth/local/signin', data);
  }
  logout(): Observable<any> {
     this.setTokens({ access: null, refresh: null });
    return this.post('/auth/logout');
  }
}
