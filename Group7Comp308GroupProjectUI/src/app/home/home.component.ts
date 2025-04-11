import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Role, RouteDisplay } from '../models/User';
import { UserSecurityService as AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ]
})
export class HomeComponent implements OnInit {

  private routeNames : [{roleName: Role, routes: RouteDisplay[]}]

  constructor(private router: Router, private dialog : MatDialog, private authService: AuthService) {
    this.routeNames = [
      {
        roleName: Role.RESIDENT,
        routes: [
          {routePath: "/home/resident/local-news", routeName: "Local News"},
          {routePath: "/home/resident/emergency-alert", routeName: "Emergency Alerts"},
          {routePath: "/home/resident/neighborhood-help", routeName: "Neighborhood Help"},
        ]
      },

    ]
  }

  navbarRoutesToDisplay : WritableSignal<RouteDisplay[]> = signal([])

  ngOnInit(): void {
    this.router.navigate(['/home/resident'])
    console.log(this.authService.currentUser)
    let result = this.routeNames.filter((item) => {
      return item.roleName === this.authService.currentUser?.role
    })
    this.navbarRoutesToDisplay?.set(result[0].routes)
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
