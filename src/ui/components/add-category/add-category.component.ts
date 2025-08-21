import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SelectorComponent } from '../selector/selector.component';
import { OperationType } from '../../../core/enums';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
@Component({
  selector: 'app-add-category',
  imports: [MatIconModule, SelectorComponent, ButtonComponent, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryComponent {
  private categoryService = inject(CategoryService);

  @Input() isActive: boolean = false;
  @Output() isActiveChange = new EventEmitter();
  public OperationType = OperationType;
  selectedType: OperationType = OperationType.EXPENSE;
  categoryName: string = '';
  select(type: OperationType) {
    this.selectedType = type;
  }

  createCategory() {
    this.categoryService
      .createCategory({
        type: this.selectedType,
        name: this.categoryName,
      })
      .subscribe({
        next: () => {
          this.categoryService.loadCategories();
          this.isActiveChange.emit();
        },
        error: () => {
          this.categoryService.categoryError.set(
            'Не удалось создать категорию'
          );
        },
      });
  }
}
