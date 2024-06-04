import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  
    // Variable array de objetos para almacenar las tareas
  taskList: { title: string; description: string; status: number }[] = [];

  showDetails: boolean = false; // Variable para mostrar u ocultar los detalles de la tarea
  selectedTask: { title: string; description: string } | null = null; // Variable para almacenar la tarea seleccionada

  selectedSegment: string = 'todo'; // Por defecto, mostrar tareas por hacer

  constructor(
    private animationCtrl: AnimationController, 
    private route: ActivatedRoute, 
    private router: Router
  ) {
      // Obtener la lista de tareas del usuario
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        const userTaskList = this.router.getCurrentNavigation()?.extras.state?.['userTaskList'];
        const newTask = this.router.getCurrentNavigation()?.extras.state?.['task'];
        const taskIndex = this.router.getCurrentNavigation()?.extras.state?.['index'];

        if (userTaskList) { 
          this.taskList = userTaskList;
        }

        if (newTask) {
          this.taskList[taskIndex] = newTask; // Reemplazar la tarea editada en el arreglo
        }

      }
    });
  }

  ngOnInit() {

    this.hideTaskDetails(); // Ocultar los detalles de la tarea

  }

    // Método para añadir una nueva tarea
  addTask() {
    const userTaskList = this.taskList;
    const navigationExtras: NavigationExtras = {
      state: {
        userTaskList: userTaskList
      }
    };
    this.router.navigate(['/add-task'], navigationExtras);
  }

    // Método para editar una tarea
  editTask(index: number) {
    const navigationExtras: NavigationExtras = {
      state: {
        task: this.taskList[index], // Pasar la tarea seleccionada como parámetro hacia la página 'edit-task'
        index: index // Pasar el índice de la tarea seleccionada como parámetro hacia la página 'edit-task'
      }
    };
    this.router.navigate(['/edit-task'], navigationExtras);
  }

    // Método para eliminar una tarea con animación
  deleteTask(index: number) {
    const slidingItems = document.querySelectorAll('ion-item-sliding');   // Seleccionar todos los elementos 'ion-item-sliding'
    
    const slidingItem = slidingItems[index];  // Seleccionar el elemento 'ion-item-sliding' en la posición 'index'
    if (slidingItem) {
      const animation = this.animationCtrl.create() // Crear una animación con el AnimationController
        .addElement(slidingItem)
        .duration(500)
        .easing('ease-out')
        .fromTo('transform', 'translateX(0px)', 'translateX(-100px)')
        .fromTo('opacity', '1', '0');
  
      animation.play().then(() => {
        this.taskList.splice(index, 1);
      });
    }
  }

    // Método para completar una tarea
  completeTask(index: number) { // Recibir el índice de la tarea a completar

    const slidingItems = document.querySelectorAll('ion-item-sliding');
    const slidingItem = slidingItems[index];

    if (slidingItem) {  // Verificar si el elemento 'ion-item-sliding' existe
      const animation = this.animationCtrl.create() // Crear una animación con el AnimationController
        .addElement(slidingItem)
        .duration(500)
        .easing('ease-out')
        .fromTo('transform', 'translateX(0px)', 'translateX(-100px)')
        .fromTo('opacity', '1', '0');
  
      animation.play().then(() => { // Ejecutar la animación
        if (this.taskList[index]) {
          this.taskList[index].status = 3;  // Cambiar el estado de la tarea a 'completada'
        }
      });
    }
  }

    // Método para mostrar los detalles de una tarea
  showTaskDetails(task: any) {  

    this.selectedTask = task; // Almacenar la tarea seleccionada
    this.showDetails = true;
  
    const taskDetails = document.querySelector('.task-details'); // Seleccionar el elemento con la clase 'task-details'
    if (taskDetails) {
      const animation = this.animationCtrl.create() // Crear una animación con el AnimationController
        .addElement(taskDetails)
        .duration(500)
        .easing('ease-out')
        .fromTo('transform', 'translateY(100%)', 'translateY(0)')
        .fromTo('opacity', '0', '1');
  
      animation.play();
    }

  }

    // Método para ocultar los detalles de una tarea 
  hideTaskDetails() {

    const taskDetails = document.querySelector('.task-details'); // Seleccionar el elemento con la clase 'task-details'
    if (taskDetails) {
      const animation = this.animationCtrl.create() // Crear una animación con el AnimationController
        .addElement(taskDetails)
        .duration(500)
        .easing('ease-out')
        .fromTo('transform', 'translateY(0)', 'translateY(100%)') 
        .fromTo('opacity', '1', '0');
  
      animation.play().then(() => {
        this.selectedTask = null;
        this.showDetails = false;
      });
    }
  }
  
    // Metodo para volver a la pagina de inicio
  getBackHome(){

    const navigationExtras: NavigationExtras = {
      state: {
        userTaskList: this.taskList // Pasar la lista de tareas como parámetro
      }
    };
    this.router.navigate(['/home'], navigationExtras);
  }
}
