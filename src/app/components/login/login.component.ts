import { Component, HostListener, OnInit } from '@angular/core';
import { responseLdap, responseLogin, responseTipoPermisos, user, userLongin, userTipoPermisos } from '../../models/datosUsuario.models';
import { LoginService } from '../../services/login.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // form: FormGroup;

  hide = true;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  response: responseLdap = {

    code: '',
    description: '',
    fullName: ''

  }

  user: user = {

    user: '',
    password: '',
  }

  userLogin: userLongin = {

    user: this.user.user

  }

  responseLogin: responseLogin = {

    code: '',
    description: '',
    data: '',
    nombreUsuario: ''

  }

  userTipoPermisos: userTipoPermisos = {
    grupoServi: ''
  }

  responsTipoPermiso: responseTipoPermisos = {

    code: '',
    description: '',
    data: '',
    clasePermiso: ''

  }
  loading: boolean = false;
  logueado: boolean = true;
  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router

    // private fb: FormBuilder
  ) {
    // this.form = this.fb.group({
    //   user:['',Validators.required],
    //   password:['',Validators.required]
    // });
  }

  openSnackBar() {
    const snackBarRef = this._snackBar.open('Bienvenido!!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });

  }

  ngOnInit(): void {
    localStorage.clear();
    // this.service.getApiLdap(this.user).subscribe(datos =>{
    //   this.response = datos
    //   console.log(datos);
    // })

  }

  fakeLoading() {
    this.loading = true;

    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);


  }

  onLoging() {

    this.loginService.getApiLdap(this.user).subscribe(datos => {

      this.response = datos
      localStorage.setItem('nombreUsuario', datos.fullName);
      if (datos.code == '200') {
        this.userLogin.user = this.user.user
        this.loginService.getApiLogin(this.userLogin).subscribe(respuesta => {
          this.responseLogin = respuesta

          if (respuesta.code == '200') {
            this.userTipoPermisos.grupoServi = respuesta.data
            this.loginService.getApiPermisos(this.userTipoPermisos).subscribe(permis => {
              this.responsTipoPermiso = permis

              if (permis.code == '200') {

                const snackBarRef = this._snackBar.open('' + permis.clasePermiso, '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: 'bottom',
                  duration: this.durationInSeconds * 1000
                  
                });
                localStorage.setItem('permiso' , permis.clasePermiso.toString())
                // const logueado: boolean = true;
                this.logueado = true;
                localStorage.setItem('logueado', this.logueado.toString());
                this.fakeLoading();
              }
              // this.logueado = true;
              //   localStorage.setItem('logueado', this.logueado.toString());
              //   this.fakeLoading();
            });

          } else {
            this.logueado = false;
            localStorage.setItem('logueado', this.logueado.toString())
            const snackBarRef = this._snackBar.open('Usuario sin acceso a la aplicación', '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000
            });
          }
        });
      } else {
        const snackBarRef = this._snackBar.open('Usuario o contraseña invalido', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000
        });
      }


    });
  }


  @HostListener('contextmenu', ['$event'])
  bloquearClickDerecho(event: MouseEvent) {
    event.preventDefault();
  }

  // onLogingClik() {

  //   this.loginService.getApiLdap(this.user).subscribe(succes =>{

  //     if(succes){

  //       this.loginService.getApiLogin(this.userLogin).subscribe(response => {
  //         this.userTipoPermisos.grupoServi = response.data;
  //         if(response){

  //           this.loginService.getApiPermisos(this.userTipoPermisos).subscribe(acces =>{              

  //             if(acces.description != 'El usuario tiene permisos de ingreso e impresion del documento.' || 'El usuario solo tiene permisos de lectura del documento.'){

  //               alert("El usuario " + this.user.user + "No tiene permisos de aplicación");

  //             }else{

  //               alert("El usuario tiene permisos de aplicación");

  //             }          

  //           })
  //         }
  //       })
  //     }  

  //   })
  // }

}
