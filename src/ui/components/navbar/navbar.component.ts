import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NavbarLinkComponent} from '../navbar-link/navbar-link.component';
import {MainButtonComponent} from '../main-button/main-button.component';
import {NavbarIconComponent} from '../navbar-icon/navbar-icon.component';

@Component({
  selector: 'app-navbar',
  imports: [
    NavbarLinkComponent,
    MainButtonComponent,
    NavbarIconComponent,
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
}
