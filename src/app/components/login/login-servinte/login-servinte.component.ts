import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { responseLogin, responseTipoPermisos, userLongin, userTipoPermisos } from 'src/app/models/datosUsuario.models';
import { LoginService } from 'src/app/services/login.service';
import { AppConfig } from '../../../models/cadenasDeConexion';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login-servinte',
  templateUrl: './login-servinte.component.html',
  styleUrls: ['./login-servinte.component.css']
})
export class LoginServinteComponent implements OnInit {
  logueado!: boolean;
  numeroHCServinte!: number;
  userLogin: userLongin = {

    user: ''

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
  constructor(private route: ActivatedRoute, private router: Router,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,) {

  }

  ngOnInit() {
    this.validarUsuario();
  }

  validarUsuario() {
    const clave = AppConfig.CLAVE;
    this.route.queryParams.subscribe(params => {
      let parametroUser = params['user'];
      let parametroHistoria = params['hc'];
      let parametroEpisodio = params['episodio'];
      

      parametroUser = parametroUser.replace(/ /g, '+');
      parametroHistoria = parametroHistoria.replace(/ /g, '+');
      parametroEpisodio = parametroEpisodio.replace(/ /g, '+');

      // const parametroUno = CryptoJS.AES.encrypt(parametroUser, clave).toString();
      // const parametroDos = CryptoJS.AES.encrypt(parametroHistoria, clave).toString();       

      if (this.esTextoEncriptado(parametroUser, parametroHistoria, parametroEpisodio)) {

        const descifrado = CryptoJS.AES.decrypt(parametroUser, clave).toString(CryptoJS.enc.Utf8);
        const descifrado2 = CryptoJS.AES.decrypt(parametroHistoria, clave).toString(CryptoJS.enc.Utf8);
        const descifrado3 = CryptoJS.AES.decrypt(parametroEpisodio, clave).toString(CryptoJS.enc.Utf8);

        localStorage.setItem('numeroHCServinte', descifrado2);

        this.userLogin.user = descifrado;
        this.onLoging();

      } else {
        this.openSnackBar("usuarion sin permisos de acceso, intenta loguearte");
        this.router.navigate(['login'])
      }

    });
  };


  onLoging() {

    this.loginService.getApiLogin(this.userLogin).subscribe(respuesta => {
      this.responseLogin = respuesta;
      localStorage.setItem('nombreUsuario', respuesta.nombreUsuario);

      if (respuesta.code == '200') {
        this.userTipoPermisos.grupoServi = respuesta.data

        this.loginService.getApiPermisos(this.userTipoPermisos).subscribe(permis => {
          this.responsTipoPermiso = permis
          if (permis.code == '200') {
            this.openSnackBar(permis.clasePermiso.toString());
            localStorage.setItem('permiso', permis.clasePermiso.toString())
            // const logueado: boolean = true;
            this.logueado = true;
            localStorage.setItem('logueado', this.logueado.toString());
            localStorage.setItem('bloqueoMetodoBuscarServinte', JSON.stringify(this.logueado));
            this.router.navigate(['dashboard']);
          } else {
            this.openSnackBar("Usuario sin acceso a la aplicación");
            this.router.navigate(['login']);
          }
        });
      } else {
        this.logueado = false;
        localStorage.setItem('logueado', this.logueado.toString());
        this.openSnackBar("Usuario sin acceso a la aplicacion");
        this.router.navigate(['login']);
      }
    });

  }

  esTextoEncriptado(parametroUser: string, parametroHistoria: string, parametroEpisodio: string): boolean {
    try {
      let decifrado = CryptoJS.AES.decrypt(parametroUser, AppConfig.CLAVE).toString(CryptoJS.enc.Utf8);
      
      let decifradohc = CryptoJS.AES.decrypt(parametroHistoria, AppConfig.CLAVE).toString(CryptoJS.enc.Utf8);

      let decifradoep = CryptoJS.AES.decrypt(parametroEpisodio, AppConfig.CLAVE).toString(CryptoJS.enc.Utf8);
   
      const resultado = !!decifrado && !!decifradohc && !!decifradoep;
      return resultado;
    } catch (error) {
      console.log("No viene cifrado" + error);
      return false;
    }
  }

  openSnackBar(mensaje: string) {
    const snackBarRef = this._snackBar.open(mensaje, '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5 * 1000
    });

  }

  base64UrlEncode(input: string): string {
    const words = CryptoJS.enc.Utf8.parse(input);
    const base64 = CryptoJS.enc.Base64.stringify(words);
    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  base64UrlDecode(input: string): string {
    input = input
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    switch (input.length % 4) {
      case 2:
        input += '==';
        break;
      case 3:
        input += '=';
        break;
    }
    const words = CryptoJS.enc.Base64.parse(input);
    return CryptoJS.enc.Utf8.stringify(words);
  }

}
