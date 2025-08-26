import { computed, Injectable, signal } from '@angular/core';
import { Card } from '../enums/Type';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class CardService extends BaseHttpService {
  private _cards = signal<Card[]>([]);
  transactionError = signal<string | null>(null);
  readonly cards = computed(() => this._cards());
  constructor(http: HttpClient) {
    super(http);
  }

  loadCards(): void {
    this.get<Card[]>('/cards').subscribe({
      next: (cards) => {
        console.log(23123)
        this._cards.set(cards);
      },
      error: (err) => {
        this.transactionError.set('Не удалось загрузить карты');
      },
    });
  }
}
