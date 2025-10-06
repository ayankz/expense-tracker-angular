import { computed, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';
import { Debt, DebtResponse, MetaData } from '../enums/Type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DebtsService extends BaseHttpService {
  private _debts = signal<Debt[]>([]);
  private _debtsMeta = signal<MetaData | null>(null);
  private LIMIT = 5;
  debtsError = signal<string | null>(null);
  readonly debts = computed(() => this._debts());
  readonly debtsMeta = computed(() => this._debtsMeta());
  constructor(http: HttpClient) {
    super(http);
  }

  loadDebts(page = 1): void {
    const params = new HttpParams().set('limit', this.LIMIT).set('page', page);
    this.get<DebtResponse>('/debts', params).subscribe({
      next: (debts) => {
        this._debts.set(debts.data);
        this._debtsMeta.set(debts.meta);
      },
      error: (err) => {
        console.error('Ошибка при загрузке долгов:', err);
        this.debtsError.set('Не удалось загрузить долги');
      },
    });
  }
  deleteDebt(id: number) {
    this.delete(`/debts/${id}`).subscribe({
      next: () => {
        this._debts.set(this._debts().filter((debt) => debt.id !== id));
      },
      error: (err) => {
        console.error('Ошибка при удалении долга:', err);
        this.debtsError.set('Не удалось удалить долг');
      },
    });
  }

  updateDebt(id: number, updateDto: Partial<Debt>) {
    this.update<Debt>(`/debts/${id}`, updateDto).subscribe({
      next: (updatedDebt) => {
        this._debts.update((debts) =>
          debts.map((debt) =>
            debt.id === id ? { ...debt, ...updatedDebt } : debt
          )
        );
      },
      error: (err) => {
        console.error('Ошибка при обновлении долга:', err);
        this.debtsError.set('Не удалось обновить долг');
      },
    });
  }
}
