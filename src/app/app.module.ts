import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



// Componentes
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AsistenteBusquedaComponent } from './components/asistente-busqueda/asistente-busqueda.component';
import { SharedModule } from './components/shared/shared.module';
import { DatePipe } from '@angular/common';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { HistoriaClinicaComponent } from './components/historia-clinica/historia-clinica.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginServinteComponent } from './components/login/login-servinte/login-servinte.component';






@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
    AsistenteBusquedaComponent,
    LoginServinteComponent,
    
      
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    DashboardModule,
    PdfViewerModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
