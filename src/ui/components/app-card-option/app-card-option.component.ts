import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { Card } from '../../../core/enums/Type';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-card-option',
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './app-card-option.component.html',
  styleUrl: './app-card-option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCardOptionComponent {
  public cards = input.required<Card[]>();
  public control = input.required<FormControl>();
  constructor() {}
}
