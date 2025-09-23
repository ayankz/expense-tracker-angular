import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AddCardButtonComponent } from '../../ui/components/add-card-button/add-card-button.component';
import { CardComponent } from '../../ui/components/card/card.component';
import { GlobalModalService } from '../../core/services/global-modal.service';
import { AddCardComponent } from '../../ui/components/add-card/add-card.component';
import { CardService } from '../../core/services/card.service';

@Component({
  selector: 'app-cards',
  imports: [AddCardButtonComponent, CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit {
  private modalService = inject(GlobalModalService);
  private cardService = inject(CardService);

  get cards() {
    return this.cardService.cards();
  }

  ngOnInit(): void {
    this.cardService.loadCards();
  }

  openModalHandler() {
    this.modalService.open(AddCardComponent);
  }
  cardRemoveHandler(id: number) {
    this.cardService.removeCard(id);
  }
}
