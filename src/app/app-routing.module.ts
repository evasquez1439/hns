import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './components/shared/guards/auth.guard';
import { LoginServinteComponent } from './components/login/login-servinte/login-servinte.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component : LoginComponent},
  {path: 'loginServinte', component : LoginServinteComponent},
  {path: 'dashboard', canActivate:[authGuard], loadChildren:()=> import('./components/dashboard/dashboard.module').then(x => x.DashboardModule)},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}

];

@NgModule({  
  imports: [RouterModule.forRoot(routes , {useHash : true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
