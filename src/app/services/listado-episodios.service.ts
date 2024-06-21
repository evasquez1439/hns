import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { datosAsistenteBusqueda, responseTipoEpisodios } from '../models/datosAsistenteBusqueda';
import { AppConfig } from '../models/cadenasDeConexion';

@Injectable({
  providedIn: 'root'
})
export class ListadoEpisodiosService {

  private services = AppConfig.API_ENDPOINT_BACK_HNS_F;
  private apiTipoEpisodio = this.services+'/HnsBackF-0.0.1-SNAPSHOT/tiposEpisodio/busquedaTipoEpi'




  constructor(public http: HttpClient) { }

  getApiTipoEpisodio(dto: datosAsistenteBusqueda){

    return this.http.post<responseTipoEpisodios[]>(this.apiTipoEpisodio, dto)
  }

  
}
