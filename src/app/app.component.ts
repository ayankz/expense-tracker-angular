import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AvatarMenuComponent } from '../ui/components/avatar-menu/avatar-menu.component';
import { HeaderComponent } from '../ui/components/header/header.component';
import { LogoComponent } from '../ui/components/logo/logo.component';
import { NavbarComponent } from '../ui/components/navbar/navbar.component';
import { MainTitleComponent } from '../ui/components/main-title/main-title.component';
import { LoadingComponent } from '../ui/components/loading/loading.component';
import { AuthService } from '../pages/auth/services/auth.service';
import { BottomSheetModalComponent } from "../ui/components/bottom-sheet-modal/bottom-sheet-modal.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    AvatarMenuComponent,
    HeaderComponent,
    LogoComponent,
    NavbarComponent,
    MainTitleComponent,
    LoadingComponent,
    BottomSheetModalComponent
],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public authService = inject(AuthService);
  
  title = 'wallet-light';
}
