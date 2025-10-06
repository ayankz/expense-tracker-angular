import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { OperationType } from '../enums';

@Directive({
  selector: '[moneyFormat]',
})
export class MoneyFormatDirective implements OnChanges {
  @Input('moneyFormat') value: number = 0;
  @Input() type: OperationType = OperationType.EXPENSE;
  @Input() currencySymbol: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['type']) {
      this.formatText();
    }
  }

  private formatText() {
    let sign: string = '';
    let color: string = '';

    if (this.type === OperationType.INCOME) {
      sign = '+';
      color = 'green'; 
    } else if (this.type === OperationType.EXPENSE) {
      sign = '-';
      color = 'red'; 
    } else {
      sign = '';
      color = 'black';
    }

    const currency = this.currencySymbol ? this.currencySymbol + ' ' : '';
    const formattedText = `${sign} ${Math.abs(this.value)} ${currency}`;
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.setProperty(
      this.el.nativeElement,
      'textContent',
      formattedText
    );
  }
}
