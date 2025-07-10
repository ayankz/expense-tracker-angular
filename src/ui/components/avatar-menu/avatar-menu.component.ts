import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-avatar-menu',
  imports: [MatIconModule, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './avatar-menu.component.html',
  styleUrl: './avatar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarMenuComponent {

}
