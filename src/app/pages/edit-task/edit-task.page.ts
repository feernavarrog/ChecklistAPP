import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {

    // Variables para almacenar los valores de la tarea
  taskTitle: string = '';
  taskDescription: string = '';
  taskIndex!: number;
  taskStatus!: number;

  constructor(
    private router: Router, 
    private alertController: AlertController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { // Obtener la tarea a editar de la página de tareas

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        const task = this.router.getCurrentNavigation()?.extras.state?.['task'];
        this.taskIndex = this.router.getCurrentNavigation()?.extras.state?.['index']; // Obtener el índice de la tarea
        
          // Si la tarea existe, asignar los valores de la tarea a las variables
        if (task) {
          this.taskTitle = task.title;
          this.taskDescription = task.description;
          this.taskStatus = task.status;
        }

      }
    });
    
  }

    // Método para editar la tarea
  editTask(taskStatus : number) {
    if (this.taskTitle.trim() !== '') {

      if (taskStatus == 1) { // Verificar si la tarea es 'Por hacer'
        const editedTask = { title: this.taskTitle, description: this.taskDescription, status: 1};

      const navigationExtras: NavigationExtras = { // Crear el objeto de navegación con la tarea como parámetro
        state: {
          task: editedTask,
          index: this.taskIndex
        }

      };

      this.presentAlert('Mensaje','Cambios guardados con exito!');
      this.router.navigate(['/tasks'], navigationExtras); // Navegar hacia la página 'tasks'
      
    } else if (taskStatus == 2) { // Verificar si la tarea es 'En progreso'
        const editedTask = { title: this.taskTitle, description: this.taskDescription, status: 2};

      const navigationExtras: NavigationExtras = { // Crear el objeto de navegación con la tarea como parámetro
        state: {
          task: editedTask,
          index: this.taskIndex
        }

      };

      this.presentAlert('Mensaje','Cambios guardados con exito!');
      this.router.navigate(['/tasks'], navigationExtras); // Navegar hacia la página 'tasks'

      };
      
    } else { // Si el título de la tarea está vacío, mostrar un mensaje de error
      this.presentAlert('Error','Por favor, ingresa un título para la tarea.');
    }
  }

    // Método para mostrar un mensaje
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
