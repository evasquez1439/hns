import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseDatosAyudasDx, datosAsistenteBusqueda } from 'src/app/models/datosAsistenteBusqueda';
import { datosReporteHC } from 'src/app/models/datosReporteHC';
import { ListadoAyudasDxService } from 'src/app/services/listado-ayudas-dx.service';
import { ManejoSeleccionBotonService } from 'src/app/services/manejo-seleccion-boton.service';


@Component({
  selector: 'app-lista-ayudasdx',
  templateUrl: './lista-ayudasdx.component.html',
  styleUrls: ['./lista-ayudasdx.component.css']
})
export class ListaAyudasdxComponent implements OnInit {

  numeroVacio!:number;

  @Input() datosFiltro: datosAsistenteBusqueda = {
    numeroHistoria: '',
    tipoDocumento: '',
    numeroDocumento: '',
    fechaInicial: '',
    fechaFinal: ''
  }

  responseDatosAyudasDx: ResponseDatosAyudasDx[] = [
    {
      nombreEstudio: '',
      fechaEstudio: '',
      numeroCita: this.numeroVacio
    }
  ]

  datosIngresoReporte : datosReporteHC = {
    numeroHis: this.numeroVacio,
    episodios: [],
    numeroCitasAyudasDx: [],
    campoHC: false,
    campoAyudasDx: false
  }   

  displayedColumns: string[] = ['nombreEstudio', 'fechaEstudio', 'select'];
  dataSource!: MatTableDataSource<ResponseDatosAyudasDx>;
  selection = new SelectionModel<ResponseDatosAyudasDx>(true, []);
  selectedRowValues: number[] = [];

  constructor(private service: ListadoAyudasDxService, 
    private manejoSeleccionService : ManejoSeleccionBotonService) {
    this.dataSource = new MatTableDataSource<ResponseDatosAyudasDx>(this.responseDatosAyudasDx);
  }

  ngOnInit(): void {
    this.buscarAyudasDx();    
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  @Output() cambioSeleccion = new EventEmitter<boolean>();
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectedRowValues = [];
      this.datosIngresoReporte.campoAyudasDx = false;      
      return;      
    }

    this.selection.select(...this.dataSource.data);
    this.selectedRowValues = this.dataSource.data.map(row => row.numeroCita);
    this.datosIngresoReporte.campoAyudasDx = true;
    this.manejoSeleccionService.actualizarCampoAyudasDx(this.datosIngresoReporte.campoAyudasDx);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ResponseDatosAyudasDx): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    const isSelected = this.selection.isSelected(row);
    if (isSelected) {
      // Asegúrate de que el valor no se duplique antes de agregarlo
      if (!this.selectedRowValues.includes(row.numeroCita)) {
        this.selectedRowValues.push(row.numeroCita);
        this.datosIngresoReporte.campoAyudasDx = true;
      }
    } else {
      const index = this.selectedRowValues.indexOf(row.numeroCita);
      if (index !== -1) {
        this.selectedRowValues.splice(index, 1);
        this.datosIngresoReporte.campoAyudasDx = this.selectedRowValues.length > 0
      }
    }

    // Guardar los valores en el localStorage
    localStorage.setItem('selectedRowAyudasDx', JSON.stringify(this.selectedRowValues));
    localStorage.setItem('campoAyudasDx', JSON.stringify(this.datosIngresoReporte.campoAyudasDx)); 
    this.manejoSeleccionService.actualizarCampoAyudasDx(this.datosIngresoReporte.campoAyudasDx);   
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nombreEstudio + 1}`;
  }

  buscarAyudasDx() {

    this.datosIngresoReporte.numeroCitasAyudasDx = this.selectedRowValues;
    this.guardarEnLocalStorage();
    this.service.getApiAyudasDx(this.datosFiltro).subscribe(data => {

      this.dataSource = new MatTableDataSource<ResponseDatosAyudasDx>(data);


    })

  }  
  guardarEnLocalStorage() {
    localStorage.setItem('episodiosAmbu', JSON.stringify(this.datosIngresoReporte.numeroCitasAyudasDx));            
  }


}
