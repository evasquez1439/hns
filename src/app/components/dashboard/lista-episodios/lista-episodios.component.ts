import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { datosAsistenteBusqueda, responseTipoEpisodios } from 'src/app/models/datosAsistenteBusqueda';
import { ListadoEpisodiosService } from 'src/app/services/listado-episodios.service';
import { InicioComponent } from '../inicio/inicio.component';
import { datosReporteHC } from 'src/app/models/datosReporteHC';
import { Router } from '@angular/router';
import { ManejoSeleccionBotonService } from 'src/app/services/manejo-seleccion-boton.service';



@Component({
  selector: 'app-lista-episodios',
  templateUrl: './lista-episodios.component.html',
  styleUrls: ['./lista-episodios.component.css']
})

export class ListaEpisodiosComponent implements OnInit {

  numeroVacio!:number;
  // @Input() datosIngresar !: datosAsistenteBusqueda  
  @Input() controlador: boolean = false;
  @Input() styleLista!: string;
  datosTablaEpisodios: responseTipoEpisodios[] =  [

    {
    tipoEpisodio: '',
    fechaInicial: '',
    fechaFinal: '',
    numeroEpisodio: this.numeroVacio,
    }

  ]  

  @Input() datosIngresar : datosAsistenteBusqueda = {
    numeroHistoria:'',
    tipoDocumento: '',
    numeroDocumento: '',
    fechaInicial: '',
    fechaFinal: '',    
  }

  datosIngresoReporte : datosReporteHC = {
    numeroHis: this.numeroVacio,
    episodios: [],
    numeroCitasAyudasDx: [],
    campoHC: false,
    campoAyudasDx: false
  }


  
  displayedColumns: string[] = ['tiposodio', 'fechaInicial', 'fechaFinal', 'select'];

  dataSource!: MatTableDataSource<responseTipoEpisodios>;
  selection = new SelectionModel<responseTipoEpisodios>(true, []);
  selectedRowValues: number[] = [];

  constructor(private service: ListadoEpisodiosService,
    private router: Router,
    private manejoSeleccionService: ManejoSeleccionBotonService){

    this.dataSource = new MatTableDataSource<responseTipoEpisodios>(this.datosTablaEpisodios);

  }
  
  ngOnInit(): void {      
    
      this.onBuscarEpisodios();
      // setTimeout(() => {
      //   this.toggleAllRows();
      // }, 1500);

    }

  
  /** Indica si la cantidad de elementos seleccionados coincide con el número total de filas. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  @Output() cambioSeleccionEpi = new EventEmitter<boolean>();
  /** Selecciona todas las filas si no están todas seleccionadas; de lo contrario, deselecciona todo. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      //Si todas las filas ya estan seleccionadas, deselecciona todo.
      this.selection.clear();
      this.selectedRowValues = [];
      this.datosIngresoReporte.campoHC = false;      
      return;
    }
    // Selecciona todas las filas
    this.selection.select(...this.dataSource.data);
    this.selectedRowValues = this.dataSource.data.map(row => row.numeroEpisodio);
    this.datosIngresoReporte.campoHC = true;    
    this.manejoSeleccionService.actualizarCampoHC(this.datosIngresoReporte.campoHC);    
  }

  /** The label for the checkbox on the passed row */  
  /** La etiqueta para la casilla de verificación en la fila proporcionada. */
  checkboxLabel(row?: responseTipoEpisodios): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    const isSelected = this.selection.isSelected(row);
    if (isSelected) {
      // Asegúrate de que el valor no se duplique antes de agregarlo
      if (!this.selectedRowValues.includes(row.numeroEpisodio)) {
        this.selectedRowValues.push(row.numeroEpisodio);
        this.datosIngresoReporte.campoHC = true;     
      }
    } else {
      const index = this.selectedRowValues.indexOf(row.numeroEpisodio);
      if (index !== -1) {
        this.selectedRowValues.splice(index, 1);
        this.datosIngresoReporte.campoHC = this.selectedRowValues.length > 0;            
      }
    }    
    
    // Almacena los valores seleccionados en el localStorage
    localStorage.setItem('selectedRowValues', JSON.stringify(this.selectedRowValues));  
    localStorage.setItem('campoHC', JSON.stringify(this.datosIngresoReporte.campoHC));  
    this.manejoSeleccionService.actualizarCampoHC(this.datosIngresoReporte.campoHC);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.tipoEpisodio + 1}`;
    
  }


  // obtenerAction(): string {
  //   const action = localStorage.getItem('numeroHistoria');
  //   if (action) {
  //     return action;
  //   }
  //   return '';
  // }
  
  onBuscarEpisodios(){

    this.datosIngresoReporte.numeroHis = Number(this.datosIngresar.numeroHistoria);
    this.datosIngresoReporte.episodios = this.selectedRowValues;  
    this.guardarEnLocalStorage();    
    this.service.getApiTipoEpisodio(this.datosIngresar).subscribe(data => {

      this.dataSource = new MatTableDataSource<responseTipoEpisodios>(data);

      // Modifica los textos
      type TipoEpisodioIndex = string | "HNSA" | "HNSU" | "HNSH";

      const diccionario: { [key in TipoEpisodioIndex]: string } = {
        "HNSA": "AMBULATORIO HNS ",
        "HNSU": "URGENCIAS HNS",
        "HNSH": "HOSPITALIZACÓN HNS",
        "fechaInicial": "",
        "fechaFinal": ""
      };

      for (let i = 0; i < this.dataSource.data.length; i++) {
        this.dataSource.data[i].tipoEpisodio = diccionario[this.dataSource.data[i].tipoEpisodio];
      }     

    });

  };


  getPdfHc(){
    this.router.navigate(['dashboard/reporteHc']); 
  } 

  guardarEnLocalStorage() {
    // Almacena el valor de la variable numeroDocumento en localStorage
    localStorage.setItem('numeroHistoria', this.datosIngresoReporte.numeroHis.toString());
    localStorage.setItem('episodios', JSON.stringify(this.datosIngresoReporte.episodios)); 
      
  }

  //obtenerDeLocalStorage() {
  //   Obtiene el valor de la variable numeroDocumento de localStorage
  //   this.datosIngresar.numeroDocumento = localStorage.getItem('numeroHistoria')?.toString() || '';
  //   this.datosIngresar.tipoDocumento = localStorage.getItem('selectedRowValues')?.toString() || '';
  //   this.datosIngresar.numeroHistoria = localStorage.getItem('numeroHistoria')?.toString() || '';
  //   this.datosIngresar.fechaInicial = localStorage.getItem('fechaInicial')?.toString() || '';
  //   this.datosIngresar.fechaFinal = localStorage.getItem('fechaFinal')?.toString() || '';
    
  //   // this.datosIngresar = JSON.parse(localStorage.getItem('datosFiltro') || '');
  //}
  
  // limpiarLocalStorage(){
  //   localStorage.removeItem("episodios");
  //   localStorage.removeItem("selectedRowAyudasDx");
  //   localStorage.removeItem("numeroHistoria");
  //   localStorage.removeItem("selectedRowValues");
  //   localStorage.removeItem("campoHC");
  //   localStorage.removeItem("episodiosAmbu");
  //   localStorage.removeItem("campoAyudasDx");
  //   localStorage.clear();
  // }

}
