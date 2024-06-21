import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosReporteHC, reportServicesResponse } from '../models/datosReporteHC';
import { AppConfig } from '../models/cadenasDeConexion';

@Injectable({
  providedIn: 'root'
})
export class ReporteHCService {

  private services = AppConfig.API_ENDPOINT_BACK_HNS_F;
  
  
  private apiUrl = this.services+'/HnsBackF-0.0.1-SNAPSHOT/api/report/service/generate'
  

  constructor(public http: HttpClient) { }

  generateReport(dto: datosReporteHC): Observable<Blob>{

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, responseType: 'blob' as 'json' };
    return this.http.post<Blob>(this.apiUrl, dto, options);
  }

}
