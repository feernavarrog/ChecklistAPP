import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = '';
  contrasena: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
  }

  login(){
    // verifica campos vacios
    if(this.usuario == '' || this.contrasena == ''){
      this.presentAlert('Por favor ingrese el usuario y la contraseña');
      return;
    }
    // verifica longitud del usuario
    if (this.usuario.length < 3 || this.usuario.length > 8) {
      this.presentAlert('El usuario debe tener entre 3 y 8 caracteres');
      return;
    }

    // verifica que la contraseña tenga exactamente 4 dígitos y solo contenga números
    if (this.contrasena.length !== 4 || !/^\d{4}$/.test(this.contrasena)) {
      this.presentAlert('La contraseña debe contener exactamente 4 dígitos numéricos');
      return;
    }

    // Navegar a siguiente pagina y enviar datos
    let navigationExtras: NavigationExtras = { 
      state: {
        usuario: this.usuario
      }
    }
    this.router.navigate(['/home'], navigationExtras);
  }

  presentAlert(message: string) {
    this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }
}
