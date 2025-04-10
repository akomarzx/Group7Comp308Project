import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-resident.home',
  imports: [
    RouterModule
  ],
  templateUrl: './resident.home.component.html',
  styleUrl: './resident.home.component.scss'
})
export class ResidentHomeComponent implements OnInit {

  constructor(private router : Router, private activeRoute : ActivatedRoute) {}

  ngOnInit(): void {
    this.router.navigate(["local-news"], {relativeTo: this.activeRoute})
  }
}
