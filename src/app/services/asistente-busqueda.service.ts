import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { datosDemo, responseDatosDemo } from '../models/datosAsistenteBusqueda';
import { AppConfig } from '../models/cadenasDeConexion';

@Injectable({
  providedIn: 'root'
})
export class AsistenteBusquedaService {

  private services = AppConfig.API_ENDPOINT_BACK_HNS_F;
  
  private apiListadoInformes = this.services+'/HnsBackF-0.0.1-SNAPSHOT/listadoInformes/informesRadiologia'
  private apiDatosDemo = this.services+'/HnsBackF-0.0.1-SNAPSHOT/datosDemogra/buscarDatosDemog'
  

  constructor(public http: HttpClient) { }

  getApiDatosDemo(dto: datosDemo){

    return this.http.post<responseDatosDemo>(this.apiDatosDemo, dto)

  }

}
