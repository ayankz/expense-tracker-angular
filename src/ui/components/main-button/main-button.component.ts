import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GlobalModalService } from '../../../core/services/global-modal.service';
import { AddFormComponent } from '../add-form/add-form.component';

@Component({
  selector: 'app-main-button',
  imports: [],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainButtonComponent {
  private modalService = inject(GlobalModalService);
  count = signal(0);

  openModalHandler() {
    this.modalService.open(AddFormComponent);
  }
}
