import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {AvatarMenuComponent} from '../ui/components/avatar-menu/avatar-menu.component';
import {HeaderComponent} from '../ui/components/header/header.component';
import {LogoComponent} from '../ui/components/logo/logo.component';
import {NavbarComponent} from '../ui/components/navbar/navbar.component';
import {MainTitleComponent} from '../ui/components/main-title/main-title.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, AvatarMenuComponent, HeaderComponent, LogoComponent, NavbarComponent, MainTitleComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wallet-light';
}
