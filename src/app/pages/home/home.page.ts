import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

    // Objeto con la información del usuario
  userData: {
    userName: string;
    userFirstName: string;
    userLastName: string;
    taskList: { title: string; description: string; status: number }[]; // Arreglo de tareas donde cada tarea tiene un título, descripción y estado
  } = {
    userName: '',
    userFirstName: '',
    userLastName: '',
    taskList: []
  };

  constructor(
    private activerouter: ActivatedRoute, 
    private router: Router,
  ) {
    this.activerouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) { // Verificar si se recibió información del usuario

          // Obtener la información del usuario y las tareas
        const user = this.router.getCurrentNavigation()?.extras.state?.['user'];
        const userNewInfo = this.router.getCurrentNavigation()?.extras.state?.['userNewInfo'];
        const newTask = this.router.getCurrentNavigation()?.extras.state?.['task'];
        const userTaskList = this.router.getCurrentNavigation()?.extras.state?.['userTaskList'];
        const taskListFromCompleted = this.router.getCurrentNavigation()?.extras.state?.['taskListFromCompleted'];
        
          // Asignar la información del usuario y las tareas al objeto userData
        if (user) { 
          this.userData.userName = user.userName;
          this.userData.userFirstName = user.userFirstName;
          this.userData.userLastName = user.userLastName;
        }
          // Asignar la información del usuario y las tareas al objeto userData
        if (userNewInfo) {
          this.userData.userFirstName = userNewInfo.userFirstName;
          this.userData.userLastName = userNewInfo.userLastName;
        }

          // Asignar la información del usuario y las tareas al objeto userData
        if (userTaskList) { 
          this.userData.taskList = userTaskList;
        }

          // Asignar la información del usuario y las tareas al objeto userData
        if (newTask) {
          this.userData.taskList.push(newTask);
        }
            
            // Asignar la información del usuario y las tareas al objeto userData
        if (taskListFromCompleted) { 
          this.userData.taskList = taskListFromCompleted;
        }

      }
    })
  }

  ngOnInit() {
  }

    // ir a la pagina de informacion del usuario
  goToInfo() {

    const userInfo = { // Crear un objeto con la información del usuario

      userName: this.userData.userName,
      userFirstName: this.userData.userFirstName,
      userLastName: this.userData.userLastName

    };

    const navigationExtras: NavigationExtras = { // Crear el objeto de navegación con el usuario como parámetro
      state: {
        userInfo: userInfo
      }
    };
    this.router.navigate(['/add-info'], navigationExtras); // Navegar hacia la página 'add-info'
  }

    // ir a la pagina de tareas
  goToTaskList() {

    const navigationExtras: NavigationExtras = { // Crear el objeto de navegación con la lista de tareas como parámetro
      state: {
        userTaskList: this.userData.taskList // Enviar la lista de tareas
      }
    };
    this.router.navigate(['/tasks'], navigationExtras);
  }

    // ir a añaadir tarea
  goToAddTask() {

    const navigationExtras: NavigationExtras = { // Crear el objeto de navegación con la lista de tareas como parámetro
      state: {
        userTaskList: this.userData.taskList // Enviar la lista de tareas
      }
    };
    this.router.navigate(['/add-task'], navigationExtras);
  }
 
    // ir a tareas completadas
  goToCompletedTasks() {

    const navigationExtras: NavigationExtras = { // Crear el objeto de navegación con la lista de tareas como parámetro
      state: {
        taskList: this.userData.taskList
      }
    };
    this.router.navigate(['/completed-tasks'], navigationExtras);
  }
}
