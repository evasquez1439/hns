import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthToken(): Observable<boolean>{
    const valorRecuperado = localStorage.getItem('logueado');
    if(valorRecuperado === 'true'){
      return of(true);
    }
    return of(false);
    
  }

}
