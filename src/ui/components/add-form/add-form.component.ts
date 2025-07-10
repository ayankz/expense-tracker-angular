import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

enum OperationType {
  EXPENSE = 'expense',
  INCOME = 'income',
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
  ],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent {
  addForm: FormGroup;
  constructor(
    private modalService: GlobalModalService,
    private fb: FormBuilder
  ) {
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
  operationCategories: Record<
    OperationType,
    { label: string; value: string }[]
  > = {
    [OperationType.EXPENSE]: [
      { label: 'Продукты', value: 'food' },
      { label: 'Бензин', value: 'gasoline' },
      { label: 'Коммуслуги', value: 'utils' },
      { label: 'В долг', value: 'debt-in' },
      { label: 'Развлечения', value: 'vibe' },
    ],
    [OperationType.INCOME]: [
      { label: 'Зарплата', value: 'salary' },
      { label: 'Возврат долга', value: 'debt-out' },
    ],
  };
  onClose() {
    this.resetForm();
    this.modalService.close();
  }
  resetForm() {
    this.addForm.reset();
  }
  onTypeChange(value: OperationType) {
    this.selectedOperationTypes = value;
    this.addForm.patchValue({ category: '' });
  }
  get type(): string | null {
  return this.addForm.get('type')?.value || null;
}
  onSubmit() {
    console.log(231);
  }
}
