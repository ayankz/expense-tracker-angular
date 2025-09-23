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
        this._cards.set(cards);
      },
      error: (err) => {
        this.transactionError.set('Не удалось загрузить карты');
      },
    });
  }
  removeCard(id: number): void {
    this.delete<void>(`/cards/${id}`).subscribe({
      next: () => {
        this._cards.set(this._cards().filter((card) => card.id !== id));
      },
      error: (err) => {
        this.transactionError.set('Не удалось удалить карту');
      },
    });
  }
  createCard(card: Omit<Card, 'id'>): void {
    this.post<Card>('/cards', card).subscribe({
      next: (newCard) => {
        this._cards.set([...this._cards(), newCard]);
      },
      error: (err) => {
        this.transactionError.set('Не удалось добавить карту');
      },
    });
  }
}
