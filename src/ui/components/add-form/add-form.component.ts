import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
import { ButtonComponent } from '../button/button.component';
import { SelectorComponent } from '../selector/selector.component';
import { OperationType } from '../../../core/enums';
import { CategoryService } from '../../../core/services/category.service';
import { CommonModule } from '@angular/common';

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
    CommonModule,
    ButtonComponent,
    SelectorComponent,
  ],
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
      type: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      date: new FormControl(new Date(), Validators.required),
      comment: new FormControl(''),
      amount: new FormControl('', Validators.required),
    });
    
  }

  selectedOperationTypes: OperationType | null = null;
  selectedCategory: string | null = null;
  operationTypes = [
    { label: 'Расход', value: OperationType.EXPENSE },
    { label: 'Поступление', value: OperationType.INCOME },
  ];
  onClose() {
    this.resetForm();
    this.modalService.close();
  }
  resetForm() {
    this.addForm.reset();
  }
  loadCategories(value: OperationType) {
    this.selectedOperationTypes = value;
    this.addForm.patchValue({ type: value });
    this.categoryService.loadCategories(value);
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
