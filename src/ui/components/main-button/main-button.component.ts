import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GlobalModalService } from '../../../core/services/global-modal.service';
import { CategoryService } from '../../../core/services/category.service';

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

  openModalHandle() {
    this.modalService.open();
  }
}
