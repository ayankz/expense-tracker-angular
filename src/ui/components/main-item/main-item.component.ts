import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-item',
  imports: [RouterLink],
  templateUrl: './main-item.component.html',
  styleUrl: './main-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainItemComponent {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() link: string = '';
}
