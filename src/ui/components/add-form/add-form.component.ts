import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { GlobalModalService } from '../../../core/services/global-modal.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { OperationType } from '../../../core/enums';
import { CategoryService } from '../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from '../selector/selector.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ButtonComponent } from '../button/button.component';
import { dateValidator } from '../../../core/validators/date.validator';
import { Category } from '../../../core/interfaces';
import { TransactionService } from '../../../core/services/transaction.service';
import { BankStatementComponent } from "../bank-statement/bank-statement.component";
import { AddCategoryComponent } from "../add-category/add-category.component";

@Component({
  selector: 'app-add-form',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatTabsModule,
    CommonModule,
    SelectorComponent,
    NgxMaskDirective,
    ButtonComponent,
    BankStatementComponent,
    AddCategoryComponent
],
  providers: [provideNgxMask()],
  standalone: true,
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent {
  private categoryService = inject(CategoryService);
  private modalService = inject(GlobalModalService);
  private transactionService = inject(TransactionService);
  private fb = inject(FormBuilder);

  public addForm: FormGroup;
  public categories = this.categoryService.categories;
  public categoryError = this.categoryService.categoryError;
  public isCreateModalOpen = signal<boolean>(false);
  public isReadyToAddCategory = signal<boolean>(false);

  constructor() {
    this.addForm = this.fb.group({
      type: [OperationType.EXPENSE],
      categoryId: [''],
      date: ['', [Validators.required, dateValidator()]],
      comment: [''],
      amount: ['', Validators.required],
    });
    this.categoryService.loadCategories();
  }

  selectedOperationTypes: OperationType | null = null;
  activeCategory: string | null = null;
  operationTypes = [
    { label: 'Расход', value: OperationType.EXPENSE },
    { label: 'Поступление', value: OperationType.INCOME },
  ];

  onClose() {
    this.resetForm();
    this.modalService.close();
  }

  onAmountInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\s/g, '');
    const value = digits ? Number(digits) : null;
    this.addForm.get('amount')?.setValue(value, { emitEvent: false });
  }

  setCategory(category: Category) {
    this.activeCategory = category.name;
    this.addForm.patchValue({ categoryId: category.id });
  }

  resetForm() {
    this.addForm.reset();
    this.activeCategory = null;
  }

  set ActiveCategory(category: string) {
    this.activeCategory = category;
    this.addForm.patchValue({ category });
  }

  get expenseCategories() {
    return this.categories().filter(
      (category) => category.type === OperationType.EXPENSE
    );
  }

  get incomeCategories() {
    return this.categories().filter(
      (category) => category.type === OperationType.INCOME
    );
  }

  resetActiveCategory(index: number) {
    this.resetForm();
    this.type = this.operationTypes[index].value;
    this.addForm.patchValue({ type: this.type });
  }

  loadCategories() {
    this.categoryService.loadCategories();
  }

  get type(): string | null {
    return this.addForm.get('type')?.value || null;
  }

  set type(value: string | null) {
    if (value) {
      this.selectedOperationTypes = value as OperationType;
      this.addForm.patchValue({ type: value });
    } else {
      this.selectedOperationTypes = null;
      this.addForm.patchValue({ type: '' });
    }
  }

  onSubmit() {
    const { date, ...formValue } = this.addForm.value;

    if (date) {
      const day = Number(date.slice(0, 2));
      const month = Number(date.slice(2, 4));
      const year = Number(date.slice(4, 8));
      formValue.createdAt = new Date(Date.UTC(year, month - 1, day));
    }
    
    this.transactionService.createTransaction(formValue);
    this.onClose();
  }
}
