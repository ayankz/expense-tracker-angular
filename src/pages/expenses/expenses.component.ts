import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-expenses',
  imports: [],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesComponent implements OnInit {
  private categoryService = inject(TransactionService);

  public transactions = this.categoryService.transactions;
  public transactionError = this.categoryService.transactionError;

  ngOnInit() {
    this.categoryService.loadTransactions();
    console.log(this.transactions());
  }
}
