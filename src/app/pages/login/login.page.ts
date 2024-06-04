import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    // Variables para almacenar los datos del usuario
  userEmail: string = '';
  userName: string = '';
  userFirstName: string = '';
  userLastName: string = '';
  userPassword: string = '';

    // Variables para almacenar los datos ingresados por el usuario
  userInput: string = '';
  passwordInput: string = '';

  constructor(  // Importar módulos necesarios
    private router: Router,
    private route: ActivatedRoute, 
    private toastController: ToastController) {

    this.route.queryParams.subscribe(params => {  // Obtener los datos del usuario
      if (this.router.getCurrentNavigation()?.extras.state) {
        const user = this.router.getCurrentNavigation()?.extras.state?.['user'];

          // Almacenar los datos del usuario
        if (user) {
          this.userName = user.userName;
          this.userPassword = user.password; 
          this.userEmail = user.email; 
          this.userFirstName = user.firstName; 
          this.userLastName = user.lastName;
        }
      }
    });
    }

  ngOnInit() {
  }

    // Método para iniciar sesión
  login(){

    if(this.userInput == '' || this.passwordInput == ''){   // Validar que los campos no estén vacíos
      this.presentToast('Por favor ingrese el usuario y la contraseña');
      return;
    }

    if (this.passwordInput.length !== 4 || !/^\d{4}$/.test(this.passwordInput)) {
      this.presentToast('La contraseña debe contener exactamente 4 dígitos numéricos'); // Mostrar mensaje de error si la contraseña no contiene 4 dígitos numéricos
      return;
    }

    if (this.userInput === this.userName && this.passwordInput === this.userPassword) {   // Validar que el usuario y la contraseña sean correctos

      const user = { // Crear objeto con los datos del usuario
        userName: this.userName,
        userFirstName: this.userFirstName,
        userLastName: this.userLastName
      }

      // Redireccionar a la página de inicio con los datos del usuario
      let navigationExtras: NavigationExtras = { 
        state: {
          user: user
        }
      }
      this.router.navigate(['/home'], navigationExtras); // Redireccionar a la página de inicio con los datos del usuario
    } else {

      this.presentToast('Usuario o contraseña incorrectos'); // Mostrar mensaje de error si el usuario o la contraseña son incorrectos
    }
  }

    // Método para mostrar un mensaje de error
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
