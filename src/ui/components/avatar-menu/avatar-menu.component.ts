import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../../pages/auth/services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-avatar-menu',
  imports: [MatIconModule, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './avatar-menu.component.html',
  styleUrl: './avatar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarMenuComponent {
  authService = inject(AuthService);
  router = inject(Router);
  onLogoutHandle() {
    this.authService
      .logout()
      .pipe(
        finalize(() => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.router.navigate(['/login']);
        })
      )
      .subscribe();
  }
}
