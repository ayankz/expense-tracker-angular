import { Injectable, signal, Type } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalModalService {
  private _isOpenModal = signal<boolean>(false);
   private _content = signal<Type<any> | null>(null);
   
  readonly isOpenModal = this._isOpenModal.asReadonly();
   content = this._content.asReadonly();

  open(component: Type<any>) {
    this._content.set(component);
    this._isOpenModal.set(true);
  }

  close():void {
    this._isOpenModal.set(false);
     this._content.set(null);
  }
}
