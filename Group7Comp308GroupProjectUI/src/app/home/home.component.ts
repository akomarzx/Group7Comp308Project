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
import { AuthService as AuthService } from '../services/auth.service/auth.service';
import { routes } from '../app.routes';

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

  private routeNames : RouteDisplay[]

  constructor(private router: Router, private dialog : MatDialog, private authService: AuthService) {

    this.routeNames = [
          {routePath: "/home/resident", routeName: "Home"},
          {routePath: "/home/resident/local-news", routeName: "Local News"},
          {routePath: "/home/resident/neighborhood-help", routeName: "Neighborhood Help"},
          {routePath: "/home/resident/emergency-alert", routeName: "Emergency Alerts"},
          {routePath: "/home/business/listings", routeName: "Listings"},
    ]
  }

  navbarRoutesToDisplay : WritableSignal<RouteDisplay[]> = signal([])

  ngOnInit(): void {
    this.router.navigate(['/home/resident'])
    console.log(this.authService.currentUser)

    this.navbarRoutesToDisplay?.set(this.routeNames)
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
