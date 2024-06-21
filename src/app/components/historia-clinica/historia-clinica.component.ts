import { Component, Input, ElementRef, OnInit, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';
import { datosReporteHC } from 'src/app/models/datosReporteHC';
import { ReporteHCService } from 'src/app/services/reporte-hc.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  // @ViewChild('pdfViewer') pdfViewer: ElementRef | undefined;
  pdfSrc: SafeResourceUrl | undefined;
  // iframe: HTMLIFrameElement;
  constructor(private reportService: ReporteHCService, private sanitizer: DomSanitizer) { 
    // this.iframe = document.getElementById('miIframe') as HTMLIFrameElement;
    // this.inicializarIframe();
  }
  numeroVacio!: number;
  datosIngresarReporte: datosReporteHC = {
    numeroHis: this.numeroVacio,
    episodios: [],
    numeroCitasAyudasDx: [],
    campoHC: false,
    campoAyudasDx: false
  }
  
  pdfViewer: boolean = false;
  blobUrl !: string;
  ngOnInit(): void {
    this.visualizarPDF();
    // this.generarInforme();
    if (localStorage.getItem('permiso') == 'El usuario tiene permisos de ingreso e impresion del documento.') {      
      this.pdfViewer = true;
    } else {      
      this.pdfViewer = false;
    }

  }

  @Output() load: EventEmitter<void> = new EventEmitter<void>();

  ngAfterViewInit() {    
    setTimeout(() => {
      this.load.emit();
    }, 2000); 
  }

  visualizarPDF(): void {
    this.getDatosLocalStorages();
    this.reportService.generateReport(this.datosIngresarReporte).subscribe(
      (blob: Blob) => {
        const blobUrl = URL.createObjectURL(blob);
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);        
        this.blobUrl = blobUrl;
      },
      (error) => {
        console.error(error);
      }
    );
    this.limpiarLocalStorage();
  }

  getDatosLocalStorages() {
    const numeroHistoriaString = localStorage.getItem('numeroHistoria');
    this.datosIngresarReporte.numeroHis = numeroHistoriaString ? parseInt(numeroHistoriaString, 10) : 0;

    const selectedRowValuesString = localStorage.getItem('selectedRowValues');
    this.datosIngresarReporte.episodios = selectedRowValuesString
      ? JSON.parse(selectedRowValuesString).map((value: string) => parseInt(value, 10))
      : [];


    const selectedRowValuesAyuDx = localStorage.getItem('selectedRowAyudasDx');
    this.datosIngresarReporte.numeroCitasAyudasDx = selectedRowValuesAyuDx
      ? JSON.parse(selectedRowValuesAyuDx).map((value: string) => parseInt(value, 10))
      : [];

    const campoHC = localStorage.getItem('campoHC');
    this.datosIngresarReporte.campoHC = campoHC
      ? JSON.parse(campoHC) : false;

    const campoAyudasDx = localStorage.getItem('campoAyudasDx');
    this.datosIngresarReporte.campoAyudasDx = campoAyudasDx
      ? JSON.parse(campoAyudasDx) : false;
  }

  limpiarLocalStorage() {
    localStorage.removeItem('numeroHistoria');
    localStorage.removeItem('selectedRowValues');
    localStorage.removeItem('episodiosAmbu');
    localStorage.removeItem('campoHC');
    localStorage.removeItem('campoAyudasDx');
    localStorage.removeItem('selectedRowAyudasDx');
    localStorage.removeItem('episodios');
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && (event.key === 'p' || event.key === 'P')) {
      event.preventDefault(); // Evitar el comportamiento predeterminado
      event.stopPropagation(); // Detener la propagación del evento
      // Opcional: Mostrar un mensaje de advertencia o realizar otras acciones
    }
  }

}
