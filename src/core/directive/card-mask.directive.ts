import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardMask]',
})
export class CardMaskDirective {
  private prefix = '**** ';
  constructor(private el: ElementRef<HTMLInputElement>) {}
 
  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); 

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    input.value = this.prefix + value;
  }

  @HostListener('focus', ['$event'])
  onFocus(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.value.startsWith(this.prefix)) {
      input.value = this.prefix;
    }
  }
}
