import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NavbarLinkComponent} from '../navbar-link/navbar-link.component';
import {MainButtonComponent} from '../main-button/main-button.component';
import {NavbarIconComponent} from '../navbar-icon/navbar-icon.component';
import { BottomSheetModalComponent } from "../bottom-sheet-modal/bottom-sheet-modal.component";
import { AddFormComponent } from "../add-form/add-form.component";

@Component({
  selector: 'app-navbar',
  imports: [
    NavbarLinkComponent,
    MainButtonComponent,
    NavbarIconComponent,
    BottomSheetModalComponent,
    AddFormComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
}
