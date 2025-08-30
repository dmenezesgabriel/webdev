import {
  Component,
  // computed,
  DestroyRef,
  inject,
  input,
  // input,
  type OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  RouterOutlet,
  type ActivatedRouteSnapshot,
  type ResolveFn,
  type RouterStateSnapshot,
} from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>(); // app.config.ts withComponentInputBinding
  // userName = '';
  // private userService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  userName = input.required<string>();
  message = input.required<string>();
  private activatedRoute = inject(ActivatedRoute);

  // userName = computed(
  //   () => this.userService.users.find((user) => user.id === this.userId())?.name
  // );

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  // ngOnInit(): void {
  //   // the component is reused on userId change, it does not mount again
  //   // this.activatedRoute.snapshot is not reactive it does not change with userId
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName =
  //         this.userService.users.find(
  //           (user) => user.id === paramMap.get('userId')
  //         )?.name || '';
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (user) => user.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activatedRoute, routerState) + "\\'s Tasks";
};
