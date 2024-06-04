import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

    // Variable array de objetos para almacenar las tareas
  taskList: { title: string; description: string; status: number }[] = [];

  taskTitle: string = '';
  taskDescription: string = '';
  taskStatus!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        const userTaskList = this.router.getCurrentNavigation()?.extras.state?.['userTaskList'];
        
        if (userTaskList) { 
          this.taskList = userTaskList;
          console.log(this.taskList);
        }

      }
    });
  }

  ngOnInit() {
  }

  addTask(taskStatus : number) {

    if (this.taskTitle.trim() !== '') { // Verificar si el título de la tarea no está vacío
      
      if (taskStatus == 1) { // Verificar si la tarea es 'Por hacer'
        const newTask = { title: this.taskTitle, description: this.taskDescription, status: 1};

      const navigationExtras: NavigationExtras = { // Crear el objeto de navegación con la tarea como parámetro
        state: {
          task: newTask,
          //taskList: this.taskList
        }
      };

      this.presentErrorAlert('Mensaje','Tarea creada con exito!');
      this.router.navigate(['/home'], navigationExtras); // Navegar hacia la página 'tasks'

      } 
      else if (taskStatus == 2) { // Verificar si la tarea es 'En progreso'
        const newTask = { title: this.taskTitle, description: this.taskDescription, status: 2};

        const navigationExtras: NavigationExtras = { // Crear el objeto de navegación con la tarea como parámetro
        state: {
          task: newTask,
          //taskList: this.taskList
        }
      };

      this.presentErrorAlert('Mensaje','Tarea creada con exito!');
      this.router.navigate(['/home'], navigationExtras); // Navegar hacia la página 'tasks'

      };
  
    } else { // Si el título de la tarea está vacío, mostrar un mensaje de error
      this.presentErrorAlert('Error','Por favor, ingresa un título para la tarea.');
    }
  }

    // Método para mostrar un mensaje de error
  async presentErrorAlert(tipo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: tipo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
