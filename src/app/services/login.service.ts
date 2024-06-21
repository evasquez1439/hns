import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { responseLdap, responseLogin, responseTipoPermisos, user, userLongin, userTipoPermisos } from '../models/datosUsuario.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from '../models/cadenasDeConexion';

@Injectable({
  providedIn: 'root'
})
export class LoginService {  

  private userSubject: BehaviorSubject<responseLdap | null>;
  public user: Observable<responseLdap | null>;
  private services = AppConfig.API_ENDPOINT_BACK_HNS_LOGIN;
  private apiLdap = this.services+'/hnsLogin-0.0.1-SNAPSHOT/ldap/ldapHns';
  private apiLogin = this.services+'/hnsLogin-0.0.1-SNAPSHOT/login/loginHns';
  private apiPermisos = this.services+'/hnsLogin-0.0.1-SNAPSHOT/permisos/permisosServinte';

  constructor(public http: HttpClient) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }
  
  getApiLdap(dto: user){

    return this.http.post<responseLdap>(this.apiLdap, dto)
        
  }

  getApiLogin(dto: userLongin){

    return this.http.post<responseLogin>(this.apiLogin, dto)

  }

  getApiPermisos(dto: userTipoPermisos){
    
    return this.http.post<responseTipoPermisos>(this.apiPermisos,dto)

  }


}
