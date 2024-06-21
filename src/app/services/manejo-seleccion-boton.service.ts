import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManejoSeleccionBotonService {

  constructor() { }

  private _campoAyudasDx = new BehaviorSubject<boolean>(false);
  campoAyudasDx$ = this._campoAyudasDx.asObservable();

  actualizarCampoAyudasDx(estado: boolean) {
    this._campoAyudasDx.next(estado);
  }

  private _campoHC = new BehaviorSubject<boolean>(false);
  campoHC$ = this._campoHC.asObservable();

  actualizarCampoHC(estado: boolean) {
    this._campoHC.next(estado);
  }
}
