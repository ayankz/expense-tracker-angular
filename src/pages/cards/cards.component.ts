import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AddCardComponent } from "../../ui/components/add-card/add-card.component";
import { CardComponent } from "../../ui/components/card/card.component";

@Component({
  selector: 'app-cards',
  imports: [AddCardComponent, CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent {

}
