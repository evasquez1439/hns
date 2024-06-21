import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { DatosDemograficosComponent } from './datos-demograficos/datos-demograficos.component';
import { ListaEpisodiosComponent } from './lista-episodios/lista-episodios.component';
import { HistoriaClinicaComponent } from '../historia-clinica/historia-clinica.component';

const routes: Routes = [

  {path: '', component: DashboardComponent, children:[
    {path: '', component: InicioComponent},
    {path: 'datosDemo', component: DatosDemograficosComponent},
    {path: 'listadoEpisodios', component: ListaEpisodiosComponent},
    {path: 'reporteHc', component: HistoriaClinicaComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
