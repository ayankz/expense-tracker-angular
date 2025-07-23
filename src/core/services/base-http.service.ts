import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpService {
  protected readonly baseUrl = environment.apiUrl;
  protected constructor(protected readonly http: HttpClient) {}

  protected request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options?: {
      body?: unknown;
      params?: HttpParams;
      headers?: HttpHeaders;
      token?: string;
      retryCount?: number;
    }
  ): Observable<T> {
    const headers = options?.headers || new HttpHeaders();
    const token = options?.token || localStorage.getItem('accessToken');

    const authHeaders = token
      ? headers.set('Authorization', `Bearer ${token}`)
      : headers;

    const requestOptions = {
      body: options?.body,
      params: options?.params,
      headers: authHeaders,
    };

    return this.http.request<T>(method, url, requestOptions).pipe(
      retry(options?.retryCount || 0),
      catchError((error) => {
        console.error('HTTP Error:', error);
        return throwError(() => error);
      })
    );
  }
  protected get<T>(
    url: string,
    params?: HttpParams,
    retryCount = 0
  ): Observable<T> {
    return this.request<T>('GET', `${this.baseUrl}${url}`, { params, retryCount });
  }

  protected post<T>(
    url: string,
    body?: unknown,
    retryCount = 0
  ): Observable<T> {
    return this.request<T>('POST', `${this.baseUrl}${url}`, { body, retryCount });
  }

  protected put<T>(url: string, body?: unknown, retryCount = 0): Observable<T> {
    return this.request<T>('PUT', `${this.baseUrl}${url}`, { body, retryCount });
  }

  protected delete<T>(url: string, retryCount = 0): Observable<T> {
    return this.request<T>('DELETE', `${this.baseUrl}${url}`, { retryCount });
  }
}
