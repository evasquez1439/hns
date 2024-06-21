import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, Output } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatDatepicker, MatDatepickerInputEvent, } from '@angular/material/datepicker';
import { datosAsistenteBusqueda, responseDatosDemo, } from 'src/app/models/datosAsistenteBusqueda';
import { AsistenteBusquedaService } from 'src/app/services/asistente-busqueda.service';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';


import { DatePipe } from '@angular/common';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { ListaEpisodiosComponent } from '../lista-episodios/lista-episodios.component';
import { FloatLabelType } from '@angular/material/form-field';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ManejoSeleccionBotonService } from 'src/app/services/manejo-seleccion-boton.service';
import { Subscription } from 'rxjs';

import {
  MatDialog,
} from '@angular/material/dialog';


export const MY_FORMATS = {
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [
    // // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // // application's root module. We provide it at the component level here, due to limitations of
    // // our example generation script.
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE],
    // },

    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }

  ],
})
export class InicioComponent implements OnInit {
  @Output() metodo !: ListaEpisodiosComponent;
  value = '';
  startDate!: Date;
  startDateNull!: Date;
  enDatenull!: Date;
  endDate!: Date;

  numeroHCServinte!: number;

  codigoDeRespuesta!: string;
  isAvalible: boolean = true;
  incluirInformes: boolean = false;
  despliegue: boolean = true;
  isAvalibleReport!: boolean;
  bloqueoMetodoBuscarServinte!: boolean;
  mensaje: string = "Información de historias clínicas de HNS disponible desde el 11/08/2003 hasta el 31/01/2013";
  formaDespliegue: string = "arrow_back_ios";

  date = new FormControl(this.endDate);

  flightSchedule = {
    date: new Date(),
  };

  fechaString = this.datePipe
    .transform(this.startDate, 'dd/MM/yyyy')
    ?.toString();

