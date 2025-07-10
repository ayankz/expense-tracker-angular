import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar-link',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar-link.component.html',
  styleUrl: './navbar-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarLinkComponent {
  @Input() iconName!: string;
  @Input() route!: string;
  @Input() label!: string;
}
