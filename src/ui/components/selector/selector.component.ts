import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-selector',
  imports: [CommonModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent {
 @Input() label: string = '';
 @Input() isActive: boolean = false;
 
}
