import { Component, OnInit, ElementRef, ViewChild, } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AnimationController, AlertController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.page.html',
  styleUrls: ['./add-info.page.scss'],
  animations: [
    trigger('fadeState', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
        animate(1500, style({
          opacity: 1
        }))
      ]),
    ]),
  ],
  providers: [DatePipe]
})
export class AddInfoPage implements OnInit{

  @ViewChild('nombreInput', { static: false, read: ElementRef }) nombreInput!: ElementRef;
  @ViewChild('apellidoInput', { static: false, read: ElementRef }) apellidoInput!: ElementRef;

    // Declaración de variables
  usuario         : string = '';
  nombre          : string = '';
  apellido        : string = '';
  nivelEducacion  : string = '';
  fechaNacimiento : Date | null = null; // Fecha de nacimiento
  showAdditionalInfo: boolean = false; 
  showDatePicker  : boolean = false; // Mostrar el date picker

  private animation: any;   // Animación de los inputs

  constructor(  // Inyección de dependencias
    private animationCtrl: AnimationController,
    private alertController: AlertController, 
    private route: ActivatedRoute, 
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {

        const userInfo = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];

        if (userInfo) {
          this.usuario = userInfo.userName;
          this.nombre = userInfo.userFirstName;
          this.apellido = userInfo.userLastName;
        }

      }
    });
  }

  ngOnInit() {
  }

  saveNewUserInfo() {   // Método para guardar la información del usuario
    if (!this.nombre || !this.apellido) {
      this.presentAlert('Debe completar los campos de nombre y apellido.');
      return;
    }

    // Crear un objeto con la nueva información del usuario
    const userNewInfo = { 

      userFirstName: this.nombre,
      userLastName: this.apellido

    };
  
    // Redireccionar a la página home con los nuevos datos
    const navigationExtras: NavigationExtras = {
      state: {
        userNewInfo: userNewInfo
      }
    };
    this.router.navigate(['/home'], navigationExtras);
  }
  

  // animacion de los inputs (IONIC ANIMATION)
  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.nombreInput.nativeElement)
      .addElement(this.apellidoInput.nativeElement)
      .duration(1000) // 1 segundo
      .iterations(1) // 1 vez
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
  }

    // Metodo para limpiar y animar los inputs
  limpiarYAnimarInputs() {
    this.animation.play();

    this.nivelEducacion = '';
    this.fechaNacimiento = null;

    setTimeout(() => {  // Limpiar los campos después de 1 segundo
      this.nombre = '';
      this.apellido = '';
      
      this.animation.stop();  // Detener la animación
    }, 1000);
  }

    // Metodo para mostrar los datos ingresados
  mostrarDatos() {
    if(this.nombre == '' || this.apellido == ''){
      this.presentAlert('Debe rellenar los campos de nombre y apellido');   // Mostrar alerta
      return;
    }

    const formattedDate = this.datePipe.transform(this.fechaNacimiento, 'dd/MM/yyyy');  // Formatear la fecha
    this.presentAlert(`Su nombre es: ${this.nombre} ${this.apellido}, Nivel de educacion: ${this.nivelEducacion}, Fecha de nacimiento: ${formattedDate}`); // Mostrar alerta
  }

  presentAlert(message: string) {   // Método para mostrar una alerta
    this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  // Método para mostrar/ocultar el date picker
  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

    // ir a la pagina de inicio
  getBackHome() {
    this.router.navigate(['/home']);  // Navegar hacia la página 'home'
  }
}
