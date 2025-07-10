import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalModalService {
  private _isOpenModal = signal<boolean>(false);
  readonly isOpenModal = this._isOpenModal.asReadonly();

  open():void {
    this._isOpenModal.set(true);
  }

  close():void {
    this._isOpenModal.set(false);
  }
}
