import { Injectable } from '@angular/core';
import { ResponseDatosAyudasDx, datosAsistenteBusqueda } from '../models/datosAsistenteBusqueda';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../models/cadenasDeConexion';

@Injectable({
  providedIn: 'root'
})
export class ListadoAyudasDxService {

  
  private services = AppConfig.API_ENDPOINT_BACK_HNS_F;
  private apiTipoEpisodio = this.services+'/HnsBackF-0.0.1-SNAPSHOT/listadoInformes/informesRadiologia'



  constructor(public http: HttpClient) { }

  getApiAyudasDx(dto: datosAsistenteBusqueda){
    return this.http.post<ResponseDatosAyudasDx[]>(this.apiTipoEpisodio, dto)
  }

}


