import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GlobalModalService } from '../../../core/services/global-modal.service';

@Component({
  selector: 'app-main-button',
  imports: [],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainButtonComponent {
  constructor(private modalService: GlobalModalService){}
  count = signal(0);

  openModalHandle() {
    this.modalService.open();
  }
}
