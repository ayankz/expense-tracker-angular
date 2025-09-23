import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '../../../core/enums/Type';
import { FormGroupDirective } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-option',
  imports: [CommonModule],
  templateUrl: './app-card-option.component.html',
  styleUrl: './app-card-option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCardOptionComponent {
  @Input() card!: Card;
  constructor(public rootFormGroup: FormGroupDirective) {}
  get form() {
    return this.rootFormGroup.control;
  }
}
