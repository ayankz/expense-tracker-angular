import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

  pageNumbers = computed<number[]>(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  goToPage(page: number): void {
    this.pageChange.emit(page);
  }

  prevPage(): void {
    const current = this.currentPage();
    if (current > 1) {
      this.pageChange.emit(current - 1);
    }
  }
  
  nextPage(): void {
    const current = this.currentPage();
    const total = this.totalPages();
    if (current < total) {
      this.pageChange.emit(current + 1);
    }
  }
}
