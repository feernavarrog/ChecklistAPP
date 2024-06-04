import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

    // Variables para almacenar los datos del usuario
  email: string = '';
  userName : string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  showPasswordMessage: boolean = false;
  passwordMessage: string = '';
  isUserNameAvailable: boolean | undefined;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  // Método para verificar si el nombre de usuario está disponible
  checkUserNameAvailability() {
    this.isUserNameAvailable = this.userName.length > 0;
  }

  // Método para validar el correo electrónico
  validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el correo electrónico
    return emailRegex.test(this.email);
  }
  // Método para validar la contraseña
  validatePassword(): void {

    const passwordRegex = /^[0-9]{4}$/;
    if (!this.password) { // Verificar si la contraseña está vacía

      this.showPasswordMessage = true;
      this.passwordMessage = 'La contraseña es requerida'; // Mostrar mensaje de error si la contraseña es requerida

    } else if (!passwordRegex.test(this.password)) { // Verificar que la contraseña cumpla con el formato requerido
      this.showPasswordMessage = true;
      this.passwordMessage = 'La contraseña debe ser solo números y tener una extensión de 4 números'; // Mostrar mensaje de error si la contraseña no cumple con el formato requerido

    } else {
      this.showPasswordMessage = false;
      this.passwordMessage = '';
    }
  }  

    // Método para registrar al usuario
  register(): void {
    if (this.userName && this.email && this.firstName && this.lastName && this.password) {  // Verificar que los campos no estén vacíos

      if (this.validateEmail()) { // Validar el correo electrónico

        this.validatePassword();
        if (!this.showPasswordMessage) {

          const user = { // Crear un objeto con los datos del usuario
            email: this.email,
            userName: this.userName,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password
          };
  
          const navigationExtras: NavigationExtras = {
            state: {
              user: user // Pasar los datos del usuario como parámetros
            }
          };
          this.router.navigate(['/login'], navigationExtras);
          this.presentAlert('Registro exitoso', 'Usuario registrado correctamente'); // Mostrar mensaje de éxito al registrar al usuario
          
        } else {
          this.presentToast('La contraseña no es válida'); // Mostrar mensaje de error si la contraseña no es válida
        }
      } else {
        this.presentToast('Correo electrónico no válido'); // Mostrar mensaje de error si el correo electrónico no es válido
      }
    } else {
      this.presentToast('Por favor completa todos los campos'); // Mostrar mensaje de error si hay campos vacíos
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

      // Método para mostrar un mensaje
  async presentAlert(tipo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: tipo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
