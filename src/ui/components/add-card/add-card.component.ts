import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { GlobalModalService } from '../../../core/services/global-modal.service';

@Component({
  selector: 'app-add-card',
  imports: [MatIconModule],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCardComponent {
  private modalService = inject(GlobalModalService);
  close() {
    this.modalService.close();
  }
}
