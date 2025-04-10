import { Router, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { inject } from '@angular/core';
import { UserSecurityService } from './services/auth-service/auth.service';

export const routes: Routes = [
  {
    path: 'home',
    title: 'MetFlex Home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [
      () => {
        const router = inject(Router);
        const userService = inject(UserSecurityService);
        if (userService.isAuthenticated()) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      },
    ],
    children: [
      {
        path: 'resident',
        loadComponent: () =>
          import('./home/resident/resident.home/resident.home.component').then(
            (m) => m.ResidentHomeComponent
          ),
        children: [
          {
            path: 'local-news',
            loadComponent: () =>
              import(
                './home/resident/resident.home/local.news/local.news.component'
              ).then((m) => m.LocalNewsComponent),
          },
          {
            path: 'local-news',
            loadComponent: () =>
              import(
                './home/resident/resident.home/local.news/local.news.component'
              ).then((m) => m.LocalNewsComponent),
          },
          {
            path: 'local-news',
            loadComponent: () =>
              import(
                './home/resident/resident.home/local.news/local.news.component'
              ).then((m) => m.LocalNewsComponent),
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Metflex',
  },
];
