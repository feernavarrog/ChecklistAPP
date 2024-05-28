import { Component, OnInit, ElementRef, ViewChild, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, AlertController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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
export class HomePage implements OnInit{

  @ViewChild('nombreInput', { static: false, read: ElementRef }) nombreInput!: ElementRef;
  @ViewChild('apellidoInput', { static: false, read: ElementRef }) apellidoInput!: ElementRef;

  usuario         : string = '';
  nombre          : string = '';
  apellido        : string = '';
  nivelEducacion  : string = '';
  fechaNacimiento : Date | null = null; // Fecha de nacimiento

  private animation: any;

  constructor(
    private animationCtrl: AnimationController,
    private alertController: AlertController, 
    private activerouter: ActivatedRoute, 
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.activerouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuario = this.router.getCurrentNavigation()?.extras.state?.['usuario'];
      }
    })
  }

  ngOnInit() {
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

  limpiarYAnimarInputs() {
    // Iniciar la animación
    this.animation.play();

    this.nivelEducacion = '';
    this.fechaNacimiento = null;
    // retraso para que la animacion se ejecute correctamente
    setTimeout(() => {
      this.nombre = '';
      this.apellido = '';
      // Detener la animacion
      this.animation.stop();
    }, 1000);
  }

  mostrarDatos() {
    if(this.nombre == '' || this.apellido == ''){
      this.presentAlert('Debe rellenar los campos de nombre y apellido');
      return;
    }

    const formattedDate = this.datePipe.transform(this.fechaNacimiento, 'dd/MM/yyyy');
    this.presentAlert(`Su nombre es: ${this.nombre} ${this.apellido}, Nivel de educacion: ${this.nivelEducacion}, Fecha de nacimiento: ${formattedDate}`);
  }

  presentAlert(message: string) {
    this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }
}
