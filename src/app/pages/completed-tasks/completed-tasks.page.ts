import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
})
export class CompletedTasksPage implements OnInit {

   // Variables para almacenar las tareas
  taskList: { title: string; description: string; status: number }[] = [];
  selectedTask: { title: string; description: string } | null = null; // Variable para almacenar la tarea seleccionada

  constructor(
    private animationCtrl: AnimationController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {

        const taskList = this.router.getCurrentNavigation()?.extras.state?.['taskList'];

        if (taskList){
          this.taskList = taskList
        }

      }
    });
  }

  ngOnInit() {
  }

  // Método para borrar de la lista de tareas
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

    // Ir hacia la pagina de tareas
  getBack() {
    const navigationExtras: NavigationExtras = {
      state: {
        taskListFromCompleted: this.taskList // Enviar array actualizado de vuelta a la página de tareas
      }

    };
    this.router.navigate(['/home'], navigationExtras);
  }
}
