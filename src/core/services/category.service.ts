import { computed, Injectable, signal } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../interfaces';
import { OperationType } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseHttpService {
  private _categories = signal<Category[]>([]);
  categoryError = signal<string | null>(null);
  readonly categories = computed(() => this._categories());

  constructor(http: HttpClient) {
    super(http);
  }

  loadCategories(type?: OperationType) {
    let params = new HttpParams();
    if (type !== undefined) {
      params = params.set('type', type.toString());
    }

    this.get<Category[]>('/category', params ).subscribe({
      next: (data) => this._categories.set(data),
      error: (err) => {
      this.categoryError.set('Не удалось загрузить категории');
    },
    });
  }
}
