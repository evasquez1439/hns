import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio/inicio.component';
import { DatosDemograficosComponent } from './datos-demograficos/datos-demograficos.component';
import { ListaEpisodiosComponent } from './lista-episodios/lista-episodios.component';
import { ListaAyudasdxComponent } from './lista-ayudasdx/lista-ayudasdx.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HistoriaClinicaComponent } from '../historia-clinica/historia-clinica.component';
import { DialogAlertComponent } from './inicio/dialog-alert/dialog-alert.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    DatosDemograficosComponent,
    ListaEpisodiosComponent,
    ListaAyudasdxComponent,
    NavbarComponent,
    HistoriaClinicaComponent,
    DialogAlertComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers:[ListaEpisodiosComponent, ListaAyudasdxComponent],
  exports:[
    
  ]
})
export class DashboardModule { }
