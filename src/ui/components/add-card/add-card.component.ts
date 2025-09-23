import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GlobalModalService } from '../../../core/services/global-modal.service';
import { CardMaskDirective } from '../../../core/directive/card-mask.directive';
import { NgxMaskDirective } from 'ngx-mask';
import { ButtonComponent } from '../button/button.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CardService } from '../../../core/services/card.service';

@Component({
  selector: 'app-add-card',
  imports: [
    MatIconModule,
    CardMaskDirective,
    NgxMaskDirective,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class AddCardComponent {
  private modalService = inject(GlobalModalService);
  private cardService = inject(CardService);
  private fb: FormBuilder = inject(FormBuilder);

  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      digits: ['', [Validators.required]],
      balance: ['', [Validators.required]],
      type: ['MC', Validators.required],
    });
  }
  close() {
    this.modalService.close();
  }
  submit() {
    if (this.form.valid) {
      this.form.patchValue({
        digits: this.form.value.digits.replace(/\D/g, '').slice(-4),
      });
      this.cardService.createCard(this.form.value);
      this.form.reset();
      this.modalService.close();
    }
  }
}
