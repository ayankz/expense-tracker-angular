import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar-icon',
  imports: [
    NgSwitch,
    NgSwitchCase,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar-icon.component.html',
  styleUrl: './navbar-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarIconComponent {
  constructor(protected router: Router) {

  }
  @Input() iconName!:string;
}