  datosFiltro: datosAsistenteBusqueda = {
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
    },
  };
  minDate: Date = new Date(2003, 0, 1);
  maxDate: Date = new Date(2013, 11, 31);


  hideRequiredControl = new FormControl(false);
  buttonConsultarDisabled: boolean = true;
  buttonDisabled: boolean = true;
  styleLista: string = "max-height: 410px; width: 95%;";
  tipoDocumentoInput: string | null = null;

  condicionComponente1: boolean = false;
  condicionComponente2: boolean = false;

  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
  });


  private campoAyudasDxSubscription: Subscription | undefined;
  private campoHCSubscription: Subscription | undefined;
  constructor(
    private asisteteBusqueda: AsistenteBusquedaService,
    private datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private router: Router,
    private manejoSeleccionService: ManejoSeleccionBotonService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {

    this.buscarPacienteServinte();
    
    this.campoAyudasDxSubscription = this.manejoSeleccionService.campoAyudasDx$.subscribe(
      (estado) => {
        this.onCambioSeleccion1(estado);
        this.onCambioSeleccion2(estado);
      }
    );


    this.campoHCSubscription = this.manejoSeleccionService.campoHC$.subscribe((estado) => {
      this.onCambioSeleccion2(estado);
      this.onCambioSeleccion1(estado);
    });

  }

  ngOnDestroy(): void {
    // Cancelar las subscripciones para evitar fugas de memoria
    this.campoAyudasDxSubscription?.unsubscribe();
    this.campoHCSubscription?.unsubscribe();
  }

  buscarPacienteServinte() {
    const numeroHistoriaServinte = localStorage.getItem('numeroHCServinte');
    this.numeroHCServinte = numeroHistoriaServinte ? parseInt(numeroHistoriaServinte, 10) : 0;


    const isAvalibleServinte = localStorage.getItem('bloqueoMetodoBuscarServinte');
    this.bloqueoMetodoBuscarServinte = isAvalibleServinte
      ? JSON.parse(isAvalibleServinte) : false;

    if (this.bloqueoMetodoBuscarServinte) {

      this.datosFiltro.numeroHistoria = this.numeroHCServinte.toString();

      
      this.asignacionFecha();
      this.isLoading = true;
      this.isAvalibleReport = false;
      this.asisteteBusqueda
        .getApiDatosDemo(this.datosFiltro)
        .subscribe((datos) => {
          if (datos.code == '400') {
            this.openDialog();
          } else {
            this.responseDatosDemo = datos;
            this.codigoDeRespuesta = datos.code?.toString() || '';
            this.isAvalible = true;

            this.datosFiltro.numeroDocumento = datos.data.dni.toString();
            this.datosFiltro.numeroHistoria = datos.data.numeroHistoria.toString();
            this.tipoDocumentoInput = datos.data.tipoDocumento;
            // this.datosFiltro.tipoDocumento = datos.data.tipoDocumento;
          }
        });
      localStorage.setItem('numeroHistoria', this.datosFiltro.numeroHistoria);
    } else {

    }
  }

  cleanLocalStorageLogServinte(){
    this.bloqueoMetodoBuscarServinte = false;
    localStorage.removeItem('numeroHCServinte');
    localStorage.removeItem('bloqueoMetodoBuscarServinte');
  }

  buscarPaciente() {
    this.cleanLocalStorageLogServinte();
    this.ngOnInit();
    // this.datosFiltro.fechaInicial = fechaString?.toString() ?? ''; 
    this.bloqueoMetodoBuscarServinte = false;
    
    this.asignacionFecha();
    this.isLoading = true;
    this.isAvalibleReport = false;
    this.asisteteBusqueda
      .getApiDatosDemo(this.datosFiltro)
      .subscribe((datos) => {
        if (datos.code == '400') {
          this.openDialog();
        } else {
          this.responseDatosDemo = datos;
          this.codigoDeRespuesta = datos.code?.toString() || '';
          this.isAvalible = true;

          this.datosFiltro.numeroDocumento = datos.data.dni.toString();
          this.datosFiltro.numeroHistoria = datos.data.numeroHistoria.toString();
          this.tipoDocumentoInput = datos.data.tipoDocumento;
          // this.datosFiltro.tipoDocumento = datos.data.tipoDocumento;
        }
      });
    localStorage.setItem('numeroHistoria', this.datosFiltro.numeroHistoria);
  }

  onStartDateChange() {
    // Si la fecha inicial es mayor a la fecha final, se establece la fecha final a la fecha inicial
    if (this.startDate > this.endDate) {
      this.endDate = this.startDate;
    }
  }




  limpiarVariables() {
    this.tipoDocumentoInput = null;
    this.datosFiltro.numeroDocumento = '';
    this.datosFiltro.numeroHistoria = '';
    this.startDate = this.startDateNull;
    this.endDate = this.enDatenull;
    this.isAvalible = false;
    this.buttonDisabled = true;
    this.isAvalibleReport = false;
    this.ngOnDestroy();
  }

  botonBackList() {
    this.isAvalible = true;
    this.isAvalibleReport = false;
    this.isLoading = true;
  }


  asignacionFecha() {
    this.datosFiltro.fechaInicial = this.formatearVariablesTipoFecha(this.datosFiltro.fechaInicial, this.startDate);
    this.datosFiltro.fechaFinal = this.formatearVariablesTipoFecha(this.datosFiltro.fechaFinal, this.endDate);
    this.codigoDeRespuesta = '';
    this.isAvalible = false;

    if (this.datosFiltro.fechaInicial && this.datosFiltro.fechaFinal == '') {
      this.datosFiltro.fechaFinal = '31/12/2013'
      this.endDate = new Date(2013, 11, 31)
    }
  }

  formatearVariablesTipoFecha(fecha: string, fechaFormatear: Date) {
    const fechaString = this.datePipe
      .transform(fechaFormatear, 'dd/MM/yyyy')
      ?.toString();
    fecha = fechaString?.toString() ?? '';
    return fecha;
  }


  /*----------------------------------------------------------------------------------------*/
  /*Estado del boton consultar, la propiedad se actualiza cada vez que hay un cambio en las
  casillas marcadas de las listas*/

  onCambioSeleccion1(campoAyudasDx: boolean) {
    const hablitadoo = localStorage.getItem('campoAyudasDx');
    this.condicionComponente1 = hablitadoo
      ? JSON.parse(hablitadoo) : false;
    this.evaluarCondiciones();

  }

  onCambioSeleccion2(campoHC: boolean) {

    const hablitadoo = localStorage.getItem('campoHC');
    this.condicionComponente2 = hablitadoo
      ? JSON.parse(hablitadoo) : false;
    this.evaluarCondiciones();

  }

  evaluarCondiciones() {
    this.buttonConsultarDisabled = !(this.condicionComponente1 || this.condicionComponente2);
  }

  /*----------------------------------------------------------------------------------------*/


  /***Los siguientes cuatro bloques de codigo habílitan el boton de busqueda si en uno de los inputs donde
   * se ingresan los datos de numeroHistoria y numeroDocumento tiene almenos un solo caracter ***/


  onInputChange(event: Event) {
    this.datosFiltro.numeroDocumento = (<HTMLInputElement>event.target).value;
    this.updateButtonDisabled();
  }


  //Metodo para activar el boton "Buscar"
  onInputChangeI(event: Event) {
    this.datosFiltro.numeroHistoria = (<HTMLInputElement>event.target).value;
    this.updateButtonDisabled();
  }


  updateButtonDisabled() {
    const hasCharacterInNumeroDocumento = this.datosFiltro.numeroDocumento.length > 0;
    const hasCharacterInNumeroHistoria = this.datosFiltro.numeroHistoria.length > 0;
    const tipoDocumentoInput = hasCharacterInNumeroDocumento ? !!this.tipoDocumentoInput : true;

    this.buttonDisabled = !(hasCharacterInNumeroDocumento || hasCharacterInNumeroHistoria) || !tipoDocumentoInput;
  }


  limpiarInputDocumento() {
    this.datosFiltro.numeroDocumento = '';
    this.updateButtonDisabled();
  }

  limpiarInputHC() {
    this.datosFiltro.numeroHistoria = '';
    this.updateButtonDisabled();
  }


  /*-----------------------------------------------*/

  getPdfHc() {
    this.isAvalibleReport = true;
    this.isAvalible = false;
    // this.router.navigate(['dashboard/reporteHc']);
    this.ngOnDestroy();
  }

  /* Metodo para manejar el height de la lista de atenciones*/
  handleChange(event: any) {
    this.incluirInformes = event.checked;
    if (this.incluirInformes) {
      this.styleLista = "max-height: 250px; width: 95%;";
    } else {
      this.styleLista = "max-height: 410px; width: 95%;";
    }
    // Llama a tu método adicional aquí
    this.limpiarStorages();
  }

  limpiarStorages() {
    localStorage.removeItem('selectedRowAyudasDx');
    localStorage.removeItem('campoAyudasDx');
    localStorage.removeItem('episodiosAmbu');
  }


  //Bloquea el click derecho en la pagina
  @HostListener('contextmenu', ['$event'])
  bloquearClickDerecho(event: MouseEvent) {
    event.preventDefault();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && (event.key === 'p' || event.key === 'P')) {
      event.preventDefault(); // Evitar el comportamiento predeterminado
      event.stopPropagation(); // Detener la propagación del evento      
    }
  }

  //Mensaje cuando no encuentre pacientes con los parametros ingresados.
  openDialog() {
    this.dialog.open(DialogAlertComponent);
  }

  onDocumentoSelected(event: any): void {
    this.tipoDocumentoInput = event.value;
    this.updateButtonDisabled();
    if (this.tipoDocumentoInput == "CC") {
      this.datosFiltro.tipoDocumento = "'c', 'C'"
    } else if (this.tipoDocumentoInput == "TI") {
      this.datosFiltro.tipoDocumento = "'T'"
    }
    else {
      this.datosFiltro.tipoDocumento = "'" + this.tipoDocumentoInput?.toString() + "'" ?? '';
    }
  }

  onToggle() {
    this.despliegue = !this.despliegue;
    if (this.despliegue) {
      this.formaDespliegue = "arrow_back_ios";
    } else {
      this.formaDespliegue = "arrow_forward_ios";
    }
  }

  isLoading: boolean = true;

  onLoad() {
    this.isLoading = false;
  }

}
