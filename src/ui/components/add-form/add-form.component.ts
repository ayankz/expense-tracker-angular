import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
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
const date = new Date();
enum EDGES {
  MAX_YEARS = date.getFullYear(),
  MAXX_MONTH = date.getMonth() + 1,
  MAXX_DAY = date.getDate(),
}
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
  private fb = inject(FormBuilder);

  public addForm: FormGroup;
  public categories = this.categoryService.categories;
  public categoryError = this.categoryService.categoryError;
  public isCreateModalOpen = signal<boolean>(false);

  constructor() {
    this.addForm = this.fb.group({
      category: ['', Validators.required],
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
  input.value = input.value.replace(/^0+/, ''); // убираем ведущие нули
  this.addForm.get('amount')?.setValue(input.value);
}
  setCategory(category: string) {
    this.activeCategory = category;
    this.addForm.patchValue({ category });
  }

  resetForm() {
    this.addForm.reset();
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

  resetActiveCategory() {
    this.activeCategory = null;
    this.addForm.reset();
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
    console.log(this.addForm.value);
  }
}
