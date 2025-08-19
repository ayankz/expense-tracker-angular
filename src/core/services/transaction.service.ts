import { computed, Injectable, signal } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { GroupedTransactions, Transaction } from '../enums';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends BaseHttpService {
  private _transactions = signal<GroupedTransactions[]>([]);
  transactionError = signal<string | null>(null);
  readonly transactions = computed(() => this._transactions());

  constructor(http: HttpClient) {
    super(http);
  }

  createTransaction(transactionData: Transaction) {
    this.post<Transaction>('/operations', transactionData).subscribe({
      next: (response) => {
        console.log('Transaction created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating transaction:', error);
      },
    });
    console.log(transactionData);
  }
  loadTransactions(): void {
    this.get<Transaction[]>('/operations')
      .pipe(
        map((transactions) => {
          const groupedMap = transactions.reduce((acc, tx) => {
            const date = new Date(tx.createdAt).toISOString().slice(0, 10);
            if (!acc[date]) acc[date] = [];
            acc[date].push(tx);
            return acc;
          }, {} as Record<string, Transaction[]>);
          return Object.entries(groupedMap)
            .map(([date, transactions]) => ({
              date,
              transactions,
            }))
            .sort((a, b) => b.date.localeCompare(a.date)); //
        }),
        catchError((err) => {
          this.transactionError.set('Не удалось загрузить транзакции');
          return of([]);
        })
      )
      .subscribe((grouped) => {
        this._transactions.set(grouped);
      });
  }
}
