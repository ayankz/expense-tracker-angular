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
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { EmptyComponent } from "../../ui/components/empty/empty.component";
@Component({
  selector: 'app-expenses',
  imports: [MatExpansionModule, DatePipe, CurrencyPipe, CommonModule, EmptyComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent implements OnInit {
  private categoryService = inject(TransactionService);
  private startX = 0;
  translateX = 0;
  @Output() delete = new EventEmitter<any>();
  public transactionError = this.categoryService.transactionError;

  ngOnInit() {
    this.categoryService.loadTransactions();
  }

  get grouppedTransactions() {
    return this.categoryService.transactions();
  }

  sumOfTheDay(day: string) {
    return this.grouppedTransactions
      .find((item) => item.date === day)
      ?.transactions.reduce((acc, curr) => acc + curr.amount, 0);
  }
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    event.preventDefault();
  }
  onTouchMove(event: TouchEvent) {
    const currentX = event.touches[0].clientX;
    const diff = currentX - this.startX;
    this.translateX = Math.min(0, diff);
  }

  onTouchEnd(event: TouchEvent, item: any) {
    if (this.translateX < -100) {
      this.delete.emit(item);
    }
    this.translateX = 0;
  }
}
