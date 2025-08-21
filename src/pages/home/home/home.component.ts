import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainItemComponent } from "../../../ui/components/main-item/main-item.component";

@Component({
  selector: 'app-home',
  imports: [MainItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  public mainElements = [
    {title: 'Карточки', icon: 'card.svg', link: '/cards'},
  ]
}
