import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() isDisabled: boolean = false;
  @Input() type?: string = 'basic';
  @Input() title!: string;
  @Input() className!: string;
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'submit';
}
