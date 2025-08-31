import { Routes } from '@angular/router';

import {
  NewTaskComponent,
  canLeaveEditPage,
} from '../tasks/new-task/new-task.component';
import { resolveUserTasks } from './user-tasks.resolver';
import { TasksService } from '../tasks/tasks.service';

export const routes: Routes = [
  {
    path: '',
    providers: [TasksService], // provide service to all routes
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        loadComponent: () =>
          //lazy
          import('../tasks/tasks.component').then(
            (module) => module.TasksComponent
          ),
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
];
