import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { AddCardButtonComponent } from '../../ui/components/add-card-button/add-card-button.component';
import { CardComponent } from '../../ui/components/card/card.component';
import { GlobalModalService } from '../../core/services/global-modal.service';
import { AddCardComponent } from '../../ui/components/add-card/add-card.component';

@Component({
  selector: 'app-cards',
  imports: [AddCardButtonComponent, CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  private modalService = inject(GlobalModalService);

  openModalHandler() {
    this.modalService.open(AddCardComponent);
  }
}
