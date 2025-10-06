import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  output,
} from '@angular/core';
import { Debt, DebtDirection, DebtStatus } from '../../../core/enums/Type';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-debt-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './debt-card.component.html',
  styleUrl: './debt-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtCardComponent {
  debt = input.required<Debt>();

  onRemove = output<number>();
  onMarkAsPaid = output<number>();

  public DebtDirection = DebtDirection;
  public DebtStatus = DebtStatus;

  getCardClasses(debt: Debt): string {
    const baseClasses =
      'p-2 sm:p-2 rounded-xl md:w-1/2 shadow-md transition duration-300 hover:shadow-lg  bg-white max-h-80 overflow-y-auto';

    if (debt.status === DebtStatus.PAID) {
      return `${baseClasses} settled-card`;
    }

    const activeClasses =
      debt.direction === DebtDirection.BORROWED
        ? 'debt-card-borrowed'
        : 'debt-card-lent';
    return `${baseClasses} ${activeClasses}`;
  }

  getTypeLabelColor(debt: Debt): string {
    if (debt.status === DebtStatus.PAID) {
      return 'text-sm font-medium text-gray-500';
    }
    return debt.direction === DebtDirection.BORROWED
      ? 'text-sm font-medium text-amber-600'
      : 'text-sm font-medium text-amber-400';
  }

  getTypeText(direction: DebtDirection): string {
    return direction === DebtDirection.BORROWED ? 'Занял' : 'Одолжил';
  }

  deleteDebt(id: number) {
    this.onRemove.emit(id);
  }

  markAsPaid(id: number) {
    this.onMarkAsPaid.emit(id);
  }
}
