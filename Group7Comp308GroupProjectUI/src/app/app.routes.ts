import { Router, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service/auth.service';

export const routes: Routes = [
  {
    path: 'home',
    title: 'MetFlex Home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [
      () => {
        const router = inject(Router);
        const userService = inject(AuthService);
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
            title: 'Local News',
            loadComponent: () =>
              import(
                './home/resident/resident.home/local.news/local.news.component'
              ).then((m) => m.LocalNewsComponent),
          },
          {
            path: 'emergency-alert',
            loadComponent: () =>
              import(
                './home/resident/resident.home/emergency.alerts/emergency.alerts.component'
              ).then((m) => m.EmergencyAlertsComponent),
              title: "Emergency Alert"
          },
          {
            path: 'neighborhood-help',
            loadComponent: () =>
              import(
                './home/resident/resident.home/neighborhood.help/neighborhood.help.component'
              ).then((m) => m.NeighborhoodHelpComponent),
              title: 'Neighborhood Help'
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
