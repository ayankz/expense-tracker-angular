import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  createTransaction(transactionData: Transaction) {
    this.post<Transaction>('/operations', transactionData)
      .subscribe({
        next: (response) => {
          console.log('Transaction created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating transaction:', error);
        },
      });
    console.log(transactionData)
  }
}
