import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-resident.home',
  imports: [
    RouterModule
  ],
  templateUrl: './resident.home.component.html',
  styleUrl: './resident.home.component.scss'
})
export class ResidentHomeComponent implements OnInit {

  isOnHomeRoute : WritableSignal<boolean>
  
  constructor(private router : Router, private activeRoute : ActivatedRoute) {
    this.isOnHomeRoute = signal(true)
  }
  
  ngOnInit(): void {

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      // Check if the current route is exactly /home (not a child route)
      const currentRoute = this.router.url;
      this.isOnHomeRoute.set(currentRoute === '/home/resident');
    });
    
  }


}
