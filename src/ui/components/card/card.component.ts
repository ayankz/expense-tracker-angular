import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Card, CardType } from '../../../core/enums/Type';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  CardType = CardType;
  @Input() public card!: Card;
  @Output() cardEventEmitter = new EventEmitter<number>();

  removeCard(id: number) {
    this.cardEventEmitter.emit(id);
  }
}
