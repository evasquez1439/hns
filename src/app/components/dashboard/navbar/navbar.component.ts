import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  nombreUsuario = localStorage.getItem('nombreUsuario');   
  local(){
    localStorage.removeItem('logueado'); 
    localStorage.removeItem('nombreUsuario');     
  }
}
