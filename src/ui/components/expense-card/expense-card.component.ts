import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { CardType, TransactionView } from '../../../core/enums/Type';
import { DatePipe } from '@angular/common';
import { MoneyFormatDirective } from '../../../core/directive/money-format.directive';

@Component({
  selector: 'app-expense-card',
  standalone: true,
  imports: [DatePipe, MoneyFormatDirective],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseCardComponent  {
  expense = input.required<TransactionView>();
  public cardType = CardType;

}
