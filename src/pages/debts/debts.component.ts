import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Debt, DebtDirection, DebtStatus } from '../../core/enums/Type';
import { DebtsService } from '../../core/services/debts.service';
import { DebtCardComponent } from '../../ui/components/debt-card/debt-card.component';
import { PaginationComponent } from '../../ui/components/pagination/pagination.component';

@Component({
  selector: 'app-debts',
  imports: [CommonModule, DebtCardComponent, PaginationComponent],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtsComponent implements OnInit {
  private debtsService = inject(DebtsService);
  public DebtDirection = DebtDirection;
  ngOnInit(): void {
    this.debtsService.loadDebts();
  }
  get debts() {
    return this.debtsService.debts();
  }

  get metaData() {
    return this.debtsService.debtsMeta();
  }

  onPageChange(page: number) {
    this.debtsService.loadDebts(page);
  }

  remove(id: number) {
    this.debtsService.deleteDebt(id);
  }

  markAsPaid(id: number) {
    this.debtsService.updateDebt(id, { status: DebtStatus.PAID });
  }
  
  totalBorrowed = computed(() => {
    return this.debts
      .filter(
        (d) =>
          d.direction === DebtDirection.BORROWED && d.status !== DebtStatus.PAID
      )
      .reduce((sum, debt) => sum + debt.amount, 0);
  });

  totalLent = computed(() => {
    return this.debts
      .filter(
        (d) =>
          d.direction === DebtDirection.LENT && d.status !== DebtStatus.PAID
      )
      .reduce((sum, debt) => sum + debt.amount, 0);
  });
}
