import { Component } from '@angular/core';
import { datosAsistenteBusqueda, responseDatosDemo } from '../../models/datosAsistenteBusqueda';
import {AsistenteBusquedaService} from '../../services/asistente-busqueda.service';

@Component({
  selector: 'app-asistente-busqueda',
  templateUrl: './asistente-busqueda.component.html',
  styleUrls: ['./asistente-busqueda.component.css']
})
export class AsistenteBusquedaComponent {

  datosAsistenteBusqueda: datosAsistenteBusqueda = {
    numeroHistoria: '',
    tipoDocumento: '',
    numeroDocumento: '',
    fechaInicial: '',
    fechaFinal: '',
  };

  responseDatosDemo: responseDatosDemo = {

    code: '',
    descripcion: '',
    data: {
      tipoDocumento: '',
      nombresApellidos: '',
      dni: '',
      numeroHistoria: '',
      fnacimiento: '',
    }
  };
  isExpanded = false;
  
  constructor(private asistenteBusquedaService: AsistenteBusquedaService){}

  onDatosDemo(){

    this.asistenteBusquedaService.getApiDatosDemo(this.datosAsistenteBusqueda).subscribe(data =>{

      this.responseDatosDemo = data
      console.log(data)

    });

  }

  ngOnInit():void{

    this.asistenteBusquedaService.getApiDatosDemo(this.datosAsistenteBusqueda).subscribe(data =>{

      this.responseDatosDemo = data
      console.log(data)

    });

  }

  


}