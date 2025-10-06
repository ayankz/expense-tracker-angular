import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { ExpenseCardComponent } from '../../ui/components/expense-card/expense-card.component';
@Component({
  selector: 'app-expenses',
  imports: [MatExpansionModule, CommonModule, ExpenseCardComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent implements OnInit {
  private categoryService = inject(TransactionService);
  @Output() delete = new EventEmitter<any>();
  public transactionError = this.categoryService.transactionError;

  ngOnInit() {
    this.categoryService.loadTransactions();
    console.log(this.grouppedTransactions);
  }

  get grouppedTransactions() {
    return this.categoryService.transactions();
  }

}
